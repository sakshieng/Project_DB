// const Question = require('../models/Question');
const connectoracle = require('../db/connect');

const createQuestion = async(req,res)=>{
    const orac = await connectoracle();
    const {email,topic,link,title,difficulty} = req.body;
    if(!email || !topic || !link || !title || !difficulty) {
        res.status(400).send(`Please provide all the details!`);
    }
    const query = await orac.execute(
        'insert into client_master values (:email, :title)',
        { email: email, title: title }
      );      
    const data = await orac.execute(`SELECT * FROM  client_master`);
    orac.release();
    res.status(201).json({data});
}

const getAllQuestion = async(req,res)=>{
    const orac = await connectoracle();
    const data = await orac.execute(`SELECT * FROM  client_master`);
    orac.release();
    res.status(201).json({data});

}

module.exports = {createQuestion,getAllQuestion};