/**
 * Created by luoyang on 2019-02-11
 */
const path = require('path')
const fs = require('fs')
const nodeRequire = require('node-require-function')()
const co = require('co')
const { app } = require('electron').remote

class RuleApi {
  constructor () {
    this.ruleFile = this.userDataDir + '/rules.json'
    this.ruleCustomPath = this.userDataDir + '/rule_custom'
    this.ruleSamplePath = path.join(__static, '/rule_sample')
  }

  get userDataDir () {
    return app.getPath('userData')
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
    fs.writeFileSync(this.ruleFile, JSON.stringify(rules), 'utf8')
  }

  saveCustomRuleToFile (id, rule) {
    if (!fs.existsSync(this.ruleCustomPath)) {
      fs.mkdirSync(this.ruleCustomPath)
    }

    const rulepath = path.resolve(this.ruleCustomPath, this.getCustomFileName(id))

    fs.writeFileSync(rulepath, rule, 'utf8')
  }

  readRulesFromFile () {
    if (fs.existsSync(this.ruleFile)) {
      return fs.readFileSync(this.ruleFile, 'utf8') || '[]'
    } else {
      return '[]'
    }
  }

  fetchCustomRule (id) {
    const rulepath = path.resolve(this.ruleCustomPath, this.getCustomFileName(id))
    return new Promise((resolve, reject) => {
      if (fs.existsSync(rulepath)) {
        fs.readFile(rulepath, (err, data) => {
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

  deleteCustomRuleFile (id) {
    const rulepath = path.resolve(this.ruleCustomPath, this.getCustomFileName(id))
    if (fs.existsSync(rulepath)) {
      fs.unlink(rulepath, (err) => {
        if (err) throw err
      })
    }
  }

  freshRequire (modulePath) {
    let key = nodeRequire.resolve(modulePath)
    delete nodeRequire.cache[key]
    return nodeRequire(modulePath)
  }

  // require rule文件
  requireRuleModule (id) {
    if (!id) return {}
    const filepath = path.resolve(this.ruleCustomPath, this.getCustomFileName(id))
    if (fs.existsSync(filepath)) {
      return this.freshRequire(filepath)
    } else {
      return {}
    }
  }

  mergeRuleModule (ids) {
    let rules = ids.map(id => this.requireRuleModule(id))
    // var rule = this.requireRuleModule(ids[0])
    return {
      summary: '',
      beforeSendRequest: function * (requestDetail) {
        co(function * () {
          var result = yield rules.filter(rule => rule.beforeSendRequest).map(rule => rule.beforeSendRequest(requestDetail))
          return result.reduce(function (request, res) {
            return Object.assign(request, res || {})
          }, requestDetail)
        })
      },
      beforeSendResponse: function * (requestDetail, responseDetail) {
        co(function * () {
          var result = yield rules.filter(rule => rule.beforeSendResponse).map(rule => rule.beforeSendResponse(requestDetail, responseDetail))
          return result.reduce(function (response, res) {
            return Object.assign(response, res || {})
          }, responseDetail)
        })
      }
    }
  }

  getCustomFileName (id) {
    return 'custom_' + id + '.js'
  }
}

export default new RuleApi()
