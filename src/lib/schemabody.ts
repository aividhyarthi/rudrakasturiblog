// Plain text of a page for the schema articleBody and wordCount fields.
import { plainBody } from './ist';
export const joinText = (...parts: unknown[]) => plainBody(parts.flat(Infinity).filter(Boolean).map(String).join(' '));
