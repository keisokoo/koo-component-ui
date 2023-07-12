import { colors } from './themes'

class Colors {
  static getColor = (color: keyof typeof colors, opacity?: number | string) => {
    return colors[color]
  }
  static setColor = (color: keyof typeof colors, opacity?: number | string) => {
    return colors[color]
  }
  static setBackground = (
    color: keyof typeof colors,
    opacity?: number | string
  ) => {
    return colors[color]
  }
}
Colors.setColor('white')
export default Colors
