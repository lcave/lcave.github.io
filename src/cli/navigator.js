import FileNodeList from "../components/commands/FileNodeList";
import fileTree from "./file-tree.json";

const generateFileTreeObj = (stringArr, obj) => {
  if (stringArr.length > 1) {
    const currentString = stringArr.shift(0);
    obj[currentString] = generateFileTreeObj(stringArr);
  } else {
    const fileObj = {};
    fileObj[stringArr.shift()] = "file";
    return fileObj;
  }
  return obj;
};

const FILE_TREE = { root: {} };
fileTree.files.forEach((path) => {
  const splitPath = path.split("/");
  FILE_TREE["root"] = {
    ...FILE_TREE["root"],
    ...generateFileTreeObj(splitPath, {}),
  };
});

const navigateTo = (path) => {};

const pwd = () => {
  return localStorage.getItem("context") || "root";
};

const list = () => {
  const nodes = Object.keys(FILE_TREE[pwd()]).map((key) => {
    const val = FILE_TREE[pwd()][key];
    const type = typeof val === "string" ? "file" : "directory";
    return {
      type: type,
      name: key,
    };
  });

  return <FileNodeList nodes={nodes} />;
};

export { pwd, navigateTo, list };
