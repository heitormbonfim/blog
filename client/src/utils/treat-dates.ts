export function turnDateIntoMonthAndDay(date: string) {
  const formattedDate = new Date(date)
    .toDateString()
    .split(" ")
    .map((item, idx) => {
      if (idx == 2) item += "th";
      if (idx > 0 && idx < 3) return item;
    })
    .join(" ");

  return formattedDate;
}
