import React from 'react';
import './signUpComponent.scss';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { connect} from 'react-redux';
import { startUploadingUserDataFromDatabase} from '../../redux/data/sampleDataAction';
import chatImg from '../../assets/chat.png';
import CircularProgress from '@material-ui/core/CircularProgress';

const SignUpComponent = (props)=>{

	const [name, setName]= React.useState('')
	const [email, setEmail]= React.useState('')

	const handleChange=(event)=>{
		if(event.target.name== 'name'){
			setName(event.target.value)
		}

		if(event.target.name== 'email'){
			setEmail(event.target.value)
		}
	}

	const handleSubmit=()=>{
		props.startUploadingData({username:name, email})
		}
		//console.log(props)
	/*if(props.userSignUpDetail != null){
		
		props.history.push(`/sign-in`)
			
		}*/

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
                      disabled={props.loadingSignUp || (name === '' && email==='')}
                    >
                            Sign up  {props.loadingSignUp && <CircularProgress size={24} />}
                    </Button>

			        </CardContent>


			    </Card>
			
		</div>
		)
}

const mapStateToProps = (rootReducer)=>{
	return({
		loadingSignUp: rootReducer.sampleData.loadingSignUp,
		userSignUpDetail: rootReducer.sampleData.userSignUpDetail
	})
}

const mapDispatchToProps = (dispatch)=>{
	return({
		startUploadingData: (obj)=> dispatch(startUploadingUserDataFromDatabase(obj))
	})
}

export default connect(mapStateToProps, mapDispatchToProps)(SignUpComponent)