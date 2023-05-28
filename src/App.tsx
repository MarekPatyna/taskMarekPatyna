import PersonalDataForm from "./components/PersonalDataForm.tsx"
import RangeInput from "./components/RangeInput.tsx"
import RadioInputs from "./components/RadioInputs.tsx"
import {FormEvent, useState} from "react"

interface InputValues {
    firstName: string
    lastName: string
    email: string
    phoneNumber: string
    photo: string
    age: string
    level: string
}

const App = () => {

    const [inputValues, setInputValues] = useState<InputValues>({
        firstName: '',
        lastName: '',
        email: '',
        phoneNumber: '',
        photo: '',
        age: '',
        level: ''
    })

    const handleTextChange = (value: string, inputName: string) => {
        setInputValues((prevInputValues: InputValues) => ({
            ...prevInputValues,
            [inputName]: value,
        }))
    }

    const handleApi = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const formData: FormData = new FormData()
        formData.append('firstName', inputValues.firstName)
        formData.append('lastName', inputValues.lastName)
        formData.append('email', inputValues.email)
        formData.append('phoneNumber', inputValues.phoneNumber)
        formData.append('photo', inputValues.photo)
        formData.append('age', inputValues.age)
        formData.append('level', inputValues.level)

        fetch('http://marathon.pl/submit', {
            method: "POST",
            body: formData
        }).then((res: Response) => {
            console.log(res)
        }).catch((err) => {
            console.log(err.message)
        })
    }

    return (
        <main className="flex justify-center items-center text-primary text-[16px] md:py-28">
            <section className="w-[360px] px-6 py-12 md:w-[734px] md:p-0">
                <h1 className="text-[36px] text-center mb-10 leading-[44px]">Marathon Application Form</h1>
                <div className="md:bg-desktop md:pt-[41px]">
                    <form onSubmit={handleApi} className="flex flex-col relative ">
                        <PersonalDataForm
                            firstName={inputValues.firstName}
                            lastName={inputValues.lastName}
                            email={inputValues.email}
                            phoneNumber={inputValues.phoneNumber}
                            onTextChange={handleTextChange}
                        />
                        <div className="label-mt label-mb-leading md:mx-12 md:mb-12 md:relative">
                            <RangeInput onTextChange={handleTextChange} />
                            <RadioInputs onTextChange={handleTextChange} />
                            <div className="flex justify-end">
                                <button type="submit" className="w-full bg-primary text-white h-[45px] rounded-e mt-[48px] md:w-[210px] hover:bg-button">
                                    Send Application
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </section>
        </main>
    )
}

export default App