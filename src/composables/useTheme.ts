import { ref, watch } from 'vue'

type Theme = 'light' | 'dark'

const theme = ref<Theme>(getInitialTheme())

function getInitialTheme(): Theme {
  const stored = localStorage.getItem('theme') as Theme | null
  if (stored) return stored
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
}

if (theme.value === 'dark') document.documentElement.classList.add('dark')

export function useTheme() {
  const toggleTheme = () => {
    theme.value = theme.value === 'light' ? 'dark' : 'light'
  }

  const setTheme = (t: Theme) => {
    theme.value = t
  }

  watch(theme, (val) => {
    localStorage.setItem('theme', val)
    document.documentElement.classList.toggle('dark', val === 'dark')
  })

  return { theme, toggleTheme, setTheme }
}
