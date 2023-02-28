module.exports = async (page, { mainMdFilenameWithoutExt, pathToStatic }) => {
  await page.addScriptTag({
    url: 'https://cdnjs.cloudflare.com/ajax/libs/lodash.js/4.17.21/lodash.min.js'
  })
  await page.addScriptTag({
    url: './src/slugify.js'
  })
  return page.evaluate(
    ({ mainMdFilenameWithoutExt, pathToStatic }) => {
      const errors = []

      const makeDocsifyPrettyPrintable = () => {
        const nav = document.querySelector('nav')
        if (nav) nav.remove()

        const aside = document.querySelector('aside.sidebar')
        if (aside) aside.remove()

        const button = document.querySelector('button.sidebar-toggle')
        if (button) button.remove()

        document.querySelector('main').style.width = '100%'

        document.querySelector('section.content').style = `
          padding-top: 0;
          left: 0;
        `

        document.querySelector('.markdown-section').style = 'max-width: 100%; padding: 0;'

        document.querySelectorAll('pre').forEach(v => {
          v.style['white-space'] = 'pre-wrap'
        })
        document.querySelectorAll('code').forEach(v => {
          v.style['word-break'] = 'break-word'
        })
      }

      const isSafeTag = (tag) => tag === window.decodeURIComponent(tag)

      function randomString (length) {
        let text = ''
        const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'
        for (let i = 0; i < length; i++) text += possible.charAt(Math.floor(Math.random() * possible.length))
        return text
      }

      const setSafeTagToHref = (anchorNodes, unsafeTag) => {
        const safeId = randomString(10)

        anchorNodes.forEach(node => {
          node.href = `#${safeId}`
        })

        try {
          const headerId = window.slug(decodeURIComponent(unsafeTag))
          const anchorTarget = document.querySelector(`#${headerId}`)

          anchorTarget.id = safeId
        } catch (e) {
          errors.push({
            message: `Could not set safe tag to href: ${(unsafeTag || '').slice(0, 100)}...`,
            processingAnchor: decodeURIComponent((unsafeTag || '').slice(0, 100)) + '...',
            error: (e.message || '').slice(0, 100) + '...',
            stack: (e.stack || '').slice(0, 100) + '...'
          })
        }
      }

      const processSafeInternalLinks = links => {
        links.forEach(({ node, id }) => (node.href = `#${id}`))
      }

      const processUnSafeInternalLinks = unsafeInternalLinks => {
        _.chain(unsafeInternalLinks) // eslint-disable-line
          .groupBy('id')
          .transform((result, value, key) => {
            result[key] = value.map(({ node }) => node)
          }, {})
          .forOwn(setSafeTagToHref)
          .value()
      }

      const extractInternalLinks = () => {
        const selectors = `[href*="#/${pathToStatic}/${mainMdFilenameWithoutExt}?id="]`
        const allInternalLinks = [
          ...document.querySelectorAll(
            selectors
          )
        ].map(node => {
          const [, id] = node.href.split('id=')
          return { node, id }
        })

        const [safeInternalLinks, unsafeInternalLinks] = allInternalLinks.reduce(
          ([safe, unsafe], elem) =>
            isSafeTag(elem.id) ? [[...safe, elem], unsafe] : [safe, [...unsafe, elem]],
          [[], []]
        )

        return [safeInternalLinks, unsafeInternalLinks]
      }

      const processAnchors = () => {
        const [safeInternalLinks, unsafeInternalLinks] = extractInternalLinks()

        console.log('safeInternalLinks', safeInternalLinks)
        console.log('unsafeInternalLinks', unsafeInternalLinks)

        processSafeInternalLinks(safeInternalLinks)
        processUnSafeInternalLinks(unsafeInternalLinks)

        document.querySelectorAll('a').forEach(link => {
          try {
            if (link.href.startsWith('http://localhost') && !link.href.includes('#')) {
              link.removeAttribute('href')
            }
          } catch (err) {}
        })
      }

      const main = () => {
        makeDocsifyPrettyPrintable()
        processAnchors()
      }

      main()

      return errors
    },
    { mainMdFilenameWithoutExt, pathToStatic }
  )
}
