import { useRef } from "react"
import { HiTrash, HiXMark } from "react-icons/hi2"
import { convertBase64 } from "../../Util/Util"

// Generic Input Components
// These components are used to create input menus for various settings and configurations


// Text Input Component
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
// Checkbox Input Component
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
// Select Input Component
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

//  Red Button Components
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
//  Smaller Red Button Component
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
// Add Button Component
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
interface CloseButtonProps {
    onClick: () => void
}
const CloseButton: React.FC<CloseButtonProps> = ({onClick}) => {
    return (
        <button
        className="text-blue-600 hover:text-blue-800 font-bold text-2xl py-4 px-4 rounded"
        onClick={onClick}
        >
            <HiXMark/>
        </button>
    )
}
interface ImageInputProps {
    label: string,
    value: string,
    setValue: (value: string) => void
}
const ImageInput: React.FC<ImageInputProps> = ({label, value, setValue}) => {
    const imageInput = useRef<HTMLInputElement>(null);
    const handleFileRead = async (event:any) => {
        const file = event.target.files[0]
        const base64:any = await convertBase64(file)
        setValue(base64);
    }
    return (
        <>
        <label className="font-bold mt-2">{label}</label>
        <img src={value} alt="logo" onClick={()=>imageInput.current?.click()} className="w-24 h-24 hover:cursor-pointer"/>
        <input ref={imageInput} type="file" name="file" 
                            className="upload-file" 
                            id="file"
                            onChange={handleFileRead}
                            style={{display:'none'}}
                            formEncType="multipart/form-data" 
                            required/>
        </>
    )
}
export {TextInput, CheckBoxInput, SelectInput, DeleteButton, RemoveButton, AddButton, CloseButton, ImageInput};
