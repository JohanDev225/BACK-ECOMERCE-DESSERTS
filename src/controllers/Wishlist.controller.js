import User from "../models/User.js";
import Dessert from "../models/Dessert.js";

// Agregar un elemento a la wishlist de un usuario
export const addToWishlist = async (req, res) => {
  try {
    const { id } = req.params;
    const { product, quantity } = req.body;
    // Encuentra al usuario por ID
    const user = await User.findById(id);

    if (!user) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }

    // Verifica si el elemento ya está en la wishlist del usuario
    if (user.wishlist.includes(product)) {
      return res.status(400).json({ error: 'El elemento ya está en la wishlist' });
    }

    // Agrega el elemento a la wishlist del usuario
    user.wishlist.push({ product, quantity });
    await user.save(); 

    res.json(user.wishlist);
  } catch (error) {
    res.status(500).json({ error: 'Error al agregar elemento a la wishlist' });
  }
};

//Obtener la wishlist de un usuario solo con los id de los productos
export const createOrderWishlist = async (req, res) => {
  try {
    const { id } = req.params;

    // Encuentra al usuario por ID
    const user = await User.findById(id);

    if (!user) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }
    //Encuentra todos los objetos por ID de la wishlist del usuario y sus cantidades
    const wishlist = await Promise.all(
      user.wishlist.map(async (item) => {
        const dessert = await Dessert.findById(item.product);
        return {
          product: dessert,
          quantity: item.quantity,
        };
      })
    );
      //Calcula el precio total de la wishlist
    const caculateTotal = (wishlist) => {
      let total = 0;
      wishlist.forEach((item) => {
        total += item.product.price * item.quantity;
      });
      return total;
    };

    //Genera un array con los id de los productos y sus cantidades
    const wishlistIds = wishlist.map((item) => {
      return {
        product: item.product._id,
        name: item.product.name,
        quantity: item.quantity,
      };
    });

    const finalOrder = {
      id,
      products: wishlistIds,
      //sumar el total de la wishlist dentro del objeto en price
      total: caculateTotal(wishlist)
    }
    
    res.json(finalOrder);

    }catch (error) {
      console.log(error);
    res.status(500).json({ error: 'Error al obtener la wishlist' });
  }
};

// Obtener la wishlist de un usuario
export const getWishlist = async (req, res) => {
  try {
    const { id } = req.params;

    // Encuentra al usuario por ID
    const user = await User.findById(id);

    if (!user) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }
    //Encuentra todos los objetos por ID de la wishlist del usuario y sus cantidades
    const wishlist = await Promise.all(
      user.wishlist.map(async (item) => {
        const dessert = await Dessert.findById(item.product);
        return {
          product: dessert,
          quantity: item.quantity,
        };
      })
    );
    
    res.json(wishlist);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener la wishlist' });
  }
};

// Eliminar un elemento de la wishlist de un usuario
export const removeFromWishlist = async (req, res) => {
  try {
    const { id, itemId } = req.params;
    // Encuentra al usuario por ID
    const user = await User.findById(id);

    if (!user) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }

    // Verifica si el elemento está en la wishlist del usuario
    const itemIndex = user.wishlist.findIndex((item) => item.product == itemId);

    if (itemIndex === -1) {
      return res.status(400).json({ error: 'El elemento no está en la wishlist' });
    }

    // Elimina el elemento de la wishlist del usuario
    user.wishlist.splice(itemIndex, 1);
    await user.save();

    res.status(200).json(user.wishlist);
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar elemento de la wishlist' });
  }
};