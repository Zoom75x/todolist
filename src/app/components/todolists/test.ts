import {v4 as uuidv4} from "uuid";

export const test = () => {
    const tasks1 = [
        {id: uuidv4(), titleTask: "Хлеб", isDone: true},     /*task это один элемент в массивеб который мы используем как el в методах работы с массивами map и filter*/
        {id: uuidv4(), titleTask: "Молоко", isDone: false},  /*это одна task в массиве*/
        {id: uuidv4(), titleTask: "Мясо", isDone: true},     /*это одна task в массиве*/
        {id: uuidv4(), titleTask: "Яйца", isDone: true},     /*это одна task в массиве*/
        {id: uuidv4(), titleTask: "Овощи", isDone: false}
    ]
    const tasks2 = [
        {id: uuidv4(), titleTask: "Хлеб", isDone: true},     /*task это один элемент в массивеб который мы используем как el в методах работы с массивами map и filter*/
        {id: uuidv4(), titleTask: "Молоко", isDone: false},  /*это одна task в массиве*/
        {id: uuidv4(), titleTask: "Мясо", isDone: true},     /*это одна task в массиве*/
        {id: uuidv4(), titleTask: "Яйца", isDone: true},     /*это одна task в массиве*/
        {id: uuidv4(), titleTask: "Овощи", isDone: false}
    ]
}

const todolists = () => [
    {
        id: "list1", title: "LIST1"
    },
    {
        id: "list2", title: "LIST2"
    },
    {
        id: "list2", title: "LIST2"
    }

]