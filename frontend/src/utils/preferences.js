export const savePreferences = (key, preferences) => {
  localStorage.setItem(key, JSON.stringify(preferences));
};

export const loadPreferences = (key, defaultPreferences) => {
  const savedPreferences = localStorage.getItem(key);
  return savedPreferences ? JSON.parse(savedPreferences) : defaultPreferences;
};
