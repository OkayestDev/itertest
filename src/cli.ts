#!/usr/bin/env node
import { Command } from "commander";
import { init } from "./commands/init.command";
import { conditionallyInitializeTestDir } from "./utils/fs.utils";
import { run } from "./commands/run.command";

const program = new Command();

conditionallyInitializeTestDir();


const commands = [init, run];

program
    .name("itertest")
    .description("Compare JSON schema changes for improvements or regressions")
    .version("1.0.0");

commands.forEach((command) => command(program));

// program
//     .command("compare <oldSchemaPath> <newSchemaPath>")
//     .description("Compare two JSON schema files and print differences")
//     .option("-o, --output <path>", "Output result as JSON to a file")
//     .action((oldSchemaPath, newSchemaPath, options) => {
//         const oldSchema = JSON.parse(
//             fs.readFileSync(path.resolve(oldSchemaPath), "utf-8"),
//         );
//         const newSchema = JSON.parse(
//             fs.readFileSync(path.resolve(newSchemaPath), "utf-8"),
//         );

//         const result = compareSchemas(oldSchema, newSchema);

//         if (options.output) {
//             fs.writeFileSync(options.output, JSON.stringify(result, null, 2));
//             console.log(`✅ Results written to ${options.output}`);
//         } else {
//             console.log(JSON.stringify(result, null, 2));
//         }
//     });

program.parse(process.argv);
