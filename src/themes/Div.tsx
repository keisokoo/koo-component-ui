import styled, { css } from 'styled-components/macro'
import { CSSObject } from './CSSObject'
import { AddCss, ExtraCss, convertObjectToCSS } from './style.helpers'
import { typography } from './styles'

type DivProps = React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
> &
  CSSObject & {
    $style?: React.CSSProperties
    $css?: ExtraCss
  }
const Div = styled.div<DivProps>`
  ${typography.default}
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
