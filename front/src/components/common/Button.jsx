export const Button = ({
    type = 'submit',
    value,
    onClick = undefined
}) => {
    return (
        <button
            className='w-full p-3 rounded-md mt-2 shadow-md bg-blue-600 text-white font-semibold cursor-pointer transition-all hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2'
            type={type} onClick={onClick}>{value}</button>)
}

