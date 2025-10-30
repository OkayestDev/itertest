export function peek<T>(array: T[]): T {
    return array[array.length - 1];
}

export function fuzzyMatchAll(haystack: string[], needle: string): string[] {
    const normalizedNeedle = needle.trim().toLowerCase();
    return haystack.filter((item) => item.toLowerCase().includes(normalizedNeedle));
}
