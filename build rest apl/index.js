const express = require("express");
const users = require("./MOCK_DATA.json");
const app = express();


app.get("/users",(req,res)=>{
    const html =`
    <ul>
        ${users.map((user)=>`<li>${user.first_name}</li>`).join("")}
    </ul>
    `;
    res.send(html)
})



// REST API
// app.get("/api/users",(req,res)=>{
//     return res.send(users);
// })

// app.get("/api/users/:id",(req,res)=>{
//     const id = Number(req.params.id);
//     const user = users.find((user)=>user.id===id);
//     return res.json(user)
// })



app.route("/api/users/:id")
.get((req,res)=>{
    const id = Number(req.params.id);
    const user = users.find((user)=>user.id===id);
    return res.json(user)
})
.patch((req,res)=>{
    // edit user
    res.json({status:"Pending"});
})
.delete((req,res)=>{
    // delete user
    res.json({hi:"hi"});
})

app.post("/api/users",(req,res)=>{
    return res.json({status:"pending"})
})







const PORT = 8000; 
app.listen(PORT,()=>{
    console.log(`Server started at port no ${PORT}... `)
})