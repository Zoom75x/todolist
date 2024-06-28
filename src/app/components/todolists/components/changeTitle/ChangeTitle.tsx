export interface PropsType{
    title:string
}
export const ChangeTitle = ({title}:PropsType) => {
    return <div>
        {title}
    <button>change Title</button>
    </div>
}