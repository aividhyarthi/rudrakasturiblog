import fs from 'node:fs';
import path from 'node:path';
// Use a photo/picture the founder dropped into public/images/heroes/ if there is one, else our own drawing.
export function heroSrc(name: string): string {
  for (const ext of ['jpg', 'jpeg', 'webp', 'png']) {
    if (fs.existsSync(path.resolve('public/images/heroes', `${name}.${ext}`))) return `/images/heroes/${name}.${ext}`;
  }
  return `/heroes/${name}.svg`;
}
