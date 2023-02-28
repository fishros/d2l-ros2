const docsifyCli = require('docsify-cli/lib/commands/serve.js')

const runDocsifyRenderer = ({ docsifyRendererPort, docsifyLiveReloadPort, pathToDocsifyEntryPoint }) => () => {
  docsifyCli(pathToDocsifyEntryPoint, false, docsifyRendererPort, docsifyLiveReloadPort)
}

module.exports = ({ docsifyRendererPort, docsifyLiveReloadPort, pathToDocsifyEntryPoint }) => ({
  runDocsifyRenderer: runDocsifyRenderer({
    docsifyRendererPort,
    docsifyLiveReloadPort,
    pathToDocsifyEntryPoint
  })
})
