import { useState } from 'react'

export const useForm = inititalValues => {
  const [ form, setForm ] = useState(inititalValues)

  const onChange = (name, value) => {
    const newForm = {...form, [name]: value}
    setForm(newForm)
  }

  const clear = () => {
    setForm(inititalValues)
  }

  return { form, onChange, clear}
}
