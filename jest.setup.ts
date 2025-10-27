jest.mock("./src/constants/constants", () => ({
    TEST_DIR: "./src/__jest-iterations",
    CONFIG_FILE: "./src/__jest-iterations/itertest.config.json",
}));
