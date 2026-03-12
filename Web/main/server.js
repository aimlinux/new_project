const express = require("express")
const multer = require("multer")
const QRCode = require("qrcode")

const app = express()

const storage = multer.diskStorage({
destination: "uploads/",
filename: (req,file,cb)=>{
cb(null,Date.now()+"_"+file.originalname)
}
})

const upload = multer({storage})

app.use(express.static("."))

app.get("/",async (req,res)=>{

const url="http://"+require("ip").address()+":3000/upload"

const qr = await QRCode.toDataURL(url)

res.send(`
<h1>EveryoneMemories</h1>

<p>スマホでQRコードを読み取って写真アップロード</p>

<img src="${qr}">

<p>${url}</p>
`)
})

app.get("/upload",(req,res)=>{
res.sendFile(__dirname+"/upload.html")
})

app.post("/upload",upload.single("photo"),(req,res)=>{

res.send("アップロード成功")

console.log("写真保存:",req.file.filename)

})

app.listen(3000,()=>{
console.log("server start http://localhost:3000")
})