import Order from "../models/Order.js";
import User from "../models/User.js";

// Crear un nuevo pedido
export const createOrder = async (req, res) => {
  try {
    const { id, products, userCity, userAddress, userPhone,total } = req.body;

    // Verificar si el usuario existe
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }

    // Crear una nueva instancia de la orden utilizando el esquema definido
    const newOrder = new Order({
      user,
      products,
      userCity,
      userAddress,
      userPhone,
      total,
    });

    await newOrder.save();

    res.status(201).json(newOrder);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Error al crear la orden' });
  }
};

// Obtener un pedidos
export const  getOrders = async (req, res) => {
  try {
    const orders = await Order.find();
    //busca sobre cada usuario sus datos
    const ordersWithUser = await Promise.all(
      orders.map(async (order) => {
        const user = await User.findById(order.user);
        return {
          id: order._id,
          user: {
            name: user.name,
            email: user.email,
            city: order.userCity,
            address: order.userAddress,
            phone: order.userPhone,
          },
          order: order.products,
          total: order.total,
          status: order.status,
        };
      }));
    res.status(200).json(ordersWithUser);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener los pedidos' });
  }
};

// Actualizar el estado de un pedido por ID
export const updateOrderStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    const order = await Order.findByIdAndUpdate(id, { status }, { new: true });
    if (!order) {
      return res.status(404).json({ error: 'Pedido no encontrado' });
    }

    if(status !== 'pending' && status !== 'completed'){
      return res.status(400).json({ error: 'Estado inválido' });
    }

    res.json(order);
  } catch (error) {
    res.status(500).json({ error: 'Error al actualizar el estado del pedido' });
  }
};

//Eliminar un pedido por ID
export const deleteOrder = async (req, res) => {
  try {
    const { id } = req.params;
    const order = await Order.findById(id);
    if (!order) {
      return res.status(404).json({ error: 'Pedido no encontrado' });
    }
    //verificar si el status es pending
    if (order.status === 'pending') {
      return res.status(403).json({ error: 'No puedes eliminar un pedido pendiente' });
    }

    //verificar si la orden tiene por lomenos un mes de antiguedad
    const date = new Date();
    const orderDate = new Date(order.createdAt);
    const diffTime = Math.abs(date - orderDate);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    if (diffDays < 30) {
      return res.status(403).json({ error: 'No puedes eliminar un pedido con menos de un mes de antiguedad' });
    }

    await Order.findByIdAndDelete(id);
    res.json({ message: 'Pedido eliminado correctamente' });
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar el pedido' });
  }
}
