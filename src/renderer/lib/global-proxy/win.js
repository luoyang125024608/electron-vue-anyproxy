import execSync from './exec-sync'

const REG_PATH = `reg add "HKCU\\Software\\Microsoft\\Windows\\CurrentVersion
\\Internet Settings" /v`

function enable (hostname, port) {
  return execSync(
    // set proxy
    `${REG_PATH} ProxyServer /t REG_SZ /d ${hostname}:${port} /f & ` +
    // enable proxy
    `${REG_PATH} ProxyEnable /t REG_DWORD /d 1 /f`)
}

function disable () {
  return execSync(`${REG_PATH} /v ProxyEnable /t REG_DWORD /d 0 /f`)
}

function status () {}

export default {
  status,
  enable,
  disable
}
