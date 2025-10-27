import fs from "fs";
import * as fsUtils from "./fs.utils";
import { getScalarPaths, readPath } from "./json.utils";
import { peek } from "./array.utils";

const PLOTLY_VERSION = "3.1.2";

const GRAPH_TEMPLATE = `<div id="{{id}}"></div>
    <script>
      Plotly.newPlot(
        document.getElementById('{{id}}'), 
        [{{data}}], 
        {{layout}}
      );
    </script>`;

const HTML_TEMPLATE = `<html>
  <head>
    <script src="https://cdn.plot.ly/plotly-${PLOTLY_VERSION}.min.js"></script>
  </head>
  <body>
    {{graphTemplates}}
  </body>
</html>`;

export function renderGraphs(scalarPaths: string[], iterations: string[]): string[] {
    const graphs: string[] = [];
    const data: Record<string, any> = {};

    for (const scalar of scalarPaths) {
        if (!data[scalar]) {
            data[scalar] = [];
        }

        for (const iteration of iterations) {
            const value = readPath(JSON.parse(fs.readFileSync(iteration, "utf-8")), scalar);
            data[scalar].push(value);
        }
    }

    for (const scalar in data) {
        const constructedData = data[scalar].reduce(
            (acc: { x: number[]; y: number[] }, value: number, index: number) => ({
                ...acc,
                x: [...acc.x, index],
                y: [...acc.y, value],
            }),
            {
                x: [],
                y: [],
                // TODO somehow pull these from a config file
                type: "scatter", // line graph
                mode: "lines+markers",
                name: peek(scalar.split(".")),
            },
        );

        graphs.push(
            GRAPH_TEMPLATE.replaceAll("{{id}}", scalar)
                .replaceAll("{{data}}", JSON.stringify(constructedData))
                .replaceAll(
                    "{{layout}}",
                    JSON.stringify({
                        title: {
                            text: peek(scalar.split(".")),
                        },
                    }),
                ),
        );
    }

    return graphs;
}

export const generateGraph = (testName: string): string | undefined => {
    const iterations = fsUtils.listTestIterations(testName);

    if (iterations.length < 2) {
        console.log("At least 2 iterations are required to generate a graph");
        return undefined;
    }

    const iteration1Data = JSON.parse(fs.readFileSync(iterations[0], "utf-8"));
    const scalarPaths = getScalarPaths(iteration1Data);
    const graphs = renderGraphs(scalarPaths, iterations);
    const html = HTML_TEMPLATE.replace("{{graphTemplates}}", graphs.join("\n"));
    return fsUtils.writeTestResults(testName, html);
};
