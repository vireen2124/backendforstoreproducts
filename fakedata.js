// const fakeProducts=require("./products.json")
// require("dotenv").config();
// const MONGO_URL=process.env.DB_URI
// const connectDb=require("./db/connect")
// const ProductsModel=require("./models/product")
// const connectToDb=async()=>{
//     try {
//         console.log(MONGO_URL)
//         await connectDb(MONGO_URL);
//         await ProductsModel.deleteMany()
//         await ProductsModel.create(fakeProducts)
//         console.log("success")
//     } catch (error) {
//         console.log(error)
//     }
// }
// connectToDb()