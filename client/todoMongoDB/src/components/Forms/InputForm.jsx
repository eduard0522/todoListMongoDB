
const InputForm = ({type, placeholder,data}) => {
  return(
    <input type={type}  placeholder={placeholder} 
        className="w-full py-2 px-4 rounded-lg bg-slate-700 text-white  bordener-none outline-slate-300 my-2"
      />
  )
}

export default InputForm