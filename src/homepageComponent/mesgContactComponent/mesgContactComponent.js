import React, { useState, useEffect, useRef } from 'react';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import '../homepageComponent.scss';
import Button from '@material-ui/core/Button';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import NavbarComponent from '../navbarComponent/navbarComponent';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Divider from '@material-ui/core/Divider';
import Avatar from '@material-ui/core/Avatar';
import { deepOrange, deepPurple } from '@material-ui/core/colors';
import AddIcCallIcon from '@material-ui/icons/AddIcCall';
import VideoCallIcon from '@material-ui/icons/VideoCall';
import Typography from '@material-ui/core/Typography';
import AccountCircle from '@material-ui/icons/AccountCircle';
import SendIcon from '@material-ui/icons/Send';
import MessageComponent from '../messageComponent/messageComponent';
import { connect} from 'react-redux';
import io from "socket.io-client";
import { startVideoCalling, stopVideoCall} from '../../redux/data/sampleDataAction';
import VideoComponent from '../../videoComponent/videoComponent';
import CallEndIcon from '@material-ui/icons/CallEnd';
import Peer from "simple-peer";
//let socket;

const useStyles = makeStyles((theme) => ({
 root: {
    minWidth: 275,
    height:'50vh',
    width: '50%',
    marginTop: ''
  },
    orange: {
    color: theme.palette.getContrastText(deepOrange[500]),
    backgroundColor: deepOrange[500],
    width: theme.spacing(5),
    height: theme.spacing(5),
    marginRight: '10px',
    marginBottom: '10px'
  },
  purple: {
    color: theme.palette.getContrastText(deepPurple[500]),
    backgroundColor: deepPurple[500],
    width: theme.spacing(5),
    height: theme.spacing(5),
    marginRight: '10px'
  },
}));

function MesgContactComponent(props) {
	const [messageInput, setMessageInput]= React.useState('')
	const [message, setMessage]= React.useState(props.selectedUser[0]['message'])
  const [name, setName] = useState('');
  const [room, setRoom] = useState('');
  const [status, setStatus] = useState(props.selectedUser[0]['status']);
  const [senderName, setSenderName]= useState('')
 const socket = props.socket
 const classes = useStyles();

	const setMessageUser=(event)=>{
		let messg= event.target.value;
		setMessageInput(messg)
	}

	const sendMessage= ()=>{
    setSenderName('me')
		setMessage((prevMessage)=>  [...prevMessage, {user: props.userDetail[0]['username'], text: messageInput}])
    if(messageInput) {
      socket.emit('sendMessage', {
        receiverID: props.selectedUser[0]['_id'],
        message:messageInput
      }, () => setMessageInput(''));
    }
	setMessageInput('')
	}



  useEffect(() => {
    socket.on('message', messageDB => {
      console.log('user messgage from db')
      console.log(messageDB)
      setSenderName(messageDB['user'])
      setMessage((prevMessage)=>[...prevMessage, {user: 'receiver', text: messageDB['text']}])
    })
    
    socket.on("offline", (text)=>{
      console.log('server messgage from db')
      console.log(text)
    });

    socket.on('userIsOffile', messageObj=>{
      console.log('server')
      console.log(messageObj)
      if(messageObj['userID']=== props.selectedUser[0]['_id']){
        setStatus(messageObj.time)
      }
    })

    socket.on('online', messageObj=>{
      console.log('server')
      console.log(messageObj)
      if(messageObj['userID']=== props.selectedUser[0]['_id']){
        setStatus('online')
      }
    })
}, []);





  return (
                  <Card style={{
                           minWidth: 275,
                         height:'75vh',
                         width: '70%',
             
                     }}>
                         <CardContent className='content'>
                           <div className='header'>
                             <Avatar className={classes.orange}>P</Avatar>
                                   {props.selectedUser?
                                   (<div className='status'>
                                     <Typography variant="h4" gutterBottom>
                                                         {props.selectedUser[0].username}
                                                       </Typography>
                                     <Typography variant="p" gutterBottom>
                                                         {status}
                                                       </Typography>
                                     </div>
                                                       )
                                   :(<Typography variant="h4" gutterBottom>
                                                        Name
                                                       </Typography>)}
                             <div className='icon'>
                             <AddIcCallIcon color="primary"  style={{paddingRight:'10px', fontSize: 35 }}/>
                             <VideoCallIcon onClick={()=>{
                              // callPeer(props.selectedUser[0]['_id'])
                               props.VideoCall()

                             }
                             } color="secondary" style={{paddingRight:'10px', fontSize: 35 }}/>
                             }
                             </div>
                           </div>
                           <Divider />
                         </CardContent>
             
                         <CardContent className='contentText'>
                           <MessageComponent name={senderName}  message={message}/>
                         </CardContent>
                               <CardActions>
                                   <div className="form">
                                     <input type='text' 
                                     onChange={setMessageUser} 
                                     className='input' 
                                     placeholder="Type a message..."
                                     value={messageInput}/>
             
                                       <Button
                                   variant="contained"
                                   color="primary"
                                   className='button'
                                   endIcon={<SendIcon />}
                                   onClick={sendMessage}
                                 >
                                         Send
                                 </Button>
                                   </div>
                           </CardActions>
                       </Card>
  )
}

const mapStateToProps=(rootReducer)=>{
  return({
    selectedUser: rootReducer.sampleData.selectedUserDetail,
    userDetail: rootReducer.sampleData.userDetail,
    startVideoCall: rootReducer.sampleData.startVideoCalling, 
  })
}

const mapDispatchToProps = (dispatch)=>{
  return({
    VideoCall: ()=> dispatch(startVideoCalling()),
    stopVideoCall: ()=> dispatch(stopVideoCall())
  })
}

export default connect(mapStateToProps, mapDispatchToProps)(MesgContactComponent)
