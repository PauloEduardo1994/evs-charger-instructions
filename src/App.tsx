import Lottie from 'react-lottie'

import { useTheme } from '@siakit/core'
import { Heading } from '@siakit/heading'
import { Flex } from '@siakit/layout'
import { Text } from '@siakit/text'
import { Tooltip } from '@siakit/tooltip'

import Car from './lottie/Comp 1 (1).json'
// import ChangeTheme from './lottie/theme.json'
import { Calculator } from './pages/Calculator/Calculator'
import { Container } from './styles'

export function App() {
  const { togggleTheme, changeColor, theme } = useTheme()

  changeColor('violet')

  return (
    <Flex flex>
      <Flex flex overflow padding direction="column">
        <Flex align="start">
          <Flex align="center">
            <Tooltip content="Click to change theme">
              <button
                style={{
                  color: '#6e56cf',
                  cursor: 'pointer',
                  backgroundColor: 'transparent',
                  border: 'none',
                }}
                onClick={() => {
                  if (theme === 'dark') {
                    togggleTheme('light')
                  }
                  if (theme === 'light') {
                    togggleTheme('dark')
                  }
                }}
              >
                <Flex>
                  <Lottie
                    height={56}
                    width={56}
                    options={{
                      autoplay: true,
                      loop: true,
                      animationData: Car,
                      rendererSettings: {
                        preserveAspectRatio: 'xMidYMid slice',
                      },
                    }}
                  />
                </Flex>
              </button>
            </Tooltip>
            <Heading>Simulador de carregamento</Heading>
          </Flex>
        </Flex>

        <Flex overflow flex align="center" justify="center">
          <Flex width={780}>
            <Calculator />
          </Flex>
        </Flex>
      </Flex>
      <Container padding margin>
        <Text>{'Under Development :)'}</Text>
      </Container>
    </Flex>
  )
}
