import { TrafficManager } from "./models/traffic-manager";
import fs from 'fs';
import { EOL } from 'os';

const args = process.argv;
if (args.length < 3) {
    console.log('Syntax: npm start --silent <absolute_path_to_input_file>');
    process.exit(0);
}

const inputFile = args[2];
const fileContents = fs.readFileSync(inputFile, "utf-8");
if (!fileContents || fileContents.length === 0) {
    console.log('Input file not found or empty.');
    process.exit(0);   
}

const commands: string[] = fileContents.split(EOL);

for (let command of commands) {
    processCommand(command);
}

function processCommand(command: string) {
    const trafficManager = new TrafficManager();
    const commandTokens = splitCommandTokens(command);
    const result = trafficManager.getFastestOption(commandTokens[0], +commandTokens[1], +commandTokens[2]);
    console.log(result);
}
function splitCommandTokens(command: string)  {
    return command.split(' ');
}
