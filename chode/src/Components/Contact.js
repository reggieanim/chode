import React, { Component } from "react";
import TextField from "@material-ui/core/TextField";

class Contact extends Component {
  state = {
    email: "",
    message: "",
    personName: ""
  };

  handleChange = e => {
    e.preventDefault();
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  handleSubmit = e => {
    e.preventDefault();
    console.log({
      email: this.state.email,
      message: this.state.message,
      name: this.state.personName
    });
  };
  render() {
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
              id="outlined-name"
              label="Name"
              className="input"
              name="personName"
              margin="normal"
              variant="outlined"
              onChange={e => this.handleChange(e)}
            />
            <TextField
              id="outlined-email-input"
              label="Email"
              className="input"
              type="email"
              name="email"
              autoComplete="email"
              margin="normal"
              variant="outlined"
              onChange={e => this.handleChange(e)}
            />
            <TextField
              id="outlined-multiline-flexible"
              label="Message"
              className="message-input"
              multiline
              rowsMax="4"
              name="message"
              margin="normal"
              variant="outlined"
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

export default Contact;
