//import modules installed at the previous step. We need them to run Node.js server and send emails
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const nodemailer = require("nodemailer");
// create a new Express application instance
const app = express();
//configure the Express middleware to accept CORS requests and parse request body into JSON
app.use(cors({origin: "*" }));
app.use(bodyParser.json());
//start application server on port 3000
app.listen(3000, () => {
  console.log("The server started on port 3000");
});
// define a sendmail endpoint, which will send emails and response with the corresponding status
app.post("/mailapi/:type", (req, res) => {
  console.log("request came");
  let user = req.body
  let type = req.params.type;
  sendMail(user, type, (err, info) => {
    if (err) {
      console.log(err);
      res.status(400);
      res.send({ error: "Failed to send email" });
    } else {
      console.log("Email has been sent to !!!" + type + JSON.stringify(user.email));
      res.send(info);
      res.send(user);
    }
  });
});

const sendMail = (user, type, callback) => {
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false,
      auth: {
        user: "john.bognet.resinc@gmail.com",
        pass: "actwleimkomwnney"
      }
    });
    //renewal
    const mailOptions1 = {
        from: `"<Incedo App>", "<john.bognet.resinc@gmail.com>"`,
        to: `<${user.email}>`,
        subject: "Password Renewal Link",
        html: `Hello. You requested to change the password. Please follow the link below <br/>
        <p>http://localhost:4200/replacepassword/${user.username}</p>`
      };
      //console.log('=> sendting to =>' + mailOptions.to+'<=')
      //new user
      const mailOptions2 = {
        from: `"<Incedo App>", "<john.bognet.resinc@gmail.com>"`,
        to: `<ivchenko.vladyslav@gmail.com>`,
        subject: `New user (USER-ID: ${user.username})`,
        html: `<p>There is a new registed account for the role: <br>
        ${user.role} with username ${user.username}. Please, approve to allow access.</p>`
      };
      //approval
      const mailOptions3 = {
        from: `"<Incedo App>", "<john.bognet.resinc@gmail.com>"`,
        to: `<${user.email}>`,
        subject: `Approval Notice (USER-ID: ${user.username})`,
        html: `<p>Dear, ${user.name}! \nYour account was approved!\n<br>
        You can now login with the credential via the following link: http://localhost:4200/login </p>`
      };
      let mailOptions;
      if(type == 'renewal'){
        mailOptions = mailOptions1;
      }
      else if(type == 'adminnotify'){
        mailOptions = mailOptions2;
      }
      else if(type == 'usernotify'){
        mailOptions = mailOptions3;
      }

      transporter.sendMail(mailOptions, callback);
  }

  // app.post("/mailapi/notifyadmin", (req, res) => {
  //   console.log("request came");
  //   let user = req.body
  //   sendMail2(user, (err, info) => {
  //     if (err) {
  //       console.log(err);
  //       res.status(400);
  //       res.send({ error: "Failed to send email" });
  //     } else {
  //       console.log("Email has been sent to " + JSON.stringify(user.email));
  //       res.send(info);
  //       res.send(user);
  //     }
  //   });
  // });

  // const sendMail2 = (user, callback) => {
  //   const transporter2= nodemailer.createTransport({
  //     host: "smtp.gmail.com",
  //     port: 587,
  //     secure: false,
  //     auth: {
  //       user: "john.bognet.resinc@gmail.com",
  //       pass: "actwleimkomwnney"
  //     }
  //   });

  //   const mailOptions2 = {
  //       from: `"<Incedo App>", "<john.bognet.resinc@gmail.com>"`,
  //       to: `<ivchenko.vladyslav@gmail.com>`,
  //       subject: `New user (USER-ID: ${user.username})`,
  //       html: `<p>There is a new registed account for the role: <br>
  //       ${user.role} with username ${user.username}. Please, approve to allow access.</p>`
  //     };
  //     //console.log('=> sendting to =>' + mailOptions.to+'<=')

  //     transporter2.sendMail2(mailOptions2, callback);
  // }


  // app.post("/mailapi/notifyuser", (req, res) => {
  //   console.log("request came");
  //   let user = req.body
  //   sendMail3(user, (err, info) => {
  //     if (err) {
  //       console.log(err);
  //       res.status(400);
  //       res.send({ error: "Failed to send email" });
  //     } else {
  //       console.log("Email has been sent to " + JSON.stringify(user.email));
  //       res.send(info);
  //       res.send(user);
  //     }
  //   });
  // });

  // const sendMail3 = (user, callback) => {
  //   const transporter3 = nodemailer.createTransport({
  //     host: "smtp.gmail.com",
  //     port: 587,
  //     secure: false,
  //     auth: {
  //       user: "john.bognet.resinc@gmail.com",
  //       pass: "actwleimkomwnney"
  //     }
  //   });

    // const mailOptions3 = {
    //     from: `"<Incedo App>", "<john.bognet.resinc@gmail.com>"`,
    //     to: `<${user.email}>`,
    //     subject: `Approval Notice (USER-ID: ${user.username})`,
    //     html: `<p>Your account was approved!<br>
    //     You can login with the credential via the following link: http://localhost:4200/login </p>`
    //   };
  //     //console.log('=> sendting to =>' + mailOptions.to+'<=')

  //     transporter3.sendMail3(mailOptions3, callback);
  // }

 