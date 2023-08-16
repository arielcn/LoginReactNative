const express = require('express')
const app = express()
var cors = require('cors')
app.use(cors()) 
app.use(express.json());
console.log("puerto 5000")

const user1 = {
    user: "juan",
    pwd: "123",
};

app.post('/login', async(req, res) => {
  console.log("escuchando")
  console.log(req);
  try {
    if (req.body.user === user1.user && req.body.pwd === user1.pwd) {
        console.log("logeado");
        res.status(200)
        res.send("ok")
    }
    else {
      console.log("Incorrecto")
      res.status(400)
      res.send("nook");
    }
  } catch (error) {
    res.status(500)
    res.send("nook");
  }
})

app.listen(5000)

