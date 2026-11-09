// Every festival's full page text, merged in one place. Add a festival's text to one of the files below and its page upgrades by itself.
import { FEST_CONTENT } from './festival-content';
import { FEST_KARTHIKA } from './festival-content-karthika';
import { FEST_WINTER } from './festival-content-winter';
import { FEST_SUMMER } from './festival-content-summer';
import { FEST_AUTUMN } from './festival-content-autumn';
export const FEST_ALL = { ...FEST_CONTENT, ...FEST_KARTHIKA, ...FEST_WINTER, ...FEST_SUMMER, ...FEST_AUTUMN };
