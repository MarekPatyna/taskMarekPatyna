import { useRef, useState} from "react"

interface InputComponentProps {
    onTextChange: (value: string, inputName: string) => void
}

const RangeInput = ({onTextChange}: InputComponentProps) => {

    const [value, setValue] = useState<number | string>(0)
    const [thumbPosition, setThumbPosition] = useState<number | null>(null)
    const indicatorRef = useRef<HTMLDivElement>(null)
    const [isInitialPosition, setIsInitialPosition] = useState(true)

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newValue: string = e.target.value

        setValue(newValue)

        if (indicatorRef.current) {
            const thumbSize = 16
            const sliderWidth: number =
                indicatorRef.current.parentNode?.offsetWidth - thumbSize
            const position: number = (sliderWidth * (Number(newValue) || 0)) / 100

            setThumbPosition(position)
        }

        setIsInitialPosition(false)

        const { name, value } = e.target
        onTextChange(value, name)
    }

    return (
        <div className="mt-6">
            <label>Age</label>
            <div className="text-[12px] leading-[15px] mt-4">
                <p className="absolute left-1">0</p>
                <p className="absolute right-0">100</p>
            </div>
            <div className="relative">
                <input type="range"
                       className="w-full mt-6 appearance-none h-[4px] bg-white
                       [&::-webkit-slider-thumb]:appearance-none
                       [&::-webkit-slider-thumb]:h-[16px] [&::-webkit-slider-thumb]:w-[16px]
                       [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-primary
                       [&::-webkit-slider-thumb]:relative mozilla"
                       name="age"
                       value={value}
                       onChange={handleChange}
                />
                <div>
                    <span className={`value-indicator ${isInitialPosition ? "initial-position" : ""}`} ref={indicatorRef} style={{left: `calc(${thumbPosition}px - -8px)`}}>
                        {value}
                    </span>
                </div>
                <div
                    className={`triangle ${isInitialPosition ? "initial-position-arrow" : ""}`}
                    style={{ left: `calc(${thumbPosition}px - -8px)` }}
                />
            </div>
        </div>
    )
}

export default RangeInput