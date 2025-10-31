import { getScalarPaths, readPath, hasAnyPathPart } from "../json.utils";

describe("json.utils", () => {
    describe("getScalarPaths", () => {
        it("should get scalar paths", () => {
            const obj = { a: 1, b: "string", c: { d: 5 } };
            const paths = getScalarPaths({}, {}, obj);
            expect(paths).toEqual(["a", "c.d"]);
        });

        it("should only add paths that are in the custom config", () => {
            const obj = { a: 1, b: "string", c: { d: 5, "p(99.99)": 10 }, e: 10 };
            const paths = getScalarPaths(
                {
                    a: { parser: (value: string | number) => Number(value) },
                    "c.d": { parser: (value: string | number) => Number(value) },
                    "p(99.99)": { parser: (value: string | number) => Number(value) },
                },
                { parseCustomConfigKeysOnly: true },
                obj,
            );
            expect(paths).toEqual(["a", "c.d", "c.p(99.99)"]);
        });
    });

    describe("hasAnyPathPart", () => {
        it("returns true if path is in object", () => {
            const result = hasAnyPathPart({ a: 1, b: "string", c: { d: 5 } }, "c.d");
            expect(result).toEqual(true);
        });

        it('works with keys that have "." in them', () => {
            const result = hasAnyPathPart({ a: { "p(99.99)": 1 } }, "p(99.99)");
            expect(result).toEqual(true);
        });
    });

    describe("readPath", () => {
        it("reads string path from object", () => {
            const result = readPath({ a: 1, b: "string", c: { d: 5 } }, "c.d");
            expect(result).toBe(5);
        });

        it("reads when no nested path is provided", () => {
            const result = readPath({ a: 1, b: "string", c: { d: 5 } }, "a");
            expect(result).toEqual(1);
        });

        it('works for keys with "." in them', () => {
            const result = readPath({ "p(99.99)": 1 }, "p(99.99)");
            expect(result).toBe(1);
        });

        it('works with nested keys that have "." in them', () => {
            const result = readPath({ parent: { "p(99.99)": 1 } }, "parent.p(99.99)");
            expect(result).toBe(1);
        });

        it('works with more nested "." keys', () => {
            const result = readPath(
                { parent: { "p(99.99)": { nested: { "p(99.99)": 1 } } } },
                "parent.p(99.99).nested.p(99.99)",
            );
            expect(result).toBe(1);
        });
    });
});
