module.exports = {
    transparentGetter,
    requireFileGetter,
    eagerRequireFileGetter,
};

// TODO-LATER - show usage error when trying to access a missing config
//  - tell the user what is the plugin that defines the getter

function transparentGetter(prop) {
    return {
        prop,
        getter: configParts => {
            const configFound = configParts.find(configPart => configPart[prop]);
            return configFound && configFound[prop];
        },
    };
}

function requireFileGetter(propOld, prop) {
    return {
        prop,
        getter: configParts => {
            const configFound = configParts.find(configPart => configPart[propOld]);
            const filePath = configFound && configFound[propOld];
            return filePath && (() => require(filePath));
        },
    };
}

function eagerRequireFileGetter(propOld, prop) {
    return {
        prop,
        getter: configParts => {
            const configFound = configParts.find(configPart => configPart[propOld]);
            const filePath = configFound && configFound[propOld];
            return filePath && require(filePath);
        },
    };
}
