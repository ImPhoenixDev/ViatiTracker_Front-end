export default {
  required: {
    value: true,
    message: `Introduce un motivo de rechazo`,
  },
  maxLength: {
    value: 100,
    message: `El motivo de rechazo no puede superar los 100 caracteres`,
  },
  minLength: {
    value: 10,
    message: `El motivo de rechazo debe tener al menos 10 caracteres`,
  },
}
