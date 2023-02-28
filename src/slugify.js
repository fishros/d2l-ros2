const re = /[\u2000-\u206F\u2E00-\u2E7F\\'!"#$%&()*+,./:;<=>?@[\]^`{|}~]/g

function lower (string) {
  return string.toLowerCase()
}

const slug = (str) => {
  if (typeof str !== 'string') return ''

  return str
    .trim()
    .replace(/[A-Z]+/g, lower)
    .replace(/<[^>]+>/g, '')
    .replace(re, '')
    .replace(/\s/g, '-')
    .replace(/-+/g, '-')
    .replace(/^(\d)/, '_$1')
}

if (typeof window !== 'undefined' && window) window.slug = slug
if (typeof module !== 'undefined' && module) module.exports = slug
