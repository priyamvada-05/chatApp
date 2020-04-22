import React from 'react';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import './homepageComponent.scss';
import Button from '@material-ui/core/Button';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import NavbarComponent from './navbarComponent/navbarComponent';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Divider from '@material-ui/core/Divider';
import Avatar from '@material-ui/core/Avatar';
import { deepOrange, deepPurple } from '@material-ui/core/colors';
import AddIcCallIcon from '@material-ui/icons/AddIcCall';
import VideoCallIcon from '@material-ui/icons/VideoCall';
import Input from '@material-ui/core/Input';
import Typography from '@material-ui/core/Typography';
import AccountCircle from '@material-ui/icons/AccountCircle';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import SendIcon from '@material-ui/icons/Send';
import MessageComponent from './messageComponent/messageComponent';
import MesgContactComponent from './mesgContactComponent/mesgContactComponent';
//import Pusher from 'pusher-js';
import { connect} from 'react-redux';
import io from "socket.io-client";
import VideoComponent from '../videoComponent/videoComponent';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import LandingComponent from './landingComponent/landingComponent';
import ChatDImg from '../assets/chatD.png';
import { setSocket, startVideoCalling} from '../redux/data/sampleDataAction';

let socket;

const Alert = (props)=> <MuiAlert elevation={6} variant="filled" {...props} />;


class HomePageComponent extends React.Component {

    constructor(props){
      super(props)
      this.state={
        newSocket:'',
        receivingCall: false,
        caller:'',
        callerSignal:null,
        callAccepted: false,
        Snackbar:false,
        openVideoCallReceving:false
      }
    }
	
    async componentDidMount(){
       /* var pusher = new Pusher('764535e7de3c06e6376d', {
      cluster: 'eu',
      forceTLS: true
    });

    var channel = pusher.subscribe('my-channel');
    channel.bind('my-event', );
    }*/
    const ENDPOINT = '/'
    socket =await io(ENDPOINT);
    this.setState({
      newSocket: socket
    })
    //this.props.socket({socket})

   //setName(n)
  //setRoom(r)

   socket.emit('join', {name:this.props.userDetail[0]['username'], userID: this.props.userDetail[0]['_id']}, (error) => {
      if(error) {
        alert(error);
      }
    });
}

  componentWillUpdate(){
   socket.on("hey", (data) => {
      console.log('componentWillUpdate')
      this.setState({
        receivingCall: true,
        caller: data.from,
        callerSignal: data.signal,
        Snackbar:true
      });
    })

   socket.on('updateContact', (data)=>{
     
   })
 
  }

  handleAcceptCall = ()=>{
    console.log('inside accept call')
    this.props.startVideoCall()
    this.setState({
      openVideoCallReceving:true,
      Snackbar:false
    })
  }

    render(){
  return (
    <div className="homepage">
    	<NavbarComponent  contact={this.props.userDetail[0].contact}/>
    	<Grid className='container' container>   
    		<Grid className='item' item lg={2} sm={6} xs={12}>
            <img src={ChatDImg} className='img1'/>
    		</Grid>
        
        {(this.props.startVideoCalling)?
        (<Grid className='item' item lg={9} sm={6} xs={12}>
              <VideoComponent 
              callAccepted={this.state.callAccepted} 
              socket={this.state.newSocket}
              caller={this.state.caller}
              callerSignal={this.state.callerSignal}
              receivingCall={this.state.receivingCall}
              />
                </Grid>)
        :(<Grid className='item' item lg={9} sm={6} xs={12}>
                    {this.props.selectedUser?
                   <MesgContactComponent socket={this.state.newSocket} />
                   :<LandingComponent />
                 }
                </Grid>
                )
      }



    	</Grid>
      <Snackbar open={this.state.receivingCall && this.state.Snackbar} autoHideDuration={6000} >
        <Alert  severity="success">
          This is a call from {this.state.caller}
        <Button
        variant="contained"
        color="secondary"
        onClick={this.handleAcceptCall}
      >
        Accept call
      </Button>
        </Alert>

      </Snackbar>
    </div>
  );
}
}

const mapStateToProps = (rootReducer)=>{
  return({
    userDetail: rootReducer.sampleData.userDetail,
    selectedUser: rootReducer.sampleData.selectedUserDetail,
    startVideoCalling: rootReducer.sampleData.startVideoCalling
  })
}

const mapDispatchToProps = (dispatch)=>{
  return({
    socket: (socket)=> dispatch(setSocket(socket)),
    startVideoCall: ()=> dispatch(startVideoCalling())
  })
}

export default connect(mapStateToProps, mapDispatchToProps)(HomePageComponent)
