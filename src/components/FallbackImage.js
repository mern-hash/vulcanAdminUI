import { Images } from 'images'
import { useEffect,useState } from 'react'

export function ImageWithFallback({ fallback = Images.carImage,src,...rest }) {
    const [imgSrc,setImgSrc] = useState(src)
    const onError = () => setImgSrc(fallback)
    useEffect(() => {
        setImgSrc(src)
    },[src])

    return (
        <img alt="Realios" src={imgSrc || fallback} onError={onError} {...rest} />
    )
}
