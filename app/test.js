import { exec } from 'child_process';
import { fileURLToPath } from 'url';
import path from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


const execPromise = (command) => new Promise((resolve, reject) => {
  exec(command, (error, stdout, stderr) => {
    if (error) {
      reject(error)
    } else {
      resolve(stdout)
    }
  }
})

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms))

export const async install = (progress) =>{
  progress('installing', 0)
  await sleep(1000)
  progress('installing', 50)
  await sleep(1000)
  progress('installed', 100)
  return await execPromise('chmod +x ' + __dirname + '/openttd')

}

export const uninstall = (progress) =>{
    
}


export const actions = {
    play: (progress) => {
        await execPromise(__dirname + '/openttd')
    }
}

