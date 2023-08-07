import Order from "../models/Order.js";
import User from "../models/User.js";

// Crear un nuevo pedido
export const createOrder = async (req, res) => {
  try {
    const { id, products, total } = req.body;

    // Verificar si el usuario existe
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Crear una nueva instancia de la orden utilizando el esquema definido
    const newOrder = new Order({
      user,
      products,
      total,
    });

    await newOrder.save();

    res.status(201).json(newOrder);
  } catch (error) {
    res.status(500).json({ error: 'Error creating Order' });
  }
};

// Obtener un pedidos
export const getOrders = async (req, res) => {
  try {
    const orders = await Order.find();
    //traer todas las ordenes existentes
    const getAllOrders = await Promise.all(
      orders.map(async (order) => {
        //si el id del pedido es igual al id del usuario
        const user = await User.findById(order.user);
        //si el id del pedido es igual al id del usuario
        return {
          id: order._id,
          user: {
            id: user._id,
            name: user.name,
            email: user.email,
          },
          order: order.products,
          total: order.total,
          status: order.status,
          date: order.createdAt,
        };
      }));
    res.status(200).json(getAllOrders);
  } catch (error) {
    res.status(500).json({ error: 'Error getting Orders' });
  }
};

// Obtener un pedido por ID
export const getOrderById = async (req, res) => {
  try {
    const { id } = req.params;
    const orders = await Order.find();

    //busca sobre cada usuario sus datos
    const ordersWithUser = await Promise.all(
      orders.map(async (order) => {
        //si el id del pedido es igual al id del usuario
        const user = await User.findById(order.user);
        //si el id del pedido es igual al id del usuario
        if (order.user.toString() === id) {
          return {
            id: order._id,
            user: {
              id: user._id,
              name: user.name,
              email: user.email,
            },
            order: order.products,
            total: order.total,
            status: order.status,
            date: order.createdAt,
          };
        }
      }));

    const order = ordersWithUser.filter((order) => order !== undefined);

    res.status(200).json(order);
  } catch (error) {
    res.status(500).json({ error: 'Error getting Order' });
  }
};


// Actualizar el estado de un pedido por ID
export const updateOrderStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    const order = await Order.findByIdAndUpdate(id, { status }, { new: true });
    if (!order) {
      return res.status(404).json({ error: 'Order not Found' });
    }

    if (status !== 'pending' && status !== 'completed') {
      return res.status(400).json({ error: 'Invalid Stated' });
    }

    res.json(order);
  } catch (error) {
    res.status(500).json({ error: 'Error updating Order' });
  }
};

//Eliminar un pedido por ID
export const deleteOrder = async (req, res) => {
  try {
    const { id } = req.params;
    const order = await Order.findById(id);
    if (!order) {
      return res.status(404).json({ error: 'Order not Found' });
    }
    //verificar si el status es pending
    if (order.status === 'pending') {
      return res.status(403).json({ error: 'You can not delete a peding Order' });
    }

    //verificar si la orden tiene por lomenos un mes de antiguedad
    const date = new Date();
    const orderDate = new Date(order.createdAt);
    const diffTime = Math.abs(date - orderDate);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    if (diffDays < 30) {
      return res.status(403).json({ error: 'You cannot delete an order with less than a month of antiquity' });
    }

    await Order.findByIdAndDelete(id);
    res.json({ message: 'Order Deleted' });
  } catch (error) {
    res.status(500).json({ error: 'Error deleting Order' });
  }
}
