export default {
    API: "http://127.0.0.1:3000",
    axios: {
        timeout: 5000,
    },
    jwtaxios: {
        timeout: 5000,
        headers: { Authorization: `Bearer ` },
    },
};
