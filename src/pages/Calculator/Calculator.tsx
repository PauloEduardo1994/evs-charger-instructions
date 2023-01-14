import React, { useState, useRef } from 'react'
import Lottie from 'react-lottie'

import Confetti from 'canvas-confetti'
import * as Yup from 'yup'

import { Button } from '@siakit/button'
import { Card } from '@siakit/card'
import { Footer } from '@siakit/footer'
import {
  Form,
  NumberInput,
  Select,
  MoneyInput,
  FormHandles,
} from '@siakit/form-unform'
import { Flex } from '@siakit/layout'
import { LinkButton } from '@siakit/link-button'
import { Modal, ModalContent } from '@siakit/modal'
import { Separator } from '@siakit/separator'
import { Text } from '@siakit/text'

import getValidationErrors from '../../helpers/getValidationErrors'
import Charger from '../../lottie/charger.json'

export function Calculator() {
  const formRef = useRef<FormHandles>(null)
  const [priceCharger, setPriceCharger] = useState(0)
  const [hourCharger, setHourCharger] = useState('00')
  const [minutesCharger, setMinutesCharger] = useState('00')
  const [priceForKm, setPriceForKm] = useState(0)
  const [powerChargerCv, setPowerChargerCv] = useState(0)
  const [clientPowerCharger, setClientPowerCharger] = useState(false)
  const [modalVisible, setModalVisible] = useState(false)

  async function handleSubmit(result: any): Promise<any> {
    try {
      formRef.current?.setErrors({})

      if (clientPowerCharger === true) {
        const schema = Yup.object().shape({
          selectCharger: Yup.string().required('Campo obrigatório').nullable(),
          chargerPower: Yup.string().required('Campo obrigatório').nullable(),
          batterySize: Yup.string().required('Campo obrigatório'),
          energyCost: Yup.string().required('Campo obrigatório'),
          carAutonomy: Yup.string().required('Campo obrigatório'),
        })

        await schema.validate(result, {
          abortEarly: false,
        })
      } else {
        const schema = Yup.object().shape({
          selectCharger: Yup.string().required('Campo obrigatório').nullable(),
          batterySize: Yup.string().required('Campo obrigatório'),
          energyCost: Yup.string().required('Campo obrigatório'),
          carAutonomy: Yup.string().required('Campo obrigatório'),
        })

        await schema.validate(result, {
          abortEarly: false,
        })
      }

      const total =
        result.batterySize *
        parseFloat(result.energyCost.replace('.', '').replace(',', '.'))
      const resultPriceOfCharger = total

      const resultPriceForKm = total / result.carAutonomy

      let resultSelectCharger = result.selectCharger

      const clientCharger = result.chargerPower

      if (resultSelectCharger === '7kwh') {
        resultSelectCharger = 7
      } else if (resultSelectCharger === '11kwh') {
        resultSelectCharger = 11
      } else if (resultSelectCharger === 'portable7') {
        resultSelectCharger = 7
      } else if (resultSelectCharger === 'client') {
        resultSelectCharger = clientCharger
        setClientPowerCharger(true)
      }

      const resultTimeForCharger =
        (result.batterySize / resultSelectCharger) * 60

      const hour = String(Math.floor(resultTimeForCharger / 60)).padStart(
        2,
        '0',
      )
      const minutes = String(Math.floor(resultTimeForCharger % 60)).padStart(
        2,
        '0',
      )

      const powerCar = Math.floor(
        result.batterySize *
          parseFloat('1,36'.replace('.', '').replace(',', '.')),
      )

      const end = Date.now() + 1 * 500

      // go Buckeyes!
      const colors = ['#B444F2', '#44F545']

      ;(function Frame() {
        Confetti({
          particleCount: 2,
          angle: 60,
          spread: 55,
          origin: { x: 0 },
          colors,
        })
        Confetti({
          particleCount: 2,
          angle: 120,
          spread: 55,
          origin: { x: 1 },
          colors,
        })

        if (Date.now() < end) {
          requestAnimationFrame(Frame)
        }
      })()

      setPowerChargerCv(powerCar)
      setPriceCharger(resultPriceOfCharger)
      setHourCharger(hour)
      setMinutesCharger(minutes)
      setPriceForKm(resultPriceForKm)
    } catch (err) {
      if (err instanceof Yup.ValidationError) {
        const errors = getValidationErrors(err)

        formRef.current?.setErrors(errors)
      }
    } finally {
      console.log('finaly')
    }
  }

  function handleResetReseult(): any {
    setPriceCharger(0)
    setHourCharger('00')
    setMinutesCharger('00')
    setPriceForKm(0)
    formRef?.current?.reset()
    setClientPowerCharger(false)
    formRef?.current?.setFieldValue('chargerPower', '')
    setPowerChargerCv(0)
  }

  return (
    <>
      <Modal open={modalVisible} onOpenChange={() => setModalVisible(false)}>
        <ModalContent
          title="Como converter a potência do carro elétrico"
          size="md"
        >
          <Flex padding>
            <Text>
              {/* O motor ou os motores elétricos dos carros zero combustão
              geralmente têm sua potência informada em kW (quilowatt). Cada kW
              equivale a 1,36 cv (cavalos-vapor), a medida mais comum usada no
              mercado brasileiro. O recém-lançado Renault Kwid E-Tech, por
              exemplo, gera 48 kW, o que significaria 65 cv de potência. */}
            </Text>
          </Flex>
        </ModalContent>
      </Modal>
      <Flex flex overflow direction="column" flexWrap="wrap">
        <Form flex overflow ref={formRef} onSubmit={handleSubmit}>
          <Flex flex overflow align="center">
            <Card flex overflow direction="column" flexWrap="wrap" gap>
              <Flex gap direction="column" padding>
                <Select
                  name="selectCharger"
                  label="Selecione o carregador *"
                  placeholder="Ex: Wallbox 7kWh"
                  onChange={(value: any) => {
                    if (value.value === 'client') {
                      setClientPowerCharger(true)
                    } else {
                      setClientPowerCharger(false)
                      formRef?.current?.setFieldValue('chargerPower', '')
                    }
                    if (value.value === null) {
                      setClientPowerCharger(false)
                      formRef?.current?.setFieldValue('chargerPower', '')
                    }
                  }}
                  options={[
                    {
                      label: 'Wallbox 7 kWh',
                      value: '7kwh',
                    },
                    {
                      label: 'Wallbox 11 kWh',
                      value: '11kwh',
                    },
                    {
                      label: 'Carregador portatil 32A 7 kWh',
                      value: 'portable7',
                    },
                    {
                      label: 'Carregador do cliente',
                      value: 'client',
                    },
                  ]}
                />
                <NumberInput
                  label="Potência do carregador *"
                  name="chargerPower"
                  placeholder="Ex: 7 kWh"
                  disabled={!clientPowerCharger}
                />
                <MoneyInput
                  label="Preço médio da energia *"
                  name="energyCost"
                />
                <NumberInput
                  label="Tamanho da bateria do carro *"
                  name="batterySize"
                  placeholder="Ex: 70 kW (Quilowatt)"
                />
                <NumberInput
                  label="Autonomia do carro"
                  name="carAutonomy"
                  placeholder="Ex: 500 km"
                />
              </Flex>
              <Footer>
                <Button
                  variant="ghost"
                  colorScheme="red"
                  type="button"
                  onClick={handleResetReseult}
                >
                  Limpar
                </Button>
                <Button type="submit">Calcular</Button>
              </Footer>
            </Card>
            <Flex
              flex
              flexWrap="wrap"
              direction="column"
              gap={8}
              padding
              width={420}
            >
              <Flex justify="between">
                <Text>Preço médio para carga completa:</Text>
                <Text>
                  {priceCharger.toLocaleString('PT-BR', {
                    minimumFractionDigits: 2,
                    style: 'currency',
                    currency: 'BRL',
                  })}
                </Text>
              </Flex>
              <Separator />
              <Flex align="center" justify="between">
                <Text>Tempo médio para carga completa:</Text>
                <Text>
                  {hourCharger}:{minutesCharger} Horas
                </Text>
              </Flex>
              <Separator />
              <Flex align="center" justify="between">
                <Text>Valor pago por km rodado:</Text>
                <Text>
                  {priceForKm.toLocaleString('PT-BR', {
                    minimumFractionDigits: 2,
                    style: 'currency',
                    currency: 'BRL',
                  })}
                </Text>
              </Flex>
              <Separator />
              <Flex align="center" justify="between">
                <Text>Potência do motor equivalente a:</Text>
                <Flex align="center" gap={8}>
                  <Text>{powerChargerCv}</Text>
                  <LinkButton
                    type="button"
                    onClick={() => setModalVisible(true)}
                  >
                    Cavalos-vapor
                  </LinkButton>
                </Flex>
              </Flex>
              <Flex>
                <Lottie
                  height={268}
                  width={268}
                  isPaused={false}
                  isStopped={false}
                  isClickToPauseDisabled
                  options={{
                    autoplay: true,
                    loop: true,
                    animationData: Charger,
                    rendererSettings: {
                      preserveAspectRatio: 'xMidYMid slice',
                    },
                  }}
                />
              </Flex>
            </Flex>
          </Flex>
        </Form>
      </Flex>
    </>
  )
}
