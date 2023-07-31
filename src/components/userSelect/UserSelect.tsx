import React, { useState, useEffect } from 'react'
import { FormControl, InputLabel, MenuItem, Select } from '@mui/material'

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
  onSelect: (userId: number) => void
}

const UserSelect: React.FC<UserSelectProps> = ({ onSelect }) => {
  const [users, setUsers] = useState<User[]>([] as User[])
  const defaultUserSelected = Number(sessionStorage.getItem(`userSelected`))
  const [selectedUser, setSelectedUser] = useState<number | null>(
    defaultUserSelected,
  )

  // Fetch users when component mounts
  useEffect(() => {
    getAllUsers()
      .then((response: AxiosResponse) => {
        setUsers(response.data)
        setSelectedUser(response.data[0].id)
      })
      .catch((error) => {
        console.log(error)
        alert(`Server error. Please try again later.`)
      })
  }, [])

  // Callback function to handle change
  const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    const userId = event.target.value as number
    setSelectedUser(userId)
    onSelect(userId) // Call the callback function with the selected user id
  }

  return (
    <FormControl variant="standard" sx={{ minWidth: `100%` }}>
      <InputLabel id="demo-simple-select-standard-label">Líder</InputLabel>
      <Select
        labelId="demo-simple-select-standard-label"
        id="demo-simple-select-standard"
        value={selectedUser || ``}
        onChange={handleChange}
        label="Age"
      >
        {users.map((user) => (
          <MenuItem key={user.id} value={user.id}>
            {user.name}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  )
}

export default UserSelect
