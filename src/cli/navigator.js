import FileNodeList from "../components/commands/FileNodeList";

const navigateTo = (path) => {};

const pwd = () => {
  return localStorage.getItem("context") || "~";
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

const FILE_TREE = {
  "~": {
    blog: {
      "blog-post.md": "blog post",
    },
    "README.md": "The readme",
  },
};
