import { readdir } from 'fs';
import path from 'path';
import { promisify } from 'util';
import nanoexpress from '../src/nanoexpress.js';

const fsReadDir = promisify(readdir);

const app = nanoexpress();
const port = 4000;

// list the files of `storage/media` directory
app.get('/', async () => {
  try {
    const files = await fsReadDir(path.resolve('static'));
    return { error: false, files };
  } catch (err) {
    return { error: true };
  }
});

// start server
(async () => {
  try {
    await app.listen(port, '0.0.0.0');
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error(err);
  }
})();
