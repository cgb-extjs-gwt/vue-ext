import config from "@softvisio/vue/resources/webpack/firebase.worker.config.js";

config.get( "firebaseWorker" ).wrap( ( config, options ) => {
    config.resolve.alias = {
        ...config.resolve.alias,
        "#vue": "@softvisio/vue-ext",
    };

    return config;
} );

export default config;
