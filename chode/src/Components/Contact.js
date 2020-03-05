import React, { Component } from "react";
import TextField from "@material-ui/core/TextField";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { sendEmail } from "../actions/sendEmail";

class Contact extends Component {
  state = {
    email: "",
    message: "",
    personName: "",
    emailError: false,
    personNameError: false,
    messageError: false,
    emailErrorText: "",
    nameErrorText: "",
    messageErrorText: ""
  };

  handleChange = e => {
    e.preventDefault();
    this.setState({
      [e.target.name + "Error"]: false,
      [e.target.name + "ErrorText"]: "",
      [e.target.name]: e.target.value
    });
  };

  validateEmail(email) {
    const pattern = /[a-zA-Z0-9]+[\.]?([a-zA-Z0-9]+)?[\@][a-z]{3,9}[\.][a-z]{2,5}/g;
    const result = pattern.test(email);
    if (result === true) {
      this.setState({
        email: email
      });
      return false;
    } else {
      this.setState({
        emailError: true,
        emailErrorText: "Must be a valid email"
      });
      return true;
    }
  }

  validateName(name) {
    if (name.length < 2) {
      this.setState({
        personNameError: true,
        personNameErrorText: "Name must  not be less than two letters"
      });
      return true;
    } else if (/\d/.test(name)) {
      this.setState({
        personNameError: true,
        personNameErrorText: "Name must  not have a number"
      });
      return true;
    }
    return false;
  }

  validateMessage(message) {
    if (message.length < 2) {
      this.setState({
        messageError: true,
        messageErrorText: "Message must  not be less than two letters"
      });
      return true;
    }
    return false;
  }

  handleSubmit = e => {
    e.preventDefault();
    const emailerr = this.validateEmail(this.state.email);
    const nameerr = this.validateName(this.state.personName);
    const msgerr = this.validateMessage(this.state.message);
    if (!emailerr && !nameerr && !msgerr) {
      const { email, personName, message } = this.state;
      this.props.sendEmail(email, personName, message);
      this.setState({
        email: "",
        personName: "",
        message: ""
      });
    }
  };
  render() {
    if (this.props.mail.response) {
      return( 
      <div className="Disclaimer">
      <h1>
        {this.props.mail.response.data}
      </h1>
    </div>)
    }
    return (
      <div>
        <div className="Disclaimer">
          <h1>
            CONTACT US <br /> WITH YOUR EMAIL <br /> AND MESSAGE
          </h1>
        </div>
        <div className="Form-container">
          <form onSubmit={e => this.handleSubmit(e)}>
            <TextField
              error={this.state.personNameError}
              id="outlined-name"
              label="Name"
              className="input"
              name="personName"
              margin="normal"
              required
              onChange={e => this.handleChange(e)}
              helperText={this.state.personNameErrorText}
            />

            <TextField
              error={this.state.emailError}
              id="outlined-email-input"
              label="Email"
              className="input"
              type="email"
              name="email"
              autoComplete="email"
              margin="normal"
              required
              onChange={e => this.handleChange(e)}
              helperText={this.state.emailErrorText}
            />

            <TextField
              error={this.state.messageError}
              helperText={this.state.messageErrorText}
              id="outlined-multiline-flexible"
              label="Message"
              className="message-input"
              multiline
              rowsMax="4"
              name="message"
              margin="normal"
              variant="outlined"
              required
              onChange={e => this.handleChange(e)}
            />
          </form>
          <button
            type="submit"
            onClick={e => this.handleSubmit(e)}
            className="button-class"
          >
            SUBMIT
          </button>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return { mail: state.mailReducer };
};

export default connect(
  mapStateToProps,
  { sendEmail }
)(Contact);
