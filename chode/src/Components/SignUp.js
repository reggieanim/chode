import React, { Component } from "react";
import TextField from "@material-ui/core/TextField";
import { Redirect } from "react-router-dom";
import IconButton from '@material-ui/core/IconButton';
import { connect } from "react-redux";
import { signUp } from "../actions/signUp";
import OutlinedInput from '@material-ui/core/OutlinedInput';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import InputAdornment from '@material-ui/core/InputAdornment'

class SignUp extends Component {
  state = {
    email: "",
    message: "",
    personName: "",
    emailError: false,
    personNameError: false,
    passwordError: false,
    emailErrorText: "",
    nameErrorText: "",
    passwordErrorText: "",
    password: "",
    showPassword: false
  };

  handleClickShowPassword = (e) => {
    e.preventDefault()
    let boolean = !this.state.showPassword
    this.setState({ showPassword: boolean})
  };

  handleMouseDownPassword = event => {
    event.preventDefault();
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

  validatePassword(pass) {
    if (pass.length < 6) {
      this.setState({
        passwordError: true,
        passwordErrorText: "Password must be more than 6 characters"
      });
      return true;
    }
    return false;
  }

  handleSubmit = e => {
    e.preventDefault();
    const emailerr = this.validateEmail(this.state.email);
    const nameerr = this.validateName(this.state.personName);
    const passerr = this.validatePassword(this.state.password);
    if (!emailerr && !nameerr && !passerr) {
      const { email, personName, password } = this.state;
      this.props.signUp(email, personName, password);
      this.setState({
        email: "",
        personName: "",
        password: ""
      });
    }
  };
  render() {
    if (this.props.signup.response) {
      console.log(this.props.signup.response.data)
      return( 
      <div className="Disclaimer">
      <h1>
        Succesfully signed up
      </h1>
    </div>)
    }
    return (
      <div>
        
        <div className="Disclaimer">
          <h1>
            SIGN UP <br /> WITH YOUR EMAIL , NAME <br /> AND PASSWORD 
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
        <FormControl variant="outlined" className="input" helperText={this.state.passwordErrorText}>
        <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
          <OutlinedInput
            error={this.state.passwordError}
            helperText={this.state.passwordErrorText}
            id="outlined-adornment-password"
            name="password"
            type={this.state.showPassword ? 'text' : 'password'}
            value={this.state.password}
            onChange={e => this.handleChange(e)}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={ e => this.handleClickShowPassword(e)}
                  onMouseDown={event => this.handleMouseDownPassword(event)}
                >
                  {this.state.showPassword ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              </InputAdornment>
            }
            labelWidth={70}
          />
          </FormControl>
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
  return { signup: state.signUpReducer};
};

export default connect(
  mapStateToProps,
  { signUp }
)(SignUp);
