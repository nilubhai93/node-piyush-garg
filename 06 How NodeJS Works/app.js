const fs = require("fs");
const os = require("os")

console.log(os.cpus().length);



// console.log("1")
// sync -  blocking
// fs.writeFileSync("./testnew.txt","hi nilu ")

// Async -  Non-blocking
// fs.writeFile("./testnew.txt", "hey fgfbgfgbf there",(err)=>{});




// sync-blocking
// const result = fs.readFileSync("testnew.txt", "utf-8")
// console.log(result)

// async-NonBlocking
// fs.readFile("testnew.txt", "utf-8", (err, result) => {
//         console.log(result)    
//     })


// console.log("2")