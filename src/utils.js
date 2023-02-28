const path = require('path')
const fsExtra = require('fs-extra')
require('colors')

const logger = require('./logger.js')

const removeArtifacts = async paths => Promise.all(paths.map(path => new Promise(resolve => fsExtra.remove(path, resolve))))

const prepareEnv = ({ pathToStatic, pathToPublic }) => () => {
  const pathToStaticDir = path.resolve(pathToStatic)
  const pathToPublicDir = path.dirname(path.resolve(pathToPublic))

  return Promise.all([fsExtra.mkdirp(pathToStaticDir), fsExtra.mkdirp(pathToPublicDir)]).catch(err => {
    logger.err('prepareEnv', err)
  })
}

const cleanUp = ({ pathToStatic, pathToPublic }) => async () => {
  const isExist = await fsExtra.exists(path.resolve(pathToStatic))

  if (!isExist) {
    return Promise.resolve()
  }

  return removeArtifacts([path.resolve(pathToPublic)])
}

const closeProcess = ({ pathToStatic }) => async code => {
  await removeArtifacts([path.resolve(pathToStatic)])

  return process.exit(code)
}

module.exports = config => ({
  prepareEnv: prepareEnv(config),
  cleanUp: cleanUp(config),
  closeProcess: closeProcess(config)
})
