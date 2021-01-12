// Dependencies
const express = require("express");
const path = require("path");
const fs = require("fs");

// Setup Express app
var app = express();
var PORT = process.env.PORT || 3000;

// Middleware 
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname,'public')));

// Routes for each html file
app.get("/", function(req, res) {
    res.sendFile(path.join(__dirname, "public","index.html"));
});
  
app.get("/notes", function(req, res) {
    res.sendFile(path.join(__dirname, "public","notes.html"));
});

// GET, POST, DELETE notes

// GET all stored notes
app.get("/api/notes", function(req, res) {
    var data = fs.readFileSync("db/db.json");
    var notes = JSON.parse(data);
    console.log(notes);
    res.json(notes);
});

// POST new note
app.post("/api/notes", function(req, res) {
    fs.readFile("db/db.json", "utf8", function (err, data) {
        if (err) {
            console.log(err)
        }
        else {
            const file = JSON.parse(data);
            // console.log(file);
            var id = file.length ? (file[file.length -1].id + 1) : 1;
            file.push({title: req.body.title, text: req.body.text, id});

            const json = JSON.stringify(file);

            fs.writeFile("db/db.json", json, "utf8", function(err) {
                if (err) {
                    console.log(err);
                }
                else{
                    console.log(file);
                }
            });
            // var data = fs.readFileSync("db/db.json");
            var notes = JSON.parse(data);
            console.log(notes);
            res.json(notes);
        }
    });
});

// DELETE a note
app.delete("/api/notes/:id", function(req, res) {
    var data = fs.readFileSync("db/db.json");
    var notes = JSON.parse(data);
    notes = notes.filter(notes => notes.id !== parseInt(req.params.id));

    fs.writeFile("db/db.json", JSON.stringify(notes), "utf8", function(err) {
        if (err) {
            console.log(err);
        }
        else{
            res.sendStatus(200);
            // res.json(notes);
        }
    });      
});

// Listen
app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
  });