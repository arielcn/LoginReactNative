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

app.post('/register', async(req, res) => {
  try {
      console.log(req);
      const usuarioData = req.body;
      const result = await usuarioServices.insertUsuario(usuarioData)
      if(result == false){
          res.status(401).json({message: "error, usuario ya existente"});
      }
      else{
          if (usuarioData.fkRol === 2) {
              const vendedorExists = await usuarioServices.insertVendedor(usuarioData);
              if (vendedorExists === false) {
                  res.status(401).json({ message: "Error, vendedor ya existente" });
              } else {
                  res.status(201).json({ message: "Vendedor registrado correctamente!" });
              }
          }
      }
      
  } catch (error) {
      console.error(error);
      res.status(500).json({error: 'insert failed'});
  }
});


app.listen(5000)

