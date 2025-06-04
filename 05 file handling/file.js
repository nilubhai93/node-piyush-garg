const fs = require("fs");

// fs.writeFile("./testnew.tex", "hey fgfbgfgbf there",(err)=>{});


// const result = fs.readFile("./testnew.text","utf-8")
// console.log(result);


// fs.readFile("./testnew.tex","utf-8",(err,result)=>{
//     if(err){
//         console.log("error", err);
//     }else{
//         console.log(result);
//     }
// })


// fs.appendFileSync("./test.txt",`${Date.now()} hey how are you`);

// fs.cpSync("./test.txt", "./copyy.txt");



// fs.unlink("./copyy.txt", (err) => {
//     if (err) {
//         console.log("Error deleting file:", err);
//     } else {
//         console.log("File deleted successfully.");
//     }
// });

// fs.unlinkSync("./copyy.txt")


console.log(fs.statSync("./test.txt"))