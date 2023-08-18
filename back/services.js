import config from "./dbconfig";
import sql from 'mssql'

export default class usuarioServices {

    static checkExistingUser = async (Mail) => {
        let pool = await sql.connect(config);
        let result = await pool.request()
            .input('Mail', sql.VarChar(150), Mail)
            .query('SELECT * FROM Usuarios WHERE Mail = @Mail');
        // Comprueba si el correo electrónico existe
        console.log(result);
        if (result.recordset.length > 0) {
            return true;
            // El correo electrónico ya existe
        } else {
            console.log("creado :)")
            return false; // El correo electrónico no existe
        }
    }

    static insertUsuario = async (Usuario) => {
        let returnEntity = null;
        const { Nombre, Contraseña, Mail, }  = Usuario;
        let pool = await sql.connect(config);
        try {
            const exists = await this.checkExistingUser(Mail);
            if (exists == true) {
                return false;
            }
            else {
                const request = new sql.Request(pool);
                
                returnEntity = request
                    .input('Nombre', sql.NVarChar(150), Nombre)
                    .input('Contraseña', sql.NVarChar(150), Contraseña)
                    .input('Mail', sql.NVarChar(150), Mail)
                    .query('INSERT INTO Usuarios (Nombre, Contraseña, Mail,) VALUES (@Nombre, @Contraseña, @Mail)')
            }
        } catch (error) {
            console.log(error);
        }
        return returnEntity;
    }

    static getUsuarioByMailYContra = async (Mail, Contraseña) => {
        let returnEntity = null;
        const mailExistente = await this.checkExistingUser(Mail);
        if (!mailExistente) { //se fija si existe el mail
            console.log("Error: El correo electrónico no está registrado.");
            return returnEntity;
        }
        try {
            let pool = await sql.connect(config);
            let result = await pool.request()
                .input('Mail', sql.VarChar(150), Mail)
                .input('Contraseña', sql.VarChar(150), Contraseña)
                .query('SELECT * FROM Usuarios WHERE Mail = @Mail AND Contraseña = @Contraseña');
            console.log("login exitoso", result);
            returnEntity = result.recordsets[0][0];
        } catch (error) {
            console.log(error);
        }
        return returnEntity;
    }
}