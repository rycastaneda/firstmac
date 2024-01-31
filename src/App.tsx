import { useState, useCallback } from 'react'
import './App.css'
import Form from './Form'
import { User } from './types'
import UserCard from './user'

const departments = [
  'Tech',
  'Human Resources',
  'Marketing',
  'Finance'
]


function App() {
  const [users, setUsers] = useState<User[]>([])
  const [updateUser, setUpdateUser] = useState<User | undefined>()
  const onSubmit = useCallback((user: User) => {
    if (updateUser) {
      const index = users.findIndex((existingUser) => existingUser.id === updateUser.id)
      users[index] = user;

      return setUsers([...users])
    }
    setUsers([...users, { ...user, id: +new Date() }])
  }, [users, updateUser])

  const onUpdate = (user: User) => {
    setUpdateUser(user)
  }

  const onCancel = () => {
    setUpdateUser(undefined)
  }

  const onDelete = (id: number) => {
    setUsers(users.filter(user=> user.id !== id))
  }

  return (
    <div className="bg-blue-200 min-h-screen flex items-center">
      <div className="w-full">
        <h2 className="text-center text-blue-400 font-bold text-2xl uppercase mb-10">Fill out our form</h2>
        <div className="bg-white p-10 rounded-lg shadow md:w-3/4 mx-auto lg:w-1/2">
          <Form updateUser={updateUser} onSubmit={onSubmit} departments={departments} onCancel={onCancel} />
        </div>
        <div className="grid grid-cols-3 gap-4 md:w-1/2 mx-auto lg:w-1/2 my-8">
          {users.map((user) => <UserCard onDelete={onDelete} user={user} onUpdate={onUpdate} key={user.id} />)}
        </div>
      </div>
    </div>
  )
}

export default App
