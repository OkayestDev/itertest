import { Config } from "../types/config.types";
import path from "path";
import fs from "fs";
import { CustomConfig, CustomConfigOptions } from "../types/custom-config.types";
import { readPath } from "./json.utils";

export function resolveCustomConfig(config: Partial<Config>): {
    customConfig: CustomConfig;
    options: CustomConfigOptions;
} {
    if (config.customConfigFile) {
        if (!fs.existsSync(config.customConfigFile)) {
            throw new Error(`Custom config file "${config.customConfigFile}" not found`);
        }
        const req = require(path.resolve(config.customConfigFile));
        return {
            customConfig:
                (require(path.resolve(config.customConfigFile)).default as CustomConfig) || {},
            options: req.options || {},
        };
    }
    return { customConfig: {}, options: {} };
}

export function generateRandomColor() {
    const letters = "0123456789ABCDEF";
    let color = "#";
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

export function customParse(customConfig: CustomConfig, key: string, value: any) {
    const res = readPath(customConfig, key);
    return res?.parser ? res.parser(value) : value;
}
export function resolveGraphType(customConfig: CustomConfig, key: string) {
    const res = readPath(customConfig, key);
    return res?.graphType || "scatter";
}

export function resolveGraphMode(customConfig: CustomConfig, key: string) {
    const res = readPath(customConfig, key);
    return res?.graphMode || "lines+markers";
}

export function resolveGraphTitle(customConfig: CustomConfig, key: string) {
    const res = readPath(customConfig, key);
    return res?.title || key;
}

export function resolveParseCustomConfigKeysOnly(customConfigOptions: CustomConfigOptions) {
    return customConfigOptions?.parseCustomConfigKeysOnly || false;
}

export function resolveGraphColors(customConfig: CustomConfig, key: string) {
    const res = readPath(customConfig, key);
    return res?.graphColor || generateRandomColor();
}
