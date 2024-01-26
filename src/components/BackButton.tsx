import Button from './Button'
import { ButtonType } from '../../types/types'
import { useNavigate } from 'react-router-dom'

export default function BackButton() {
  const navigate =  useNavigate()
  return (
    <Button type={ButtonType.Back} onClick={(e)=> {
        e.preventDefault()
        navigate(-1)
      }} >&larr; Back</Button>
  )
}
