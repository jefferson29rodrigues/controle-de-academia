const fs = require('fs');
const data = require("./data.json")

// create
exports.post = function(req, res) {

    const keys = Object.keys(req.body)

   for(key of keys) {
       //req.body.avatar_url == "";
       if (req.body[key] == "") {
           return res.send('Please, fill all')
       }
   }

   req.body.birth = Date.parse(req.body.birth)
   req.body.created_at = Date.now()

   // na 1° [] -> [{...}] na 2° [{...}] -> [{...}, {...}] 
   data.instructors.push(req.body) //  na 3° [{...}, {...}] -> [{...}, {...}, {...}]

   fs.writeFile("data.json", JSON.stringify(data, null, 2), function(err) {
       if (err) return res.send("write file error!")

       return res.redirect("/instructors")
   });

    //return res.send(req.body)
}

// update

// delete