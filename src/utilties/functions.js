export const runtimeFormatter = (minutes) => {
  const hours = Math.floor(minutes / 60);
  const remainingMinutes = minutes % 60;
  const formatedValue = `${hours}h ${remainingMinutes}m`;

  return formatedValue;
};

export const releaseDateFormatter = (date) => {
  const dateSplited = date.split("-");
  const year = dateSplited[0];

  return year;
};
