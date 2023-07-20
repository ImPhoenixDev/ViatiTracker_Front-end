import { ReactNode } from 'react'
import { navigate } from 'gatsby'
import BackComponent from '../backComponent/BackComponent'
import CardSection from '../cardSection/CardSection'
import ChipRadioGroup from '../chipRadioGroup/ChipRadioGroup'
import ImageUpload from '../imageUploadState/ImageUploadState'
import WebcamCapture from '../webcamCapture/WebcamCapture'
import CardTitle from '../cardTitle/CardTitle'
import TextFieldWrapper from '../textFieldWrapper/TextFieldWrapper'
import FormWrapper from '../formWrapper/FormWrapper'

import { emailRegister } from '../../utils/formUtils/emailRegister'
import { amountRegister } from '@/utils/formUtils/amountRegister'
import AmountComponent from '../formComponents/amountComponent/AmountComponent'

type CreateExpenseProps = {
  path: string
  children?: ReactNode
}

export default function CreateExpense({ path }: CreateExpenseProps) {
  const onSubmit = (data) => {
    console.log(data)
    console.log(path)
  }

  return (
    <section className="login flex flex-col px-4 py-8 pt-0 h-screen lg:w-3/6 m-auto xl:w-1/6 bg-[#F9F9FB]">
      <BackComponent path="/app/dashboard" />

      <CardSection>
        <CardTitle>Crear gasto</CardTitle>

        <FormWrapper onSubmit={onSubmit}>
          <TextFieldWrapper
            label="Email"
            name="email"
            registerOptions={emailRegister}
          />

          <AmountComponent
            label="Monto"
            name="amount"
            registerOptions={amountRegister}
          />

          <button type="submit">Submit</button>
        </FormWrapper>

        <ImageUpload />
        <ChipRadioGroup />
        <WebcamCapture />
        <button
          className="group relative h-12 w-10/12 mb-4 overflow-hidden rounded-2xl bg-primary text-lg font-bold text-white"
          onClick={() => {
            navigate(`/app/dashboard`)
          }}
        >
          Enviar gasto
          <div className="absolute inset-0 h-full w-full scale-0 rounded-2xl transition-all duration-300 group-hover:scale-100 group-hover:bg-white/30"></div>
        </button>
      </CardSection>
    </section>
  )
}
