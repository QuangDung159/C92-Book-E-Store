export const getCurrentDateYYMMDD = () => {
  const todayDate = new Date().toISOString().slice(2, 10);
  return todayDate.split('-').join('');
};
