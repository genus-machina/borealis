import fs from 'fs';
import path from 'path';

const manifest = path.join(__dirname, '..', 'package.json');
const content = fs.readFileSync(manifest, {encoding: 'utf8'});
export default JSON.parse(content);
