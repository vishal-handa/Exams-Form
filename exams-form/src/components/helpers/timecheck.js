export const timeDurationCheck = (date, start, end) => {
  let startTimeMilli = Date.parse(new Date(date + "T" + start + ":00" + "Z"));
  let endTimeMilli = Date.parse(new Date(date + "T" + end + ":00" + "Z"));

  if (endTimeMilli >= startTimeMilli) {
    return true;
  } else {
    return false;
  }
};
