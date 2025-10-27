import fs from "fs";
import * as fsUtils from "./fs.utils";

const data = [
    {
        x: ["Jan", "Feb", "Mar", "Apr"],
        y: [10, 20, 15, 25],
        type: "scatter", // line graph
        mode: "lines+markers",
        name: "Sales",
    },
];

const layout = { title: "Monthly Sales" };

const HTML_TEMPLATE = `
<html>
  <head>
    <script src="https://cdn.plot.ly/plotly-latest.min.js"></script>
  </head>
  <body>
    <div id="plotly-line"></div>
    <script>
      const data = {{data}};
      const layout = {{layout}};
      Plotly.newPlot('plotly-line', data, layout);
    </script>
  </body>
</html>
`;

export const generateGraph = (testName: string): string => {
    const html = HTML_TEMPLATE.replace("{{data}}", JSON.stringify(data)).replace(
        "{{layout}}",
        JSON.stringify(layout),
    );
    return fsUtils.writeTestResults(testName, html);
};
