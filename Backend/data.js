const bcrypt = require("bcrypt");
const salt = 10;
module.exports.data = {
    users:[
        {
          name:"Lucky",
          email:"test@gmail.com",
          password:bcrypt.hashSync("lucky",salt),
          isAdmin:true
        },
        {
            name:"test2",
            email:"test2@gmail.com",
            password:bcrypt.hashSync("12345",salt),
            isAdmin:false
        }
    ],
    products:[
        {
            name:"men Holiday shirts",
            slug:"men-holiday-shirt",
            category:"shirts",
            image:"/Nike-shirt.jpeg",
            price:120,
            countInStock:1,
            brand:"Nike",
            rating:"4.5",
            numReviews:10,
            description:"hight quality shirt"
        },
        {
            name:"guys colored shirt",
            slug:"guys colored shirt",
            category:"shirts",
            image:"/Nike shirt2.jpeg",
            price:100,
            countInStock:15,
            brand:"Nike",
            rating:"4",
            numReviews:3,
            description:"hight quality shirt for Men"
        },
        {
            name:"japannese pair clothes",
            slug:"japannese-pair-clothes",
            category:"pair-clothes",
            image:"/pair.jpeg",
            price:120,
            countInStock:10,
            brand:"puma",
            rating:"4.5",
            numReviews:10,
            description:"hight quality pair clothes"
        },
        {
            name:"colored shirt",
            slug:"colored-shirt",
            category:"shirts",
            image:"/Nikeshirt3.jpeg",
            price:120,
            countInStock:10,
            brand:"Nike",
            rating:"4.5",
            numReviews:9,
            description:"hight quality shirt"
        },
    ]
}