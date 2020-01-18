const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let projectSchema = newSchema({
    title: { type:String, required: true },
    date: { type:String, required: true },
    idea: { type:String, required: true },
    setting: { type:String, required: true },
    location: { type:String, required: true },
    author: { type:String, required: true },
    imgLink: { type:String, required: false },
    comments: { type:String, required: false },
    created: Date.now()
});

const Project = mongoose.model('Project', projectSchema);

module.exports = Project;