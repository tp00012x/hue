import { useLayoutEffect } from 'react'

const config = {
  styles: {
    textColor: '#333',
    bodyFontFamily: 'Verdana, sans-serif',
    personNameFontWeight: '500',
    personNameFontSize: '18px',
    reviewTextFontWeight: '300',
    reviewTextFontSize: '16px',
    mainHeaderFontSize: '24px',
    mainHeaderFontWeight: '800',
    mainHeaderTextTransform: 'capitalize',
  },
}

export default function useLoadCustomStyleConfig() {
  useLayoutEffect(() => {
    const root = document.documentElement
    Object.entries(config.styles).forEach(([key, value]) => {
      const cssVariable = `--${key.replace(/[A-Z]/g, (match) => `-${match.toLowerCase()}`)}`
      root.style.setProperty(cssVariable, value)
    })
  }, [])
}
