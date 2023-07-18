import React, { ReactElement } from 'react'
import { useForm, FieldValues, FormProvider } from 'react-hook-form'

interface FormWrapperProps {
  children: ReactElement | ReactElement[]
  onSubmit: (data: FieldValues) => void
}

const FormWrapper: React.FC<FormWrapperProps> = ({ children, onSubmit }) => {
  const methods = useForm()

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)}>{children}</form>
    </FormProvider>
  )
}

export default FormWrapper
