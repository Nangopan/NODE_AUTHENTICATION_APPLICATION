const express=require("express")
const app=new express()
const hbs=require("hbs")
const nocache=require("nocache")
const session=require("express-session")
const userRoute=require("./Routes/user")

app.use(express.urlencoded({extended:true}))
app.use(express.json())
app.use(session({
    secret:"cat",
    resave:false,
    saveUninitialized:true,
}))

app.use(nocache())
app.use((req, res, next) => {
  res.set("Cache-Control", "no-store, no-cache, must-revalidate, private");
  next();
});

app.use(express.static("public"))

app.set("view engine","hbs")

// app.get("/",(req,res)=>{
//     res.render("login")
// })

app.use("/",userRoute)
app.listen(3000,()=>{
    console.log("Server running")
})