export const Input = ({ type, name, placeholder, id, title, value, onChange }) => {
    return (
        <div className="flex flex-col gap-2">
            <label htmlFor={id}
            className='font-medium text-sm text-gray-700'
            >{title}</label>
            <input
            className="shadow-sm border border-gray-300 rounded-md p-2.5 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
            id={id}
            type={type}
            name={name}
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            />
        </div>)
}
