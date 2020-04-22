import React from 'react';
import './redirectComponent.scss';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { withRouter} from 'react-router-dom'

const RedirectComponent = (props)=>{

	
	

	const handleSubmit=()=>{
		props.history.push('/sign-in')
		}

	const handleSubmit1=()=>{
		props.history.push('/sign-up')
		}

	


	return(
		<div className='page pageR'>
						<h1 className='title'>
			        		Welcome Buddys
			        	</h1>
					<Card className='newCard' style={{
			              minWidth: 275,
			            

			        }}>
			        <CardContent className='cardR'>
			        	<h1>
			        		Already Registered 
			        	</h1>
			        	<Button
                      variant="contained"
                      color="primary"
                      className='button'
                      onClick={handleSubmit}
                    >
                            Sign In
                    </Button>
                    <h1>
			        		New user
			        	</h1>
			        	<Button
                      variant="contained"
                      color="primary"
                      className='button'
                      onClick={handleSubmit1}
                    >
                            Sign Up
                    </Button>
			        </CardContent>
			    </Card>
		</div>
		)
}



export default withRouter(RedirectComponent)