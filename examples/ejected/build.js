const {IsoBuilder} = require('@rebuild/iso');
const getReframeConfig = require('@reframe/utils/getReframeConfig');
const webpack = require('webpack');
const getBrowserConfig = require('./getBrowserConfig');
const getServerConfig = require('./getServerConfig');

module.exports = build();

async function build() {
    const isoBuilder = new IsoBuilder();

    let pageConfigs;

    const reframeConfig = getReframeConfig();
    const {fileStructure: {pagesDir, staticAssetsDir}} = reframeConfig;

    isoBuilder.builder = async there_is_a_newer_run => {
        const pageConfigs = readPagesDir(pagesDir);

        const serverEntries = getServerEntries(pagesDir);
        const serverConfig = getServerConfig(serverEntries);
        const serverCompiler = webpack(serverConfig);
        await isoBuilder.build_server(server_entries);

        writeBrowserEntryFiles();

        const browserEntries = getBrowserEntries();
        const browserConfig = getBrowserConfig(browserEntries);
        const browserCompiler = webpack(browserConfig);
        await isoBuilder.build_browser(browserCompiler);

        pageConfigs = 

        writeHtmlFiles()

        return isoBuilder;
    };

    isoBuilder.watchDir(pagesDir);

    await isoBuilder.build();

    const getPageConfigs = () => pageConfigs;
    return getPageConfigs;
}
