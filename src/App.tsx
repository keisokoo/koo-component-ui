import { css } from 'styled-components'
import './global.scss'
import Div from './themes/Div'
import styles from './themes/variables.module.css'
console.log(styles['--myVariable']) // "red"
function App() {
  return (
    <>
      <Div
        $style={{ backgroundColor: 'red' }}
        $css={css`
          color: blue;
        `}
        $width={100}
        $display={'flex'}
        $alignItems={'flex-end'}
      >
        hello
      </Div>
    </>
  )
}

export default App
