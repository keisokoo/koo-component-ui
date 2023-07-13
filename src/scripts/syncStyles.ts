import babel from '@babel/core'
import { promises } from 'fs'
import path, { dirname, resolve } from 'path'
import * as prettier from 'prettier'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)
async function formatFile(filePath: string, currentCode: string) {
  const options = {
    parser: 'scss',
  }
  const formattedCode = prettier.format(currentCode, options)
  await promises.writeFile(filePath, formattedCode, 'utf8')
}
export const updateVariablesScss = async () => {
  try {
    const themesPath = path.resolve(__dirname, '../configs/themes.ts')
    const fileContents = await promises.readFile(themesPath, 'utf-8')
    const result = await babel.transformAsync(fileContents, {
      filename: themesPath,
      presets: ['@babel/preset-env', '@babel/preset-typescript'],
    })
    const module = {} as typeof import('../configs/themes')
    new Function('exports', result.code)(module)
    const themes = module
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
    const variablesObject = themes
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

    await formatFile(
      scssFilePath,
      `// configs/themes.ts파일을 수정하면 적용됩니다.\n` +
        scssContent +
        cssHelper +
        applyColor
    )
    console.log(`${scssFilePath} 파일이 생성되었습니다.`)
  } catch (error) {
    console.log(error)
  }
}
