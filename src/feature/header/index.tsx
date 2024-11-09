import { useAppDispatch } from '../../app/rootStore'
import { logOut } from '../../entity'
import { Button, Flex } from 'antd'

export const Header = () => {
  const dispatch = useAppDispatch()
  const onClicklogOut = () => {
    dispatch(logOut())
  }
  return (
    <Flex style={{ width: '100%' }} justify={'flex-end'} align={'center'}>
      <Button onClick={onClicklogOut}>Выйти из профиля</Button>
    </Flex>
  )
}