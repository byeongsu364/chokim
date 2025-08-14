// 프론트 연결
const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")
const dotenv = require("dotenv")

dotenv.config()

const app = express()
const PORT = process.env.PORT || 3000

app.use(cors())
app.use(express.json())

mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log("mongodb 연결 성공"))
    .catch((err) => console.log("연결 실패", err))


const BookRoutes = require("./routes/BookRoutes")
app.use("/api/book", BookRoutes)

const PostRoutes = require("./routes/PostRoutes")
app.use("/api/post", PostRoutes)

app.get('/', (req, res) => {
    res.send("Hello Express!")
})

app.listen(PORT, () => {
    console.log('Server is Running!')
})
