import { exec } from 'child_process'

export default defineEventHandler(async () => {
    return new Promise((resolve, reject) => {
        exec('npm run dev', { cwd: '/pad/naar/jouw/project' }, (error, stdout, stderr) => {
            if (error) {
                reject({ error: stderr })
                return
            }
            resolve({ output: stdout })
        })
    })
})
