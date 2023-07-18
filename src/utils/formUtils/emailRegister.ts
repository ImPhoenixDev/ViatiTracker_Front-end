export const emailRegister = {
  required: {
    value: true,
    message: `Introduce un email`,
  },
  pattern: {
    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
    message: `Introduce un email válido`,
  },
  maxLength: {
    value: 50,
    message: `El email no puede tener más de 50 caracteres`,
  },

  minLength: {
    value: 5,
    message: `El email debe tener al menos 5 caracteres`,
  },
}
