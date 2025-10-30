import { getScalarPaths, readPath } from "../json.utils";

describe("json.utils", () => {
    describe("getScalarPaths", () => {
        it("should get scalar paths", () => {
            const obj = { a: 1, b: "string", c: { d: 5 } };
            const paths = getScalarPaths({}, obj);
            expect(paths).toEqual(["a", "c.d"]);
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
