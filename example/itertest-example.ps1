# Example of using itertest to generate a plotly.js html file from json files

# Create a new test
itertest select example-k6-test ./example/custom-config.ts

# Loop through files in the json-iterations directory
$files = Get-ChildItem -Path "./example/json-iterations" -Filter "*.json"

foreach ($file in $files) {
    Write-Output "Adding $file"
    $filePath = $file.FullName
    # Run the iteration test for each JSON file
    itertest add $filePath
}

# Generate the plotly.js html file
itertest generate