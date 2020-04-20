import React from 'react';
import './homeNewPageComponent.scss';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { connect} from 'react-redux';
import { startGettingUserDataFromDatabase} from '../redux/data/sampleDataAction';

const HomeNewPageComponent = (props)=>{

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
			        	<TextField className='text' name='name' onChange={handleChange} label='enter your name'/>
			        	<TextField className='text' name='email' onChange={handleChange} label='enter your email'/>

			        </CardContent>

			        <CardActions className=''>
                          <Button
                      variant="contained"
                      color="primary"
                      className='button'
                      onClick={handleSubmit}
                    >
                            Send
                    </Button>
			        </CardActions>
			    </Card>
			
		</div>
		)
}

const mapStateToProps = (rootReducer)=>{
	return({
		userDetail: rootReducer.sampleData.userDetail
	})
}

const mapDispatchToProps = (dispatch)=>{
	return({
		startGettingData: (obj)=> dispatch(startGettingUserDataFromDatabase(obj))
	})
}

export default connect(mapStateToProps, mapDispatchToProps)(HomeNewPageComponent)