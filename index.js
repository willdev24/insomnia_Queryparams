const express = require("express")
const path = require("path")
const fs =require("fs")
const { send } = require("process")

const app = express()


//importaçoes 

app.set("view engine", "ejs")

app.use(express.static(path.join(__dirname,"public")))

app.use(express.urlencoded({extended:true}))//habilitando meu servidor a receber informaçoes do navegadorvia post "formulario"



//rotas 
app.get("/", (req, res) =>{

    res.render("index.ejs")

})


app.use("/users", (req, res) =>{

    const {nome, idade} = req.query

    const date = fs.readFileSync("./repositorio.json")
    const datejson = JSON.parse(date)

    datejson.push({
        nome,
        idade
    })

    const datestring =JSON.stringify(datejson)
    fs.writeFileSync("./repositorio.json", datestring)

    res.redirect("/")

console.log(req.query)

})




//servidor 
const port = process.env.port || 8080

app.listen(8080,()=>console.log(`servidor rodando naporta ${port}`))