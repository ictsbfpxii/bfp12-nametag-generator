export const getSavedValue = (key: string, defaultValue: string) => {
  return localStorage.getItem(`draft_${key}`) || defaultValue;
};
