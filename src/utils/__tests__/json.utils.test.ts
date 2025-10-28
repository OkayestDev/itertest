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
    });
});
