// This is where we integrate Reframe with Hapi
// In other words: We apply the request handlers defined in the config.
// (Plugins add request handlers over the config)

const reconfig = require('@brillout/reconfig');
const assert_internal = require('reassert/internal');

module.exports = {
    name: 'ConfigHandlers',
    multiple: false,
    register: server => server.ext('onPreResponse', handleRequest),
};

async function handleRequest(request, h) {
    if( alreadyServed(request) ) {
        return h.continue;
    }

    const {body, headers, etag} = await getResponse(request);

    if( body === null ) return h.continue;

    const response = h.response(body);

    // We use hapi's etag machinery instead of setting the etag header ourselves
    if( etag ) {
        const response_304 = h.entity({etag});
        if( response_304 ) {
            return response_304;
        }
        response.etag(etag);
    }

    headers.forEach(header => response.header(header.name, header.value));

    return response;
}

async function getResponse(request) {
    let {body, headers} = await applyConfigHandlers(request);

    if( body === null ) return {body: null};

    let etag;
    headers = (
        headers
        .filter(header => {
            if( header.name==='etag' ) {
                etag = header.value;
                assert_internal(etag[0]==='"' && etag.slice(-1)[0]==='"', etag);
                etag = etag.slice(1, -1);
                return false;
            }
            return true;
        })
    );

    return {body, headers, etag};
}

// Plugins add request handlers over the config.
// E.g. the  `@reframe/server` adds request handlers to the config
// to do SSR and to serve static assets.
async function applyConfigHandlers(request) {
    const config = reconfig.getConfig({configFileName: 'reframe.config.js'});
    const {req} = request.raw;
    return await config.applyRequestHandlers({req});
}

function alreadyServed(request) {
    return (
        ! request.response.isBoom ||
        request.response.output.statusCode !== 404
    );
}