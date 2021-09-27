const express = require('express');
const cors = require('cors');
const bcrypt = require('bcrypt-nodejs');
const knex = require('knex');
const app = express();

const register = require('./connections/register');
const signin = require('./connections/signin');
const imagecount = require('./connections/imagecount');
const profile = require('./connections/profile');

const db = knex({
    client: 'pg',
    connection: {
      host : '127.0.0.1',
      port : '5432',
      user : 'ankesh',
      password : 'imageaiproject',
      database : 'imageai'
    }
});

app.use(express.json());
app.use(cors());

app.get('/', (req,res)=>{res.send('It is working')});
app.post('/signin', (req, res)=>{signin.handleSignin(req,res,db,bcrypt)});
app.post('/register', (req,res)=>{register.handleRegister(req, res, db, bcrypt)});
app.get('/profile/:id', (req,res)=>{profile.handleProfile(req, res, db)});
app.put('/imagecount', (req,res)=>{imagecount.handleImagecount(req, res, db)});
app.post('/image', (req,res)=>{imagecount.handleApicall(req, res)});


app.listen(process.env.PORT || 3000, () => {
    console.log(`App is running on port ${process.env.PORT}`);
})
