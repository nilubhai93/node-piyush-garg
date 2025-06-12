const express = require("express");
const fs = require("fs");
const users = require("./MOCK_DATA.json");
const app = express();

// Middleware - plugin
app.use(express.urlencoded({extended:false}));


app.get("/users",(req,res)=>{
    const html =`
    <ul>
        ${users.map((user)=>`<li>${user.first_name}</li>`).join("")}
    </ul>
    `;
    res.send(html)
})

app.use((req, res, next)=>{
    console.log("hello from middleware 1");
    req.myUserName = "niladri.dev"
    next();
})

app.use((req, res, next)=>{
    console.log("hello from middleware 2",req.myUserName);
    next();
})


// REST API
app.get("/api/users",(req,res)=>{
    res.setHeader("myName","nilu maji")
    // console.log("i am get route", req.myUserName);
    return res.json (users);
})

// app.get("/api/users/:id",(req,res)=>{
//     const id = Number(req.params.id);
//     const user = users.find((user)=>user.id===id);
//     return res.json(user)
// })



// app.route("/api/users/:id")
// .get((req,res)=>{
//     const id = Number(req.params.id);
//     const user = users.find((user)=>user.id===id);
//     return res.json(user)
// })
// .patch((req,res)=>{
//     // edit user
//     res.json({status:"Pending"});
// })
// .delete((req,res)=>{
//     // delete user
//     res.json({hi:"hi"});
// })

// app.post("/api/users",(req,res)=>{
//     const body = req.body;
//     users.push({...body, id:users.length+1});
//     fs.writeFile("./MOCK_DATA.json",JSON.stringify(users),(err,data)=>{
//         return res.json({status:"success",id:users.length});
//     })
// })
  






const PORT = 8000; 
app.listen(PORT,()=>{
    console.log(`Server started at port no ${PORT}... `)
})