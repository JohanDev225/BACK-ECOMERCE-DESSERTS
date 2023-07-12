const User = require('../models/User');
import User from "../models/User.js";

// Agregar un elemento a la wishlist de un usuario
export const addToWishlist = async (req, res) => {
  try {
    const { userId } = req.params;
    const { itemId } = req.body;

    // Encuentra al usuario por ID
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }

    // Verifica si el elemento ya está en la wishlist del usuario
    if (user.wishlist.includes(itemId)) {
      return res.status(400).json({ error: 'El elemento ya está en la wishlist' });
    }

    // Agrega el elemento a la wishlist del usuario
    user.wishlist.push(itemId);
    await user.save();

    res.json(user.wishlist);
  } catch (error) {
    res.status(500).json({ error: 'Error al agregar elemento a la wishlist' });
  }
};

// Obtener la wishlist de un usuario
export const getWishlist = async (req, res) => {
  try {
    const { userId } = req.params;

    // Encuentra al usuario por ID
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }

    res.json(user.wishlist);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener la wishlist' });
  }
};

// Eliminar un elemento de la wishlist de un usuario
export const removeFromWishlist = async (req, res) => {
  try {
    const { userId, itemId } = req.params;

    // Encuentra al usuario por ID
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }

    // Verifica si el elemento está en la wishlist del usuario
    if (!user.wishlist.includes(itemId)) {
      return res.status(400).json({ error: 'El elemento no está en la wishlist' });
    }

    // Elimina el elemento de la wishlist del usuario
    user.wishlist = user.wishlist.filter((item) => item !== itemId);
    await user.save();

    res.json(user.wishlist);
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar elemento de la wishlist' });
  }
};