/**
 * Created by luoyang on 2019-02-07
 */
const fs = require('fs')
const os = require('os')

export const mainParams = {
  width: 1300,
  height: 780,
  icon: '~@/assets/logo.png',
  // titleBarStyle: 'hidden-inset',
  backgroundColor: '#fff',
  show: true,
  useContentSize: true
}

export function clearCache () {
  try {
    deleteFolder(os.homedir() + '/.anyproxy/cache')
    console.log('已删除')
  } catch (err) {
    // 处理错误
    console.log(err)
  }
}

function deleteFolder (path) {
  var files = []
  if (fs.existsSync(path)) {
    files = fs.readdirSync(path)
    files.forEach(function (file, index) {
      var curPath = path + '/' + file
      if (fs.statSync(curPath).isDirectory()) { // recurse
        deleteFolder(curPath)
      } else { // delete file
        fs.unlinkSync(curPath)
      }
    })
    fs.rmdirSync(path)
  }
}
