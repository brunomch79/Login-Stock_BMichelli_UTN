export const Button = ({
    type = 'submit',
    value,
    onClick = undefined
}) => {
    return (
        <button
            className='p-2 rounded shadow text-black font-bold cursor-pointer transition-all hover:bg-linear-to-r hover:from-[#02023e] hover:to-[#3c0404] hover:text-white'
            type={type} onClick={onClick}>{value}</button>)
}

