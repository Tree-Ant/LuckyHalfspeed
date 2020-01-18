const express = require("express");
const mongojs = require("mongojs");
const logger = require("morgan");
const path = require("path");
const mongoose = require('mongoose');

const app = express();

const PORT = process.env.PORT || 8000;

app.use(logger("dev"));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"));

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/project', { useNewUrlParser: true , useUnifiedTopology: true });

const databaseUrl = "project";
const collections = ["entries"];

const db = mongojs(databaseUrl, collections);

db.on("error", error => {
    console.log("Database Error:", error);
  });

app.get("/entries", (req, res) => {
  db.entries.find({}, (err, found) => {
    if (err) {
      console.log(err);
    } else {
      res.json(found);
    }
  });
});

app.post("/projects/newProject", ({ body }, res) => {
  const newProject = body;
  db.entries.save(newProject, (err, saved) => {
    if (err) {
      console.log(err);
    } else {
      res.json(saved);
    }
  });    
});

app.post("/newComment/:id", (req, res) => {  
    console.log(req.body);
  db.entries.updateOne({_id: mongojs.ObjectId(req.params.id)}, {$push: {comments : req.body.comments}})
  
});

// =============DELETE========================
app.delete("/delete/:id", (req, res) => {    
  db.entries.remove({_id: mongojs.ObjectId(req.params.id)})
});
  
// =================html Paths================ 
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, './public/index.html'));
});

app.get('/projects', (req, res) => {
  res.sendFile(path.join(__dirname, './public/projects.html'));
});

// =================Listener================
app.listen(PORT, () => {
  console.log("App running on port 8000!");
});