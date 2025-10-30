import { CustomConfig } from "../types/custom-config.type";

export function getScalarPaths(
    customConfig: CustomConfig,
    obj: Record<any, any>,
    parentKey = "",
): string[] {
    const paths = [];

    for (const key in obj) {
        if (!obj.hasOwnProperty(key)) continue;

        const value = obj[key];
        const fullPath = parentKey ? `${parentKey}.${key}` : key;

        if (typeof value === "number" || customConfig?.[key]?.parser) {
            paths.push(fullPath);
            continue;
        }

        if (typeof value === "object" && !Array.isArray(value)) {
            paths.push(...getScalarPaths(customConfig, value, fullPath));
        }
    }

    return paths;
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
