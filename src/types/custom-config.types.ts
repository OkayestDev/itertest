type KeyOptions = {
    parser: (value: string | number) => string | number;
    title: string;
    graphType: string;
    graphMode: string;
};

export type CustomConfig = {
    [key: string]: Partial<KeyOptions>;
};

export type CustomConfigOptions = {
    parseCustomConfigKeysOnly?: boolean;
};
