import { fuzzyMatchAll } from "../array.utils";

describe("array.utils", () => {
    describe("fuzzyMatchAll", () => {
        it("should fuzzy match all", () => {
            const res = fuzzyMatchAll(["iteration-1", "iteration-2", "iteration-3"], "iteration");
            expect(res).toEqual(["iteration-1", "iteration-2", "iteration-3"]);
            const res2 = fuzzyMatchAll(["iteration-1", "iteration-2", "iteration-3"], "1");
            expect(res2).toEqual(["iteration-1"]);
        });
    });
});
