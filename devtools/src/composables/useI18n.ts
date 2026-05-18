import { ref, watch } from 'vue'

type Locale = 'en' | 'zh'

const locale = ref<Locale>((localStorage.getItem('locale') as Locale) || 'en')
document.documentElement.lang = locale.value

const messages: Record<Locale, Record<string, string>> = {
  en: {
    'nav.home': 'Home',
    'nav.tools': 'Tools',
    'nav.about': 'About',
    'nav.contact': 'Contact',
    'hero.title': 'Developer Utilities',
    'hero.subtitle': 'Format, convert, compare, and debug — all in your browser. No data uploaded.',
    'hero.search': 'Search tools...',
    'sidebar.title': 'Tools',
    'toolbar.search': 'Search',
    'toolbar.fullscreen': 'Fullscreen',
    'toolbar.collapse': 'Collapse',
    'toolbar.level': 'Level',
    'toolbar.unescape': 'Remove Escapes',
    'toolbar.sort': 'Sort',
    'toolbar.minify': 'Minify',
    'toolbar.copy': 'Copy',
    'toolbar.copied': 'Copied!',
    'toolbar.format': 'Format',
    'toolbar.clear': 'Clear',
    'editor.input': 'Input',
    'editor.output': 'Output',
    'editor.placeholder': 'Paste your content here...',
    'editor.result': 'Result',
    'editor.error': 'Error',
    'editor.empty': 'No result yet. Click Format or enter data above.',
    'footer.tools': 'Tools',
    'footer.pages': 'Pages',
    'footer.legal': 'Legal',
    'footer.privacy': 'Privacy Policy',
    'footer.terms': 'Terms of Service',
    'footer.copyright': 'All rights reserved.',
    'footer.email': 'support@lxs.best',
    'common.loading': 'Loading...',
    'common.home': 'Home',
    'json.format': 'JSON Formatter',
    'json.compare': 'JSON Compare',
    'header.format': 'Header Formatter',
    'cookie.format': 'Cookie Formatter',
    'dict.format': 'Python Dict Formatter',
    'js.format': 'JS Formatter',
    'html.format': 'HTML Formatter',
    'curl.requests': 'cURL to Python requests',
    'curl.feapder': 'cURL to Feapder',
    'url.extract': 'URL Parameter Extract',
    'url.encode': 'URL Encode',
    'url.decode': 'URL Decode',
    'html.render': 'HTML Render',
    'text.decode': 'Text Decode',
    'text.compare': 'Text Compare',
  },
  zh: {
    'nav.home': '首页',
    'nav.tools': '工具',
    'nav.about': '关于',
    'nav.contact': '联系我们',
    'hero.title': '开发者工具集',
    'hero.subtitle': '格式化、转换、对比、调试 — 全部在浏览器中完成，数据不上传服务器',
    'hero.search': '搜索工具...',
    'sidebar.title': '工具列表',
    'toolbar.search': '搜索',
    'toolbar.fullscreen': '全屏',
    'toolbar.collapse': '折叠',
    'toolbar.level': '层级',
    'toolbar.unescape': '去除转义',
    'toolbar.sort': '排序',
    'toolbar.minify': '压缩',
    'toolbar.copy': '复制',
    'toolbar.copied': '已复制！',
    'toolbar.format': '格式化',
    'toolbar.clear': '清空',
    'editor.input': '输入',
    'editor.output': '输出',
    'editor.placeholder': '在此粘贴内容...',
    'editor.result': '结果',
    'editor.error': '错误',
    'editor.empty': '暂无结果。请点击格式化或输入数据。',
    'footer.tools': '工具',
    'footer.pages': '页面',
    'footer.legal': '法律',
    'footer.privacy': '隐私政策',
    'footer.terms': '服务条款',
    'footer.copyright': '版权所有。',
    'footer.email': 'support@lxs.best',
    'common.loading': '加载中...',
    'common.home': '首页',
    'json.format': 'JSON 格式化',
    'json.compare': 'JSON 对比',
    'header.format': 'Header 格式化',
    'cookie.format': 'Cookie 格式化',
    'dict.format': 'Python Dict 格式化',
    'js.format': 'JS 格式化',
    'html.format': 'HTML 格式化',
    'curl.requests': 'cURL 转 Python requests',
    'curl.feapder': 'cURL 转 Feapder',
    'url.extract': 'URL 参数提取',
    'url.encode': 'URL 编码',
    'url.decode': 'URL 解码',
    'html.render': 'HTML 渲染',
    'text.decode': '文本解码',
    'text.compare': '文本对比',
  },
}

export function useI18n() {
  const t = (key: string): string => {
    return messages[locale.value]?.[key] || messages.en[key] || key
  }

  const toggleLocale = () => {
    locale.value = locale.value === 'en' ? 'zh' : 'en'
  }

  watch(locale, (val) => {
    localStorage.setItem('locale', val)
    document.documentElement.lang = val
  })

  return { locale, t, toggleLocale }
}
