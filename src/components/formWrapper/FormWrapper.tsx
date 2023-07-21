import { ReactElement } from 'react'
import { useForm, FieldValues, FormProvider } from 'react-hook-form'

interface FormWrapperProps<T extends FieldValues> {
  children: ReactElement | ReactElement[]
  onSubmit: (data: T) => void
  readOnlyData?: Partial<T>
}

const FormWrapper = <T extends FieldValues>({
  children,
  onSubmit,
  readOnlyData = {}, // add this line
}: FormWrapperProps<T>): ReactElement => {
  const methods = useForm<T>({
    defaultValues: readOnlyData,
  })

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)}>{children}</form>
    </FormProvider>
  )
}

export default FormWrapper
