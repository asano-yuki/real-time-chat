import { useState } from 'react'
import axios from 'axios'
import type { UserResponse } from '../types/user'

export const useUser = () => {
  const [user, setUser] = useState<UserResponse>()

  const createUser = async (userName: string) => {
    const res = await axios.post<UserResponse>('http://localhost:3001/user/create', {
      name: userName
    })
    setUser(res.data)
    return res.data
  }

  const deleteUser = () => {
    setUser(undefined)
  }

  return {
    user,
    createUser,
    deleteUser
  }
}
