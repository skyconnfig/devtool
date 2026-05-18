export function trackEvent(action: string, category: string, label: string, value?: number) {
  if (typeof window.gtag !== 'undefined') {
    window.gtag('event', action, {
      event_category: category,
      event_label: label,
      value: value,
    })
  }
}

export function trackToolUsage(toolName: string, action: string) {
  trackEvent('tool_usage', toolName, action)
}

export function trackDownload(toolName: string, fileType: string) {
  trackEvent('download', toolName, fileType)
}

export function trackFormSubmit(formName: string) {
  trackEvent('form_submit', 'form', formName)
}

export function trackClick(buttonName: string, context?: string) {
  trackEvent('click', context || 'interaction', buttonName)
}
