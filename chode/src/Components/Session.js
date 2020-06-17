
import React, { Component } from "react";
import { UnControlled as CodeMirror } from "react-codemirror2";
import io from "socket.io-client";
import { TextField } from "@material-ui/core";
import { isAuthenticated } from "../actions/auth";
import { sendMessage } from "../actions/sendMessage";

// require('codemirror/lib/codemirror.css');
// require('codemirror/theme/material.css');
// require('codemirror/theme/neat.css');
require('codemirror/mode/xml/xml.js');
require('codemirror/mode/javascript/javascript.js');


class Session extends Component {
  constructor(props) {
    super(props);
    this.instance = null;
  }
  componentWillMount() {
    this.SocketIOAdapter = window.ot.SocketIOAdapter;
    this.EditorClient = window.ot.EditorClient;
    this.CodeMirrorAdapter = window.ot.CodeMirrorAdapter;

    if (!isAuthenticated()) {
      const randomUser = "user" + Math.floor(Math.random() * 9999).toString();
      this.setState({ user: randomUser });
    } else if (isAuthenticated()) {
      this.setState({ user: isAuthenticated().user.name });
    }
    const socket = io("http://localhost:8080");

    this.setState({ socket });
  }
  componentDidMount() {
    this.state.socket.emit("joinRoom", {
      room: this.props.match.params.id,
      username: `${this.state.user} joined`,
      message: "",
    });
    this.state.socket.on("chatMessage", (data) => {
      console.log(data);
      this.setState((previousState) => ({
        messages: [...previousState.messages, data],
      }));
    });

    this.state.socket.on("doc", (obj) => {
      console.log(obj);
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
    code: "HELLO",
  };

  sendMessageHandler = () => {
    const { textmessage, user, socket } = this.state;
    sendMessage(textmessage, user, socket);
    this.setState({ textmessage: "" });
  };

  init = (str, revision, clients, serverAdapter) => {
    this.instance.setValue(str);

    this.cmClient = window.cmClient = new this.EditorClient(
      revision,
      clients,
      serverAdapter,
      new this.CodeMirrorAdapter(this.instance)
    );
    console.log(this.cmClient);
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
          onClick={() => {
            this.sendMessageHandler();
          }}
        >
          Send
        </button>
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
                theme: "material",
                lineNumbers: true,
              }}
              editorDidMount={(editor) => {
                this.instance = editor;
              }}
            />
          </div>
        </div>
        {this.chatBox()}
      </div>
    );
  }
}

export default Session;
