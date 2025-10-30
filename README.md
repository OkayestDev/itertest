# Itertest

cli tool to quickly build html charts using (Plotly.js)[https://plotly.com/javascript/] from json files

### Installation

`npm i itertest`

### Quickstart

Select or initialize a new test
```bash
    itertest select <test-name> [custom-config]
```

Add iterations to the test
```
    itertest add <path-to-json-file>
```

Graphs are generated after each add. Optionally you can regenerate the graph
```bash
    itertest generate
```

### Commands

- select `<test-name>` [custom-config-file-path]'
  > selects or initializes a new test
  - `<test-name>` name of test. Once selected, calls to `add` will add iterations to this test
  - [custom-config-file-path] optional js/ts file containing custom settings for keys in your test iteration json
    - Example:
      - Iteration json:
        ```json
        {
            "request-rate": "10/s"
        }       
        ```
      - Custom config
        ```ts
        export default {
            "request-rate": {
                // Parser MUST return a number
                parser: (value: string | number) => Number(value.split("/s")[0]),
                title: "Request Rate",
                graphType: "bar", // Plotlyjs data.type
                graphMode: "group", // Plotlyjs data.mode
            }
        }
        ```
- list
    > List all tests found in your itertest installation
- iterations
    > List iterations of the currently selected test
- config
    > Prints itertest's current config
- add `<path-to-iteration-json>`
    > Adds an iteration to the currently selected test
- generate
    > Generates plotly.js html file (path printed to console) of test iterations
- print `<search>`
    > Prints json data of all iterations matching search of the currently selected test
- delete `<search>`
    > Delete all iterations matching search of the currently selected test
- help
    > Prints itertest commands

### Example

- [JSON test iterations](./example/json-iterations)
- [Create & adding iterations](./example/itertest-example.ps1)
- [Resulting html file](./example/result.html)