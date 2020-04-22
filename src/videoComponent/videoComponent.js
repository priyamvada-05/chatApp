import React, { useEffect, useState, useRef } from 'react';
import './videoComponent.scss';
import io from "socket.io-client";
import Peer from "simple-peer";
//import styled from "styled-components";
import { connect} from 'react-redux';
import CallEndIcon from '@material-ui/icons/CallEnd';
import Button from '@material-ui/core/Button';
import { stopVideoCall} from '../redux/data/sampleDataAction';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';

const Alert = (props)=> <MuiAlert elevation={6} variant="filled" {...props} />;

/*const Container = styled.div`
  height: 100vh;
  width: 100%;
  display: flex;
  flex-direction: column;
`;

const Row = styled.div`
  display: flex;
  width: 100%;
`;

const Video = styled.video`
  border: 1px solid blue;
  width: 50%;
  height: 50%;
`;*/


let socket;
 

function VideoComponent(props) {

  //const [yourID, setYourID] = useState("");
  //const [users, setUsers] = useState({});
  const [stream, setStream] = useState();
  const [receivingCall, setReceivingCall] = useState(props.receivingCall);
  const [caller, setCaller] = useState(props.caller);
  const [callerSignal, setCallerSignal] = useState(props.callerSignal);
  const [callAccepted, setCallAccepted] = useState(false);
  const [open, setOpen] = useState(false)

  const userVideo = useRef();
  const partnerVideo = useRef();
  //const socket = props.socket.socket
  const ENDPOINT = '/'

  useEffect(() => {
    
    navigator.mediaDevices.getUserMedia({ video: true, audio: true }).then(stream => {
      setStream(stream);
      if (userVideo.current) {
        userVideo.current.srcObject = stream;
      }
    })
    socket = io(ENDPOINT);
    socket.on("hey", (data) => {
      setReceivingCall(true);
      setCaller(data.from);
      setCallerSignal(data.signal);
    })
  }, [ENDPOINT]);

  const callPeer=()=> {

    if(props.selectedUser[0]['status'] !== 'online'){
      setOpen(true)
    }
    const peer = new Peer({
      initiator: true,
      trickle: false,
      stream: stream,
    });

    peer.on("signal", data => {
      socket.emit("callUser", { userToCall: props.selectedUser[0]['_id'], 
        signalData: data, from:  props.userDetail[0]['_id']})
    })

    peer.on("stream", stream => {
      if (partnerVideo.current) {
        console.log('receiving stream from partner')
        partnerVideo.current.srcObject = stream;
      }
    });

    socket.on("callAccepted", signal => {
      setCallAccepted(true);
      peer.signal(signal);
    })

  }

  function acceptCall() {
    setCallAccepted(true);
    const peer = new Peer({
      initiator: false,
      trickle: false,
      stream: stream,
    });
    peer.on("signal", data => {
      socket.emit("acceptCall", { signal: data, receiverID: caller })
    })

    peer.on("stream", stream => {
      partnerVideo.current.srcObject = stream;
    });

    peer.signal(callerSignal);
  }

  let UserVideo;
  if (stream) {
    UserVideo = (
      <video className='newVideo1' playsInline muted ref={userVideo} autoPlay />
    );
  }

  let PartnerVideo;
  if (callAccepted) {
    PartnerVideo = (
      <video className='newVideo' playsInline ref={partnerVideo} autoPlay />
    );
  }

  let incomingCall;
  if (receivingCall && !callAccepted) {
    incomingCall = (
      <div className='incomingCall'>
        <h1>{caller} is calling you</h1>
        <Button
        variant="contained"
        color="secondary"
        onClick={acceptCall}
        className='acceptButton'
      >
        Accept call
        </Button>
      </div>
    )
  }

  const handleCallEnd = ()=>{
    //receivingCall, caller, callerSignal, callAccepted
    props.stopVideoCall()
  }

    const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  return (
    <div className='video'>
      <div className='userVideo'>
        {UserVideo}
      </div>

      <div className='partnerVideo'>
          {PartnerVideo}
      </div>
       {incomingCall}
      {(receivingCall || callAccepted)?
        null
        :      
        (<Button
        variant="contained"
        color="secondary"
        onClick={callPeer}
        className='CallButton'
      >
        Call {props.selectedUser[0]['username']}
      </Button>)
      }

      <Button
        variant="contained"
        color="secondary"
        onClick={handleCallEnd}
        className='CallendButton'
      >
        End call
      </Button>

      <Snackbar open={open} autoHideDuration={3000} onClose={handleClose}>
                <Alert onClose={handleClose} severity="warning">
                  {`${props.selectedUser[0]['username']} is currently Offline. So please End Call`}                
                </Alert>
              </Snackbar>
    </div>
  );
}

const mapStateToProps = (rootReducer)=>{
  return({
    selectedUser: rootReducer.sampleData.selectedUserDetail,
    userDetail: rootReducer.sampleData.userDetail,
    startVideoCall: rootReducer.sampleData.startVideoCalling,
    socket: rootReducer.sampleData.socket
  })
}

const mapDispatchToProps = (dispatch)=>{
  return({
    stopVideoCall: ()=> dispatch(stopVideoCall())
  })
}

export default connect(mapStateToProps, mapDispatchToProps)(VideoComponent);