import React, { Component } from "react";
import TextField from "@material-ui/core/TextField";
import { Redirect } from "react-router-dom";
import Loader from "./Loader"
import IconButton from '@material-ui/core/IconButton';
import { login, authenticate } from "../actions/auth";
import OutlinedInput from '@material-ui/core/OutlinedInput';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import InputAdornment from '@material-ui/core/InputAdornment'

export default class Auth extends Component {
  state = {
    email: "",
    emailError: false,
    emailErrorText: "",
    nameErrorText: "",
    passwordErrorText: "",
    password: "",
    showPassword: false,
    logError: "",
    redirect: false,
    loading: false
  };

  handleClickShowPassword = (e) => {
    e.preventDefault()
    let boolean = !this.state.showPassword
    this.setState({ showPassword: boolean })
  };

  handleMouseDownPassword = event => {
    event.preventDefault();
  };

  handleChange = e => {
    e.preventDefault();
    this.setState({
      [e.target.name + "Error"]: false,
      [e.target.name + "ErrorText"]: "",
      [e.target.name]: e.target.value,
      logError: ""
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
    const passerr = this.validatePassword(this.state.password);
    if (!emailerr && !passerr) {
      const { email, password } = this.state;
      this.setState({ loading: true })
      login(email, password)
        .then((response) => {
          console.log(response)
          authenticate(response.data, () => {
            this.setState({ redirect: true, loading: false })
          })

        }, (err) => {
          this.setState({ emailErrorText: err.response.data.error, loading: false, emailError: true })
        })

      this.setState({
        // email: "",

        // password: ""
      });
    }
  };

  button = () => {
    if (this.state.logError) {
      return <h1>{this.state.logError}</h1>
    }
    return <button
      type="submit"
      onClick={e => this.handleSubmit(e)}
      className="button-class"
    >
      SUBMIT
  </button>
  }

  loginRender = () => {
    if (this.state.redirect) {
      return <Redirect to="/" />
    }

    return (
      <div>

        <div className="Disclaimer">
          <h1>
            SIGN IN <br /> WITH YOUR EMAIL <br /> AND PASSWORD
          </h1>
        </div>
        <div className="Form-container">
          <form onSubmit={e => this.handleSubmit(e)}>


            <TextField
              error={this.state.emailError}
              id="outlined-email-input"
              label="Email"
              className="input"
              type="email"
              name="email"
              autoComplete="email"
              value={this.state.email}
              margin="normal"
              variant="outlined"
              required
              onChange={e => this.handleChange(e)}
              helperText={this.state.emailErrorText}
            />
            <br />
            <br />
            <FormControl variant="outlined" className="input" >
              <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
              <OutlinedInput
                error={this.state.passwordError}
                variant="outlined"

                id="outlined-adornment-password"
                name="password"
                type={this.state.showPassword ? 'text' : 'password'}
                value={this.state.password}
                onChange={e => this.handleChange(e)}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={e => this.handleClickShowPassword(e)}
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
          {this.button()}
        </div>
        T{this.state.loading ? <Loader /> : ""}
      </div>
    )
  }
  render() {
    return <div>{this.loginRender()}</div>
  }
}

