import orderModel from "../models/Order.js";
import asyncHandler from "express-async-handler";

export const addOrderItems = asyncHandler(async (req, res) => {
  const {
    orderItems,
    shippingAddress,
    paymentMethod,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
  } = req.body;

  if (orderItems && !orderItems.length) {
    res.status(400);
    throw new Error("No order Items");
    return;
  } else {
    const order = new orderModel({
      orderItems,
      shippingAddress,
      paymentMethod,
      itemsPrice,
      taxPrice,
      shippingPrice,
      totalPrice,
      user: req.user,
    });

    const createdOrder = await order.save();
    res.status(201).json(createdOrder);
  }
});

export const getOrderById = asyncHandler(async (req, res) => {
  const order = await orderModel
    .findById(req.params.id)
    .populate({ path: "user", select: "name email" });
  if (order) {
    res.json(order);
  } else {
    res.status(404);
    throw new Error("Order not found");
  }
});

export const updateOrderToPaid = asyncHandler(async (req, res) => {
  const order = await orderModel.findById(req.params.id);
  if (order) {
    order.isPaid = true;
    order.paidAt = Date.now();
    order.paymentResult = {
      id: req.body.id,
      status: req.body.status,
      update_time: req.body.update_time,
      email_address: req.body.payer.email_address,
    };

    const updatedOrder = await order.save();
    res.json(updatedOrder);
  } else {
    res.status(404);
    throw new Error("Order not found");
  }
});

export const updateOrderToDelivered = asyncHandler(async (req, res) => {
  const order = await orderModel.findById(req.params.id);
  if (order) {
    order.isDelivered = true;
    order.deliveredAt = Date.now();
    const updatedOrder = await order.save();
    res.json(updatedOrder);
  } else {
    res.status(404);
    throw new Error("Order not found");
  }
});

export const getMyOrders = asyncHandler(async (req, res) => {
  const orders = await orderModel.find({ user: req.user });
  if (orders && orders.length) {
    res.json(orders);
  } else {
    res.status(404);
    throw new Error("No Order was created yet");
  }
});

export const getOrders = asyncHandler(async (req, res) => {
  const orders = await orderModel
    .find()
    .populate({ path: "user", select: " name email" });
  if (orders && orders.length) {
    res.json(orders);
  } else {
    res.status(404);
    throw new Error("No Order was created yet");
  }
});
