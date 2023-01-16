import React, { useEffect, useRef, useState } from 'react'

import * as Yup from 'yup'

import { Form, FormHandles, Select } from '@siakit/form-unform'
import { Flex } from '@siakit/layout'
import { useLoading } from '@siakit/loading'

import { initialData } from '../../Data'
import getValidationErrors from '../../helpers/getValidationErrors'

export function Vehicles() {
  const formRef = useRef<FormHandles>(null)
  const [numberId, setNumberId] = useState<number | null>(null)
  const [selectModels, setSelectModels] = useState<any>({})
  const [selectVehicles, setSelectVehicles] = useState<any>({})
  const [showSelect, setShowSelect] = useState(false)
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

      const listBrand = initialData?.brandList?.brand.map((row) => {
        return {
          label: row.name,
          value: row.id,
        }
      })

      setSelectModels(listBrand)

      setLoading(false)
    }

    loadBrands()
  }, [setLoading])

  useEffect(() => {
    async function loadVehicles(): Promise<void> {
      formRef?.current?.setFieldValue('selectVehiclesBrand', [])
      setLoading(true)

      const listVehicle = initialData?.brandList?.brand[
        Number(numberId)
      ].vehicles.map((row: any) => {
        return {
          label: row.name,
          value: row.id,
        }
      })

      setSelectVehicles(listVehicle)

      setLoading(false)
    }

    loadVehicles()
  }, [numberId, setLoading])

  function handleResetReseult() {
    setSelectVehicles([])
    formRef?.current?.setFieldValue('selectVehiclesBrand', [])
    setShowSelect(false)
  }

  return (
    <Flex>
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
                  setNumberId(Number(value?.value) - 1)
                  setShowSelect(true)
                } else if (!value?.value) {
                  handleResetReseult()
                }
                console.log(numberId)
              }}
            />
            <Select
              name="selectVehiclesBrand"
              label="Carros"
              placeholder="Selecione um carro"
              options={selectVehicles}
              disabled={!showSelect}
            />
          </Flex>
        </Flex>
      </Form>
    </Flex>
  )
}
