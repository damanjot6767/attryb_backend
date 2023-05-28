const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'chhangani.amit@gmail.com',
      pass: 'wlbyoercjrttmwpb'
    }
});

const mailOptions = {
    from: 'ArborHawk Admin<chhangani.amit@gmail.com>',
    to: '',
    subject: '',
    html: ''
};

const sendMail = (to, subject, message) => {
    return new Promise((resolve,reject)=>{
        mailOptions.to = to;
        mailOptions.subject = subject;
        mailOptions.html = message;

        transporter.sendMail(mailOptions, function(error, info){
            if (error) {
                console.log(error);
                resolve(false);
            } else {
                console.log('Email sent: ' + info.response);
                resolve(true);
            // do something useful
            }
        });
    })
}

module.exports = {sendMail};