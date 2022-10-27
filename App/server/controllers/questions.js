const db = require('./../models')
const Question = db.questions
// const Op = db.Sequelize.Op;

//Create Question object    
exports.create = (req , res) =>{
    console.log(req)
    if(!req.body.categoryExamsID){
        res.status(404).send({message:'categoryExamsID cannot be emepty'})
        return;
    }
        const question = {
            categoryExamsID: req.body.categoryExamsID ,
            questionTheQuestion:req.body.questionTheQuestion,
            questionTrueAnswer:req.body.questionTrueAnswer ,
            answer1:req.body.answer1 ,
            answer2:req.body.answer2 ,
            answer3:req.body.answer3 ,
            answer4:req.body.answer4 
        }
        Question.create(question)
        .then(data => {res.send(data)})
        .catch(err => res.status(500).send({message:err.message || "Some error occurred while creating the Question."}))
}

//Retarive All Questions FROM DB
exports.findAll = (req , res) =>{
    db.sequelize.query('SELECT questionID , categoryexams.categoryExamsID , categoryexams.categoryExamsName, questionTheQuestion,questionTrueAnswer,answer1,answer2,answer3,answer4 FROM questions INNER JOIN categoryexams ON questions.categoryExamsID = categoryexams.categoryExamsID')
    .then( data => res.send(data[0]))
    .catch(err => res.status(500).send({massage: err.message || "Some error occurred while retrieving the Questions."}))
} 

//Retrive Question by ID
exports.findOne =  (req, res) => {
    const id = req.params.id;
    Question.findOne({where: {questionID:id}})
    .then( data => {
        if(data)
            res.send(data)
        else
            res.status(404).send({message:`Can not find Question where id = ${id}`})
    })
    .catch(err => res.status(500).send({message:`Error retrieving Question with id = ${id}`}))
}

//Update Question by ID
exports.update = (req,res) => {
    const id = req.params.id
    Question.update(req.body , {where: {questionID:id}})
    .then( num => {
        if(num == 1)
            res.send({message:`Question with id ${id} UPDATE`})
        else
            res.send({message:`Cannot update Question with id ${id} , maybe it not found`})
    })
    .catch(err => res.status(500).send({message:err.message}))
}

//Delete a Question aspecified by ID
exports.delete = (req, res) => {
    const id = req.params.id;
    Question.destroy({where: {questionID:id}})
    .then(num => {
        if(num == 1)
            res.send({message:`Question ${id} DELETED`})
        else
        res.status(404).send({message:`Cannot Delete Question with ${id}. Maybe question cannot found.`})
    })
    .catch(err => {
        res.status(500).send({message:err.message})
    })
}