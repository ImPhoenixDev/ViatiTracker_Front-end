import { Button } from '@mui/material'

import BackComponent from '../backComponent/BackComponent'
import CardSection from '../cardSection/CardSection'
import CardTitle from '../cardTitle/CardTitle'
import FormWrapper from '../formWrapper/FormWrapper'
import TextFieldWrapper from '../textFieldWrapper/TextFieldWrapper'
import ImageUploadState from '../imageUploadState/ImageUploadState'

type DepositType = {
  user_id: number
  date: string
  picture: string
  description: string
  category: string
  amount: number
}

export default function CreateNewDeposit() {
  function handleSubmit(data: DepositType) {
    console.log(data)
  }
  return (
    <section className="login flex flex-col px-4 py-8 pt-0 h-screen lg:w-3/6 m-auto xl:w-1/6 bg-[#F9F9FB]">
      <BackComponent path="/app/dashboard" />
      <CardSection>
        <CardTitle>Crear deposito</CardTitle>
        <FormWrapper onSubmit={handleSubmit}>
          <TextFieldWrapper
            name="user_id"
            label="Lider de equipo"
            registerOptions={{ required: true }}
          />
          <TextFieldWrapper
            name="amount"
            label="Monto"
            registerOptions={{ required: true }}
          />
          <TextFieldWrapper
            name="date"
            label="Fecha"
            registerOptions={{ required: true }}
          />
          <ImageUploadState imageRegister={{ required: true }} name="picture" />

          <div className="buttons flex justify-between items-end w-full grow">
            <button type="submit" className="mx-0 h-12 w-full">
              <Button
                variant="contained"
                component="span"
                className="whitespace-nowrap text-sm sans !bg-primary !w-full"
              >
                Crear
              </Button>
            </button>
          </div>
        </FormWrapper>
      </CardSection>
    </section>
  )
}
