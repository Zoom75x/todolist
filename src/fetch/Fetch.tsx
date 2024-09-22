import { BaseButton } from '../shared'
import { useEffect, useState } from 'react'

interface User {
  name: string
  id: string
}
export const Fetch = () => {
  const [state, setState] = useState<User[]>([])
  const getData = () => {
    fetch(`https://65c8747fa4fbc162e111c491.mockapi.io/users`, { method: 'GET' }).then((res) =>
      res.json().then((res1) => setState(res1))
    )
  }
  useEffect(() => {
    getData()
  }, [])
  console.log(state)
  return (
    <>
      <BaseButton>Fetch</BaseButton>
      <ul>
        {state.map((el) => (
          <li key={el.id}>{el.name}</li>
        ))}
      </ul>
    </>
  )
}
