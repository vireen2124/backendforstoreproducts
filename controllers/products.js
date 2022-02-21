const ProductsModel=require("../models/productModel")
const getAllProductsStatic=async (req,res)=>{
    try {
        const products=await ProductsModel.find({})
        // just testing the methods
        .sort("name")
        .select("name price")
        res.status(200).json({success:true,message:{products},length:products.length})
        return
    } catch (error) {
        return res.status(500).json({success:false,message:{error}})
    }   
}
const getAllProducts=async (req,res)=>{
    try {
        //this is the keys i will be expecting for the query
        const {featured,company,name,price,rating,sort,limit,page}=req.query;
        //setting the product limit to undefined and assign it if the limit var is truthy
        let productLimit=undefined||Number(limit);
        //default sort is createdat ... most recent to the oldest
        let newSort="createdAt";
        //empty object which i will assign properties to later if the properties from the query
        //is not falsy
        const queryObject={};
        //setting up the pagination 
        //if this property from the quey is empty then it will be set to 1
        //same for the page limit
        const currentPage=Number(page)||1;
        const pageLimit= Number(limit)||10;
        //the value in skip will be used later for the skip method when getting the results
        const skip=(currentPage-1)*pageLimit;
        const myOperatorRegex={
            ">":"$gt",
            ">=":"$gte",
            "<":"$lt",
            "<=":"$lte",
            "=":"$eq"
        }
        let reGex=/(<|<=|>|>=|=)\b/g
        //assigning properties to the queryobject
        if(featured){
            queryObject.featured=Boolean(featured)
        }
        if(company){
            queryObject.company=company
        }
        if(name){
            //returns any results mathing the query
            queryObject.name={ $regex:name , $options:"i" }
        }
        if(price){
            
            let numeri= price.replace(reGex,(match)=>{
                return `${myOperatorRegex[match]}-`
            }).split("-")
            queryObject.price={
                   [numeri[0]] :Number(numeri[1]),
            }
        }
        if(rating){
            let numeri= rating.replace(reGex,(match)=>{
                return `${myOperatorRegex[match]}-`
            }).split("-")
            queryObject.rating={
                   [numeri[0]] :Number(numeri[1]),
            }
        }
        //this is for the sort funtionality and the var which was set default as createdat
        //if the sort var is not empty then i want to assign it and use it for sorting to 
        //the customers preferences
        if(sort){
            newSort=sort.split(",").join(" ");
        }
        //assigning the limit value to product limit
        // if(limit){
        //     productLimit=Number(limit)
            
        // }
        //the limit and sort values will be used here
        //probably use the select method to choose what to send to the frontend .select
        //("name price ...")
        const queryProducts=await ProductsModel.find(queryObject).sort(newSort).limit(productLimit).skip(skip);
        //if there is no matching results
        if(queryProducts.length === 0){
               return res.status(400).json({success:false,message:{nbHits:queryProducts.length,queryProducts:queryProducts}})  
        }
        return res.status(200).json({success:true,message:{queryProducts:queryProducts,nbHits:queryProducts.length}})    
        //catch errors
    } catch (error) {
        return res.status(500).json({success:false,message:{error}})
    }
    
}
module.exports={
    getAllProducts,
    getAllProductsStatic
}