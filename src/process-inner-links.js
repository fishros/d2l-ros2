const path = require('path')
const markdownLinkExtractor = require('markdown-link-extractor')
const unified = require('unified')
const parser = require('remark-parse')
const slug = require('./slugify')

const recursiveGetValueInChildren = (children, array) => {
  children.forEach(child => {
    if (child.children) {
      recursiveGetValueInChildren(child.children, array)
    } else {
      array.push(child.value)
    }
  })
}

const cleanText = (string) => {
  const entityMap = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#39;'
  }

  return String(string).replace(/[&<>"']/g, s => entityMap[s])
}

module.exports = ({ content, name }, _, arr) => {
  let newContent = content
  const b = markdownLinkExtractor(content)
    .filter(link => {
      const ext = path.parse(link).ext
      return ext === '' || ext === '.md'
    })
    .map(link => ({ file: arr.find(({ name }) => name.includes(link)), link }))
    .filter(({ file }) => file)
    .map(({ file: { content }, link }) => ({
      ast: unified().use(parser)
        .parse(content),
      link
    }))
    .map(({ ast, link }) => {
      const [a] = ast.children.filter(({ type }) => type === 'heading')

      const array = []
      recursiveGetValueInChildren(a.children, array)
      const value = cleanText(array.join(' ')).trim()

      return { link, unsafeTag: value }
    })
    .map(({ unsafeTag, link }) => ({
      link,
      tagWord: slug(unsafeTag)
    }))
    .map(({ link, tagWord }) => ({
      link,
      tag: `#${tagWord}`
    }))

  b.forEach(({ tag, link }) => {
    newContent = newContent.replace(new RegExp('\\[(.*)\\]\\(' + link + '\\)'), `[$1](${tag})`)
  })

  return { content: newContent, name }
}
