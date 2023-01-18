"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.search = void 0;
const fs = require("fs");
const path = require("path");
function search(dir, extension) {
    const list = fs.readdirSync(dir);
    const paths = new Array();
    list.forEach((file) => {
        const filePath = path.resolve(dir, file);
        const statResult = fs.statSync(filePath);
        if (statResult && statResult.isDirectory()) {
            paths.push(...search(filePath, extension));
        }
        else if (path.extname(filePath) === extension) {
            const baseName = path.basename(filePath);
            paths.push({ path: filePath, name: baseName });
        }
    });
    return paths;
}
exports.search = search;
//# sourceMappingURL=file.js.map