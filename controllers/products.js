import Products from "../models/Products.js";
import Users from "../models/Users.js";

export const getAllProducts = async (req, res) => {
  const products = await Products.find();
  return res.status(200).send({
    message: "Products fetched successfully",
    data: products,
  });
};

export const getSingleProduct = async (req, res) => {
  const product = await Products.findById(req.product._id).populate("Users");
  res.status(200).send({
    message: "Product fetched successfully",
    data: product,
  });
};

export const addProduct = async (req, res) => {
  const userId = req.params.userID;
  //   console.log(req.params.userID)
  //   const userId = "62e93593bfdf8ddd1d95407c";
  const user = await Users.findById(userId);
  const { name, quantity, price, status, category } = req.body;
  const product = await Products.create({
    name,
    quantity,
    price,
    status,
    category,
    user: userId,
  });
  const addedProduct = await Users.updateOne(
    { _id: user._id },
    { $push: { products: { productId: req.id, ...product } } }
  );
  return res.status(201).send({
    message: "Product was successfully created",
    data: addedProduct,
  });
};

export const getProductByName = async (req, res) => {
  res.status(200).send({
    message: "Product fetched successfully",
    data: req.product,
  });
};

export const updateProduct = async (req, res) => {
  console.log(req.body);
  const { name, quantity, price, status, category } = req.body;
  const updatedProduct = await Products.findByIdAndUpdate(
    req.params.id,
    { name, quantity, price, status, category }
    // req.body
    // { strict: false }
  );
  // console.log(updatedProduct);
  return res.status(200).send({
    message: "User updated successfully",
    data: updatedProduct,
  });
  // const { product } = req;
  // const { name, quantity, price, status, category } = req.body;
};

export const deleteProduct = (req, res) => {};
