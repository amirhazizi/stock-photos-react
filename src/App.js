import React, { useState, useEffect } from "react"
import { FaSearch } from "react-icons/fa"
import Photo from "./Photo"
import axios from "axios"
const clientID = `?client_id=${process.env.REACT_APP_ACCESS_KEY}`
const mainUrl = `https://api.unsplash.com/photos/`
const searchUrl = `https://api.unsplash.com/search/photos/`

function App() {
  const [isLoading, setIsLoading] = useState(true)
  const [photos, setPhotos] = useState([])
  const [page, setPage] = useState(0)
  const [query, setQuery] = useState("")
  const fetchImages = async () => {
    setIsLoading(true)
    const urlPage = `&page=${page}`
    const urlQuery = `&query=${query}`
    let url
    if (query) {
      url = `${searchUrl}${clientID}${urlPage}${urlQuery}`
    } else {
      url = `${mainUrl}${clientID}${urlPage}`
    }
    try {
      const { data } = await axios(url)
      if (query && page === 1) {
        setPhotos(data.results)
      } else if (query) {
        setPhotos((oldPhotos) => [...oldPhotos, ...data.results])
      } else if (!query && page === 1) {
        setPhotos(data)
      } else {
        setPhotos((oldPhotos) => [...oldPhotos, ...data])
      }
      setIsLoading(false)
    } catch (error) {
      console.log(error)
      setIsLoading(false)
    }
  }
  const handleSubmit = (e) => {
    e.preventDefault()
    setPage(1)
  }

  useEffect(() => {
    fetchImages()
    // eslint-disable-next-line
  }, [page])
  useEffect(() => {
    const event = window.addEventListener("scroll", () => {
      const scrolled = window.scrollY
      const scrollable =
        document.documentElement.scrollHeight - window.innerHeight
      if (isLoading && scrolled >= scrollable - 2) {
        setPage((oldPage) => oldPage + 1)
      }
    })
    return () => {
      window.removeEventListener("scroll", event)
    }
    // eslint-disable-next-line
  }, [])
  return (
    <main>
      <section className='search'>
        <form className='search-form'>
          <input
            type='text'
            placeholder='search...'
            className='form-input'
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
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
