// Decides whether the site is due a release: the daily slot (midnight IST, see scripts/slots.mjs) has passed since the last build.
// Prints due=true or due=false for the workflow.
import fs from 'node:fs';

const stampFile = 'src/data/build-stamp.txt';
const now = Date.now();
const last = fs.existsSync(stampFile) ? Date.parse(fs.readFileSync(stampFile, 'utf8').trim()) : 0;

// One clock: a release is due when a slot (see scripts/slots.mjs) has passed since the last build. Nothing else triggers one.
import { slotNumber } from './slots.mjs';
const due = slotNumber(now) > slotNumber(last);
const why = due ? 'a release slot has passed' : 'nothing due';
console.log(why);
console.log(`due=${due}`);
