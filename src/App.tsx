import Lottie from 'react-lottie'

import { useTheme } from '@siakit/core'
import { Heading } from '@siakit/heading'
import { Flex } from '@siakit/layout'
import { Tooltip } from '@siakit/tooltip'

import Car from './lottie/Comp 1 (1).json'
import { Calculator } from './pages/Calculator/Calculator'
import { Vehicles } from './pages/Vehicles'

export function App() {
  const { togggleTheme, changeColor, theme } = useTheme()

  changeColor('violet')

  return (
    <Flex flex direction="column">
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
      <Flex flex overflow padding>
        <Flex align="start" justify="start">
          <Vehicles />
        </Flex>

        <Flex overflow flex>
          <Calculator />
        </Flex>
      </Flex>
    </Flex>
  )
}
