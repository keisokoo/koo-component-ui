import { CSSProperties } from 'react'

export type CSSObject = {
  [P in keyof CSSProperties as `$${P}`]: CSSProperties[P]
}
