/**
 * Created by luoyang on 2019-02-11
 */
const path = require('path')
const { app } = require('electron').remote
const fs = require('fs')

class RuleApi {
  constructor () {
    this.userDataDir = app.getPath('userData')
    this.ruleFile = this.userDataDir + '/rules.json'
    this.ruleCustomPath = this.userDataDir + '/rule_custom'
    this.ruleSamplePath = path.join(__static, '/rule_sample')
  }

  fetchSampleRule (rulename) {
    const filename = 'sample_' + rulename + '.js'
    const rulePath = path.resolve(this.ruleSamplePath, filename)
    return new Promise((resolve, reject) => {
      if (fs.existsSync(rulePath)) {
        fs.readFile(rulePath, 'utf8', (err, data) => {
          if (err) {
            reject(err)
          } else {
            resolve(data.toString())
          }
        })
      } else {
        reject(new Error())
      }
    })
  }
}

export default new RuleApi()
