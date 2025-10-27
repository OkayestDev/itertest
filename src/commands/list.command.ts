import { Command } from "commander";
import * as fsUtils from "../utils/fs.utils";
import { Commands } from "../constants/enums";

export function list(program: Command) {
    return program
        .command(Commands.List)
        .description("List all tests")
        .action(() => {
            const tests = fsUtils.listTests();
            console.log(JSON.stringify(tests, null, 4));
        });
}
