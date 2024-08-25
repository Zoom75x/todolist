import './App.module.css'
import { TodolistProvider } from "./app/provider";
import { TodoLists } from "./todolists";

export const App = () => {
  return (
    <>
     <TodolistProvider>
       <TodoLists />
     </TodolistProvider>
    </>
  )
}
