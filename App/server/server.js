const PORT = process.env.PORT || 8080;
const cors = require('cors');
const express = require('express');
const app = express();


// parse request of content - type - application/x-www-from-urlencoded
app.use(express.urlencoded({extended: true}))

// beacuse the file in the modles folder that we are using
// requiring is index.js , we dont need to write it down
// when you don't write a file name, by defualt it will 
// try to load the index.js file


const db = require('./models/')
db.sequelize.sync()


app.use(cors({origin:'*'}))

app.use(express.json())

if(process.env.NODE_ENV === 'production'){
    app.use(express.static('build'))
    app.get('*',(req,res) =>{
        req.sendFile(path.resolve(__dirname , 'build' , 'liran.html'))
    })
}

app.get('/' , (req,res) => res.json({message:"Welcome to mk application."}))
require('./routes/user.js')(app)
require('./routes/exam.js')(app)
require('./routes/question.js')(app)
require('./routes/user_answers.js')(app)

app.listen(PORT, () => console.log(`Listen on PORT ${PORT}`))