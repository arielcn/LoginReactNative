import config from "./dbconfig.js";
import sql from "mssql";

export default class usuarioServices {
  static checkExistingUser = async (Mail) => {
    let pool = await sql.connect(config);
    let result = await pool
      .request()
      .input("Mail", sql.VarChar(150), Mail)
      .query("SELECT * FROM Usuarios WHERE Mail = @Mail");
    // Comprueba si el correo electrónico existe
    if (result.recordset.length > 0) {
      return true;
      // El correo electrónico ya existe
    } else {
      console.log("existe el mail");
      return false; // El correo electrónico no existe
    }
  };

  static getById = async (id) => {
    console.log('Estoy en: get by Id', id);
    try {
      let pool = await sql.connect(config);
      await pool.request()
        .input('pId', sql.Int, id)
        .query('SELECT Nombre, Apellido, Mail FROM Usuarios WHERE Id = @pId');
    }
    catch (error) {
      console.log(error);
    }
  }

  static insertUsuario = async (Usuario) => {
    let returnEntity = null;
    const { Nombre, Apellido, Contraseña, Mail } = Usuario;
    let pool = await sql.connect(config);
    try {
      const exists = await this.checkExistingUser(Mail);
      if (exists == true) {
        return false;
      } else {
        const request = new sql.Request(pool);

        returnEntity = request
          .input("Nombre", sql.NVarChar(150), Nombre)
          .input("Apellido", sql.NVarChar(150), Apellido)
          .input("Contraseña", sql.NVarChar(150), Contraseña)
          .input("Mail", sql.NVarChar(150), Mail)
          .query(
            "INSERT INTO Usuarios (Nombre, Apellido, Contraseña, Mail) VALUES (@Nombre, @Apellido, @Contraseña, @Mail)"
          );
      }
    } catch (error) {
      console.log(error);
    }
    return returnEntity;
  };

  static updateUsuario = async (Usuario) => {
    console.log("UPDATE", Usuario);
    const { Id, Nombre, Apellido, Mail } = Usuario;
    try {
      let pool = await sql.connect(config);
      let result = await pool
        .request()
        .input("pId", sql.Int, Id)
        .input("pNombre", sql.NVarChar(150), Nombre)
        .input("pApellido", sql.NVarChar(150), Apellido)
        .input("pMail", sql.NVarChar(150), Mail)
        .query(
          `UPDATE Usuarios SET Nombre = @pNombre, Apellido = @pApellido, Mail = @pMail WHERE Id = @pId`
        );
    } catch (error) {
      console.log(error);
    }
  };

  static getUsuarioByMailYContra = async (usuario) => {
    let returnEntity = null;
    const mailExistente = await this.checkExistingUser(usuario.Mail);
    if (!mailExistente) {
      //se fija si existe el mail
      console.log(
        "Error: El correo electrónico no está registrado o es incorrecto."
      );
      return returnEntity;
    }
    try {
      let pool = await sql.connect(config);
      let result = await pool
        .request()
        .input("Mail", sql.VarChar(150), usuario.Mail)
        .input("Contraseña", sql.VarChar(150), usuario.Contraseña)
        .query(
          "SELECT * FROM Usuarios WHERE Mail = @Mail AND Contraseña = @Contraseña"
        );
      console.log("login exitoso", result);
      returnEntity = result.recordsets[0][0];
    } catch (error) {
      console.log(error);
    }
    return returnEntity;
  };
}
