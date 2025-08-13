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
const BookRoutes = require("./routes/BookRoutes")
app.use("/api/books",BookRoutes)
=======
const bookRoutes = require("./routes/BookRoutes")
app.use("/api/books",bookRoutes)

>>>>>>> 3e484edd681889f8f025d28e5f677376d388409f
app.get('/',(req,res)=>{
    res.send("Hello Express!")
})

app.listen(PORT,()=>{
    console.log('Server is Running!')
})
