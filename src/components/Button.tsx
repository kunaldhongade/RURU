import { Link } from "react-router-dom"
type Prop={
    title:string,
    path:string,
    handleOnClickOrChange:()=>void
    animate?:boolean
}

const Button = ({title,path,handleOnClickOrChange,animate=false}:Prop) => {
  return (
    <>
    {path?
    <button type="button" className={`bg-gradient-to-r from-pink-700 to-pink-600 py-3 px-5 rounded-lg font-poppins `}>   
         <Link to={path} className="no-underline inline-block text-white">
            {title}
         </Link>

    </button>: <button onClick={handleOnClickOrChange} type="button" className={`bg-gradient-to-r ${(animate && 'bounce')} from-pink-700 to-pink-600 py-3 px-5 rounded-lg font-poppins text-white`}>   
            {title}
    </button>}
    </>
  )
}

export default Button
