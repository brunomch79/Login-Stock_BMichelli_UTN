export const Button = ({
    type = 'submit',
    value,
    onClick = undefined
}) => {
    return (
        <button
            className='p-2 rounded-2xl mt-2 shadow text-white font-bold cursor-pointer transition-all hover:bg-[#B30000]'
            type={type} onClick={onClick}>{value}</button>)
}

