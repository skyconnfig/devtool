export interface ToolField {
  key: string
  label: string
  type: 'text' | 'textarea' | 'select'
  placeholder?: string
  options?: { label: string; value: string }[]
  default?: string
}

export interface ToolAction {
  key: string
  label: string
  icon?: string
}

export interface Tool {
  slug: string
  name: string
  description: string
  category: string
  icon: string
  fields: ToolField[]
  actions: ToolAction[]
  execute: (inputs: Record<string, string>, action: string) => string | string[]
  seoTitle: string
  seoDescription: string
  seoKeywords: string
}

export const tools: Tool[] = [
  // ===== 1. JSON Formatter =====
  {
    slug: 'json-formatter',
    name: 'JSON Formatter',
    description: 'Pretty print, validate, minify, and sort JSON data with syntax highlighting. Fix malformed JSON and remove escape characters.',
    category: 'Formatters',
    icon: '{ }',
    fields: [
      { key: 'input', label: 'JSON Input', type: 'textarea', placeholder: 'Paste JSON here...' },
    ],
    actions: [
      { key: 'format', label: 'Format' },
      { key: 'minify', label: 'Minify' },
      { key: 'sort', label: 'Sort Keys' },
      { key: 'unescape', label: 'Remove Escapes' },
    ],
    execute(inputs, action) {
      try {
        let raw = inputs.input || ''
        if (!raw.trim()) return 'Please enter JSON data.'
        // Try to unescape first
        try { raw = JSON.parse(`"${raw.replace(/"/g, '\\"')}"`) } catch {}
        const parsed = JSON.parse(raw)
        switch (action) {
          case 'minify':
            return JSON.stringify(parsed)
          case 'sort':
            return JSON.stringify(sortKeys(parsed), null, 2)
          case 'unescape': {
            const str = JSON.stringify(parsed, null, 2)
            return str.replace(/\\\//g, '/').replace(/\\n/g, '\n').replace(/\\t/g, '\t').replace(/\\"/g, '"')
          }
          case 'format':
          default:
            return JSON.stringify(parsed, null, 2)
        }
      } catch (e) {
        return `Invalid JSON: ${(e as Error).message}`
      }
    },
    seoTitle: 'JSON Formatter - Pretty Print & Validate JSON Online | LX Tools',
    seoDescription: 'Free online JSON formatter and validator. Pretty print, minify, sort keys, and fix JSON errors. Developer-friendly tool with instant results. No data uploaded to servers.',
    seoKeywords: 'JSON formatter, JSON validator, pretty print JSON, JSON minify, sort JSON keys, online JSON tool',
  },

  // ===== 2. JSON Compare =====
  {
    slug: 'json-compare',
    name: 'JSON Compare',
    description: 'Compare two JSON objects side by side and highlight differences. Find added, removed, and changed values.',
    category: 'Formatters',
    icon: '≠',
    fields: [
      { key: 'left', label: 'First JSON', type: 'textarea', placeholder: 'First JSON...' },
      { key: 'right', label: 'Second JSON', type: 'textarea', placeholder: 'Second JSON...' },
    ],
    actions: [
      { key: 'compare', label: 'Compare' },
    ],
    execute(inputs) {
      try {
        const left = JSON.parse(inputs.left || '{}')
        const right = JSON.parse(inputs.right || '{}')
        const diff = deepDiff(left, right, '')
        if (diff.length === 0) return '✓ JSON objects are identical.'
        return diff.join('\n')
      } catch (e) {
        return `Error: ${(e as Error).message}`
      }
    },
    seoTitle: 'JSON Compare - Find Differences Between JSON Objects | LX Tools',
    seoDescription: 'Compare two JSON objects online and instantly see differences. Added, removed, and changed values highlighted clearly. Free developer tool.',
    seoKeywords: 'JSON compare, JSON diff, JSON difference, compare JSON objects, JSON comparison tool',
  },

  // ===== 3. Header Formatter =====
  {
    slug: 'header-formatter',
    name: 'Header Formatter',
    description: 'Format and parse HTTP headers. Convert raw header strings to readable format and vice versa.',
    category: 'Formatters',
    icon: 'H',
    fields: [
      { key: 'input', label: 'Headers Input', type: 'textarea', placeholder: 'Paste raw HTTP headers...' },
    ],
    actions: [
      { key: 'format', label: 'Format' },
      { key: 'minify', label: 'Minify' },
    ],
    execute(inputs, action) {
      try {
        const raw = inputs.input || ''
        if (!raw.trim()) return 'Please enter headers.'
        const lines = raw.split('\n').filter(l => l.trim())
        const parsed: Record<string, string> = {}
        for (const line of lines) {
          const colonIdx = line.indexOf(':')
          if (colonIdx > 0) {
            const key = line.substring(0, colonIdx).trim()
            const val = line.substring(colonIdx + 1).trim()
            parsed[key] = val
          }
        }
        if (Object.keys(parsed).length === 0) return 'No valid headers found.'
        if (action === 'minify') {
          return Object.entries(parsed).map(([k, v]) => `${k}: ${v}`).join('\n')
        }
        const maxLen = Math.max(...Object.keys(parsed).map(k => k.length))
        return Object.entries(parsed)
          .map(([k, v]) => `${k.padEnd(maxLen)} : ${v}`)
          .join('\n')
      } catch (e) {
        return `Error: ${(e as Error).message}`
      }
    },
    seoTitle: 'HTTP Header Formatter - Parse & Format Headers Online | LX Tools',
    seoDescription: 'Free online HTTP header formatter. Parse raw headers into readable format, copy formatted results. Perfect for developers debugging API requests.',
    seoKeywords: 'header formatter, HTTP headers, parse headers, header parser, format HTTP headers',
  },

  // ===== 4. Cookie Formatter =====
  {
    slug: 'cookie-formatter',
    name: 'Cookie Formatter',
    description: 'Parse and format cookie strings into a readable key-value table. Edit cookie values and regenerate cookie strings.',
    category: 'Formatters',
    icon: '🍪',
    fields: [
      { key: 'input', label: 'Cookie String', type: 'textarea', placeholder: 'Paste cookie string...' },
    ],
    actions: [
      { key: 'format', label: 'Format' },
      { key: 'minify', label: 'Minify' },
    ],
    execute(inputs, action) {
      try {
        const raw = inputs.input || ''
        if (!raw.trim()) return 'Please enter cookie data.'
        const pairs = raw.split(';').map(p => p.trim()).filter(Boolean)
        const parsed: Record<string, string> = {}
        for (const pair of pairs) {
          const eqIdx = pair.indexOf('=')
          if (eqIdx > 0) {
            parsed[pair.substring(0, eqIdx).trim()] = pair.substring(eqIdx + 1).trim()
          }
        }
        if (Object.keys(parsed).length === 0) return 'No valid cookies found.'
        if (action === 'minify') {
          return Object.entries(parsed).map(([k, v]) => `${k}=${v}`).join('; ')
        }
        const maxLen = Math.max(...Object.keys(parsed).map(k => k.length))
        return Object.entries(parsed)
          .map(([k, v]) => `${k.padEnd(maxLen)} = ${v}`)
          .join('\n')
      } catch (e) {
        return `Error: ${(e as Error).message}`
      }
    },
    seoTitle: 'Cookie Formatter - Parse & Format Cookie Strings Online | LX Tools',
    seoDescription: 'Parse browser cookie strings into a readable format. Edit cookie key-value pairs and regenerate cookie strings. Free online developer tool.',
    seoKeywords: 'cookie formatter, parse cookies, cookie parser, format cookie string, cookie editor',
  },

  // ===== 5. Python Dict Formatter =====
  {
    slug: 'dict-formatter',
    name: 'Python Dict Formatter',
    description: 'Format Python dictionary literals with proper indentation. Convert between Python dict and JSON formats.',
    category: 'Formatters',
    icon: 'Py',
    fields: [
      { key: 'input', label: 'Python Dict', type: 'textarea', placeholder: 'Paste Python dict...' },
    ],
    actions: [
      { key: 'format', label: 'Format' },
      { key: 'tojson', label: 'To JSON' },
    ],
    execute(inputs, action) {
      try {
        const raw = inputs.input || ''
        if (!raw.trim()) return 'Please enter a Python dict.'
        // Basic Python dict → JSON conversion
        let jsonStr = raw
          .replace(/'/g, '"')
          .replace(/True/g, 'true')
          .replace(/False/g, 'false')
          .replace(/None/g, 'null')
          // Remove trailing commas before closing braces
          .replace(/,\s*([}\]])/g, '$1')
        const parsed = JSON.parse(jsonStr)
        if (action === 'tojson') {
          return JSON.stringify(parsed, null, 2)
        }
        // "Format" → display as JSON-like indented output
        return JSON.stringify(parsed, null, 2)
      } catch (e) {
        return `Error: ${(e as Error).message}\n\nTip: Make sure the Python dict uses valid syntax (single quotes for strings, True/False/None for booleans/null).`
      }
    },
    seoTitle: 'Python Dict Formatter - Format & Convert Python Dicts | LX Tools',
    seoDescription: 'Free online Python dictionary formatter. Pretty print Python dicts and convert between Python dict and JSON. Developer utility tool.',
    seoKeywords: 'Python dict formatter, format Python dictionary, Python dict to JSON, dict pretty print',
  },

  // ===== 6. JS Formatter =====
  {
    slug: 'js-formatter',
    name: 'JS Formatter',
    description: 'Format and beautify JavaScript code with proper indentation. Supports modern ES6+ syntax.',
    category: 'Formatters',
    icon: 'JS',
    fields: [
      { key: 'input', label: 'JavaScript Code', type: 'textarea', placeholder: 'Paste JavaScript code...' },
    ],
    actions: [
      { key: 'format', label: 'Format' },
      { key: 'minify', label: 'Minify' },
    ],
    execute(inputs, action) {
      try {
        const raw = inputs.input || ''
        if (!raw.trim()) return 'Please enter JavaScript code.'
        if (action === 'minify') {
          return raw
            .replace(/\/\/.*$/gm, '')
            .replace(/\/\*[\s\S]*?\*\//g, '')
            .replace(/\s+/g, ' ')
            .replace(/\s*([{}();,=+\-*/])\s*/g, '$1')
            .trim()
        }
        // Basic JS formatting: indent based on braces
        let indent = 0
        const lines = raw
          .replace(/\r\n/g, '\n')
          .split('\n')
          .map(l => l.trim())
          .filter(Boolean)
        const result: string[] = []
        for (const line of lines) {
          const openCount = (line.match(/\{/g) || []).length
          const closeCount = (line.match(/\}/g) || []).length
          // Dedent before closing braces
          const effectiveIndent = indent - closeCount
          result.push('  '.repeat(Math.max(0, effectiveIndent)) + line)
          indent += openCount - closeCount
        }
        return result.join('\n')
      } catch (e) {
        return `Error: ${(e as Error).message}`
      }
    },
    seoTitle: 'JS Formatter - Beautify & Minify JavaScript Code Online | LX Tools',
    seoDescription: 'Free online JavaScript formatter. Beautify, indent, and minify JS code instantly. Supports ES6+ syntax. No server upload — works in your browser.',
    seoKeywords: 'JS formatter, JavaScript beautifier, JavaScript formatter, JS minify, code formatter',
  },

  // ===== 7. HTML Formatter =====
  {
    slug: 'html-formatter',
    name: 'HTML Formatter',
    description: 'Format and beautify HTML code with proper indentation. Clean up messy HTML from web pages.',
    category: 'Formatters',
    icon: '<>',
    fields: [
      { key: 'input', label: 'HTML Code', type: 'textarea', placeholder: 'Paste HTML code...' },
    ],
    actions: [
      { key: 'format', label: 'Format' },
      { key: 'minify', label: 'Minify' },
    ],
    execute(inputs, action) {
      try {
        const raw = inputs.input || ''
        if (!raw.trim()) return 'Please enter HTML code.'
        if (action === 'minify') {
          return raw
            .replace(/\s+/g, ' ')
            .replace(/>\s+</g, '><')
            .trim()
        }
        // Basic HTML formatting
        const tags = raw
          .replace(/>/g, '>\n')
          .replace(/</g, '\n<')
          .split('\n')
          .map(l => l.trim())
          .filter(Boolean)
        let indent = 0
        const result: string[] = []
        const voidTags = ['br', 'hr', 'img', 'input', 'meta', 'link', 'area', 'base', 'col', 'embed', 'source', 'track', 'wbr']
        for (const tag of tags) {
          const isClosing = /^<\//.test(tag)
          const isVoid = voidTags.some(v => new RegExp(`^<${v}[\\s>]`, 'i').test(tag))
          const isOpenClose = /^<![^-]/.test(tag) || /^<\?/.test(tag)
          if (isClosing) indent--
          result.push('  '.repeat(Math.max(0, indent)) + tag)
          if (!isClosing && !isVoid && !isOpenClose && !tag.endsWith('/>') && !/^<!\[CDATA\[/.test(tag)) indent++
        }
        return result.join('\n')
      } catch (e) {
        return `Error: ${(e as Error).message}`
      }
    },
    seoTitle: 'HTML Formatter - Beautify & Clean Up HTML Code Online | LX Tools',
    seoDescription: 'Free online HTML formatter and beautifier. Indent, clean up, and minify HTML code instantly. Works with messy HTML from any source.',
    seoKeywords: 'HTML formatter, HTML beautifier, format HTML, HTML indent, HTML minify, clean HTML',
  },

  // ===== 8. cURL to Python requests =====
  {
    slug: 'curl-to-requests',
    name: 'cURL to Python requests',
    description: 'Convert cURL commands to Python requests code. Parse headers, data, cookies, and method automatically.',
    category: 'Converters',
    icon: '↪',
    fields: [
      { key: 'input', label: 'cURL Command', type: 'textarea', placeholder: 'Paste cURL command...' },
    ],
    actions: [
      { key: 'convert', label: 'Convert' },
      { key: 'copy', label: 'Copy Code' },
    ],
    execute(inputs) {
      try {
        const raw = inputs.input || ''
        if (!raw.trim()) return 'Please enter a cURL command.'
        return curlToRequests(raw)
      } catch (e) {
        return `Error: ${(e as Error).message}`
      }
    },
    seoTitle: 'cURL to Python requests Converter - Online Tool | LX Tools',
    seoDescription: 'Free online cURL to Python requests code converter. Instantly convert any cURL command to Python requests code. Supports headers, cookies, data, and all HTTP methods.',
    seoKeywords: 'curl to python, curl to requests, convert curl to python, curl converter, python requests generator',
  },

  // ===== 9. cURL to Feapder =====
  {
    slug: 'curl-to-feapder',
    name: 'cURL to Feapder',
    description: 'Convert cURL commands to Feapder (Python scraping framework) request code. Perfect for scrapy/feapder users.',
    category: 'Converters',
    icon: '🕷',
    fields: [
      { key: 'input', label: 'cURL Command', type: 'textarea', placeholder: 'Paste cURL command...' },
    ],
    actions: [
      { key: 'convert', label: 'Convert' },
    ],
    execute(inputs) {
      try {
        const raw = inputs.input || ''
        if (!raw.trim()) return 'Please enter a cURL command.'
        return curlToFeapder(raw)
      } catch (e) {
        return `Error: ${(e as Error).message}`
      }
    },
    seoTitle: 'cURL to Feapder Converter - Online Tool | LX Tools',
    seoDescription: 'Convert cURL commands to Feapder framework request code. Specialized for Python web scraping with Feapder framework. Free online converter.',
    seoKeywords: 'curl to feapder, curl to python scraper, feapder converter, feapder request generator',
  },

  // ===== 10. URL Parameter Extract =====
  {
    slug: 'url-param-extract',
    name: 'URL Parameter Extract',
    description: 'Extract and parse query parameters from any URL. View parameters in a formatted table with decoded values.',
    category: 'Extractors',
    icon: '🔗',
    fields: [
      { key: 'input', label: 'URL', type: 'textarea', placeholder: 'Paste URL with query parameters...' },
    ],
    actions: [
      { key: 'extract', label: 'Extract' },
    ],
    execute(inputs) {
      try {
        const raw = inputs.input || ''
        if (!raw.trim()) return 'Please enter a URL.'
        const qIdx = raw.indexOf('?')
        if (qIdx === -1) return 'No query parameters found in the URL.'
        const qs = raw.substring(qIdx + 1).split('#')[0]
        const params = new URLSearchParams(qs)
        const entries = [...params.entries()]
        if (entries.length === 0) return 'No query parameters found.'
        const maxLen = Math.max(...entries.map(([k]) => k.length))
        return entries
          .map(([k, v]) => `${k.padEnd(maxLen)} = ${v}`)
          .join('\n')
      } catch (e) {
        return `Error: ${(e as Error).message}`
      }
    },
    seoTitle: 'URL Parameter Extractor - Parse Query Strings Online | LX Tools',
    seoDescription: 'Free online URL parameter extractor. Parse and extract query string parameters from any URL. View decoded parameter names and values in a clean format.',
    seoKeywords: 'URL parameter extractor, parse query string, extract URL params, query string parser, URL parser',
  },

  // ===== 11. URL Encode / Decode =====
  {
    slug: 'url-encode-decode',
    name: 'URL Encode / Decode',
    description: 'Encode or decode URL strings. Convert special characters to percent-encoded format and decode them back.',
    category: 'Converters',
    icon: 'URL',
    fields: [
      { key: 'input', label: 'Text', type: 'textarea', placeholder: 'Enter text to encode or decode...' },
    ],
    actions: [
      { key: 'encode', label: 'Encode' },
      { key: 'decode', label: 'Decode' },
    ],
    execute(inputs, action) {
      try {
        const raw = inputs.input || ''
        if (!raw.trim()) return 'Please enter text.'
        if (action === 'encode') return encodeURIComponent(raw)
        return decodeURIComponent(raw)
      } catch (e) {
        if (action === 'decode') return `Cannot decode: ${(e as Error).message}`
        return `Error: ${(e as Error).message}`
      }
    },
    seoTitle: 'URL Encode/Decode - Free Online URL Encoder & Decoder | LX Tools',
    seoDescription: 'Free online URL encoder and decoder. Encode text to percent-encoded URL format or decode URL-encoded strings back to readable text. Instant results.',
    seoKeywords: 'URL encode, URL decode, URL encoder, URL decoder, percent encode, URI encode',
  },

  // ===== 12. HTML Render =====
  {
    slug: 'html-render',
    name: 'HTML Render',
    description: 'Render HTML code in a live preview iframe. See how your HTML looks in real-time as you type.',
    category: 'Renderers',
    icon: '🖼',
    fields: [
      { key: 'input', label: 'HTML Code', type: 'textarea', placeholder: 'Paste HTML to render...' },
    ],
    actions: [
      { key: 'render', label: 'Render' },
    ],
    execute(inputs) {
      const raw = inputs.input || ''
      if (!raw.trim()) return 'Please enter HTML code.'
      return raw // Return the HTML to be rendered in an iframe
    },
    seoTitle: 'HTML Render - Live HTML Preview Online | LX Tools',
    seoDescription: 'Free online HTML renderer with live preview. See how your HTML code renders in real-time. Works with complete HTML documents or fragments.',
    seoKeywords: 'HTML render, HTML preview, live HTML viewer, render HTML online, HTML iframe preview',
  },

  // ===== 13. Text Decode =====
  {
    slug: 'text-decode',
    name: 'Text Decode',
    description: 'Decode text from various encodings including Base64, Unicode escape sequences, hex, and HTML entities.',
    category: 'Converters',
    icon: '🔓',
    fields: [
      { key: 'input', label: 'Encoded Text', type: 'textarea', placeholder: 'Paste encoded text...' },
      {
        key: 'mode',
        label: 'Decode Method',
        type: 'select',
        default: 'base64',
        options: [
          { label: 'Base64', value: 'base64' },
          { label: 'Base64 (URL Safe)', value: 'base64url' },
          { label: 'Unicode \\uXXXX', value: 'unicode' },
          { label: 'Hex', value: 'hex' },
          { label: 'HTML Entities', value: 'html' },
          { label: 'Base64 → UTF-8', value: 'base64utf8' },
        ],
      },
    ],
    actions: [
      { key: 'decode', label: 'Decode' },
    ],
    execute(inputs) {
      try {
        const raw = inputs.input || ''
        if (!raw.trim()) return 'Please enter encoded text.'
        const mode = inputs.mode || 'base64'
        switch (mode) {
          case 'base64':
            return atob(raw)
          case 'base64url':
            return atob(raw.replace(/-/g, '+').replace(/_/g, '/'))
          case 'base64utf8':
            return decodeURIComponent(escape(atob(raw)))
          case 'unicode':
            return raw.replace(/\\u([0-9a-fA-F]{4})/g, (_, hex) => String.fromCharCode(parseInt(hex, 16)))
          case 'hex':
            return raw
              .replace(/\s+/g, '')
              .replace(/([0-9a-fA-F]{2})/g, (_, hex) => String.fromCharCode(parseInt(hex, 16)))
          case 'html':
            const textarea = document.createElement('textarea')
            textarea.innerHTML = raw
            return textarea.value
          default:
            return `Unknown decode method: ${mode}`
        }
      } catch (e) {
        return `Decode error: ${(e as Error).message}`
      }
    },
    seoTitle: 'Text Decoder - Base64, Unicode, Hex Decoder Online | LX Tools',
    seoDescription: 'Free online text decoder supporting Base64, Unicode escape sequences, hex, and HTML entities. Decode encoded text instantly in your browser.',
    seoKeywords: 'text decoder, base64 decode, unicode decoder, hex decoder, html entity decoder, decode text',
  },

  // ===== 14. Text Compare =====
  {
    slug: 'text-compare',
    name: 'Text Compare',
    description: 'Compare two text strings and find differences line by line. See added, removed, and unchanged lines highlighted.',
    category: 'Comparators',
    icon: '⇔',
    fields: [
      { key: 'left', label: 'Original Text', type: 'textarea', placeholder: 'Original text...' },
      { key: 'right', label: 'New Text', type: 'textarea', placeholder: 'New text...' },
    ],
    actions: [
      { key: 'compare', label: 'Compare' },
    ],
    execute(inputs) {
      try {
        const left = (inputs.left || '').split('\n')
        const right = (inputs.right || '').split('\n')
        if (!inputs.left && !inputs.right) return 'Please enter text in both fields.'
        return simpleDiff(left, right)
      } catch (e) {
        return `Error: ${(e as Error).message}`
      }
    },
    seoTitle: 'Text Compare - Compare Text Differences Online | LX Tools',
    seoDescription: 'Free online text comparison tool. Compare two texts line by line and see differences highlighted. Find added, removed, and unchanged lines instantly.',
    seoKeywords: 'text compare, diff tool, text comparison, compare text online, line by line diff',
  },
]

export const categories = [
  { slug: 'formatters', name: 'Formatters' },
  { slug: 'converters', name: 'Converters' },
  { slug: 'extractors', name: 'Extractors' },
  { slug: 'renderers', name: 'Renderers' },
  { slug: 'comparators', name: 'Comparators' },
]

// Helper: sort object keys recursively
function sortKeys(obj: unknown): unknown {
  if (Array.isArray(obj)) return obj.map(sortKeys)
  if (obj !== null && typeof obj === 'object') {
    return Object.keys(obj as Record<string, unknown>)
      .sort()
      .reduce((acc, key) => {
        ;(acc as Record<string, unknown>)[key] = sortKeys((obj as Record<string, unknown>)[key])
        return acc
      }, {} as Record<string, unknown>)
  }
  return obj
}

// Helper: deep diff between two objects
function deepDiff(a: unknown, b: unknown, path: string): string[] {
  const results: string[] = []
  if (a === b) return results
  if (typeof a !== typeof b || Array.isArray(a) !== Array.isArray(b) || a === null || b === null) {
    results.push(`[${path || 'root'}]: ${JSON.stringify(a)} → ${JSON.stringify(b)}`)
    return results
  }
  if (typeof a === 'object' && typeof b === 'object') {
    const aKeys = new Set([...Object.keys(a as Record<string, unknown>), ...Object.keys(b as Record<string, unknown>)])
    for (const key of aKeys) {
      const newPath = path ? `${path}.${key}` : key
      if (!(key in (a as Record<string, unknown>))) {
        results.push(`[${newPath}]: (added) ${JSON.stringify((b as Record<string, unknown>)[key])}`)
      } else if (!(key in (b as Record<string, unknown>))) {
        results.push(`[${newPath}]: (removed) ${JSON.stringify((a as Record<string, unknown>)[key])}`)
      } else {
        results.push(...deepDiff((a as Record<string, unknown>)[key], (b as Record<string, unknown>)[key], newPath))
      }
    }
  }
  if (Array.isArray(a) && Array.isArray(b)) {
    const maxLen = Math.max(a.length, b.length)
    for (let i = 0; i < maxLen; i++) {
      if (i >= a.length) results.push(`[${path}[${i}]]: (added) ${JSON.stringify(b[i])}`)
      else if (i >= b.length) results.push(`[${path}[${i}]]: (removed) ${JSON.stringify(a[i])}`)
      else results.push(...deepDiff(a[i], b[i], `${path}[${i}]`))
    }
  }
  return results
}

// Helper: cURL → Python requests
function curlToRequests(curl: string): string {
  // Normalize line continuations
  let cmd = curl.replace(/\\\n/g, ' ').replace(/\\\r\n/g, ' ')

  const hasData = cmd.includes('--data') || cmd.includes('-d ') || cmd.includes('--data-raw')
  const method = (cmd.match(/-X\s+(\w+)/i)?.[1] || (hasData ? 'POST' : 'GET')).toUpperCase()

  // Find the first URL in the command (after any flags)
  const urlMatch = cmd.match(/https?:\/\/[^\s'"`]+/)
  const url = urlMatch?.[0] || ''

  // Extract headers
  const headers: Record<string, string> = {}
  const headerRegex = /(?:-H|--header)\s+['"]([^'"]+)['"]/g
  let hMatch: RegExpExecArray | null
  while ((hMatch = headerRegex.exec(cmd)) !== null) {
    const colonIdx = hMatch[1].indexOf(':')
    if (colonIdx > 0) {
      headers[hMatch[1].substring(0, colonIdx).trim()] = hMatch[1].substring(colonIdx + 1).trim()
    }
  }

  // Extract data body (handle both single and double quoted values)
  let data = ''
  const dataSingle = cmd.match(/(?:--data(?:-raw)?|-d)\s+'([^']+)'/)
  const dataDouble = cmd.match(/(?:--data(?:-raw)?|-d)\s+"([^"]+)"/)
  data = dataSingle?.[1] || dataDouble?.[1] || ''

  // Generate Python code
  let code = 'import requests\n\n'
  code += `url = ${JSON.stringify(url)}\n`
  if (Object.keys(headers).length > 0) {
    code += `headers = ${JSON.stringify(headers, null, 2)}\n`
  }
  if (data && method !== 'GET') {
    try {
      JSON.parse(data)
      code += `import json\n\n`
      code += `data = json.dumps(${JSON.stringify(JSON.parse(data), null, 2)})\n`
      code += `headers["Content-Type"] = "application/json"\n\n`
    } catch {
      code += `data = ${JSON.stringify(data)}\n\n`
    }
  }
  if (Object.keys(headers).length > 0 && (data && method !== 'GET')) {
    code += `response = requests.${method.toLowerCase()}(url, headers=headers, data=data)`
  } else if (Object.keys(headers).length > 0) {
    code += `response = requests.${method.toLowerCase()}(url, headers=headers)`
  } else if (data && method !== 'GET') {
    code += `response = requests.${method.toLowerCase()}(url, data=data)`
  } else {
    code += `response = requests.${method.toLowerCase()}(url)`
  }
  code += '\n\nprint(response.text)'
  return code
}

// Helper: cURL → Feapder
function curlToFeapder(curl: string): string {
  let cmd = curl.replace(/\\\n/g, ' ').replace(/\\\r\n/g, ' ')
  const hasData = cmd.includes('--data') || cmd.includes('-d ') || cmd.includes('--data-raw')
  const method = (cmd.match(/-X\s+(\w+)/i)?.[1] || (hasData ? 'POST' : 'GET')).toUpperCase()
  const urlMatch = cmd.match(/https?:\/\/[^\s'"`]+/)
  const url = urlMatch?.[0] || ''

  const headers: Record<string, string> = {}
  const headerRegex = /(?:-H|--header)\s+['"]([^'"]+)['"]/g
  let hMatch: RegExpExecArray | null
  while ((hMatch = headerRegex.exec(cmd)) !== null) {
    const colonIdx = hMatch[1].indexOf(':')
    if (colonIdx > 0) {
      headers[hMatch[1].substring(0, colonIdx).trim()] = hMatch[1].substring(colonIdx + 1).trim()
    }
  }

  let data = ''
  const dataSingleF = cmd.match(/(?:--data(?:-raw)?|-d)\s+'([^']+)'/)
  const dataDoubleF = cmd.match(/(?:--data(?:-raw)?|-d)\s+"([^"]+)"/)
  data = dataSingleF?.[1] || dataDoubleF?.[1] || ''

  let code = 'from feapder import Request\n\n'
  code += `request = Request(\n`
  code += `    url=${JSON.stringify(url)},\n`
  if (method !== 'GET') code += `    method="${method}",\n`
  if (Object.keys(headers).length > 0) {
    code += `    headers=${JSON.stringify(headers, null, 4)},\n`
  }
  if (data && method !== 'GET') {
    code += `    data=${JSON.stringify(data)},\n`
  }
  code += `)\n`
  return code
}

// Helper: simple line-diff
function simpleDiff(left: string[], right: string[]): string {
  const result: string[] = []
  const maxLen = Math.max(left.length, right.length)
  for (let i = 0; i < maxLen; i++) {
    if (i >= left.length) {
      result.push(`+ ${right[i]}`)
    } else if (i >= right.length) {
      result.push(`- ${left[i]}`)
    } else if (left[i] !== right[i]) {
      result.push(`- ${left[i]}`)
      result.push(`+ ${right[i]}`)
    } else {
      result.push(`  ${left[i]}`)
    }
  }
  return result.join('\n')
}
