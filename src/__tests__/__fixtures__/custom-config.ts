import { CustomConfig } from "../../types/custom-config.type";

export default {
    requests: {
        parser: (value: string | number) => Number(value),
        title: "Requests",
        graphType: "bar",
        // graphMode: "group",
    },
    "request-rate": {
        parser: (value: string) => Number(value.split("/s")[0]),
    },
} as CustomConfig;
