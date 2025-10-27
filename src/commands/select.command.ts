import { Command } from "commander";
import { initializeTest, listTests, writeConfig } from "../utils/fs.utils";

export function select(program: Command) {
    return program
        .command("select <name>")
        .description("select or initialize a new iterative test")
        .action((name: string) => {
            const tests = listTests();
            if (!tests.includes(name)) {
                console.log(`Test "${name}" initialized`);
                initializeTest(name);
            } else {
                console.log(`Test "${name}" selected`);
            }
            writeConfig({ testName: name });
            console.log(
                `Begin iterative testing by running \`itertest run ${name} <path-to-json-file>\``,
            );
        });
}
