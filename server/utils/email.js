const sgMail = require('@sendgrid/mail');
const RESET_PASSWORD_EMAIL_FROM = process.env.RESET_PASSWORD_EMAIL_FROM
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

class Email {
  constructor(to, subject, html) {
    this.to = to;
    this.from = RESET_PASSWORD_EMAIL_FROM;
    this.subject = subject;
    this.html = html;
  }
  
  send() {
    const msg = {
      to: this.to,
      from: this.from,
      subject: this.subject,
      text: this.html,
      html: this.html
    }
    // console.log(msg)
    sgMail.send(msg).then((res) => {
      console.log('sent')
      //console.log(res)
    })
    .catch((err) => {
      console.log('err')
      //console.log(err)
    })
  }
}

module.exports = Email