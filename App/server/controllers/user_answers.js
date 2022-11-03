const db = require('../models')
const UserAnswer = db.user_answers

//Create a new Uesr Answer
    exports.create = (req , res) => {
        if(!req.body.userAnswer)
        {
            res.status(400).send({message:'NOT GET ANSWER'})
            return;
        }
        const userAnswer = {
            examsID:req.body.examsID,
            questionID:req.body.questionID,
            userAnswer:req.body.userAnswer,
        }
        console.log("userAnswer",userAnswer)
        UserAnswer.create(userAnswer)
        .then( data => res.status(200).send(data))
        .catch(err => res.status(500).send({message: err.message}))
    }

//GET All User answer
    exports.findAll = (req , res) => {
        db.sequelize.query('SELECT exams.examsID ,exams.userID, questions.*,user_answers.userAnswer FROM crm_interview.user_answers inner join questions on questions.questionID = user_answers.questionID inner join exams ON user_answers.examsID = exams.examsID')
        .then(data => res.send(data[0]))
        .catch(err => res.status(500).send({message: err.message}))
    }

//Get All Answer by examID
    exports.answersExam = (req ,res) =>{
        const id = req.params.id;
            db.sequelize.query(`SELECT exams.examsID , questions.*,user_answers.userAnswer FROM user_answers inner join questions on questions.questionID = user_answers.questionID inner join exams ON user_answers.examsID = exams.examsID where exams.examsID = ${id}`)
            .then(data => {
                if(data[0].length == 0)
                res.status(200).send({message:"Not exist answer yet in exam"})
                else
                    res.send(data[0])
            })
            .catch(err => res.status(500).send({message: err.message}))
    }

//Delete All Answer by ID
    exports.DeleteByID = (req ,res) =>{
        const id = req.params.id;
        let num = 0;
        db.sequelize.query(`SELECT exams.examsID ,exams.userID, questions.*,user_answers.userAnswer FROM user_answers inner join questions on questions.questionID = user_answers.questionID inner join exams ON user_answers.examsID = exams.examsID where exams.userID = ${id}`)
        .then(data => {
            data[0].map(answer => {
                UserAnswer.destroy({where:{examsID:answer.examsID}})
                try{num = num + 1}
                catch{console.log("EROR:",err)}
            })
        })
        .then(() => {
            if(num == 0)
                res.status(200).send({message:`userID ${id} doesnt start answer on some exam`})
            else
                res.status(200).send({message:`DELETED`})
            })
        .catch(err => res.status(500).send({message:err}))
    }