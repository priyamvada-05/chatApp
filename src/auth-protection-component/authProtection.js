import React from 'react';
import { Route,Redirect} from 'react-router-dom';
import { connect} from 'react-redux';

const AuthProtection=({component:Component, userDetail, ...restProps})=>{


	return(
		<Route {...restProps} render={(props)=> {
				return(
					userDetail ? 
					<Component {...props}/> :
					<Redirect to='/sign-in' />
				    )}
				}
				/>
		)
}

const mapStateToProps=(rootReducer)=>{
	return({
		userDetail: rootReducer.sampleData.userDetail,
	})
}

export default connect(mapStateToProps)(AuthProtection)