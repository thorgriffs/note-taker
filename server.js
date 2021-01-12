// Dependencies
const express = require("express");
const path = require("path");
const fs = require("fs");

// Setup Express app
var app = express();
var PORT = process.env.PORT || 3000;

// Middleware - Setup Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname,'public')));


// // Basic routes for each html file
app.get("/", function(req, res) {
    res.sendFile(path.join(__dirname, "public","index.html"));
});
  
app.get("/notes", function(req, res) {
    res.sendFile(path.join(__dirname, "public","notes.html"));
});

// GET & POST

//Get stored notes
app.get("/api/notes", function(req, res) {
    var data = fs.readFileSync("db/db.json");
    var notes = JSON.parse(data);
    console.log(notes);
    res.json(notes);
    // return fs.readFileSync(path.resolve(__dirname, "db/db.json"));
    // var savedNote = res.json(req);
    // console.log(res);
//     fs.readFile("db/db.json", function (err, data) {
//         if (err) {
//             console.log(err)
//         }
//         else {
//             const file = res.json(data);

//             // res.json(file);
//             console.log(data);
//         }
//     });
});

// Get single note
app.get("/api/notes/:id", function(req, res) {
    req.json(db.json.filter(notes => notes.id === parseInt(req.params.id)));
});


//POST new note
app.post("/api/notes", function(req, res) {
    fs.readFile("db/db.json", "utf8", function (err, data) {
        if (err) {
            console.log(err)
        }
        else {
            const file = JSON.parse(data);
            console.log(file)
            file.push(req.body);

            const json = JSON.stringify(file);

            fs.writeFile("db/db.json", json, "utf8", function(err) {
                if (err) {
                    console.log(err);
                }
                else{
                    console.log(file);
                }
            });
        }
    });
});


// Listen
app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
  });
