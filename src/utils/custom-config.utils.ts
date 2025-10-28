import { Config } from "../types/config.type";
import path from "path";
import fs from "fs";
import { CustomConfig } from "../types/custom-config.type";

export function resolveCustomConfig(config: Partial<Config>): CustomConfig {
    if (config.customConfigFile) {
        if (!fs.existsSync(config.customConfigFile)) {
            throw new Error(`Custom config file "${config.customConfigFile}" not found`);
        }
        return require(path.resolve(config.customConfigFile)).default as CustomConfig;
    }
    return {};
}

export function resolveGraphType(customConfig: CustomConfig, key: string) {
    return customConfig?.[key]?.graphType || "scatter";
}

export function resolveGraphMode(customConfig: CustomConfig, key: string) {
    return customConfig?.[key]?.graphMode || "lines+markers";
}

export function resolveGraphTitle(customConfig: CustomConfig, key: string) {
    return customConfig?.[key]?.title || key;
}
