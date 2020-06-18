import React, { Component } from "react";
import { UnControlled as CodeMirror } from "react-codemirror2";
import io from "socket.io-client";
import { TextField } from "@material-ui/core";
import { isAuthenticated } from "../actions/auth";
import { sendMessage } from "../actions/sendMessage";
import axios from "axios";
import Caller from "./Caller";

// require('codemirror/lib/codemirror.css');
// require('codemirror/theme/material.css');
// require('codemirror/theme/neat.css');
require("codemirror/mode/xml/xml.js");
require("codemirror/mode/javascript/javascript.js");

class Session extends Component {
  constructor(props) {
    super(props);
    this.instance = null;
  }
  componentWillMount() {
     this.setState({randomNumber:this.generateNumber()})
    this.SocketIOAdapter = window.ot.SocketIOAdapter;
    this.EditorClient = window.ot.EditorClient;
    this.CodeMirrorAdapter = window.ot.CodeMirrorAdapter;

    if (!isAuthenticated()) {
      const randomUser = "user" + this.generateNumber()
      this.setState({ user: randomUser });
    } else if (isAuthenticated()) {
      this.setState({ user: isAuthenticated().user.name });
    }
    const socket = io("http://localhost:8080");

    this.setState({ socket });
  }

  generateNumber = () => {
    return Math.floor(Math.random() * 9999).toString();
  }

  componentDidMount() {
    axios
      .post(`http://localhost:8080/session/${this.props.match.params.id}`)
      .then((response) => {
        // console.log(response);
        if (response.data.content) {
          this.setState({ content: response.data.content });
        }
      });
    this.state.socket.emit("joinRoom", {
      room: this.props.match.params.id,
      username: `${this.state.user}`,
      message: "",
    });
    this.state.socket.on("chatMessage", (data) => {
      // console.log(data);
      this.setState((previousState) => ({
        messages: [...previousState.messages, data],
      }));
    });

    this.state.socket.on("doc", (obj) => {
      // console.log(obj);
      this.init(
        obj.str,
        obj.revision,
        obj.clients,
        new this.SocketIOAdapter(this.state.socket)
      );
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
    user: "",
    content: "",
    randomNumber:""
  };

  sendMessageHandler = (e) => {
    e.preventDefault();
    const { textmessage, user, socket } = this.state;
    if (!textmessage) {
      alert("message cannot be empty");
      return;
    }
    sendMessage(textmessage, user, socket);
    this.setState({ textmessage: "" });
  };

  init = (str, revision, clients, serverAdapter) => {
    if (!this.state.content) {
      this.instance.setValue(str);
    }

    this.cmClient = window.cmClient = new this.EditorClient(
      revision,
      clients,
      serverAdapter,
      new this.CodeMirrorAdapter(this.instance)
    );
    // console.log(this.cmClient);
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
    return this.state.messages.map((message, index) => {
      return (
        <div key={index} className="chat-message">
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
        <form onSubmit={this.sendMessageHandler}>
          <TextField
            className="message-form"
            id="standard-textarea"
            label="Message"
            placeholder="Message as Reginald"
            name="textmessage"
            value={this.state.textmessage}
            onChange={(e) => this.handleChange(e)}
            // multiline
          ></TextField>
          <button
            type="submit"
            on
            className="button-class send-button"
            // onClick={() => {
            //   this.sendMessageHandler();
            // }}
          >
            Send
          </button>
        </form>
      </div>
    );
  };
  render() {
    return (
      <div className="Parent-container">
        <div>
          <div className="Editor">
            <h2>Type code in the box</h2>
            <CodeMirror
              className="Editor"
              options={{
                mode: "javascript",
                theme: "monokai",
                lineNumbers: true,
              }}
              value={this.state.content}
              editorDidMount={(editor) => {
                this.instance = editor;
              }}
            />
          </div>
        </div>
         <Caller callerId={ this.state.randomNumber + this.props.match.params.id}/>     
        {this.chatBox()}
      </div>
    );
  }
}

export default Session;
