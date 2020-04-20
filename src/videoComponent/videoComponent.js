import React, { useEffect, useState, useRef } from 'react';
import './videoComponent.scss';
import io from "socket.io-client";
import Peer from "simple-peer";
//import styled from "styled-components";
import { connect} from 'react-redux';
import CallEndIcon from '@material-ui/icons/CallEnd';
import Button from '@material-ui/core/Button';
import { stopVideoCall} from '../redux/data/sampleDataAction';
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

function VideoComponent(props) {

  const [stream, setStream] = useState();
  const { receivingCall, caller, callerSignal} = props
  //const [receivingCall, setReceivingCall] = useState(false);
  //const [caller, setCaller] = useState("");
  //const [callerSignal, setCallerSignal] = useState();
  const [callAccepted, setCallAccepted] = useState(props.callAccepted)

  const userVideo = useRef();
  const partnerVideo = useRef();
  const socket = props.socket

  useEffect(() => {
    navigator.mediaDevices.getUserMedia({ video: true, audio: true }).then(stream => {
      setStream(stream);
      if (userVideo.current) {
        console.log('user video stream')
        userVideo.current.srcObject = stream;
      }
    })

  }, []);

    if(props.startVideoCall){
    let  id= props.selectedUser[0]['_id']
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

  if(props.callAccepted){
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
  if (receivingCall) {
    incomingCall = (
      <div>
       
      </div>
    )
  }

  const handleCallEnd = ()=>{
    //receivingCall, caller, callerSignal, callAccepted
    props.stopVideoCall()
  }

  return (
    <div className='video'>
      <div className='userVideo'>
        {UserVideo}
      </div>

      <div className='partnerVideo'>
        {PartnerVideo}
      </div>
       
      <Button
        variant="contained"
        color="secondary"
        onCLick={handleCallEnd}
      >
        End call
      </Button>
    </div>
  );
}

const mapStateToProps = (rootReducer)=>{
  return({
    selectedUser: rootReducer.sampleData.selectedUserDetail,
    userDetail: rootReducer.sampleData.userDetail,
    startVideoCall: rootReducer.sampleData.startVideoCalling,
  })
}

const mapDispatchToProps = (dispatch)=>{
  return({
    stopVideoCall: ()=> dispatch(stopVideoCall())
  })
}

export default connect(mapStateToProps, mapDispatchToProps)(VideoComponent);