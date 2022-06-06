const withPlugins = require("next-compose-plugins");
const withLess = require("next-with-less");
const path = require("path");

const plugins = [
    [
        withLess,
        {
            lessLoaderOptions: {
                lessOptions: {
                    modifyVars: {},
                },
            },
        },
    ],
];

module.exports = withPlugins(plugins, {
    webpack(config) {
        config.module.rules[3].oneOf.forEach((one) => {
            if (!`${one.issuer?.and}`.includes("_app")) return;
            one.issuer.and = [path.resolve(__dirname)];
        });
        return config;
    },
});
