export function setNameFormat(string: string) {
  let name = string;
  return name.slice(0, 1).toUpperCase() + name.slice(1).toLowerCase();
}

export function setNameIdFormat(string: string) {
  let name = string;
  return name.toLowerCase().split(" ").join("-");
}
