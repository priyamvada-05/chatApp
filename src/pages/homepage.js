import React from 'react';
import HomePageComponent from '../homepageComponent/homepageComponent';
import { Route, Switch, Redirect } from 'react-router-dom';
import SigninSignupComponent from '../sign-in-sign-up-component/sign-in-sign-up.component';
import HomeNewPageComponent from '../homeNewPageComponent/homeNewPageComponent';

class HomePage extends React.Component{

	constructor(props){
		super(props);
	}


	componentDidMount(){


	}

	componentWillUnmount(){
		
	}

	render(){
		return(
			<div>
					<div className='new'>
					<Switch >
						<Route 
							exact={true} 
							path='/' 
							component={HomeNewPageComponent}>
						</Route>

						<Route 
							path='/sign-in' 
							component={SigninSignupComponent}>
						</Route>

						<Route 
							path='/user/:userid' 
							component={HomePageComponent}>
						</Route>

					</Switch>
					</div>

			</div>
			)

	}

}

const mapDispatchToProps=(dispatch)=>{

}

const mapStateToProps= (rootRedux)=>{

}

export default HomePage