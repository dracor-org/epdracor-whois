export function extractName(text: string) {
  return text
    .replace(/^((Mr|Mrs) *)\./, '$1_')
    .split(/\s*[.,:]/)[0]
    .replace('_', '.');
}

export function stripEpId(id: string) {
  return id.replace(/^[A-Z][0-9]+(_[0-9]+)?-/, '');
}

export function capitalize(word: string): string {
  return word[0].toUpperCase() + word.toLowerCase().slice(1);
}

export function idToName(id: string): string {
  return stripEpId(id)
    .split(/[-_]/)
    .map((word) => capitalize(word))
    .join(' ');
}

export function makeId(name: string) {
  return name
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^([0-9])/, '_$1')
    .replace(/(^-|-$)/g, '');
}

export function guessSex(name: string) {
  if (name.match(/^(Mrs\.?|Queen|Countess) /i)) {
    return 'FEMALE';
  }
  if (name.match(/^(Mr\.?|Sir|King|Earl) /i)) {
    return 'MALE';
  }
  return undefined;
}

export function makeEpUrl(playId: string, pb?: string): string {
  let url = `https://texts.earlyprint.org/works/${playId}.xml`;
  if (pb) {
    const page = pb?.replace(/^[^-]+-/, '');
    url += `?page=${page}`;
  }
  return url;
}
