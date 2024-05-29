import { HiTrash } from "react-icons/hi2"

interface TextInputProps {
    label: string,
    value: string,
    setValue: (value: string) => void
}
const TextInput: React.FC<TextInputProps> = ({label, value, setValue}) => {
    return (
        <div className="flex flex-col">
            <label className='font-bold'>{label}</label>
            <input className="border-2 border-gray-200 w-64 text-md bg-slate-50 p-1 h-8 rounded-lg" type="text" value={value} onChange={(e) => setValue(e.target.value)}/>
        </div>
    )
}

interface CheckBoxInputProps {
    label: string,
    value: boolean,
    setValue: (value: boolean) => void
}
const CheckBoxInput: React.FC<CheckBoxInputProps> = ({label, value, setValue}) => {
    return (
        <div className="flex flex-col w-48">
            <label className='font-bold'>{label}</label>
            <input
                className="border-2 bg-slate-50 border-gray-200 h-6 w-6 m-1 rounded-lg "
                type="checkbox"
                checked={value}
                onChange={(e) => setValue(e.target.checked)}
            />
        </div>
    )
}

interface SelectInputProps {
    label: string,
    value: string,
    setValue: (value: string) => void
    options: string[]
}
const SelectInput: React.FC<SelectInputProps> = ({label, value, setValue, options}) => {
    return (
        <div className="flex flex-col">
            <label className='font-bold'>{label}</label>
            <select className="border-2 bg-slate-50 border-gray-200 w-32 h-8 rounded-md" value={value} onChange={(e) => setValue(e.target.value)}>
                {options.map(option => <option key={option}>{option}</option>)}
            </select>
        </div>
    )
}


interface DeleteButtonProps {
    onClick: () => void
}
const DeleteButton: React.FC<DeleteButtonProps> = ({onClick}) => 
{
    return (
        <button
            className=" h-10 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
            onClick={onClick}
        >
            <HiTrash />
        </button>
    )
}

interface RemoveButtonProps {
    onClick: () => void
}
const RemoveButton: React.FC<RemoveButtonProps> = ({onClick}) => 
{
    return (
        <div className="flex items-end">
        <button
        className="bg-red-500 hover:bg-red-700 text-white font-bold h-8  px-4 rounded ml-2"
    onClick={onClick}><HiTrash />
        </button>
        </div>
    )
}

interface AddButtonProps {
    label: string,
    isPrimary?: boolean,
    onClick: () => void
}
const AddButton: React.FC<AddButtonProps> = ({label, isPrimary, onClick}) => 
{
    return (
        <button
        className={(isPrimary ? "bg-blue-500 hover:bg-blue-700 text-white" : "border-2 border-blue-500 bg-white hover:text-blue-700 text-blue-500") + " font-bold py-1 px-2 rounded w-36"}
        onClick={onClick}
    >
        {label}
    </button>
    )
}

export {TextInput, CheckBoxInput, SelectInput, DeleteButton, RemoveButton, AddButton};