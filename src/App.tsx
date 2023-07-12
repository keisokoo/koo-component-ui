import axios from 'axios'
import { useEffect } from 'react'
import { css } from 'styled-components'
import './global.scss'
import Div from './themes/Div'

function App() {
  useEffect(() => {
    const fetchInit = async () => {
      try {
        const response = await axios.get('http://localhost:1337/api/reco', {
          headers: {
            Authorization: `Bearer 7a89fc1e8e38160a52e4f872745532444ac69035afbe40d4d4ca5a0aa940ca69f6f8ecacecfdd9083d4a63b58acfbca018e57479b9b8850a3389bc0b3a3af7ac7105383549cec9630bb2f50207415de6759a68a89795f784559139d725ad66e8edd97acefa4b74396c5f386f1cb04ecfd3a99ee214d163c2ec24a9149bbc9e91`,
          },
        })
        console.log('response', response)
      } catch (error) {
        console.log('error', error)
      }
    }
    fetchInit()
  }, [])
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
