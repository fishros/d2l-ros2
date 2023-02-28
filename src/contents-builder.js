const fs = require('fs').promises
const path = require('path')
const markdownLinkExtractor = require('markdown-link-extractor')
const isUrl = require('is-url')
const { flatten } = require('lodash')

const createRoadMap = ({ contents }) => async () => {
  const contentsPaths = Array.isArray(contents) ? contents : [contents]

  const sidebarFilePaths = contentsPaths.map(sidebarFileName => {
    const a = path.dirname(path.resolve(sidebarFileName))
    const b = path.resolve(sidebarFileName)
    return { dir: a, filePath: b }
  })

  const sidebarFileContents = await Promise.all(
    sidebarFilePaths.map(async ({ dir, filePath }) => ({
      dir,
      file: await fs.readFile(filePath, { encoding: 'utf8' })
    }))
  )

  const contentsArray = sidebarFileContents.map(({ file, dir }) =>
    markdownLinkExtractor(file)
      .filter(link => !isUrl(link))
      .map(link => {
        link = link.trim()
        if (link.startsWith('/')) link = link.slice(1)
        return path.resolve(dir, link)
      })
  )

  return flatten(contentsArray)
}

module.exports = config => ({
  createRoadMap: createRoadMap(config)
})
