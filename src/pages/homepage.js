import React from 'react';
import HomePageComponent from '../homepageComponent/homepageComponent';
import { Route, Switch, Redirect } from 'react-router-dom';
import SigninComponent from '../sign-in-sign-up-component/homeNewPageComponent/signInComponent';
import HomeNewPageComponent from '../homeNewPageComponent/homeNewPageComponent';
import AuthProtection from '../auth-protection-component/authProtection'; 
import { connect} from 'react-redux';
import AddUserByReferenceComponent from '../addUserByRefComponent/addUserByReference';
import RedirectComponent from '../redirect/redirectComponent';
import SignUpComponent from '../sign-in-sign-up-component/homeNewPageSignUpComponent/signUpComponent';

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
							path='/sign-in' 
							render={ (props)=>{
								if(this.props.userDetail){
										if(this.props.userDetail.length>0){
											return(
												<Redirect to='/user/myProfile' />
												)
										}
										else{
											return(
												<SigninComponent {...props}/>
												)
										}
									}
									else{
										return(
												<SigninComponent {...props}/>
												)
									}
								
							}}
						></Route>

						<Route 
							exact={true} 
							path='/sign-up' 
							render={ (props)=>{
								if(this.props.userDetail){
										if(this.props.userDetail.length>0){
											return(
												<Redirect to='/user/myProfile' />
												)
										}
										else{
											return(
												<SignUpComponent {...props}/>
												)
										}
									}
									else{
										return(
												<SignUpComponent {...props}/>
												)
									}
								
							}}
						></Route>

						<AuthProtection  
							path='/user/myProfile' 
							component={HomePageComponent}>
						</AuthProtection>

						<Route
							exact={true}
							path= '/addUserByReference/:userID'
							component= {AddUserByReferenceComponent}
							>
						</Route>

						<Route
							exact={true}
							path= '/'
							component= {RedirectComponent}
							>
						</Route>

					</Switch>
					</div>

			</div>
			)

	}

}

const mapDispatchToProps=(dispatch)=>{

}

const mapStateToProps= (rootReducer)=>{
	return({
	userDetail: rootReducer.sampleData.userDetail,
	refUserDetail: rootReducer.sampleData.refUserDetail
	})
}

export default connect(mapStateToProps)(HomePage)