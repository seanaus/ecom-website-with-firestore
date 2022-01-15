"use strict"
const getSettings = () => {
  const settings = JSON.parse(localStorage.getItem("settings"));
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
    return parseInt(settings.vatPercentage);
  } else {
    return parseInt("20");
  }
};
export { getSettings, getProjectName,getVatPercentage };
