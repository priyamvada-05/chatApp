import React, {useEffect} from 'react';
import './signInComponent.scss';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { connect} from 'react-redux';
import { startGettingUserDataFromDatabase, logoutUser} from '../../redux/data/sampleDataAction';
import chatImg from '../../assets/chat.png';
import CircularProgress from '@material-ui/core/CircularProgress';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';

const Alert = (props)=> <MuiAlert elevation={6} variant="filled" {...props} />;

const SignInComponent = (props)=>{

	const [name, setName]= React.useState('')
	const [email, setEmail]= React.useState('')
	const [open, setOpen] = React.useState(false)

	const handleChange=(event)=>{
		if(event.target.name== 'name'){
			setName(event.target.value)
		}

		if(event.target.name== 'email'){
			setEmail(event.target.value)
		}
	}

	useEffect(() => {
		props.logoutUser()
	}, [])

	const handleSubmit=()=>{
		props.startGettingData({name, email})
		}



		if(props.userDetail !== null){
			if(props.userDetail.length>0){
		let userId = props.userDetail[0]['_id']
		props.history.push(`/user/${userId}`)
			}
					
		}



		
		

	

	const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

	return(
		<div className='page'>
		        <Card style={{
			              minWidth: 275,
			            height:'75vh',
			            width: '50%',

			        }}>
			        <CardContent className='card'>
			        	<img src={chatImg} className='img'/>
			        	<TextField className='text' name='name' onChange={handleChange} label='enter your name'/>
			        	<TextField className='text' name='email' onChange={handleChange} label='enter your email'/>
                          <Button
                      variant="contained"
                      color="primary"
                      className='button'
                      onClick={handleSubmit}
                      disabled={props.loadingUserDeatil || (name === '' && email==='')}
                    >
                            Sign In
                    </Button>
			        </CardContent>
			        {props.errorUserDetail?
			        (<Snackbar open={true} autoHideDuration={3000} onClose={handleClose}>
			        				        <Alert onClose={handleClose} severity="error">
			        				          Please enter correct username and password				        
			        				        </Alert>
			        				      </Snackbar>)
			        :null
			    }

			    </Card>
			
		</div>
		)
}

const mapStateToProps = (rootReducer)=>{
	return({
		userDetail: rootReducer.sampleData.userDetail,
		loadingUserDeatil: rootReducer.sampleData.loadingUserDeatil,
		errorUserDetail: rootReducer.sampleData.errorUserDetail
	})
}

const mapDispatchToProps = (dispatch)=>{
	return({
		startGettingData: (obj)=> dispatch(startGettingUserDataFromDatabase(obj)),
		logoutUser: ()=> dispatch(logoutUser())
	})
}

export default connect(mapStateToProps, mapDispatchToProps)(SignInComponent)