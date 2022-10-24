const PORT = process.env.PORT || 5000;
const cors = require('cors');
const express = require('express');
const app = express();


// parse request of content - type - application/x-www-from-urlencoded
app.use(express.urlencoded({extended: true}))

// beacuse the file in the modles folder that we are using
// requiring is index.js , we dont need to write it down
// when you don't write a file name, by defualt it will 
// try to load the index.js file

const db = require('./models')
db.sequelize

app.use(cors({origin:'*'}))

app.use(express.json())


app.get('/' , (req,res) => res.json({message: "Welcome to my application."}))
require('./routes/user.js')(app)
require('./routes/exam.js')(app)
require('./routes/question.js')(app)
require('./routes/user_answers.js')(app)



app.listen(PORT, () => console.log(`Listen on PORT ${PORT}`))