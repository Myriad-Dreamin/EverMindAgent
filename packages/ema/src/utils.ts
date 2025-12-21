export const md = (strings: TemplateStringsArray, ...interp: any[]) => {
  const result = [];
  for (let i = 0; i < strings.length; i++) {
    result.push(strings[i]);
    if (interp[i]) {
      result.push(interp[i].toString());
    }
  }
  return result.join("");
};
