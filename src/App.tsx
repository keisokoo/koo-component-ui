import { css } from 'styled-components'
import Div from './themes/Div'

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
