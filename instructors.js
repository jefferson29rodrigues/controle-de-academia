const fs = require('fs');

// create
exports.post = function(req, res) {

    const keys = Object.keys(req.body)

   for(key of keys) {
       //req.body.avatar_url == "";
       if (req.body[key] == "") {
           return res.send('Please, fill all')
       }
   }

   fs.writeFile("data.json", JSON.stringify(req.body), function() {
       if (err) return res.send("write file error!")

       return res.redirect("/instructors")
   });

    return res.send(req.body)
}

// update

// delete