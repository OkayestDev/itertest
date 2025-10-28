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

export function readPath(obj: Record<any, any>, path: string) {
    const pathParts = path.split(".");
    let current = obj;
    for (const part of pathParts) {
        current = current[part];
    }
    return current;
}
