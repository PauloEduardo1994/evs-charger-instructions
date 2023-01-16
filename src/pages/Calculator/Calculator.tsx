import React, { useState, useRef } from 'react'
import Lottie from 'react-lottie'

import Confetti from 'canvas-confetti'
import {
  Atom,
  BatteryCharging,
  BatteryFull,
  BatteryHigh,
  BatteryLow,
  BatteryMedium,
  Lightning,
} from 'phosphor-react'
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
import { Heading } from '@siakit/heading'
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
  const [specifications, setSpecifications] = useState('')
  const [clientPowerCharger, setClientPowerCharger] = useState(false)
  const [modalVisible, setModalVisible] = useState(false)
  const [showLeftData, setShowLeftData] = useState(false)

  const [sevenKwh, setSevenKwh] = useState('00')
  const [sevenKwhMinutes, setSevenKwhMinutes] = useState('00')
  const [sevenAndSixKwh, setSevenAndSixKwh] = useState('00')
  const [sevenAndSixKwhMinutes, setSevenAndSixKwhMinutes] = useState('00')
  const [elevenKwh, setElevenKwh] = useState('00')
  const [elevenKwhMinutes, setElevenKwhMinutes] = useState('00')
  const [twentyTwoKwh, setTwentyTwoKwh] = useState('00')
  const [twentyTwoKwhMinutes, setTwentyTwoKwhMinutes] = useState('00')
  const [fortyKwh, setFortyKwh] = useState('00')
  const [fortyKwhMinutes, setFortyKwhMinutes] = useState('00')
  const [oneHundredFiftyKwh, setOneHundredFiftyKwh] = useState('00')
  const [oneHundredFiftyKwhMinutes, setOneHundredFiftyKwhMinutes] =
    useState('00')

  async function handleSubmit(result: any): Promise<any> {
    try {
      formRef.current?.setErrors({})

      if (clientPowerCharger === true) {
        const schema = Yup.object().shape({
          selectCharger: Yup.string().required('Campo obrigatório').nullable(),
          chargerPower: Yup.string().required('Campo obrigatório').nullable(),
          amperCharger: Yup.string().required('Campo obrigatório'),
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
        setSpecifications('6')
      } else if (resultSelectCharger === '11kwh') {
        resultSelectCharger = 11
        setSpecifications('6')
      } else if (resultSelectCharger === 'portable7') {
        resultSelectCharger = 7
        setSpecifications('6')
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

      setShowLeftData(true)

      if (result.amperCharger <= 0) {
        setSpecifications('')
      } else if (result.amperCharger <= 15) {
        setSpecifications('1,5')
      } else if (result.amperCharger > 15 && result.amperCharger <= 21) {
        setSpecifications('2,5')
      } else if (result.amperCharger > 21 && result.amperCharger <= 28) {
        setSpecifications('4')
      } else if (result.amperCharger > 28 && result.amperCharger <= 36) {
        setSpecifications('6')
      } else if (result.amperCharger > 36 && result.amperCharger <= 50) {
        setSpecifications('10')
      } else if (result.amperCharger > 50 && result.amperCharger <= 68) {
        setSpecifications('16')
      } else if (result.amperCharger > 68 && result.amperCharger <= 89) {
        setSpecifications('25')
      } else if (result.amperCharger > 89 && result.amperCharger <= 171) {
        setSpecifications('70')
      } else if (result.amperCharger > 171) {
        setSpecifications('Indisponível')
      }

      const hourTen = String(
        Math.floor(((result.batterySize / 7) * 60) / 60),
      ).padStart(2, '0')
      const minutesTen = String(
        Math.floor(((result.batterySize / 7) * 60) % 60),
      ).padStart(2, '0')

      const hourSevenAndSix = String(
        Math.floor(((result.batterySize / 7.6) * 60) / 60),
      ).padStart(2, '0')

      const minutesSevenAndSix = String(
        Math.floor(((result.batterySize / 7.6) * 60) % 60),
      ).padStart(2, '0')

      const elevenKwhHour = String(
        Math.floor(((result.batterySize / 11) * 60) / 60),
      ).padStart(2, '0')

      const elevenKwhMinutes = String(
        Math.floor(((result.batterySize / 11) * 60) % 60),
      ).padStart(2, '0')

      const twentyTwoHour = String(
        Math.floor(((result.batterySize / 22) * 60) / 60),
      ).padStart(2, '0')

      const twentyTwoMinutes = String(
        Math.floor(((result.batterySize / 22) * 60) % 60),
      ).padStart(2, '0')

      const fortyHour = String(
        Math.floor(((result.batterySize / 40) * 60) / 60),
      ).padStart(2, '0')

      const fortyMinutes = String(
        Math.floor(((result.batterySize / 40) * 60) % 60),
      ).padStart(2, '0')

      const oneHundredAndFiftyHour = String(
        Math.floor(((result.batterySize / 150) * 60) / 60),
      ).padStart(2, '0')

      const oneHundredAndFiftyMinutes = String(
        Math.floor(((result.batterySize / 150) * 60) % 60),
      ).padStart(2, '0')

      setPriceCharger(resultPriceOfCharger)
      setHourCharger(hour)
      setMinutesCharger(minutes)
      setPriceForKm(resultPriceForKm)

      setSevenKwh(hourTen)
      setSevenAndSixKwh(hourSevenAndSix)
      setElevenKwh(elevenKwhHour)
      setTwentyTwoKwh(twentyTwoHour)
      setFortyKwh(fortyHour)
      setOneHundredFiftyKwh(oneHundredAndFiftyHour)

      setSevenKwhMinutes(minutesTen)
      setSevenAndSixKwhMinutes(minutesSevenAndSix)
      setElevenKwhMinutes(elevenKwhMinutes)
      setTwentyTwoKwhMinutes(twentyTwoMinutes)
      setFortyKwhMinutes(fortyMinutes)
      setOneHundredFiftyKwhMinutes(oneHundredAndFiftyMinutes)
    } catch (err) {
      if (err instanceof Yup.ValidationError) {
        const errors = getValidationErrors(err)

        formRef.current?.setErrors(errors)
      }
    } finally {
      console.log('finaly')
    }
  }

  function handleResetReseult() {
    setPriceCharger(0)
    setHourCharger('00')
    setMinutesCharger('00')
    setPriceForKm(0)
    formRef?.current?.reset()
    setClientPowerCharger(false)
    formRef?.current?.setFieldValue('chargerPower', '')
    setSpecifications('')
    setShowLeftData(false)
  }

  return (
    <Flex flex>
      <Modal open={modalVisible} onOpenChange={() => setModalVisible(false)}>
        <ModalContent title="BITOLAS X USOS" size="sm">
          <Flex padding gap justify="center">
            <Flex direction="column" align="end" justify="end">
              <Heading>Bitola</Heading>
              <Text>1,5 mm²</Text>
              <Text>2,5 mm²</Text>
              <Text>4 mm²</Text>
              <Text>6 mm²</Text>
              <Text>10 mm²</Text>
              <Text>16 mm²</Text>
              <Text>25 mm²</Text>
              <Text>70 mm²</Text>
            </Flex>
            <Flex direction="column" align="end" justify="end">
              <Heading>{''}</Heading>
              <Text>-</Text>
              <Text>-</Text>
              <Text>-</Text>
              <Text>-</Text>
              <Text>-</Text>
              <Text>-</Text>
              <Text>-</Text>
              <Text>-</Text>
            </Flex>
            <Flex direction="column" align="start">
              <Heading>Uso Indicado</Heading>
              <Text>Circuitos com corrente máxima de 15,5 Ampères (A)</Text>
              <Text>Circuitos com corrente máxima de 21 Ampères (A)</Text>
              <Text>Circuitos com corrente máxima de 28 Ampères (A)</Text>
              <Text>Circuitos com corrente máxima de 36 Ampères (A)</Text>
              <Text>Circuitos com corrente máxima de 50 Ampères (A)</Text>
              <Text>Circuitos com corrente máxima de 68 Ampères (A)</Text>
              <Text>Circuitos com corrente máxima de 89 Ampères (A)</Text>
              <Text>Circuitos com corrente máxima de 171 Ampères (A)</Text>
            </Flex>
          </Flex>
          <Footer>
            <Button type="button" onClick={() => setModalVisible(false)}>
              Ok
            </Button>
          </Footer>
        </ModalContent>
      </Modal>
      <Flex
        flex
        overflow
        direction="column"
        flexWrap="wrap"
        align="center"
        justify="center"
      >
        <Form flex overflow ref={formRef} onSubmit={handleSubmit}>
          <Flex flex overflow align="center">
            <Card width={360} overflow direction="column" flexWrap="wrap" gap>
              <Flex gap direction="column" padding>
                <Select
                  name="selectCharger"
                  label="Selecione o carregador *"
                  placeholder="Ex: Wallbox 7kWh"
                  onChange={(value: any) => {
                    if (value?.value === 'client') {
                      setClientPowerCharger(true)
                    } else {
                      setClientPowerCharger(false)
                      formRef?.current?.setFieldValue('chargerPower', '')
                      formRef?.current?.setFieldValue('amperCharger', '')
                    }
                    if (value?.value === null) {
                      setClientPowerCharger(false)
                      formRef?.current?.setFieldValue('amperCharger', '')
                      formRef?.current?.setFieldValue('chargerPower', '')
                    }
                    console.log(value.value)
                  }}
                  options={[
                    {
                      label: 'Wallbox 7 kWh 32A',
                      value: '7kwh',
                    },
                    {
                      label: 'Wallbox 11 kWh 32A',
                      value: '11kwh',
                    },
                    {
                      label: 'Carregador portatil 7 kWh 32A',
                      value: 'portable7',
                    },
                    {
                      label: 'Carregador do cliente',
                      value: 'client',
                    },
                  ]}
                />
                <NumberInput
                  label="kWh *"
                  name="chargerPower"
                  placeholder="Ex: 7 kWh"
                  disabled={!clientPowerCharger}
                />
                <NumberInput
                  label="Amperagem *"
                  name="amperCharger"
                  placeholder="Ex: 32 A"
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
              flexWrap="wrap"
              direction="column"
              gap={8}
              padding
              width={380}
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
                <Text>Bitola de fio recomendada:</Text>
                <Flex align="center" gap={8}>
                  <Text>{specifications}</Text>
                  <LinkButton
                    type="button"
                    onClick={() => setModalVisible(true)}
                  >
                    mm²
                  </LinkButton>
                </Flex>
              </Flex>
              <Flex>
                <Lottie
                  height={330}
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
      <Flex width={280} direction="column" padding="16px 16px 16px 0" gap>
        {showLeftData && (
          <>
            <Flex gap>
              <Lightning size={32} />
              <Heading>Carregadores</Heading>
            </Flex>
            <Flex direction="column" margin="16px 0 0 0">
              <Flex justify="center">
                <Text>Tempo aproximado</Text>
              </Flex>
              <Flex align="center" justify="between">
                <Flex gap={8} align="center">
                  <BatteryLow size={22} />
                  <Heading size="xxs">7 kWh</Heading>
                </Flex>
                <Text>
                  {sevenKwh}:{sevenKwhMinutes} Horas
                </Text>
              </Flex>
              <Flex align="center" justify="between">
                <Text>32A Bitola de fio:</Text>
                <Text>6 mm²</Text>
              </Flex>
              <Separator />

              <Flex align="center" justify="between">
                <Flex gap={8} align="center">
                  <BatteryMedium size={22} />
                  <Heading size="xxs">7.6 kWh</Heading>
                </Flex>
                <Text>
                  {sevenAndSixKwh}:{sevenAndSixKwhMinutes} Horas
                </Text>
              </Flex>
              <Flex align="center" justify="between">
                <Text>32A Bitola de fio:</Text>
                <Text>6 mm²</Text>
              </Flex>
              <Separator />

              <Flex align="center" justify="between">
                <Flex gap={8} align="center">
                  <BatteryHigh size={22} />
                  <Heading size="xxs">11 kWh</Heading>
                </Flex>
                <Text>
                  {elevenKwh}:{elevenKwhMinutes} Horas
                </Text>
              </Flex>
              <Flex align="center" justify="between">
                <Text>16A 380V Bitola de fio:</Text>
                <Text>2,5 mm²</Text>
              </Flex>
              <Separator />

              <Flex align="center" justify="between">
                <Flex gap={8} align="center">
                  <BatteryFull size={22} />
                  <Heading size="xxs">22 kWh</Heading>
                </Flex>
                <Text>
                  {twentyTwoKwh}:{twentyTwoKwhMinutes} Horas
                </Text>
              </Flex>
              <Flex align="center" justify="between">
                <Text>32A 380V Bitola de fio:</Text>
                <Text>6 mm²</Text>
              </Flex>
              <Separator />

              <Flex align="center" justify="between">
                <Flex gap={8} align="center">
                  <BatteryCharging size={22} />
                  <Heading size="xxs">40 kWh</Heading>
                </Flex>
                <Text>
                  {fortyKwh}:{fortyKwhMinutes} Horas
                </Text>
              </Flex>
              <Flex align="center" justify="between">
                <Text>Somente em eletroposto:</Text>
                <LinkButton
                  type="button"
                  onClick={() =>
                    window.open(
                      'https://www.tratorprima.com.br/innovaeditor/assets/tabela%20de%20consumo%20de%20energia.pdf',
                    )
                  }
                >
                  Tabelas
                </LinkButton>
              </Flex>
              <Separator />

              <Flex align="center" justify="between">
                <Flex gap={8} align="center">
                  <Atom size={22} />
                  <Heading size="xxs">150 kWh</Heading>
                </Flex>
                <Text>
                  {oneHundredFiftyKwh}:{oneHundredFiftyKwhMinutes} Horas
                </Text>
              </Flex>
              <Flex align="center" justify="between">
                <Text>Somente em eletroposto:</Text>
                <LinkButton
                  type="button"
                  onClick={() =>
                    window.open(
                      'https://www.tratorprima.com.br/innovaeditor/assets/tabela%20de%20consumo%20de%20energia.pdf',
                    )
                  }
                >
                  Tabelas
                </LinkButton>
              </Flex>
            </Flex>
          </>
        )}
      </Flex>
    </Flex>
  )
}
