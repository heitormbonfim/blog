export function setNameFormat(string: string) {
  let name = string;
  name = name.slice(0, 1).toUpperCase() + name.slice(1).toLowerCase();
  return name;
}
