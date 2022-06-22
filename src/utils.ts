export function extractName(text: string) {
  return text
    .replace(/^((Mr|Mrs) *)\./, '$1_')
    .split(/\s*[.,:]/)[0]
    .replace('_', '.');
}

export function makeId(name: string) {
  return name.toLowerCase().replace(/[^a-z]+/g, '-');
}

export function guessSex(name: string) {
  if (name.match(/^(Mrs\.|Queen|Countess) /)) {
    return 'FEMALE';
  }
  if (name.match(/^(Mr\.|Sir|King|Earl) /)) {
    return 'MALE';
  }
  return undefined;
}
