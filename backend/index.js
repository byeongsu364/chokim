// 프론트 연결
const express = require("express")
const mongoose=require("mongoose")
const cors = require("cors")
const dotenv = require("dotenv")

dotenv.config()

const app = express()
const PORT = process.env.PORT || 3000

app.use(cors())
app.use(express.json())

mongoose.connect(process.env.MONGO_URI)
        .then(()=>console.log("mongodb 연결 성공"))
        .catch((err)=>console.log("연결 실패",err))


<<<<<<< HEAD
app.listen(PORT, () => {
    console.log('Hello Exress!')
})``
=======

const postRoutes = require("./routes/PostRoutes")
app.use("/api/posts",postRoutes)
app.get('/',(req,res)=>{
    res.send("Hello Express!")
})

app.listen(PORT,()=>{
    console.log('Server is Running!')
})
>>>>>>> e640faebda66ef844d297330166d375c05807a10
