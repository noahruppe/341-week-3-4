const mongodb = require("../data/database");
const ObjectId = require("mongodb").ObjectId;

const getAll = async(req, res) =>{
    // #swagger.tags = ["Users"]
    const result = await mongodb.getDatabase().db().collection("users").find()
    result.toArray().then((users) =>{
        res.setHeader("Content-type", "application/json");
        res.status(200).json(users);
    })
    .catch((err) => {
        res.status(500).json({ message: "An error occurred while fetching users", error: err });
    });
};

const getSingle = async (req,res) =>{
    // #swagger.tags = ["Users"]
    if(!ObjectId.isValid(req.params.id)){
        res.status(400).json("you must have a valid id to find user");
    }
    const userId = new ObjectId(req.params.id);
    const result = await mongodb.getDatabase().db().collection("users").find({_id: userId});
    result.toArray().then((users)=>{
        res.setHeader("Content-type", "application/json");
        res.status(200).json(users[0]);
    })
    .catch((err) => {
        res.status(500).json({ message: "An error occurred while fetching the user", error: err });
    });
}

const CreateUser = async (req,res) =>{
    // #swagger.tags = ["Users"]
    const user = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        password: req.body.password,
        email: req.body.email
    };
    const response = await mongodb.getDatabase().db().collection("users").insertOne(user);
    if(response.acknowledged > 0){
        res.status(204).send();
    }
    else{
        res.status(500).json(response.error || "Some error occured while inserting the user");
    }
};

const updateUser = async (req,res) =>{
    // #swagger.tags = ["Users"]
    if(!ObjectId.isValid(req.params.id)){
        res.status(400).json("you must have a valid id to update user");
    }
    const userid = new ObjectId(req.params.id);
    const user = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        password: req.body.password,
        email: req.body.email
    };
    const response = await mongodb.getDatabase().db().collection("users").replaceOne({_id: userid}, user);
    if(response.modifiedCount > 0){
        res.status(204).send();
    }
    else{
        res.status(500).json(response.error || "Some error occured while updating the user");
    }
};

const deleteUser = async (req,res) =>{
    // #swagger.tags = ["Users"]
    if(!ObjectId.isValid(req.params.id)){
        res.status(400).json("you must have a valid id to delete user");
    }
    const userId = new ObjectId(req.params.id);
    const response = await mongodb.getDatabase().db().collection("users").deleteOne({_id: userId});
    if(response.deletedCount > 0){
        res.status(204).send();
    }else{
        res.status(500).json(response.error || "Some error occured while deleting a user");
    }
}

module.exports = {
    getAll,
    getSingle,
    CreateUser,
    updateUser,
    deleteUser
}