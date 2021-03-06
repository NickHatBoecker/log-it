import store from '../store.js'
import { remote } from 'electron'

const LineByLine = require('n-readlines')
const execSync = require('child_process').execSync
const fs = require('fs')

const DUMMY_PATH = remote.app.getPath('temp')

export const removeLog = (log) => {
    const index = store.getters.logs.findIndex((x) => x.path === log.path)
    store.commit('removeLog', index)
}

export const findById = (logId) => store.getters.logs.find((x) => x.id === parseInt(logId))

export const getContent = (logPath) => {
    if (typeof logPath !== 'string' || !logPath.length) {
        return []
    }

    if (!fs.existsSync(logPath)) {
        console.log(`DEBUG: "${logPath}" does not exist.`)
        return []
    }

    const liner = new LineByLine(logPath)

    let lines = []
    let line = liner.next()
    let i = 1
    while (line) {
        lines.push({ number: i, line: line, color: getLineColor(line) })
        i += 1
        line = liner.next()
    }

    return lines
}

export const createDummyLocalFile = async (log) => {
    clearLogs()

    const dummyFilePath = `${DUMMY_PATH}${Date.now()}_${hashCode(log.path)}.log`

    execSync(`rsync -avzh --progress ${log.server}:${log.path} ${dummyFilePath}`)

    return dummyFilePath
}

export const getPathForOutput = (logPath) => {
    if (store.getters.settings.showFullLogPath) {
        return logPath
    }

    return logPath.split('/').pop()
}

export const clear = async (logPath) => {
    if (!logPath.length) {
        return
    }

    await fs.truncateSync(logPath, 0)
}

export const hashCode = (string) => {
    return string.split('').reduce((prevHash, currVal) => (((prevHash << 5) - prevHash) + currVal.charCodeAt(0)) | 0, 0)
}

export const clearLogs = () => {
    try {
        execSync(`rm ${DUMMY_PATH}*.log 2> /dev/null`)
    } catch (e) {
        // Do nothing
    }
}

const getLineColor = (line) => {
    if (!store.getters.settings.highlightColor) {
        return 'default'
    }

    const isError = /(error|Could not|failed|critical)/gi
    const isInfo = /(info|notice)/gi
    const isWarning = /(warning|warn)/gi

    if (isError.exec(line)) {
        return 'danger'
    }
    if (isInfo.exec(line)) {
        return 'info'
    }
    if (isWarning.exec(line)) {
        return 'warning'
    }

    return 'default'
}
