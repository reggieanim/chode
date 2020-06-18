import React, { Component } from "react";
import Peer from "peerjs";
import { TextField } from "@material-ui/core";
import { connect } from "socket.io-client";

class Caller extends Component {
  constructor(props) {
    super(props);
  }
  componentWillMount() {
    this.peer = new Peer(this.props.callerId);
    // console.log(this.peer.id);
  }

  state = {
    peer: {},
    onCall: false,
    callId: "",
    mediaError: false,
    stream: "",
    remoteStream: "",
    callErr: false,
    mic: true,
    cam: true,
    calling: false,
  };

  async componentDidMount() {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: true,
        video: true,
      });
      this.setState({ stream });
      this.video.srcObject = stream;
    } catch (e) {
      this.setState({ mediaError: true });
      console.log(e);
    }

    try {
      this.peer.on("call", (call) => {
        call.answer(this.state.stream);
        call.on("stream", (remoteStream) => {
          //   console.log(remoteStream);
          this.setState({ onCall: true });
          this.remoteVideo.srcObject = remoteStream;
        });
      });
    } catch (e) {
      alert("an error occured");
    }
  }

  callUser = (e, id) => {
    this.setState({ calling: true });
    e.preventDefault();
    try {
      const call = this.peer.call(id, this.state.stream);
      call.on("stream", (remoteStream) => {
        // Show stream in some <video> element.
        this.setState({ onCall: true });
        this.setState({ calling: false });
        this.remoteVideo.srcObject = remoteStream;
      });
    } catch (err) {
      alert("An error occured during call try again");
      this.setState({ callErr: err, calling:false });
    }
  };

  micAction = () => {
    this.setState({ mic: !this.state.mic });
    this.state.stream.getAudioTracks()[0].enabled = !this.state.stream.getAudioTracks()[0]
      .enabled;
  };

  camAction = () => {
    this.setState({ cam: !this.state.cam });
    this.state.stream.getVideoTracks()[0].enabled = !this.state.stream.getVideoTracks()[0]
      .enabled;
  };

  endCall = () => {
    this.peer.destroy();
    this.setState({ onCall: false });
  };

  handleChange = (e) => {
    e.preventDefault();
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  renderButtons = () => {
    // && !this.state.mediaError
    if (!this.state.onCall && !this.state.mediaError) {
      return (
        <div id="video-data">
          <p>
            Your id: <span id="my-id">{this.props.callerId}</span>
          </p>
          <div id="call-data">
            <div className="id_form">
              <TextField
                placeholder="Call user id"
                name="callId"
                value={this.state.callId}
                onChange={(e) => this.handleChange(e)}
              ></TextField>
            </div>
            {this.state.calling ? (
              <p>Calling.......</p>
            ) : (
              <button
                onClick={(e) => this.callUser(e, this.state.callId)}
                className="button-class"
              >
                call
              </button>
            )}
          </div>
        </div>
      );
    } else if (this.state.mediaError) {
      return (
        <div id="video-data">
          <p>You need to turn on microphone and camera to call</p>
        </div>
      );
    } else if (this.state.callErr) {
      alert("There was an error during calling, check ID");
      return (
        <div id="video-data">
          <p>
            Your id: <span id="my-id">{this.props.callerId}</span>
          </p>
          <div id="call-data">
            <div className="id_form">
              <TextField
                placeholder="Call user id"
                name="callId"
                value={this.state.callId}
                onChange={(e) => this.handleChange(e)}
              ></TextField>
            </div>
          </div>
        </div>
      );
    } else if (this.state.onCall) {
      return (
        <div id="video-data">
          <div id="call2-data">
            <p>
              Connected <span id="my-id"></span>
            </p>
            <button
              onClick={(e) => {
                e.preventDefault();
                this.endCall();
              }}
              className="button-class"
            >
              End call
            </button>
            <button
              onClick={(e) => {
                e.preventDefault();
                this.micAction();
              }}
              className="button-class mic"
            >
              {this.state.mic ? "Mute mic" : "Play mic"}
            </button>
            <button
              onClick={(e) => {
                e.preventDefault();
                this.camAction();
              }}
              className="button-class camera"
            >
              {this.state.cam ? "Hide Cam" : "Show Cam"}
            </button>
          </div>
        </div>
      );
    }
  };

  render() {
    // console.log(this.state.peer)
    return (
      <div>
        <div id="video-container">
          <video
            ref={(video) => {
              this.remoteVideo = video;
            }}
            autoPlay
            id="second-video"
          ></video>
          <video
            ref={(video) => {
              this.video = video;
            }}
            autoPlay
            controls
            muted
            id="my-video"
          ></video>
          {this.renderButtons()}
        </div>
      </div>
    );
  }
}

export default Caller;
