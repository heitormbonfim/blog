export function mergeClasses(
  defaultClass: string,
  customClass?: string,
  { force }: { force: boolean } = { force: false }
) {
  if (customClass && force) {
    let classes = customClass
      .split(" ")
      .map((item) => {
        return "!" + item;
      })
      .join(" ");

    return defaultClass.concat(" ", classes);
  } else if (customClass) {
    return defaultClass.concat(" ", customClass);
  }

  return defaultClass;
}
