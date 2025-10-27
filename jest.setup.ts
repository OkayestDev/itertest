jest.mock("./src/constants/constants", () => ({
    TEST_DIR: `${__dirname}/src/__jest-iterations`,
    CONFIG_FILE: `${__dirname}/src/__jest-iterations/itertest.config.json`,
    PROGRAM_NAME: "itertest",
}));
