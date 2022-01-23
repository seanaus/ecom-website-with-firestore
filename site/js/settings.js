"use strict"
const getSettings = () => {
  const settings = JSON.parse(localStorage.getItem("settings"));
  if (settings) {
    return settings;
  } else {
    return null;
  }
};
const projectName = () => {
  const settings = getSettings();
  if (settings) {
    return settings.getProjectName;
  } else {
    return "Invalid Settings Data";
  }
};
const profitMetricPercentage = () => {
  const settings = getSettings();
  if (settings) {
    return parseInt(settings.profitMetricPercentage);
  } else {
    return parseInt("20");
  }
};
export { getSettings, projectName,profitMetricPercentage };
