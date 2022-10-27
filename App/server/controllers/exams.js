const db = require('./../models')
const Exam = db.exams
// const Op = db.Sequelize.Op;

//for send Email
const fs = require('fs');
const { promisify } = require('util');
const readFile = promisify(fs.readFile);
const handlebars = require('handlebars');

nodemailer = require('nodemailer'),


//Create Exam object    
    exports.create = (req , res) =>{
        if(!req.body?.userID){
            res.status(404).send({message:'user ID cannot be emepty'})
            return;
        }
            req.body.categorys?.map( examID =>{
                const exam = {
                    categoryExamsID: examID ,
                    userID:req.body.userID,
                    score:0,
                    done:false,
                    sent:false
                }
            Exam.create(exam)
            .then(data => res.send(data))
            .catch(err => res.status(500).send({message:err.message || "Some error occurred while creating the Exam."}))
       })
    }

//Retarive All Exams FROM DB
    exports.findAll = (req , res) =>{
        db.sequelize.query('SELECT examsID , users.userID , users.userName , users.userEmail ,score ,done, sent ,categoryexams.categoryExamsID, categoryexams.categoryExamsName  FROM exams INNER JOIN categoryexams ON exams.categoryExamsID = categoryexams.categoryExamsID INNER JOIN users ON exams.userID = users.userID')
        .then( data => res.send(data[0]))
        .catch(err => res.status(500).send({massage: err.message || "Some error occurred while retrieving the Exams."}))
    } 
    
//Retrive Exam by ID
    exports.findOne =  (req, res) => {
        const id = req.params.id;
        Exam.findOne({where: {examsID:id}})
        .then( data => {
            if(data)
                res.send(data)
            else
                res.status(404).send({message:`Can not find Exam where id = ${id}`})
        })
        .catch(err => res.status(500).send({message:`Error retrieving Exams with id = ${id}`}))
    }

//Retrive Exam by userID and CategoryID
    exports.findExam = (req ,res) =>{
        console.log(req)
        db.sequelize.query(`SELECT * FROM exams WHERE userID = ${req.body.userID} and categoryExamsID = ${req.body.categoryExamsID}`)
        .then( data => res.send(data))
        .catch(err => res.status(500).send({massage: err.message || "Some error occurred while retrieving the Exams."}))
    }
//Update Exam by ID
exports.update = (req,res) => {
    const id = req.params.id
    Exam.update(req.body , {where: {examsID:id}})
    .then( num => {
        if(num == 1)
            res.send({message:`Exam with id ${id} UPDATE`})
        else
            res.send({message:`Cannot update Exam with id ${id} , maybe it not found`})
    })
    .catch(err => res.status(500).send({message:err.message}))
}

//Delete a Exam aspecified by ID
exports.delete = (req, res) => {
    const id = req.params.id;
    Exam.destroy({where: {examsID:id}})
    .then(num => {
        if(num == 1)
            res.send({message:`Exam ${id} DELETED`})
        else
        res.status(404).send({message:`Cannot Delete Exam with ${id}. Maybe Exam cannot found.`})
    })
    .catch(err => {
        res.status(500).send({message:err.message})
    })
}

//Delete all Exam aspecified by UserID
exports.deleteAll = (req, res) => {
    const id = req.params.id;
    Exam.destroy({where: {userID:id}})
    .then(num => {
        if(num > 0)
            res.status(200).send({message:`Exams of ${id} DELETED`})
        else
            res.status(204).send()
    })
    .catch(err => {
        res.status(500).send({message:err.message})
    })
}

exports.SendExam = async (req , res) =>{

    // fs.writeFile(`./views/exam.ejs`,"Thanks you",(err) => {
    //     if (err)
    //       console.log(err);
    //     else {
    //       console.log("File written successfully\n");
    //       console.log("The written has the following contents:");
    //       console.log(fs.readFileSync("./views/exam.ejs", "utf8"));
    //     }})





    let transporter =  nodemailer.createTransport({
        pool: true,
        host: 'smtp.gmail.com',
        port:465,
        secure: true, 
        auth: {
          user: 'liranuzistud@gmail.com',
          pass:'hxeygyqnwfohbrsa'                   //This is the token from google access from https://myaccount.google.com/apppasswords?rapt=AEjHL4Nb54F7EHHwDyQ-vdIqdjHYQDIoLSbR0wWCyDy3-hjdk0xLeDyIc7dYi0Bd4jOCHkmM2zIu3yguF-XQKvvkDhjh9jfDYA
          },                                        //name : אימייל ב-מחשב Windows שלי 
          tls: {
            // do not fail on invalid certs
            rejectUnauthorized: false,
          },
      })
    //   const source = fs.readFileSync('./views/exam.ejs', 'utf-8').toString();
    //   const template = handlebars.compile(source);
    //   const replacements = {
    //     title: "Work!"
    //   };
    //   const htmlToSend = template(replacements);

      let mailOptions = {
        to: req.body.to,
        subject: 'Exam From Interview',
        html: fs.readFileSync('./views/exam.ejs', 'utf-8')
        // template: htmlToSend,
        // context: {                  // <=
        //     title: 'Work',
        //   }
        }

            console.log(mailOptions)
            transporter.sendMail(mailOptions,  function(error, info){
                if(!mailOptions.to.trim())
                res.status(404).send({message:'You Must Enter email to send'})
      
                if (error) 
                  res.status(500).send({message:{error}})
                else 
                  res.status(200).send({message:"send"})
                })

 

      
           
      
      }
