import childProcess from 'child_process'

function execSync (cmd) {
  let stdout
  let status = 0

  try {
    stdout = childProcess.execSync(cmd)
  } catch (err) {
    stdout = err.stdout
    status = err.status
  }

  return {
    stdout: stdout.toString(),
    status
  }
}

export default execSync
