import styled, { css } from 'styled-components/macro'
import { fonts } from './../configs/themes'
import { CSSObject } from './CSSObject'
import { AddCss, ExtraCss, convertObjectToCSS } from './style.helpers'

type DivProps = React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
> &
  CSSObject & {
    $style?: React.CSSProperties
    $css?: ExtraCss
  }
const Div = styled.div<DivProps>`
  ${fonts.default}
  ${AddCss}
  ${({ $style, $css, ...rest }) => {
    const inlineStyle = convertObjectToCSS(rest, true)
    const objectStyle = $style ? convertObjectToCSS($style) : ``
    const cssStyle =
      typeof $css === 'string'
        ? css`
            ${$css}
          `
        : $css || css``
    const num = 1224124
    console.log(num.toLocaleString('ko-KR'))

    return (cssStyle.toString() + objectStyle + inlineStyle).trim()
  }}
`
export default Div
