import React from 'react';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import './homepageComponent.scss';
import Button from '@material-ui/core/Button';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
  	width: '30vw',
  	height: '30vh',
    padding: theme.spacing(0),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
  button: {
    margin: theme.spacing(5),
  },
}));

function HomePageComponent() {
	const classes = useStyles();
  return (
    <div className="homepage">
    	<Grid className='container' container spacing={1}>
	        <Grid item lg={3} spacing={1}>
	          <Paper className='paper'>
	          	<h1>Upload Video</h1>
	          	<input type='file' />
	          	      <Button
				        variant="contained"
				        color="default"
				        className={classes.button}
				        startIcon={<CloudUploadIcon />}
				      >
				        Upload
				      </Button>
	          </Paper>
	        </Grid>
	       	<Grid item lg={3} spacing={1}>
	          <Paper className='paper'>
	          	<h1>Upload User</h1>
	          	<input type='file' />
	          	      <Button
				        variant="contained"
				        color="default"
				        className={classes.button}
				        startIcon={<CloudUploadIcon />}
				      >
				        Upload
				      </Button>
	          </Paper>
	        </Grid>
	        <Grid item lg={3} spacing={1}>
	          <Paper className='paper'>
	          	<h1>Upload File</h1>
	          	<input type='file' />
	          	      <Button
				        variant="contained"
				        color="default"
				        className={classes.button}
				        startIcon={<CloudUploadIcon />}
				      >
				        Upload
				      </Button>
	          </Paper>
	        </Grid>

	        

      </Grid>
    </div>
  );
}

export default HomePageComponent;
