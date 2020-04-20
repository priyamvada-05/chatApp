import React from 'react';
import SignIn from './sign-in-component/signIn.component';
import SignUp from './sign-up-component/signUp.component';
import './sign-in-sign-up.component.scss';

const SigninSignupComponent = ()=>{

	return(
		<div className='sign-in-and-sign-up'>
			<SignIn />
			<SignUp />
		</div>

		)
}

export default SigninSignupComponent;