import React,{useState, useEffect} from 'react'
import axios from 'axios'
const PostForm = () => {

    const API = import.meta.env.VITE_API_URL

    const [posts, setPosts] = useState([])
    const [title, setTitle] = useState("")
    const [content, setContent] = useState("")
    const [loading, setLoading] = useState(false)
    const [err, setErr] = useState("")

    const fetchposts = async()=>{
        try {
            // console.log('hello')
            const res = await axios.get(`${API}/api/posts`)
            const data = Array.isArray(res.data)? res.data : res.data.posts ?? []
            // console.log(data)
            setPosts(data)
        } catch (error) {
            console.log(error, "불러오기 실패")
        }
    }

    useEffect(()=>{
    fetchposts()

    },[])

    const onCreate = async() => {
        if(!title.trim()) return
        try {
            await axios.post(`${API}/api/posts`,{title, content})
            setTitle('')
            setContent('')
            await fetchposts()
        } catch (error) {
            alert("등록 실패")
        } finally {
            setLoading(false)
        }
    }

    const onUpdate = async (post)=> {
        const id = post._id ?? post.id

        const nextTitle = prompt('새 제목', post.title ?? '')
        if(nextTitle==null) return

        const nextContent = prompt('새 저자', post.Content ?? '')
        if(nextContent==null) return

        try {
            setLoading(true)
            await axios.put(`${API}/api/posts/${id}`,{
                ...post,
                title:nextTitle,
                content:nextContent
            })
            await fetchposts()
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
            await axios.delete(`${API}/api/posts/${id}`)
            await fetchposts()
        } catch (error) {
            alert('삭제 실패')
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className='post-wrap'>
            <h2><span>CHO&KIM</span> board</h2>
            <div className="controls">
                <input 
                value={title}
                onChange={(e)=>setTitle(e.target.value)}
                type="text" 
                placeholder='제목을 입력하세요'
                />

                <textarea 
                value={content}
                onChange={(e)=>setContent(e.target.value)}
                type="text"
                placeholder='내용을 입력하세요' 
                />

                <div className="buttons">
                    <button className='btn enrol' onClick={onCreate} disabled={loading}>등록</button>
                    <button className='btn refresh'>새로고침</button>
                </div>
            </div>

            {loading && <p>불러오는중...</p>}
            {err && <p>{err}</p>}
            <ul className='list'>
            {posts.map((post)=>(
                <li key={post._id}>
                    <h4>
                    {post.title}
                    </h4> 
                    <p className='p1'>
                    <span>내용 :</span> {post.content}
                    </p>
                    <button className="update btn" onClick={()=>onUpdate(post)}>수정</button>
                    <button className="delete btn" onClick={()=>onDelete(post._id)}>삭제</button>
                </li>
            ))}
            </ul>
        </div>
    )
}

export default PostForm