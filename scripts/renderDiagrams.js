const fs = require("fs");
const path = require("path");
const { execSync } = require("child_process");

const inputFolder = "diagrams";
const outputFolder = "renderedDiagrams";

fs.readdir(inputFolder, (err, files) => {
    if (err) {
        console.error("Error reading directory:", err);
        return;
    }

    files.forEach((file) => {
        if (file.endsWith(".hyl")) {
            const inputFilePath = path.join(inputFolder, file);
            const outputFileName = file.replace(/\.hyl$/, ".svg");
            const outputFilePath = path.join(outputFolder, outputFileName);

            const command = `npx @hylimo/cli -f ${inputFilePath} -o ${outputFilePath}`;
            execSync(command, { stdio: "inherit" });

            const darkOutputFileName = file.replace(/\.hyl$/, "-dark.svg");
            const darkOutputFilePath = path.join(outputFolder, darkOutputFileName);

            const darkCommand = `npx @hylimo/cli -f ${inputFilePath} -o ${darkOutputFilePath} --dark`;
            execSync(darkCommand, { stdio: "inherit" });

            console.log(`Rendered ${file} to ${outputFileName} and ${darkOutputFileName}`);
        }
    });
});
