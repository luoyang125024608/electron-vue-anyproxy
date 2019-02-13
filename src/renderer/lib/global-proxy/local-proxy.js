/**
 * Created by luoyang on 2019-02-13
 */
import globalProxy from './index'

export default {
  port: 8001,
  enable () {
    globalProxy.enable('127.0.0.1', this.port, 'http').then((stdout) => {
      // console.log(stdout)
    }).catch((error) => {
      console.log(error)
    })
    globalProxy.enable('127.0.0.1', this.port, 'https').then((stdout) => {
      // console.log(stdout)
    }).catch((error) => {
      console.log(error)
    })
  },
  disable () {
    globalProxy.disable('http').then((stdout) => {
      // console.log(stdout)
    }).catch((error) => {
      console.log(error)
    })
    globalProxy.disable('https').then((stdout) => {
      // console.log(stdout)
    }).catch((error) => {
      console.log(error)
    })
  }
}
