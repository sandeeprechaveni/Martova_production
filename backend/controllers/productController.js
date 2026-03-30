import db from "../config/db.js";

export const getProducts = async (req, res) => {
  try {
    const Products = `
    SELECT * FROM products
      ORDER BY created_at DESC
    `;
    const Allproducts=  await db.query(Products);
    res.status(200).json({success:true,data:Allproducts.rows});
   } catch (error) {
     console.log(`Error in getAllproducts function: ${error}`);
     res.status(500).json({success:false,message:"Internal server Error"});
   } 
};

export const createProduct = async (req, res) => {
  const { name, price, image } = req.body;

  if (!name || !price || !image) {
    return res.status(400).json({ success: false, message: "All fields are required" });
  }

  try {
    const Product = `
    INSERT INTO products(name,price,image)
    VALUES($1,$2,$3)
    RETURNING *
    `;
  const newProduct=  await db.query(Product,[name,price,image]);
   res.status(201).json({success:true,data:newProduct.rows[0]});
  } catch (error) {
    console.log(`Error in create product function   : ${error}`);
    res.status(500).json({success:false,message:"Internal server Error"});
  } 
};

export const getProduct = async (req, res) => {
  const { id } = req.params;

  try {
    const Product = `
    SELECT * FROM products WHERE id=($1)
    `;
  const getProduct=  await db.query(Product,[id]);
  

  if (getProduct.rows.length === 0) {
    return res.status(404).json({ success: false, message: "Product not found" }); 
}
   res.status(200).json({success:true,data:getProduct.rows[0]});
  } catch (error) {
    console.log(`Error in getproduct function   : ${error}`);
    res.status(500).json({success:false,message:"Internal server Error"});
  } 
};

export const updateProduct = async (req, res) => {
  const { id } = req.params;
  const { name, price, image } = req.body;

  try {
    const Product = `
    UPDATE products
    SET name=($1),price=($2),image=($3)
    WHERE id=($4)
      RETURNING *
    `;
  const updateProduct=  await db.query(Product,[name,price,image,id]);

  if (updateProduct.length === 0) {
    return res.status(404).json({
      success: false,
      message: "Product not found",
    });
  }
  
   res.status(200).json({success:true,data:updateProduct.rows[0]});
  } catch (error) {
    console.log(`Error in update product function   : ${error}`);
    res.status(500).json({success:false,message:"Internal server Error"});
  } 
};

export const deleteProduct = async (req, res) => {
  const { id } = req.params;

  try {
    const Product = `
   DELETE FROM products 
   WHERE id=($1)
   RETURNING *
    `;
  const deleteProduct=  await db.query(Product,[id]);

  if(deleteProduct.rows.length===0){
    return res.status(404).json({
      success:false,
      message:"Product not found",
    });
  }
   res.status(200).json({success:true,data:deleteProduct.rows[0]});
  } catch (error) {
    console.log(`Error in delete product function   : ${error}`);
    res.status(500).json({success:false,message:"Internal server Error"});
  } 
};
