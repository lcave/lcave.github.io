import * as ReactDOMServer from "react-dom/server";
import TestCommand from "../components/commands/TestCommand";

const executeCommand = (commandString) => {
  if (!commandString) return getCommandHistory();

  interpretCommand(commandString);
  return getCommandHistory();
};

const pushCommandToHistory = (command, result) => {
  localStorage.setItem(
    "commandHistory",
    JSON.stringify([
      ...getCommandHistory(),
      { commandString: command, result: result },
    ])
  );
};

const getCommandHistory = () => {
  return JSON.parse(localStorage.getItem("commandHistory")) || [];
};

export { executeCommand, getCommandHistory };

const COMMANDS = {
  clear() {
    localStorage.setItem("commandHistory", null);
  },
};

const interpretCommand = (commandString) => {
  typeof COMMANDS[commandString] === "function"
    ? COMMANDS[commandString]()
    : pushCommandToHistory("command not found: " + commandString, null);
};

const renderResult = (component) => {
  return ReactDOMServer.renderToString(component);
};
