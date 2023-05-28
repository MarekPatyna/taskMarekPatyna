interface InputComponentProps {
    onTextChange: (value: string, inputName: string) => void
}

const RadioInputs = ({onTextChange}: InputComponentProps) => {

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        onTextChange(value, name)
    }

    return (
        <div className="flex flex-col relative w-0 mt-[-18px]">
            <label className="mt-[60px] label-mb-leading">Level</label>
            <label className="flex items-center mt-1.5">
                <p className="ml-7">Beginner</p>
                <input type="radio" name="level" value="Beginner" className="hidden" onChange={handleInputChange}/>
                <span className="checkmark" />
            </label>
            <label className="flex items-center mt-2.5">
                <p className="ml-7">Intermediate</p>
                <input type="radio" name="level" value="Intermediate" className="hidden" onChange={handleInputChange}/>
                <span className="checkmark" />
            </label>
            <label className="flex items-center mt-2.5">
                <p className="ml-7">Advanced</p>
                <input type="radio" name="level" value="Advanced" className="hidden" onChange={handleInputChange}/>
                <span className="checkmark" />
            </label>
        </div>
    )
}

export default RadioInputs