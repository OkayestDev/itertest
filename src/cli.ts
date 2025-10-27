#!/usr/bin/env node
import { Command } from "commander";
import { select } from "./commands/select.command";
import { conditionallyInitializeTestDir } from "./utils/fs.utils";
import { add } from "./commands/add.command";
import { list } from "./commands/list.command";
import { config } from "./commands/config.command";
import { generate } from "./commands/generate.command";
import { PROGRAM_NAME } from "./constants/constants";

export const program = new Command()
    .name(PROGRAM_NAME)
    .description("Compare JSON schema changes for improvements or regressions")
    .version("1.0.0");

conditionallyInitializeTestDir();

const commands = [select, add, list, config, generate];

commands.forEach((command) => command(program));

if (require.main === module) {
    program.parse(process.argv);
}
