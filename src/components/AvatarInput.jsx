import { useState } from "react"

export default function({className, name, defaultImg}) {
    const [inputImage, setInputImage] = useState(null)
    return (
        <div>
            <div className={className}>
                <img src={inputImage ? inputImage : defaultImg} className="w-full h-full"/>

            </div>
            <input type="file" />
        </div>
    )
}