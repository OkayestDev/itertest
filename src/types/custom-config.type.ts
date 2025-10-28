type KeyOptions = {
    parser: (value: string | number) => string | number;
    title: string;
    graphType: string; // plotly js
    graphMode: string;
}

export type CustomConfig = {
    [key: string]: Partial<KeyOptions>;
};