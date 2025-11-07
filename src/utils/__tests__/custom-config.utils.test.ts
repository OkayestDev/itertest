import { generateRandomColor } from "../custom-config.utils";

describe("custom-config.utils", () => {
    describe("generateRandomColor", () => {
        it("should generate a random color", () => {
            const color = generateRandomColor();
            expect(color).toBeDefined();
            expect(color).toMatch(/^#([0-9a-fA-F]{6})$/);
        });
    });
});
