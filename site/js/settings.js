const getSettings = () => {
  const settings = localStorage.getItem("settings");
  if (settings) {
    return settings;
  } else {
    return null;
  }
};
const getSettings = () => {
  const settings = localStorage.getItem("settings");
  if (settings) {
    return settings;
  } else {
    return null;
  }
};
const getProjectName = () => {
  const settings = getSettings();
  if (settings) {
    return settings.getProjectName;
  } else {
    return "Invalid Settings Data";
  }
};
const getVatPercentage = () => {
  const settings = getSettings();
  if (settings) {
    return settings.vatPercentage;
  } else {
    return "Invalid Settings Data";
  }
};
export { getSettings, getProjectName,getVatPercentage };
