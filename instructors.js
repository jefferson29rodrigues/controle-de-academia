const fs = require('fs');
const data = require("./data.json")

//show
exports.show = function(req, res) {
    // req.query.id
    // req.body
    // req.params.id = /:id

    const { id } = req.params

    const foundInstructor = data.instructors.find(function(instructor) {
        return instructor.id == id
    })

    if (!foundInstructor) return res.send("Instructor not found!")

    const instructor = {
      ...foundInstructor,
      age: "",
      services: foundInstructor.services.split(","),
      created_at: "",
    }

    return res.render("instructors/show", { instructor })

}

// create
exports.post = function(req, res) {

    const keys = Object.keys(req.body)

   for(key of keys) {
       //req.body.avatar_url == "";
       if (req.body[key] == "") {
           return res.send('Please, fill all')
       }
   }

   let {avatar_url, birth, name, gender, services} = req.body

   birth = Date.parse(birth)
   const created_at = Date.now()
   const id = Number(data.instructors.length + 1)

   

   // na 1° [] -> [{...}] na 2° [{...}] -> [{...}, {...}] 
   data.instructors.push({
       id,
       avatar_url,
       name,
       birth,
       gender,
       services,
       created_at
   }) //  na 3° [{...}, {...}] -> [{...}, {...}, {...}]

   fs.writeFile("data.json", JSON.stringify(data, null, 2), function(err) {
       if (err) return res.send("write file error!")

       return res.redirect("/instructors")
   });

    //return res.send(req.body)
}

// update

// delete