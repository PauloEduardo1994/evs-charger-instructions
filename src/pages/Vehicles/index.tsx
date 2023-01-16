import React, { useEffect, useRef, useState } from 'react'

import * as Yup from 'yup'

import { Card } from '@siakit/card'
import { Form, FormHandles, Select } from '@siakit/form-unform'
import { Heading } from '@siakit/heading'
import { Flex } from '@siakit/layout'
import { LinkButton } from '@siakit/link-button'
import { useLoading } from '@siakit/loading'
import { Separator } from '@siakit/separator'
import { Text } from '@siakit/text'

import { initialData } from '../../Data'
import getValidationErrors from '../../helpers/getValidationErrors'

export function Vehicles() {
  const formRef = useRef<FormHandles>(null)
  const [numberId, setNumberId] = useState<number | null>(null)
  const [carId, setCarId] = useState<number | null>(null)
  const [selectModels, setSelectModels] = useState<any>({})
  const [selectVehicles, setSelectVehicles] = useState<any>({})
  const [vehicleData, setVehicleData] = useState<any>({})
  const [showSelect, setShowSelect] = useState(false)
  const [showDataCar, setShowDataCar] = useState(false)
  const { setLoading } = useLoading()

  async function handleSubmit(result: any): Promise<any> {
    try {
      formRef.current?.setErrors({})

      const schema = Yup.object().shape({
        selectVehiclesBrand: Yup.string(),
      })

      await schema.validate(result, {
        abortEarly: false,
      })
    } catch (err) {
      if (err instanceof Yup.ValidationError) {
        const errors = getValidationErrors(err)

        formRef.current?.setErrors(errors)
      }
    } finally {
      console.log('finaly')
    }
  }

  useEffect(() => {
    async function loadBrands(): Promise<void> {
      setLoading(true)

      const response = initialData?.brandList?.brand.map((row) => {
        return {
          label: row.name,
          value: row.id,
        }
      })

      setSelectModels(response)

      setLoading(false)
    }

    loadBrands()
  }, [setLoading])

  useEffect(() => {
    async function loadVehicles(): Promise<void> {
      setLoading(true)

      const response = initialData?.brandList?.brand[
        Number(numberId)
      ].vehicles.map((row: any) => {
        return {
          label: row.name,
          value: row.id,
        }
      })

      setSelectVehicles(response)

      setLoading(false)
    }

    loadVehicles()
  }, [numberId, setLoading])

  useEffect(() => {
    async function loadVehiclesData(): Promise<void> {
      setLoading(true)

      if (carId) {
        const response = initialData?.brandList?.brand[
          Number(numberId)
        ].vehicles.find((id) => id.id === carId)

        setVehicleData(response)
        setShowDataCar(true)
      }

      setLoading(false)
    }

    loadVehiclesData()
  }, [numberId, setLoading, carId])

  function handleResetReseult() {
    setSelectVehicles([])
    formRef?.current?.setFieldValue('selectVehiclesBrand', [])
    setShowSelect(false)
    setVehicleData([])
    setShowDataCar(false)
  }

  return (
    <Flex direction="column">
      <Form flex overflow ref={formRef} onSubmit={handleSubmit}>
        <Flex flex overflow align="center">
          <Flex
            width={400}
            padding
            flex
            overflow
            direction="column"
            flexWrap="wrap"
            gap
          >
            <Select
              name="selectBrandVehicles"
              label="Marcas"
              placeholder="Selecione uma marca"
              options={selectModels}
              onChange={(value) => {
                if (value?.value) {
                  formRef?.current?.setFieldValue('selectVehiclesBrand', [])
                  setVehicleData([])
                  setShowDataCar(false)
                  setNumberId(Number(value?.value) - 1)
                  setShowSelect(true)
                } else if (!value?.value) {
                  handleResetReseult()
                }
              }}
            />
            <Select
              name="selectVehiclesBrand"
              label="Carros"
              placeholder="Selecione um carro"
              options={selectVehicles}
              disabled={!showSelect}
              onChange={(value) => {
                setCarId(Number(value?.value))
              }}
            />
          </Flex>
        </Flex>
      </Form>
      {showDataCar && (
        <>
          <Card
            align="center"
            justify="center"
            height={60}
            margin
            direction="column"
          >
            <Text>Image Here</Text>
          </Card>
          <Flex direction="column" margin>
            <Flex justify="between" align="center">
              <Text>Carro:</Text>
              <Heading size="xxs">{vehicleData.name}</Heading>
            </Flex>
            <Separator />
            <Flex justify="between" align="center">
              <Text>Preço aproximado:</Text>
              <Heading size="xxs">{vehicleData.price}</Heading>
            </Flex>
            <Separator />
            <Flex justify="between" align="center">
              <Text>Autonomia aproximada:</Text>
              <Heading size="xxs">{vehicleData.autonomy}</Heading>
            </Flex>
            <Separator />
            <Flex justify="between" align="center">
              <Text>Cavalo-vapor:</Text>
              <Heading size="xxs">{vehicleData.powerHorse}</Heading>
            </Flex>
            <Separator />
            <Flex justify="between" align="center">
              <Text>Aceleração 0/100h:</Text>
              <Heading size="xxs">{vehicleData.acceleration}</Heading>
            </Flex>
            <Separator />
            <Flex justify="between" align="center">
              <Text>Tração:</Text>
              <Heading size="xxs">{vehicleData.traction}</Heading>
            </Flex>
            <Separator />
            <Flex justify="between" align="center">
              <Text>Abastecimento:</Text>
              <Heading size="xxs">{vehicleData.fuel}</Heading>
            </Flex>
            <Separator />
            <Flex justify="between" align="center">
              <Text>Capacidade máxima da bateria:</Text>
              <Heading size="xxs">{vehicleData.batterySize}</Heading>
            </Flex>
            <Separator />
            <Flex justify="between" align="center">
              <Text>Velocidade máxima:</Text>
              <Heading size="xxs">{vehicleData.maximumSpeed}</Heading>
            </Flex>
            <Separator />
            <Flex justify="between" align="center">
              <Text>Torque:</Text>
              <Heading size="xxs">{vehicleData.torque}</Heading>
            </Flex>
            <Separator />
            <LinkButton
              type="button"
              onClick={() => window.open(vehicleData.font)}
            >
              Fonte
            </LinkButton>
          </Flex>
        </>
      )}
    </Flex>
  )
}
