import mac from './mac'
import win from './win'

const agent = /^win/.test(process.platform) ? win : mac

function execute (fn, ...args) {
  return new Promise((resolve, reject) => {
    let ret = agent[fn](...args)

    if (ret.status) {
      reject(ret.stdout)
    } else {
      resolve(ret.stdout)
    }
  })
}

function enable (hostname, port, protocol) {
  return execute('enable', hostname, port, protocol)
}

function disable (protocol) {
  return execute('disable', protocol)
}

function status () {
  return execute('status')
}

export default {
  status,
  enable,
  disable
}
