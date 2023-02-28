const path = require('path')
const { merge } = require('lodash')
const logger = require('./logger.js')
const fs = require('fs')
const fsExtra = require('fs-extra')

const uglify = require('uglify-js')

const dir = path.resolve(__dirname, '../resources/js')
if (!fs.existsSync(dir)) fsExtra.mkdirp(dir)

const jsFiles = fs.readdirSync(path.resolve(__dirname, '../resources/js'))
  .filter(file => !['all.js', 'docsify.js'].includes(file))
  .map(file => path.resolve(__dirname, '../resources/js/' + file))
  .filter(file => file.endsWith('.js'))

logger.info(jsFiles)

const uglified = uglify.minify(jsFiles.map(file => fs.readFileSync(file, 'utf8')))
fs.writeFileSync(path.resolve(__dirname, '../resources/js/all.js'), uglified.code)

const defaultConfig = {
  pathToStatic: 'docs/static',
  mainMdFilename: 'main.md',
  pathToPublic: process.env.PDF_OUTPUT_NAME ? path.join('./pdf/', process.env.PDF_OUTPUT_NAME) : './pdf/DOC.pdf',
  contents: 'docs/_sidebar.md',
  pathToDocsifyEntryPoint: 'docs',
  cover: 'resources/cover.pdf'
}

const run = async () => {
  const docsifyRendererPort = 17000
  const docsifyLiveReloadPort = 18000

  logger.info('Build with settings:')
  console.log(defaultConfig)
  console.log('\n')

  const config = merge(defaultConfig, { docsifyRendererPort, docsifyLiveReloadPort })

  const { closeProcess, prepareEnv, cleanUp } = require('./utils.js')(config)
  const { createRoadMap } = require('./contents-builder.js')(config)
  const { combineMarkdowns } = require('./markdown-combine.js')(config)
  const { runDocsifyRenderer } = require('./docsify-server.js')(config)
  const { htmlToPdf } = require('./render.js')(config)

  try {
    await cleanUp()

    await prepareEnv()
    const roadMap = await createRoadMap()
    await combineMarkdowns(roadMap)
    console.log("combine markdown finish!")
    runDocsifyRenderer()
    await htmlToPdf()

    logger.success(path.resolve(config.pathToPublic))
  } catch (error) {
    logger.err('run error', error)
  } finally {
    await closeProcess(0)
  }
}

module.exports = run
