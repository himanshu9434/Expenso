const express = require ("express")
const bodyParser = require ("body-parser")
const mongoose = require ("mongoose")
const userRoutes = require("./Routes/userRoutes")
const expenseRoutes = require ("./Routes/expenseRoutes")
const incomeRoutes = require ("./Routes/incomeRoutes")
const utilitiesRoutes = require ("./Routes/utilitiesRoutes")
const HttpError = require ("./models/Http-error")

const app = express()

app.use(bodyParser.json())

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader(
      'Access-Control-Allow-Headers',
      'Origin, X-Requested-With, Content-Type, Accept, Authorization'
    );
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE');
  
    next();
  });

app.use('/api/user',userRoutes)
app.use('/api/expense',expenseRoutes)
app.use('/api/income',incomeRoutes)
app.use('/api/utilities',utilitiesRoutes)

app.use((req, res, next) => {
    const error = new HttpError('Could not find this route.', 404);
    throw error;
  });

app.use((error, req, res, next) => {
    if (res.headerSent) {
      return next(error);
    }
    res.status(error.code || 500);
    res.json({ message: error.message || 'An unknown error occurred!' });
  });

mongoose.
    connect(`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@mflix-clfhn.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`).
    then(()=>{
        app.listen(process.env.PORT || 5000)
    }).
    catch(err => {
        console.log(err)
    })