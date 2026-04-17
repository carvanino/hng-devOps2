export default {
    apps: [
        {
            name: "personal-api",
            script: "server.js",
            env: {
                PORT: 3000,
            },
            watch: false,
        },
    ],
};
