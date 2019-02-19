'use strict'

import { app, BrowserWindow, Menu } from 'electron'
import { mainParams, clearCache } from './const'
// import localProxy from '../renderer/lib/global-proxy/local-proxy.js'
/**
 * Set `__static` path to static files in production
 * https://simulatedgreg.gitbooks.io/electron-vue/content/en/using-static-assets.html
 */
if (process.env.NODE_ENV !== 'development') {
  global.__static = require('path').join(__dirname, '/static').replace(/\\/g, '\\\\')
}
let mainWindow
const winURL = process.env.NODE_ENV === 'development'
  ? `http://localhost:9080`
  : `file://${__dirname}/index.html`

function createWindow () {
  if (process.platform === 'darwin') {
    const template = [
      {
        label: 'Application',
        submenu: [
          { label: 'Quit', accelerator: 'Command+Q', click: function () { app.quit() } }
        ]
      },
      {
        label: 'Edit',
        submenu: [
          { label: 'Copy', accelerator: 'CmdOrCtrl+C', selector: 'copy:' },
          { label: 'Cut', accelerator: 'CmdOrCtrl+X', selector: 'Cut:' },
          { label: 'Paste', accelerator: 'CmdOrCtrl+V', selector: 'paste:' }
        ]
      }
    ]
    Menu.setApplicationMenu(Menu.buildFromTemplate(template))
  } else {
    Menu.setApplicationMenu(null)
  }
  /**
   * Initial window options
   */
  mainWindow = new BrowserWindow(mainParams)

  mainWindow.loadURL(winURL)

  mainWindow.webContents.on('did-finish-load', () => {
  })
  mainWindow.on('closed', () => {
    mainWindow = null
  })
}

app.on('ready', () => {
  createWindow()
})

app.on('window-all-closed', () => {
  // localProxy.disable()
  clearCache()
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow()
  }
})

/**
 * Auto Updater
 *
 * Uncomment the following code below and install `electron-updater` to
 * support auto updating. Code Signing with a valid certificate is required.
 * https://simulatedgreg.gitbooks.io/electron-vue/content/en/using-electron-builder.html#auto-updating
 */

/*
import { autoUpdater } from 'electron-updater'

autoUpdater.on('update-downloaded', () => {
  autoUpdater.quitAndInstall()
})

app.on('ready', () => {
  if (process.env.NODE_ENV === 'production') autoUpdater.checkForUpdates()
})
 */
