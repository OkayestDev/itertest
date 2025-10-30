import { Command } from "commander";
import { Commands } from "../constants/enums";
import * as fsUtils from "../utils/fs.utils";
import { requiredConfigRead } from "../utils/config.utils";
import { fuzzyMatchAll } from "../utils/array.utils";
import fs from "fs";

export function del(program: Command) {
    return program
        .command(`${Commands.Delete} <search>`)
        .description("Delete iteration(s) fuzzy matching provided string")
        .action((search) => {
            const config = requiredConfigRead();
            const iterations = fsUtils.listTestIterations(config.selectedTest);
            const matchingIterations = fuzzyMatchAll(iterations, search);
            matchingIterations.forEach((iteration) => {
                fs.unlinkSync(iteration);
            });
            console.log(`Deleted iterations`, matchingIterations);
        });
}
