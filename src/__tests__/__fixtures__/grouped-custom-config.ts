import { CustomConfig } from "../../types/custom-config.types";

export default {
    requests: {
        parser: (value: string | number) => Number(value),
        groupName: "Req",
    },
    "request-rate": {
        parser: (value: string) => Number(value.split("/s")[0]),
        groupName: "Req",
    },
} as CustomConfig;
