import os from "os";
import path from "path";

export const TEST_DIR = path.join(os.homedir(), `itertest`);

export const CONFIG_FILE = path.join(TEST_DIR, "itertest.config.json");

export const PROGRAM_NAME = "itertest";
