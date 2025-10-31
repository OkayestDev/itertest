module.exports = {
    default: {
        metrics: {
            "p(99.99)": {
                title: "Metrics p99.99",
            },
        },
        "request-rate": {
            parser: (value) => Number(value.split("/s")[0]),
            title: "Requests",
            graphType: "bar",
        },
    },
    options: {
        parseCustomConfigKeysOnly: true,
    },
};
