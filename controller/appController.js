const nodemailer = require('nodemailer');
const Mailgen = require('mailgen');
const { RequestModel } = require('../models/RequistModel.js');

const getmail = (req, res) => {


    const { email,name,number } = req.body;



    let config = {

        service : 'gmail',
        auth : {
            user:"pradeeptiwari2666@gmail.com",
            pass: "fvqgdggiclfasjgo"
        }
    }

    let transporter = nodemailer.createTransport(config);

    let MailGenerator = new Mailgen({
        theme: "default",
        product : {
            name: "estudee",
            link : 'https://pradeep2888.github.io'
        }
    })

    let response = {
        body: {
            name : name,
            intro: "Thank you for taking the time to visit our website we will connect to you shortly",
        }
    }

    let mail = MailGenerator.generate(response)

    let message = {
        from : "pradeeptiwari2666@gmail.com",
        to : email,
        subject: "Thanking Mail From estudee ",
        html: mail
    }
    
    const new_request=new RequestModel({
        name,
        email,
        number

    })
    const savedata=async()=>{
        await new_request.save()
    }

    transporter.sendMail(message).then(() => {
        savedata()
        return res.status(201).json({
            msg: "you should receive an email"
        })
    }).catch(error => {
        console.log(message)
        return res.status(500).json({ error })
    })

}


module.exports = {
    getmail
}