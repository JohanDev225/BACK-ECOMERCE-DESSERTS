import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import config from "../config.js";

//Darle de alta a un usuario
export const signUp = async (req, res) => {
  const { name, email, password, role } = req.body;
  //Encriptar la contraseña
  const passwordHash = bcrypt.hashSync(password, 10);
  //Crear el usuario
  const newUser = new User({
    name,
    email,
    password: passwordHash,
    role,
  });
  //Guardar el usuario en la base de datos
  const savedUser = await newUser.save();
  //Responder al cliente
  res.status(201).json(savedUser);
};

//Iniciar sesión
export const signIn = async (req, res) => {
  const { email, password } = req.body;

  //Buscar el usuario en la base de datos
  const findEmail = await User.find({ email }).exec();
  if (!findEmail) {
    return res.json({
      code: "400",
      message: "El usuario no existe",
    });
  } else {
    
  }
  //validar la contraseña
  const validPassword = bcrypt.compareSync(password, findEmail[0].password);

  if (!validPassword) {
    return res.json({
      code: "400",
      message: "Datos incorrectos",
    });
  }

  //Crear el token
  const token = jwt.sign(
    {
      id: findEmail[0]._id,
      role: findEmail[0].role,
    },
    config.secret,
    {
      expiresIn: 1800, //24 horas
    }
  );

  //Responder al cliente
  res.status(200).json({
    code: "200",
    message: "Inicio de sesión exitoso",
    token,
  });
};
