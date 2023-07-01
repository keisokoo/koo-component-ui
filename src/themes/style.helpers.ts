import { DetailedHTMLProps, HTMLAttributes } from 'react'
import { CSSProp, css } from 'styled-components'

export type ExtraCss = CSSProp | string
export type AddCssProps<T> = T & {
  $css?: ExtraCss
}
export type HTMLAttr<T> = DetailedHTMLProps<HTMLAttributes<T>, T>

export function convertToCSS(
  key: string,
  value: string | number,
  inline?: boolean
) {
  if (inline) {
    if (!key.includes('$')) return ''
    key = key.replace('$', '')
  }
  const cssKey = key.replace(/[A-Z]/g, (letter) => `-${letter.toLowerCase()}`)
  return `${cssKey}: ${typeof value === 'number' ? value + 'px' : value};`
}
export function convertObjectToCSS(
  styles: React.CSSProperties,
  inline?: boolean
) {
  return Object.entries(styles)
    .map(([key, value]) => {
      return convertToCSS(key, value, inline)
    })
    .join(' ')
}

export const AddCss = <T>(props: AddCssProps<T>): CSSProp =>
  typeof props.$css === 'string'
    ? css`
        ${props.$css}
      `
    : props.$css || css``
