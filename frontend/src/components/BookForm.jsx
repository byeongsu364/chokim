import React,{useState, useEffect} from 'react'
import axios from 'axios'
const BookForm = () => {

    const API = import.meta.env.VITE_API_URL

    const [books, setbooks] = useState([])
    const [title, setTitle] = useState("")
    const [author, setAuthor] = useState("")
    const [description, setDescription] = useState("")
    const [loading, setLoading] = useState(false)
    const [err, setErr] = useState("")

    const fetchBooks = async()=>{
        try {
            // console.log('hello')
            const res = await axios.get(`${API}/api/books`)
            const data = Array.isArray(res.data)? res.data : res.data.books ?? []
            // console.log(data)
            setbooks(data)
        } catch (error) {
            console.log(error, "불러오기 실패")
        }
    }

    useEffect(()=>{
    fetchBooks()

    },[])

    const onCreate = async() => {
        if(!title.trim()) return
        try {
            await axios.post(`${API}/api/books`,{title, author, description})
            setTitle('')
            setAuthor('')
            setDescription('')
            await fetchBooks()
        } catch (error) {
            alert("등록 실패")
        } finally {
            setLoading(false)
        }
    }

    const onUpdate = async (book)=> {
        const id = book._id ?? book.id

        const nextTitle = prompt('새 제목', book.title ?? '')
        if(nextTitle==null) return

        const nextAuthor = prompt('새 저자', book.author ?? '')
        if(nextAuthor==null) return

        const nextDescription = prompt('새 내용', book.description ?? '')
        if(nextDescription==null) return

        try {
            setLoading(true)
            await axios.put(`${API}/api/books/${id}`,{
                ...book,
                title:nextTitle,
                author:nextAuthor,
                description:nextDescription
            })
            await fetchBooks()
        } catch (error) {
            alert('수정 실패')
        } finally {
            setLoading(false)
        }
    }

    const onDelete = async (id)=> {
        
        if(!confirm('정말 삭제할까요?')) return

        try {
            setLoading(true)
            await axios.delete(`${API}/api/books/${id}`)
            await fetchBooks()
        } catch (error) {
            alert('삭제 실패')
        } finally {
            setLoading(false)
        }
    }
    console.log('API =', import.meta.env.VITE_API_URL)


    return (
        <div className='book-wrap'>
            <h2><span>CHO&KIM</span> e-books</h2>
            <div className="controls">
                <input 
                value={title}
                onChange={(e)=>setTitle(e.target.value)}
                type="text" 
                placeholder='제목을 입력하세요'
                />

                <input 
                value={author}
                onChange={(e)=>setAuthor(e.target.value)}
                type="text"
                placeholder='저자를 입력하세요' 
                />

                <textarea 
                value={description}
                onChange={(e)=>setDescription(e.target.value)}
                placeholder='내용을 입력하세요' 
                rows={3}
                />

                <div className="buttons">
                    <button className='btn enrol' onClick={onCreate} disabled={loading}>등록</button>
                    <button className='btn refresh'>새로고침</button>
                </div>
            </div>

            {loading && <p>불러오는중...</p>}
            {err && <p>{err}</p>}
            <ul className='list'>
            {books.map((book)=>(
                <li key={book._id}>
                    <h4>
                    {book.title}
                    </h4> 
                    <p className='p1'>
                    <span>저자 :</span> {book.author}
                    </p>
                    <p className='p2'>
                    <span>내용설명 :</span> {book.description}
                    </p>
                    <button className="update btn" onClick={()=>onUpdate(book)}>수정</button>
                    <button className="delete btn" onClick={()=>onDelete(book._id)}>삭제</button>
                </li>
            ))}
            </ul>
        </div>
    )
}

export default BookForm