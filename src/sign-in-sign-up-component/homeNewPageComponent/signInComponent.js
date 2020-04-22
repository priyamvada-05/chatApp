import React from 'react';
import './signInComponent.scss';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { connect} from 'react-redux';
import { startGettingUserDataFromDatabase} from '../../redux/data/sampleDataAction';
import chatImg from '../../assets/chat.png';
import CircularProgress from '@material-ui/core/CircularProgress';

const SignInComponent = (props)=>{

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
		props.startGettingData({name, email})
		}

	if(props.userDetail != null){
		let userId = props.userDetail[0]['_id']
		props.history.push(`/user/${userId}`)
			
		}

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


			    </Card>
			
		</div>
		)
}

const mapStateToProps = (rootReducer)=>{
	return({
		userDetail: rootReducer.sampleData.userDetail,
		loadingUserDeatil: rootReducer.sampleData.loadingUserDeatil
	})
}

const mapDispatchToProps = (dispatch)=>{
	return({
		startGettingData: (obj)=> dispatch(startGettingUserDataFromDatabase(obj))
	})
}

export default connect(mapStateToProps, mapDispatchToProps)(SignInComponent)