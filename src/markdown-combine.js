const fs = require('fs').promises
const fsExtra = require('fs-extra')
const path = require('path')
const logger = require('./logger.js')
const processFilesPath = require('./process-files-paths.js')
const processInnerLinks = require('./process-inner-links.js')
const { EOL: endOfLine } = require('os')

const combineMarkdowns = ({ contents, pathToStatic, mainMdFilename }) => async links => {
  try {
    let files = await Promise.all(
      links.map(async filename => {
        filename = filename.trim()
        let fileExist
        fileExist = await fsExtra.exists(filename)
        
        // try with .md
        if (!filename.endsWith('.md') && !fileExist) {
          filename = filename + '.md'
          fileExist = await fsExtra.exists(filename)
        }
        
        console.log("combine:", filename)
        if (fileExist) {
          // check if it's a directory, and add README.md if missing
          const stats = await fs.stat(filename)
          if (stats.isDirectory()) filename = path.join(filename, 'README.md')
          const content = await fs.readFile(filename, { encoding: 'utf8' })
          return { content, name: filename }
        }

        throw new Error(`file ${filename} is not exist, but listed in ${contents}`)
      })
    )

    const resultFilePath = path.resolve(pathToStatic, mainMdFilename)
    const sidebar = await Promise.all((Array.isArray(contents) ? contents : [contents]).map(async doc => fs.readFile(doc, { encoding: 'utf8' })))

    let tableOfContentsTitle = (process.env.TABLE_CONTENTS_TITLE || 'Table of Contents').trim()
    if (!tableOfContentsTitle.startsWith('#')) tableOfContentsTitle = '# ' + tableOfContentsTitle

    files = [
      {
        content: tableOfContentsTitle + endOfLine + endOfLine + sidebar,
        name: 'table-of-contents.md'
      },
      ...files
    ]

    try {
      const content = files
        .map(processInnerLinks)
        .map(processFilesPath({ pathToStatic }))
        .join('\n\n\n\n<div style="page-break-after:always;"></div>\n\n\n\n') // Page breaks
      console.log("combine content:", content)
      console.log("combine resultFilePath:", resultFilePath)
      await fs.writeFile(resultFilePath, content)
    } catch (e) {
      logger.err('markdown combining error', e)
      throw e
    }

    return resultFilePath
  } catch (err) {
    logger.err('combineMarkdowns', err)
    throw err
  }
}

module.exports = config => ({
  combineMarkdowns: combineMarkdowns(config)
})
