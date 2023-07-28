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
}

const UserSelectorComponent: React.FC<UserSelectProps> = ({ name }) => {
  const [users, setUsers] = useState<User[]>([] as User[])
  const { register, watch, setValue, unregister } = useFormContext()
  const selectedUser = watch(name)

  // Fetch users when component mounts
  useEffect(() => {
    getAllUsers()
      .then((response: AxiosResponse) => {
        setUsers(response.data)
        if (response.data[0]) {
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
  }, [unregister, setValue, name])

  // Callback function to handle change
  const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    const userId = event.target.value as number
    setValue(name, userId)
  }

  return (
    <FormControl variant="standard" sx={{ minWidth: `100%` }}>
      <InputLabel id="demo-simple-select-standard-label">Líder</InputLabel>
      <Select
        {...register(name, { required: `Líder es requerido` })}
        labelId="demo-simple-select-standard-label"
        id="demo-simple-select-standard"
        value={selectedUser || ``}
        onChange={handleChange}
        label="Age"
      >
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
