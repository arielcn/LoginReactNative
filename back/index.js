import { Router } from 'express';
import usuarioServices from './services.js'
const usuarioRouter = Router();

import express from 'express';
import cors from "cors";

const app = express();
app.use(cors())
app.use(express.json());
console.log("puerto 5000")

usuarioRouter.post('/register', async (req, res) => {
  try {
    const usuarioData = req.body.usuario;
    console.log(usuarioData);
    const result = await usuarioServices.insertUsuario(usuarioData);
    if (result == false) {
      res.status(401).json({ message: "Error, usuario ya existente" });
    } else {
      res.status(201).json({ message: "Usuario registrado correctamente!" });
    }

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'insert failed' });
  }
});

usuarioRouter.post('/login', async (req, res) => {
  const usuario = await usuarioServices.getUsuarioByMailYContra(req.body.mail, req.body.pwd)
  if (!usuario) {
    res.status(401).json({ message: "Usuario no encontrado" });
  }
  else {
    return res.status(200).json(usuario);
  }

});

app.use("/usuario", usuarioRouter);

app.listen(5000, "localhost", () => {
  console.log("corriendo en puerto 5000");
})