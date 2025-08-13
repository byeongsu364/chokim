import React, { useState, useEffect } from 'react'
import axios from 'axios'
const BookForm = () => {

  const API = import.meta.env.VITE_API_URL

  const [books, setBooks] = useState([])

  const fetchBooks = async () => {
    try {

      const res = await axios.get(`${API}/api/books`)
      const data = Array.isArray(res.data) ? res.data : res.data.books ?? []
      // console.log(data)
      setBooks(data)
    } catch (error) {
      // console.log(error, "불러오기 실패")
    }

  }

  fetchBooks()
  return (
    <div>
      {books.map((book) => (
        <div key={book._id}>
          {book.title} / 
          {book.author} /{book.description}

        </div>
      ))}
    </div>
  )
}

export default BookForm