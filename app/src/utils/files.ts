import fs from 'fs';
import path from 'path';

export function search(dir: string, extension: string) {
  const list = fs.readdirSync(dir);
  list.forEach((file) => {
    const filePath = path.resolve(dir, file);
    const statResult = fs.statSync(filePath);
    if (statResult && statResult.isDirectory()) {
      search(filePath, extension);
    } else if (path.extname(filePath) === extension) {
      console.log(filePath)
      return filePath;
    }
  });
}