export const dateRegister = {
  required: {
    value: true,
    message: `Introduce una fecha en el formato dd/mm/aaaa`,
  },
  pattern: {
    value: /(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[1,2])\/(19|20)\d{2}/,
    message: `Introduce una fecha en el formato dd/mm/aaaa`,
  },
}
