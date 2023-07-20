export const amountRegister = {
  required: {
    value: true,
    message: `Introduce un monto`,
  },
  maxLength: {
    value: 10,
    message: `El monto no puede tener más de 10 caracteres`,
  },
  minLength: {
    value: 1,
    message: `El monto debe tener al menos 1 caracteres`,
  },
}
