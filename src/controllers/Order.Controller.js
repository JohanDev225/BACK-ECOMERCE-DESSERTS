const Order = require('../models/Order');
const User = require('../models/User');

// Crear un nuevo pedido
exports.createOrder = async (req, res) => {
  try {
    const { userId, products } = req.body;

    // Encuentra al usuario por ID
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }

    // Obtiene los productos de la wishlist del usuario
    const wishlistProducts = user.wishlist.filter((item) => products.includes(item));

    // Crea el pedido con los productos de la wishlist
    const order = await Order.create({
      user: userId,
      products: wishlistProducts.map((productId) => ({ product: productId, quantity: 1 })),
      total: 0,
      status: 'pending'
    });

    // Calcula el total del pedido sumando los precios de los productos
    order.total = wishlistProducts.reduce((total, productId) => {
      const product = user.wishlist.find((item) => item === productId);
      if (product) {
        return total + product.price;
      }
      return total;
    }, 0);

    // Elimina los productos de la wishlist del usuario
    user.wishlist = user.wishlist.filter((item) => !wishlistProducts.includes(item));
    await user.save();

    // Guarda el total y el estado actualizado del pedido
    await order.save();

    res.status(201).json(order);
  } catch (error) {
    res.status(500).json({ error: 'Error al crear el pedido' });
  }
};

// Obtener detalles de un pedido por ID
exports.getOrderById = async (req, res) => {
  try {
    const { orderId } = req.params;
    const order = await Order.findById(orderId).populate('user', 'name email');
    if (!order) {
      return res.status(404).json({ error: 'Pedido no encontrado' });
    }
    res.json(order);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener el pedido' });
  }
};

// Actualizar el estado de un pedido por ID
exports.updateOrderStatus = async (req, res) => {
  try {
    const { orderId } = req.params;
    const { status } = req.body;
    const order = await Order.findByIdAndUpdate(orderId, { status }, { new: true });
    if (!order) {
      return res.status(404).json({ error: 'Pedido no encontrado' });
    }
    res.json(order);
  } catch (error) {
    res.status(500).json({ error: 'Error al actualizar el estado del pedido' });
  }
};

// Eliminar un pedido por ID
exports.deleteOrder = async (req, res) => {
  try {
    const { orderId } = req.params;
    const order = await Order.findByIdAndDelete(orderId);
    if (!order) {
      return res.status(404).json({ error: 'Pedido no encontrado' });
    }
    res.json({ message: 'Pedido eliminado correctamente' });
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar el pedido' });
  }
};
