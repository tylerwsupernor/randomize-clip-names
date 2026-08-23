import { randomInt } from "node:crypto";

import { ATMOSPHERES, DESCRIPTORS, OBJECTS } from "./word-banks.js";

const MAX_DUPLICATE_ATTEMPTS = 25;

function pick(words: string[]): string {
  return words[randomInt(words.length)]!;
}

export function randomClipName(usedNames: Set<string>): string {
  let name: string;
  let attempts = 0;
  do {
    name = `${pick(DESCRIPTORS)} ${pick(OBJECTS)} ${pick(ATMOSPHERES)}`;
    attempts++;
  } while (usedNames.has(name) && attempts < MAX_DUPLICATE_ATTEMPTS);
  usedNames.add(name);
  return name;
}
