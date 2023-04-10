import React, { useState, useEffect } from "react"
import { FaSearch } from "react-icons/fa"
import Photo from "./Photo"
import axios from "axios"
const clientID = `?client_id=${process.env.REACT_APP_ACCESS_KEY}`
const mainUrl = `https://api.unsplash.com/photos/`
const searchUrl = `https://api.unsplash.com/search/photos/`

function App() {
  const [isLoading, setIsLoading] = useState(false)
  const [photos, setPhotos] = useState([])
  const fetchImages = async () => {
    setIsLoading(true)
    let url = `${mainUrl}${clientID}`
    try {
      const { data } = await axios(url)
      setPhotos(data)
      setIsLoading(false)
    } catch (error) {
      console.log(error)
      setIsLoading(false)
    }
  }
  useEffect(() => {
    fetchImages()
  }, [])
  return <h2>stock photos starter</h2>
}

export default App
