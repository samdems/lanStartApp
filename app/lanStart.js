import { exec } from 'child_process';
import { fileURLToPath } from 'url';
import path from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const install = ({
  onProgress = () => {},
  onComplete = () => {},
  onError = () => {},
}) => {
  onProgress(0);
  // set permissions
  exec('chmod +x ' + __dirname + '/openttd', (err, stdout, stderr) => {
    onProgress(100);
    onComplete();
  });
}

export const start = () => {
  console.log('Starting game',__dirname + '/openttd');
  exec(__dirname + '/openttd', (err, stdout, stderr) => {
    if (err) {
      console.error(err);
      return;
    }
    console.log(stdout);
  })
}


