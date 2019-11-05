export function Capitalize(value: string) {
  return (!!value) ? value.charAt(0).toUpperCase() + value.substr(1).toLowerCase() : '';
}

export function TitleCase(value: string) {
  return value.replace(/\w\S*/g, (txt) => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase());
}

export function UpperCase(value: string) {
  return value.toUpperCase();
}

export function LowerCase(value: string) {
  return value.toLowerCase();
}
