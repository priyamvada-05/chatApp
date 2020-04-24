import React, {useState} from 'react';
import './landingComponent.scss';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { connect} from 'react-redux';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
//import { startGettingUserDataFromDatabase} from '../redux/data/sampleDataAction';
import ReactImg from '../../assets/react.png';
import ExpressImg from '../../assets/express.png';
import MongoImg from '../../assets/mongo.jpg';
import ChatImg from '../../assets/chatI.png';
import copy from 'copy-to-clipboard';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';

const Alert = (props)=> <MuiAlert elevation={6} variant="filled" {...props} />;

const LandingComponent = (props)=>{

	const [open, setOpen] = useState(false)

	const handleClick = ()=>{
		copy(`https://www.chatapp-priyamvada-aws.com/addUserByReference/${props.userDetail[0]['_id']}`)
		setOpen(true)
	}

	const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

	return(
		<div className='landing'>
		        <Card style={{
			            height:'80vh',
			            width: '70vw'

			        }} className='cardC'>
			        <CardContent className='cardLanding'>
			        	<div className='text'>
                         <img src={ChatImg} className='img'/>
                         <h1>Chatting App</h1>
		                </div>

		                <div className='text1'>
                         <h3 className='texth'>
		                     Press the button to copy link and invite your friend to chat
		                 </h3>
		                </div>

		                <div className=''>
		                    <Button
                                   variant="contained"
                                   color="primary"
                                   className='button'
                                   //endIcon={<SendIcon />}
                                   onClick={handleClick}
                                 >
                                         Copy Link
                            </Button>
		                </div>


				    	<Grid className='containerL' >
				    		<Grid className='item' item lg={4} sm={6} xs={12}>
				    			<img src={ReactImg} height='130px'/>
				    		</Grid>

				    		<Grid className='item' item lg={4} sm={6} xs={12}>
				    			<img src={ExpressImg} height='130px'/>
				    		</Grid>

				    		<Grid className='item' item lg={4} sm={6} xs={12}>
				    			<img src={MongoImg} height='130px'/>
				    		</Grid>
				    	</Grid>			        	
			        </CardContent>


			    </Card>
				      <Snackbar open={open} autoHideDuration={3000} onClose={handleClose}>
				        <Alert onClose={handleClose} severity="success">
				          Link copied to Clipboard				        
				        </Alert>
				      </Snackbar>
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
		//startGettingData: (obj)=> dispatch(startGettingUserDataFromDatabase(obj))
	})
}

export default connect(mapStateToProps, mapDispatchToProps)(LandingComponent)