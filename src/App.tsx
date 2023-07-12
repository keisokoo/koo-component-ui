import { css } from 'styled-components'
import './global.scss'
import Div from './themes/Div'

function App() {
  return (
    <>
      <Div
        $style={{ backgroundColor: 'white', fontSize: '20px' }}
        $css={css`
          color: #333;
        `}
        $width={'auto'}
        $display={'flex'}
        $alignItems={'flex-end'}
      >
        작성 중입니다.
      </Div>
    </>
  )
}

export default App
