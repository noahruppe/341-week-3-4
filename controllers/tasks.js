
const mongodb = require("../data/database");
const ObjectId =  require("mongodb").ObjectId;


const getAll = async(req,res) =>{
    const userId = new ObjectId(req.params.id);
    const result = await mongodb.getDatabase().db().collection("tasks").find({userId: userId});
    result.toArray().then((tasks) =>{
        res.setHeader("Content-type", "application/json");
        res.status(200).json(tasks);
    })
    .catch((err) => {
        res.status(500).json({ message: "An error occurred while fetching the user", error: err });
    });
}

const getSingle = async(req,res) =>{
    if(!ObjectId.isValid(req.params.id)){
        res.status(400).json("you must have a valid id to find task");
    }
    const userId = new ObjectId(req.params.userid);
    const tasksId = new ObjectId(req.params.taskid);
    const result = await mongodb.getDatabase().db().collection("tasks").find({_id: tasksId, userId: userId});
    result.toArray().then((tasks) =>{
        res.setHeader("Content-type", "application/json");
        res.status(200).json(tasks);
    })
    .catch((err) => {
        res.status(500).json({ message: "An error occurred while fetching the user", error: err });
    });
}

const createTask = async (req,res) =>{
    const userId = new ObjectId(req.params.userId);
    const task = {
        title: req.body.title,
        description: req.body.description,
        dueDate: req.body.dueDate,
        progress: req.body.progress,
        instructor: req.body.instructor,
        subject: req.body.subject,
        userId: userId
    }
    const response = await mongodb.getDatabase().db().collection("tasks").insertOne(task);
    if(response.acknowledged > 0){
        res.status(201).json({ message: "Task created successfully", taskId: response.insertedId });
    }else{
        res.status(500).json(response.error || "Some error occured while creating a new task");
    }
};

const updateTask = async (req,res) =>{
    if(!ObjectId.isValid(req.params.id)){
        res.status(400).json("you must have a valid id to update task");
    }
    const userId = new ObjectId(req.params.userId);
    const taskid = new ObjectId(req.params.id);
    const task = {
        title: req.body.title,
        description: req.body.description,
        dueDate: req.body.dueDate,
        progress: req.body.progress,
        instructor: req.body.instructor,
        subject: req.body.subject,
        userId: userId
    }
    const response = await mongodb.getDatabase().db().collection("tasks").replaceOne({userId: userId, _id: taskid}, task)
    if(response.modifiedCount > 0){
        res.status(204).send();
    }else{
        res.status(500).json(response.error || "Some error occured while updating task");
    }
}

const deleteTask = async (req,res) =>{
    if(!ObjectId.isValid(req.params.id)){
        res.status(400).json("you must have a valid id to delete task");
    }
    const userId = new ObjectId(req.params.userId);
    const taskId = new ObjectId(req.params.id);

    const response = await mongodb.getDatabase().db().collection("tasks").deleteOne({userId: userId, _id: taskId});
    if(response.deletedCount > 0){
        res.status(204).send();
    }else{
        res.status(500).json(response.error || "An error occurd while deleting the task");
    }
}




module.exports = {
    getAll,
    getSingle,
    createTask,
    updateTask,
    deleteTask
};