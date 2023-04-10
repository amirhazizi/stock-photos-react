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
  const handleSubmit = (e) => {
    e.preventDefault()
  }
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
  return (
    <main>
      <section className='search'>
        <form className='search-form'>
          <input type='text' placeholder='search...' className='form-input' />
          <button type='submit' className='submit-btn' onClick={handleSubmit}>
            <FaSearch />
          </button>
        </form>
      </section>
      <section className='photos'>
        <div className='photos-center'>
          {photos.map((photo) => {
            return <Photo key={photo.id} {...photo} />
          })}
        </div>
        {isLoading && <h2 className='loading'>Loading...</h2>}
      </section>
    </main>
  )
}

export default App
