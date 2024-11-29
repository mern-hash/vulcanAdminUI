import React, { useRef, useState, useEffect } from 'react'
import { useJsApiLoader, StandaloneSearchBox } from '@react-google-maps/api'

const AddressAutocomplete = ({ placeholder, onAddressSelect, value }) => {
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_API_KEY,
    libraries: ['places'],
  })

  const [inputValue, setInputValue] = useState(value || '')
  const searchBoxRef = useRef(null)
  const handleOnPlacesChanged = () => {
    const places = searchBoxRef.current?.getPlaces()
    if (places?.length) {
      const address = places[0]?.formatted_address || ''
      setInputValue(address)
      onAddressSelect(address)
    }
  }

  const handleInputChange = (e) => {
    const newValue = e.target.value
    setInputValue(newValue)
    onAddressSelect(newValue)
  }

  useEffect(() => {
    setInputValue(value || '')
  }, [value])

  if (!isLoaded) return <div>Loading...</div>

  return (
    <StandaloneSearchBox
      onLoad={(ref) => {
        searchBoxRef.current = ref
      }}
      onPlacesChanged={handleOnPlacesChanged}
    >
      <input
        type="text"
        placeholder={placeholder}
        value={inputValue}
        onChange={handleInputChange}
        style={{
          width: '100%',
          padding: '10px',
          fontSize: '16px',
          borderRadius: '4px',
          outline: 'none',
        }}
      />
    </StandaloneSearchBox>
  )
}

export default AddressAutocomplete
