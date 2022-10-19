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

app.post("/mailapi/reject/:message", (req, res) => {
  console.log("request came");
  let user = req.body
  let message = req.params.message;
  sendMail(user, message, (err, info) => {
    if (err) {
      console.log(err);
      res.status(400);
      res.send({ error: "Failed to send email" });
    } else {
      console.log("Email has been sent to !!!" + JSON.stringify(user.email));
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
        html: `<h4>Hello, ${user.name}.</h4> <p>You requested to change the password. 
        To do so, please follow the link below 
        <p>http://localhost:4200/replacepassword/${user.username}</p>
        <p>If you didnt request the access, disregard this email. Enjoy the rest of your day!</p>
        <p><img src="https://www.incedoinc.com/wp-content/uploads/incedo-logo.png"></p>`
      };
      //console.log('=> sendting to =>' + mailOptions.to+'<=')
      //new user
      const mailOptions2 = {
        from: `"<Incedo App>", "<john.bognet.resinc@gmail.com>"`,
        to: `<ivchenko.vladyslav@gmail.com>`,
        subject: `ACTION REQUIRED: New user access request (USER-ID: ${user.username})`,
        html: `<h4>Good day, Admin!</h4>

        <p>There is a new registed account for the role: <b><i>${user.role}</i></b>
        with following username <b><i>${user.username}</i></b>.</p>
        <p>Please, approve to allow access or reject the mentioned user ASAP.</p>
        <p>Thank you and enjoy the rest of your day!</p>
        <p><img src="https://www.incedoinc.com/wp-content/uploads/incedo-logo.png"></p>`
      };
      //approval
      const mailOptions3 = {
        from: `"<Incedo App>", "<john.bognet.resinc@gmail.com>"`,
        to: `<${user.email}>`,
        subject: `Approval Notice (USER-ID: ${user.username})`,
        html: `<h4>Greetings, Dear ${user.name}!</h4> \n <p>Your account: (<b><i>${user.username}</i></b>) was approved by the management!\n<br>
        You can now login with the credential used during the registration process via the following link: http://localhost:4200/login </p> <p>
        We are a happy to welcome you aboard.</p>
        <p><img src="https://www.incedoinc.com/wp-content/uploads/incedo-logo.png"></p>`
      };
      //rejection
      const mailOptions4 = {
        from: `"<Incedo App>", "<john.bognet.resinc@gmail.com>"`,
        to: `<${user.email}>`,
        subject: `Rejection Notice (USER-ID: ${user.username})`,
        html: `<h4>Dear, ${user.name}! </h4> <p>Unfortunately, your account request was rejected.
        The rejection reason: <b>"${type}"</b></p>
        <p>Thank you for your time!</p>
        <p><img src="https://www.incedoinc.com/wp-content/uploads/incedo-logo.png"></p>`
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
      else{
        mailOptions = mailOptions4;
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

 