import React, { useState, useEffect } from 'react'
import { FormControl, InputLabel, MenuItem, Select } from '@mui/material'
import { useFormContext } from 'react-hook-form'

import { AxiosResponse } from 'axios'
import getAllUsers from '@/services/CRUD/getAllUsers'

export type User = {
  id: number
  id_passage: string
  phone: string
  email: string
  hashed_password: string
  name: string
  role: string
}

interface UserSelectProps {
  name: string
  optional?: boolean
}

const UserSelectorComponent: React.FC<UserSelectProps> = ({
  name,
  optional = false,
}) => {
  const [users, setUsers] = useState<User[]>([] as User[])
  const { register, watch, setValue, unregister } = useFormContext()
  const selectedUser = watch(name)

  // Fetch users when component mounts
  useEffect(() => {
    getAllUsers()
      .then((response: AxiosResponse) => {
        setUsers(response.data)
        if (!optional && response.data[0]) {
          setValue(name, response.data[0].id)
        }
      })
      .catch((error) => {
        console.log(error)
        alert(`Server error. Please try again later.`)
      })

    return () => {
      unregister(name)
    }
  }, [unregister, setValue, name, optional])

  // Callback function to handle change
  const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    const userId = event.target.value as number
    setValue(name, userId)
  }

  return (
    <FormControl variant="standard" sx={{ minWidth: `100%` }}>
      <InputLabel id="demo-simple-select-standard-label">
        Líder {optional ? `(opcional)` : ``}
      </InputLabel>
      <Select
        {...register(
          name,
          optional ? undefined : { required: `Líder es requerido` },
        )}
        labelId="demo-simple-select-standard-label"
        id="demo-simple-select-standard"
        value={selectedUser || ``}
        onChange={handleChange}
        label="Age"
      >
        {optional && <MenuItem value="">Traer todos</MenuItem>}
        {users.map((user: User) => (
          <MenuItem key={user.id} value={user.id}>
            {user.name}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  )
}

export default UserSelectorComponent
