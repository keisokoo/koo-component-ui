import { writeFileSync } from 'fs'
import { dirname, resolve } from 'path'
import { fileURLToPath } from 'url'
import themes from '../configs/themes.ts'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const cssHelper = (Object.keys(themes) as Array<keyof typeof themes>)
  .map((keyName) => {
    const innerObjectValue = Object.values(themes[keyName])?.[0]
    if (!innerObjectValue) return ''
    if (innerObjectValue.includes(';')) {
      return `
  @mixin get-from-${keyName}($name) {
    @each $mixin-name, $mixin-properties in $${keyName} {
      @if $name == $mixin-name {
        @each $property, $value in $mixin-properties {
          #{$property}: $value;
        }
      }
    }
  }`
    } else {
      return `
  @function get-from-${keyName}($key-name) {
    @return map-get($${keyName}, $key-name);
  }`
    }
  })
  .join('\n')

const applyColor = `
///
/// @param {type} $color-name - key of $colors
/// @output - color: $color;
@mixin apply-color($color-name) {
  @each $key, $color in $colors {
    @if $key == $color-name {
      color: $color;
    }
  }
}
`

// JavaScript 객체로 변환
const variablesObject = themes

// SCSS 변수로 포맷팅
const scssContent = Object.entries(variablesObject)
  .map(([name, value]) => {
    const valueString = Object.entries(value as object)
      .map(
        ([key, val]) =>
          `'${key}': ${
            val.includes(';') ? `(\n${val.split(';').join(',\n')})` : val
          }`
      )
      .join(',\n')
    return `$${name}: (\n${valueString}\n);`
  })
  .join('\n')

// SCSS 파일 저장
const scssFilePath = resolve(__dirname, '../themes/sass/_variables.scss')
writeFileSync(
  scssFilePath,
  `// .json파일을 수정하면 적용됩니다.\n` +
    scssContent +
    cssHelper +
    applyColor,
  'utf8'
)

console.log('_variables.scss 파일이 생성되었습니다.')
