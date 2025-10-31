import { CustomConfig, CustomConfigOptions } from "../types/custom-config.types";
import { resolveParseCustomConfigKeysOnly } from "./custom-config.utils";

export function getScalarPaths(
    customConfig: CustomConfig,
    customConfigOptions: CustomConfigOptions,
    obj: Record<any, any>,
    parentKey = "",
): string[] {
    const paths = [];

    for (const key in obj) {
        if (!obj.hasOwnProperty(key)) continue;

        const value = obj[key];
        const fullPath = parentKey ? `${parentKey}.${key}` : key;
        const isNumber = typeof value === "number";
        const hasParser = customConfig?.[key]?.parser;
        const parseCustomConfigKeysOnly = resolveParseCustomConfigKeysOnly(customConfigOptions);
        const allowedToAdd = parseCustomConfigKeysOnly
            ? hasAnyPathPart(customConfig, fullPath)
            : true;

        if ((isNumber || hasParser) && allowedToAdd) {
            paths.push(fullPath);
            continue;
        }

        if (typeof value === "object" && !Array.isArray(value)) {
            paths.push(...getScalarPaths(customConfig, customConfigOptions, value, fullPath));
        }
    }

    return paths;
}

export function hasAnyPathPart(obj: Record<string, any>, path: string): boolean {
    if (obj == null || typeof obj !== "object") {
        return false;
    }

    const parts = path
        .split(".")
        .map((p) => p.trim())
        .filter(Boolean);

    for (let i = parts.length - 1; i >= 0; i--) {
        const subPath = parts.slice(i).join(".");

        if (Object.prototype.hasOwnProperty.call(obj, subPath)) {
            return true;
        }
    }

    for (const key in obj) {
        const val = obj[key];
        if (val && typeof val === "object") {
            const res = hasAnyPathPart(val, path);
            if (res) {
                return res;
            }
        }
    }

    return false;
}

export function readPath(obj: Record<string, any>, path: string): any {
    if (obj == null || typeof obj !== "object" || !path) {
        return undefined;
    }

    const parts = path.split(".");
    let current: any = obj;

    for (let i = 0; i < parts.length; i++) {
        // If current level isn't an object, stop
        if (current == null || typeof current !== "object") {
            return undefined;
        }

        // Try to find the longest possible key match
        let key = parts[i];
        let j = i;

        // Expand the key to include dots if necessary
        while (j + 1 < parts.length && !(key in current) && `${key}.${parts[j + 1]}` in current) {
            key = `${key}.${parts[j + 1]}`;
            j++;
        }

        current = current[key];
        i = j;
    }

    return current;
}
