import { Command } from "commander";
import { Commands } from "../constants/enums";
import { requiredConfigRead } from "../utils/config.utils";
import * as fsUtils from "../utils/fs.utils";
import { fuzzyMatchAll } from "../utils/array.utils";
import path from "path";
import fs from "fs";

export function print(program: Command) {
    return program
        .command(`${Commands.Print} [search]`)
        .description("Print iteration(s) fuzzy matching provided string")
        .action((search) => {
            const config = requiredConfigRead();
            const iterations = fsUtils.listTestIterations(config.selectedTest);
            const matchingIterations = search ? fuzzyMatchAll(iterations, search) : iterations;
            matchingIterations.forEach((iteration) => {
                const jsonData = JSON.parse(fs.readFileSync(iteration, "utf8"));
                const name = path.basename(iteration);
                console.log({ [name]: jsonData });
            });
        });
}
