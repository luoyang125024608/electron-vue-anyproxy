import execSync from './exec-sync'

let networkType = null

function getNetworkType () {
  if (networkType) {
    return networkType
  }

  const networkTypes = [
    'Ethernet',
    'Thunderbolt Ethernet',
    'Wi-Fi'
  ]

  for (let type of networkTypes) {
    const result = execSync(`networksetup -getwebproxy ${type}`)

    if (result.status === 0) {
      networkType = type
      return networkType
    }
  }

  throw new Error('Unknown network type')
}

function getProxyState () {
  const netType = getNetworkType()

  return execSync(`networksetup -getwebproxy ${netType}`)
}

function enable (hostname, port, protocol = 'http') {
  const netType = getNetworkType()
  const parameter = protocol === 'https'
    ? 'setsecurewebproxy'
    : 'setwebproxy'

  return execSync(`networksetup -${parameter} ${netType} ${hostname} ${port}`)
}

function disable (proxyType = 'http') {
  const netType = getNetworkType()
  const parameter = proxyType === 'https'
    ? 'setsecurewebproxystate'
    : 'setwebproxystate'
  return execSync(`networksetup -${parameter} ${netType} off`)
}

export default {
  enable,
  disable,
  status: getProxyState
}
