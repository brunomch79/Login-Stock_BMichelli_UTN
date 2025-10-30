export const Button = ({
    type = 'submit',
    value,
    onClick = undefined
}) => {
    return (
        <button
            className='p-2 rounded shadow text-black font-bold hover:shadow-xl hover:shadow-amber-400/25 cursor-pointer transition-all'
            type={type} onClick={onClick}>{value}</button>)
}

