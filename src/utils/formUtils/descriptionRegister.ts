export const descriptionRegister = {
  required: {
    value: true,
    message: `Introduce una descripción`,
  },
  maxLength: {
    value: 70,
    message: `La descripción no puede tener más de 70 caracteres`,
  },

  minLength: {
    value: 5,
    message: `La descripción no puede tener menos de 5 caracteres`,
  },
}
