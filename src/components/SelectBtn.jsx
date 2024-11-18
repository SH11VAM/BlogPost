import React , { useId } from 'react'

function SelectBtn({
options, 
label,
className='', 
...props

}, ref) {

    const id = useId();
  return (
    <div className='w-full'>
        {
label  && <label className='' htmlFor={id}></label>

        }

        <select
        {...props}
        id={id}
        className={`px-3 py-2 rounded-lg bg-white text-black outline-none focus:bg-gray-500 duration-200 border border-gray-200 w-full ${className}`}
        >
{/* ? is used for check if value then map call otherwise fuck */}
{
     options?.map((option)=>(

        <option key={option} value={option}>
            {option}

        </option>
     ))
}
        </select>
        
    </div>
  )
}

export default  React.forwardRef(SelectBtn)