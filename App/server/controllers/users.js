const db = require('../models')
const User = db.users
const bcrypt = require('bcrypt');

//Create USER
    exports.create = async (req ,res) => {
        let existEmail = await User.findOne({where: {userEmail:req.body.userEmail}})
        try{
            if(req.body.userName.trim() == '' || req.body.userEmail.trim() == '')
            {
                res.status(200).send({message:"Email or User Name Cannot Be Empty"})
                return;
            }
            else if(existEmail != null)
            {
                res.status(200).send({message:"This Email have been used"})
            }
            else
            {
                if(req.body.userPassword.trim() != '')  
                {
                    const hashedPassword = await bcrypt.hash(req.body.userPassword, 2)
                    try{
                        const user = {
                            userName:req.body.userName,
                            userEmail:req.body.userEmail,
                            userPassword: hashedPassword,
                            roleID:req.body.roleID
                        }
                        User.create(user)
                        .then(data => res.send(data))
                        .catch(err => res.status(500).send({message:err.message || "Some error occurred while creating the User."}))
                    }
                    catch(err){
                        console.error(error);
                        res.status(500).send({massage:err.massage});
                    }
                }
                else{
                    res.status(200).send({message:"Enter a password"})
                }
            }
        }  
        catch{err} 
    }

//Retarive All USERS FROM DB
    exports.findAll = (req,res) => {
         db.sequelize.query('SELECT userID , userName , userEmail , userPassword , roles.roleName FROM users INNER JOIN roles ON users.roleID = roles.roleID')
        .then( data => res.send(data[0]))
        .catch(err => res.status(500).send({massage: err.message || "Some error occurred while retrieving the User."}))
    }

//Retrive USER by ID
    exports.findOne =  (req, res) => {
        const id = req.params.id;
         User.findOne({where: {userID:id}})
        .then( data => {
            if(data)
                res.send(data)
            else
                res.status(404).send({message:`Can not find Tutorial where id = ${id}`})
        })
        .catch(err => res.status(500).send(true))
    }

//Retrive if the Email exists
    exports.findEmail = (req , res) =>{
        const email = req.body.userEmail
        User.findOne({where:{userEmail: email}})
        .then(data => {
            if(data)
                return res.status(200).send(data)
            else  
                return res.status(200).send(data)
        })
        .catch(err =>res.status(500).send(console.log(err)))
    }

//Update USER by ID
    exports.update = async (req,res) => {
        console.log(req.body)
        const id = req.params.id

        if(req.body.userPassword.trim() != '')  
       { 
           const hashedPassword = await bcrypt.hash(req.body.userPassword, 2)
            try{
                const user =  {
                    userName:req.body.userName ,
                    userEmail:req.body.roleEmail ,
                    userPassword:hashedPassword,
                    roleName:req.body.roleName 
                }
                User.update(user, {where: {userID:id}})
                .then( num => {
                    if(num == 1)
                        res.send({message:`User with id ${id} UPDATE`})
                    else
                        res.send({message:`Cannot update User with id ${id} , maybe it not found`})
                })
                .catch(err => res.status(500).send({message:err.message}))
            } 
            catch{
                res.status(500).send({message:err.message});
            }  
        } 
        else{res.status(400).send({message:"Not Enter Password"})}  
    }

//Delete a USER aspecified by ID
    exports.delete = (req, res) => {
        const id = req.params.id;
        User.destroy({where: {userID:id}})
        .then(num => {
            if(num == 1)
                res.send({message:`User ${id} DELETED`})
            else
            res.status(404).send({message:`Cannot Delete User with ${id}. Maybe user cannot found.`})
        })
        .catch(err => {
            res.status(500).send({message:err.message})
        })
    }
//Login
exports.login =  (req , res) =>{
    User.findOne({where: {userEmail:req.body.email}})
    .then(user =>  
        {
            if(user)
            {
                bcrypt.compare(req.body.password, user.userPassword)
                .then(data => {
                    res.status(200).send(user)
                })
                .catch(err => res.status(500).send({error:err.message}))
            }
            else{
                res.status(204).send(true)
            }
        }
    )
    .catch(err => res.status(500).send('Not Found'))


    // try{
    //     // try{
    //     //     if(match) 
    //     //         res.status(200).send(user)
    //     //     else 
    //     //         res.status(200).send(false)
    //     // }
    //     // catch{
    //     //     res.status(500).send({message:'bcryptjs compare fall'});
    //     // } 
    // }
    // catch{
    //     res.status(500).send({message:'err.message2'});
    // }  
 }