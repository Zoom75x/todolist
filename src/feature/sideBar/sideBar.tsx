import { Menu, MenuProps } from "antd";
import { useNavigate } from "react-router-dom";

type MenuItem = Required<MenuProps>['items'][number]

export const SideBar = () => {
  const navigate = useNavigate()
  const items:MenuItem[]=[
    {
      key:"main",
      label:"Главная",
      onClick:()=>navigate('/')
    },
    {
      key:"sub1",
      label:"Тудулисты",
      onClick:()=>navigate('/todolist')
    }
  ]

  return <Menu items={items} />
}