import React, { Component } from "react";
import CodeMirror from "./TextEditor";
import io from "socket.io-client";
import { TextField } from "@material-ui/core";
import { isAuthenticated } from "../actions/auth";

class Session extends Component {
  componentWillMount() {
    if (!isAuthenticated()) {
      const randomUser = "user" + Math.floor(Math.random() * 9999).toString();
      this.setState({ randomUser });
    } else if (isAuthenticated()) {
        this.setState({randomUser: isAuthenticated().user.name})
    }
    const socket = io("http://localhost:8080");
    this.setState({ socket });
    
  }
  componentDidMount() {
    
    this.state.socket.emit('joinRoom', {room: this.props.match.params.id, username: `${this.state.randomUser} joined`, message:""})
    this.state.socket.on("chatMessage", (data) => {
      this.setState((previousState) => ({
        messages: [...previousState.messages, data],
      }));
    });
    this.scrollToBottom();
  }

  componentDidUpdate() {
    this.scrollToBottom();
  }

  state = {
    socket: null,
    messages: [],
    textmessage: "",
    randomUser: "",
  };

  sendMessage = () => {
    const { textmessage } = this.state;

    const d = new Date()
    this.state.socket.emit("chatMessage", {
      message: textmessage,
      username: this.state.randomUser,
      date: d.toLocaleString()
    });
  };

  handleChange = (e) => {
    e.preventDefault();
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  scrollToBottom = () => {
    this.messagesEnd.scrollIntoView({ behavior: "smooth" });
  };

  renderChatMessages = () => {
    // console.log(this.state.randomUser);
    return this.state.messages.map((message) => {
      return (
        <div key={message.date} className="chat-message">
          <p>
            <span className="user">{message.username} </span>
            {message.date}
          </p>
          <p>{message.message}</p>
        </div>
      );
    });
  };

  chatBox = () => {
    return (
      <div className="chatBox">
        <div className="messageBox">
          {this.renderChatMessages()}
          <div
            style={{ float: "left", clear: "both" }}
            ref={(el) => {
              this.messagesEnd = el;
            }}
          ></div>
        </div>
        <TextField
          className="message-form"
          id="standard-textarea"
          label="Message"
          placeholder="Message as Reginald"
          name="textmessage"
          value={this.state.textmessage}
          onChange={(e) => this.handleChange(e)}
          multiline
        ></TextField>
        <button
          className="button-class send-button"
          onClick={() => this.sendMessage()}
        >
          Send
        </button>
      </div>
    );
  };
  render() {
    return (
      <div className="Parent-container">
        <CodeMirror />
        {this.chatBox()}
      </div>
    );
  }
}

export default Session;
