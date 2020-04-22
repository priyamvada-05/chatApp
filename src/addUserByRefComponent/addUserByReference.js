import React from 'react';
import './addUserByReference.scss';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { connect} from 'react-redux';
import { startGettingUserDataFromDatabase, startGettingRefUserDataFromDatabase} from '../redux/data/sampleDataAction';
import chatImg from '../assets/chat.png';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import CircularProgress from '@material-ui/core/CircularProgress';

const Alert = (props)=> <MuiAlert elevation={6} variant="filled" {...props} />;

const AddUserByReferenceComponent = (props)=>{

	const [name, setName]= React.useState('')
	const [email, setEmail]= React.useState('')
	const [open, setOpen]= React.useState(false)
	
	const userID = props.match.params.userID
	console.log(userID)
	//props.startGettingRefData({_id: userID})
	
	const handleCloseSnackbar= (event, reason)=>{
      if (reason === 'clickaway') {
            return;
          }
          setOpen(false);
  }

	const handleChange=(event)=>{
		if(event.target.name== 'name'){
			setName(event.target.value)
		}

		if(event.target.name== 'email'){
			setEmail(event.target.value)
		}
	}

	const handleSubmit=()=>{
		props.startGettingRefData({refUserID: userID, username:name, email})
		}

	const handleSignIn=()=>{
		props.history.push(`/sign-in`)
	}




	return(
		<div className='page'>

					<Card style={{
			              minWidth: 275,
			            height:'75vh',
			            width: '50%',

			        }}>
			        <CardContent className='card cardA'>
			        	<h1>
			        		A friend invited you to join Chat App. Please register and chat 
			        	</h1>
			        	<img src={chatImg} className='img imgA'/>
			        	<TextField className='text' name='name' onChange={handleChange} label='enter your name'/>
			        	<TextField className='text' name='email' onChange={handleChange} label='enter your email'/>
                          <Button
                      variant="contained"
                      color="primary"
                      className='button'
                      onClick={handleSubmit}
                      disabled={props.refUserDetail || (name === '' && email==='')}
                    >
                            Register {props.loadingRefUserDeatil && <CircularProgress size={24} />}
                    </Button>
                    {props.refUserDetail?
                    (<Button
                      variant="contained"
                      color="primary"
                      className='button'
                      onClick={handleSignIn}
                    >
                            Go To Sign in
                    </Button>

                    )
                    :null
                }
			        </CardContent>
			    </Card>
			    <Snackbar open={props.refUserDetail} autoHideDuration={6000} onClose={handleCloseSnackbar}>
                            <Alert onClose={handleCloseSnackbar} severity="success">
                              Registered and added to your friends Contact. Sign in to Chat
                            </Alert>

                </Snackbar>
		</div>
		)
}

const mapStateToProps = (rootReducer)=>{
	return({
		refUserDetail: rootReducer.sampleData.refUserDetail,
		loadingRefUserDeatil: rootReducer.sampleData.loadingRefUserDeatil
	})
}

const mapDispatchToProps = (dispatch)=>{
	return({
		startGettingData: (obj)=> dispatch(startGettingUserDataFromDatabase(obj)),
		startGettingRefData: (obj)=> dispatch(startGettingRefUserDataFromDatabase(obj))
	})
}

export default connect(mapStateToProps, mapDispatchToProps)(AddUserByReferenceComponent)