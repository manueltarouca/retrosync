import fs from 'fs';
import path from 'path';

export interface FileData {
  name: string;
  path: string;
}

export function search(dir: string, extension: string) {
  const list = fs.readdirSync(dir);
  const paths = new Array<FileData>();
  list.forEach((file) => {
    const filePath = path.resolve(dir, file);
    const statResult = fs.statSync(filePath);
    if (statResult && statResult.isDirectory()) {
      paths.push(...search(filePath, extension));
    } else if (path.extname(filePath) === extension) {
      const baseName = path.basename(filePath);
      paths.push({ path: filePath, name: baseName });
    }
  });
  return paths;
}