import fs from 'fs';
import path from 'path';

export function search(dir: string, extension: string) {
  const list = fs.readdirSync(dir);
  const paths = new Array<string>();
  list.forEach((file) => {
    const filePath = path.resolve(dir, file);
    const statResult = fs.statSync(filePath);
    if (statResult && statResult.isDirectory()) {
      paths.push(...search(filePath, extension));
    } else if (path.extname(filePath) === extension) {
      paths.push(filePath);
    }
  });
  return paths;
}