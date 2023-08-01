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

  //verifica si el correo ya existe
  const findEmail = await User.find({ email }).exec();
  if (findEmail.length > 0) {
    return res.json({
      code: "400",
      message: "Information incorrect",
    });
  }

  //Guardar el usuario en la base de datos
  await newUser.save();
  //Responder al cliente
  res.status(201).json({ message: "User created successfully" });
};

//Iniciar sesión
export const signIn = async (req, res) => {
  const { email, password } = req.body;

  //Buscar el usuario en la base de datos
  const findEmail = await User.find({ email }).exec();
  if (!findEmail) {
    return res.json({
      code: "400",
      message: "User not found",
    });
  }
  //validar la contraseña
  const validPassword = bcrypt.compareSync(password, findEmail[0].password);

  if (!validPassword) {
    return res.json({
      code: "400",
      message: "Information incorrect",
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
      //24 horas
      expiresIn: 86400,
    }
  );

  //Responder al cliente
  res.status(200).json({
    code: "200",
    message: "Successful Login",
    token
  });
};
