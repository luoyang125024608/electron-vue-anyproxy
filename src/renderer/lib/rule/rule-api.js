/**
 * Created by luoyang on 2019-02-11
 */
const path = require('path')
const fs = require('fs')

class RuleApi {
  constructor () {
    this.ruleFile = this.userDataDir + '/rules.json'
    this.ruleCustomPath = this.userDataDir + '/rule_custom'
    this.ruleSamplePath = path.join(__static, '/rule_sample')
  }

  get userDataDir () {
    return (require('electron').remote || require('electron')).app.getPath('userData')
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

  saveRulesIntoFile (rules) {
    return new Promise((resolve, reject) => {
      fs.writeFile(this.ruleFile, JSON.stringify(rules), 'utf8', (err) => {
        if (err) {
          reject(err)
        } else {
          resolve()
        }
      })
    })
  }

  saveCustomRuleToFile (id, rule) {
    const filename = 'custom_' + id + '.js'
    if (!fs.existsSync(this.ruleCustomPath)) {
      fs.mkdirSync(this.ruleCustomPath)
    }

    const rulepath = path.resolve(this.ruleCustomPath, filename)

    fs.writeFile(rulepath, rule, 'utf8', (err) => {
      if (err) throw err
    })
  }

  readRulesFromFile () {
    if (fs.existsSync(this.ruleFile)) {
      return fs.readFileSync(this.ruleFile, 'utf8') || '[]'
    } else {
      return '[]'
    }
  }
}

export default new RuleApi()
