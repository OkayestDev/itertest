import { Command } from "commander";
import { requiredConfigRead } from "../utils/config.utils";
import * as fsUtils from "../utils/fs.utils";
import { Commands } from "../constants/enums";

function iterationsController() {
    const config = requiredConfigRead();
    const iterations = fsUtils.listTestIterations(config.selectedTest);
    console.log(JSON.stringify(iterations, null, 4));
}

export function iterations(program: Command) {
    return program
        .command(Commands.Iterations)
        .description("List iterations of currently selected test")
        .action(iterationsController);
}
