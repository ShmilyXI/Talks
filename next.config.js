const withPlugins = require("next-compose-plugins");
const withLess = require("next-with-less");
const withCss = require("@zeit/next-css");

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

module.exports = withPlugins(plugins, {});
