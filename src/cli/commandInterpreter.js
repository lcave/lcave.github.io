import * as ReactDOMServer from "react-dom/server";
import { list } from "./navigator";

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

export { executeCommand, getCommandHistory, pushCommandToHistory };

const COMMANDS = {
  clear() {
    localStorage.setItem("commandHistory", null);
  },
  ls() {
    return list();
  },
};

const interpretCommand = (commandString) => {
  if (typeof COMMANDS[commandString] === "function") {
    const result = COMMANDS[commandString]();
    if (result) pushCommandToHistory(commandString, renderResult(result));
  } else {
    pushCommandToHistory("command not found: " + commandString, null);
  }
};

const renderResult = (component) => {
  return ReactDOMServer.renderToString(component);
};
