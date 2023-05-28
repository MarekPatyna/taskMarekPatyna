import {useState, useRef, ChangeEvent, DragEvent, MouseEvent} from "react"
import errorSvg from '../assets/error.svg'
import deleteSvg from "../assets/delete.svg"

interface InputComponentProps {
    firstName: string
    lastName: string
    email: string
    phoneNumber: string | number
    onTextChange: (value: string, inputName: string) => void
}

const PersonalDataForm = ({onTextChange, firstName, lastName, email, phoneNumber}: InputComponentProps) => {

    const phoneRef = useRef<HTMLInputElement | null>(null)
    const [error, setError] = useState<string>('')
    const [selectedFile, setSelectedFile] = useState<File | null>(null)
    const [isFileSelected, setIsFileSelected] = useState<boolean>(false)
    const [inputKey, setInputKey] = useState<number>(0)

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        onTextChange(value, name)
    }

    const validatePhone = () => {
        const phoneRegex = /^\+48 \d{3} \d{3} \d{3}$/
        if (phoneRef.current && !phoneRegex.test(phoneRef.current.value)) {
            setError('Please use correct formatting. Example: +48 123 456 789')
        } else {
            setError('')
        }
    }

    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        const files: FileList | null = e.target.files
        if (files && files.length > 0) {
            setSelectedFile(files[0])
            setIsFileSelected(true)
        }
        const { name, value } = e.target
        onTextChange(value, name)
    }

    const handleDrop = (e: DragEvent<HTMLLabelElement>) => {
        e.preventDefault()
        const files: FileList = e.dataTransfer.files
        if (files && files.length > 0) {
            setSelectedFile(files[0])
            setIsFileSelected(true)
        }
    }

    const handleDragOver = (e: DragEvent<HTMLLabelElement>) => {
        e.preventDefault()
    }

    const handleRemoveFile = (e: MouseEvent<HTMLImageElement>) => {
        e.preventDefault()
        setSelectedFile(null)
        setIsFileSelected(false)
        setInputKey((prevKey) => prevKey + 1)
    }

    const handleButtonClick = (e: MouseEvent<HTMLButtonElement>) => {
        e.preventDefault()
        const fileInput: HTMLElement | null = document.getElementById('file-input')
        if (fileInput) {
            fileInput.click()
        }
    }

    return (
        <div className="md:flex md:flex-row md:flex-wrap md:justify-center md:gap-[24px]">
            <div className="flex flex-col">
                <label className="label-mb-leading">First Name</label>
                <input type="text" name="firstName" className="custom-inputs md:w-[307px]" value={firstName}  onChange={handleInputChange}/>
            </div>
            <div className="flex flex-col">
                <label className="mt-6 label-mb-leading md:mt-0">Last Name</label>
                <input type="text" name="lastName" className="custom-inputs md:w-[307px]" value={lastName}  onChange={handleInputChange}/>
            </div>
            <div className="flex flex-col">
                <label className="mt-6 label-mb-leading md:mt-0">Email Address</label>
                <input type="text" name="email" className="custom-inputs md:w-[307px]" value={email} onChange={handleInputChange}/>
            </div>
            <div className="flex flex-col">
                <label className="mt-6 label-mb-leading md:mt-0">Phone Number</label>
                <input
                    type="text"
                    className={`custom-inputs md:w-[307px] ${error && "border-2 border-solid border-red-500 bg-error"}`}
                    onChange={handleInputChange}
                    name="phoneNumber"
                    onBlur={validatePhone}
                    maxLength={15}
                    value={phoneNumber}
                    ref={phoneRef}
                />
                <div className="w-[224px] text-[14px] leading-[17px] mt-[9px]">
                    {error &&
                        <span className="flex items-start">
                            <img src={errorSvg} alt="error icon" className="mr-[9px] mt-[3px]" />
                            <p>{error}</p>
                        </span>
                    }
                </div>
            </div>
            <div className="flex flex-col">
                <label className="mt-6 label-mb-leading md:mt-0">Photo</label>
                <input
                    type="file"
                    className="hidden"
                    id="file-input"
                    key={inputKey}
                    name="photo"
                    onChange={handleFileChange}
                />
                <label
                    className="bg-inputs w-[312px] h-[96px] rounded-lg md:w-[638px] focus:border-2
                    focus:border-solid focus:border-second hover:bg-hoverIn
                    hover:border hover:border-solid hover:border-second "
                    htmlFor="file-input"
                    onDrop={handleDrop}
                    onDragOver={handleDragOver}
                >
                    {isFileSelected && selectedFile ? (
                        <div className="m-auto h-full w-max flex items-center gap-4">
                            <p>{selectedFile.name.length > 15 ? `${selectedFile.name.slice(0, 30)}...`
                                : selectedFile.name}</p>
                            <img onClick={handleRemoveFile} src={deleteSvg} alt="remove icon"/>
                        </div>
                    ) : <div className="m-auto h-full w-max flex items-center">
                        <button onClick={handleButtonClick} className="underline underline-offset-[10%] decoration-1 text-second">Upload a file </button>
                        <p className="hidden md:block text-drop ">&nbsp; or drag and drop here</p>
                    </div>
                    }
                </label>
            </div>
        </div>
    )
}

export default PersonalDataForm