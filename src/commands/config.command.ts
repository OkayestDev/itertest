import { Command } from "commander";
import * as fsUtils from "../utils/fs.utils";
import { Commands } from "../constants/enums";

export function config(program: Command) {
    return program
        .command(Commands.Config)
        .description("Prints itertest config")
        .action(() => {
            const config = fsUtils.readConfig();
            console.log(JSON.stringify(config, null, 4));
        });
}
