const ALLOWED_KEYS = ["theme"];

const getUserPrefs = () => {
  return (
    JSON.parse(localStorage.getItem("userPreferences")) || { theme: "paper" }
  );
};

const updateKey = (key, val) => {
  if (!ALLOWED_KEYS.includes(key.toLowerCase())) return `'${key}' not found`;
  const prefs = getUserPrefs();
  prefs[key.toLowerCase()] = val;

  localStorage.setItem("userPreferences", JSON.stringify(prefs));

  return `${key} updated`;
};

export { getUserPrefs, updateKey };
