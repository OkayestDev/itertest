export function getScalarPaths(obj: Record<any, any>, parentKey = ""): string[] {
    const paths = [];

    for (const key in obj) {
        if (!obj.hasOwnProperty(key)) continue;

        const value = obj[key];
        const fullPath = parentKey ? `${parentKey}.${key}` : key;

        if (typeof value === "number") {
            paths.push(fullPath);
        } else if (typeof value === "object" && !Array.isArray(value)) {
            paths.push(...getScalarPaths(value, fullPath));
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
