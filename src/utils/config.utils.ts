import { PROGRAM_NAME } from "../constants/constants";
import { Commands } from "../constants/enums";
import { Config } from "../types/config.type";
import * as fsUtils from "./fs.utils";

export function requiredConfigRead(): Config | never {
    const config = fsUtils.readConfig();
    if (!config.selectedTest) {
        throw new Error(
            `Test name is not set. Initiate/select a test with \`${PROGRAM_NAME} ${Commands.Select} <test-name>\``,
        );
    }
    return config as Config;
}
