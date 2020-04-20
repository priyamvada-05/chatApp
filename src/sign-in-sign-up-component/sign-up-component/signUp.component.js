import React from 'react';
//import { auth, createUserProfileDocument} from '../../firebase-config/firebaseConfig';
import FormInput from '../form-input-component/formInput.component';
import CustomButton from '../custom-button-component/customButton.component';
import './signUp.component.scss';

const validEmailRegex = 
  RegExp(/^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i);

class SignUp extends React.Component{

	constructor(){
		super()
		this.state={
			displayName:'',
			email:'',
			password:'',
			confirmPassword:'',
			error:{
				displayName:null,
				email:null,
				password: null,
				confirmPassword: null
			},
			loading:false,
			register_error:null,
			register_success:null
		}
	}



	handleChange=(event)=>{
		//event.preventDefault();
		const {name, value}= event.target;
		const errors= this.state.error
		switch (name) {
		    case 'displayName': 
		      errors.displayName = 
		        value.length < 5
		          ? 'Full Name must be 5 characters long!'
		          : '';
		      break;

		    case 'email': 
		      errors.email = 
		        validEmailRegex.test(value)
		          ? ''
		          : 'Email is not valid!';
		      break;

		    case 'password': 
		      errors.password = 
		        value.length < 6
		          ? 'Password must be 6 characters long!'
		          : '';
		      break;

		    case 'confirmPassword': 
		      errors.confirmPassword = 
		        this.state.password !== value
		          ? 'Password must be same!'
		          : '';
		      break;

		    default:
		      break;
		  }

		this.setState({ error:errors, [name] : value })

	}

	handleSubmit=async (event)=>{
		const { email, password, confirmPassword, displayName}= this.state;
		this.setState({loading: true})
		event.preventDefault();


		/*try{
		const { user}= await auth.createUserWithEmailAndPassword(email, password);
		await createUserProfileDocument(user, {displayName});
		//toastr.success('Registered successfully', 'Title', {displayDuration:3000})
		}
		catch(error){
			console.log(error);
		this.setState({register_error: error})
		}*/
		this.setState({
			displayName:'',
			email:'',
			password:'',
			confirmPassword:''
		})
}

	render(){

		return(
			<div className='sign-up'>
				<h2 className='title'> I don't have an account</h2>
				<span><strong> Sign up with email and password </strong></span>
				<form onSubmit={this.handleSubmit}>

					<FormInput type='text' lable='name' value={this.state.displayName} name='displayName' onChange={this.handleChange} />
										{
						(this.state.error.displayName)?
						<div><span className='error'> {this.state.error.displayName}</span><br /></div>
						: null
					}

					<FormInput type='text' lable='email' value={this.state.email} name='email' onChange={this.handleChange} />
										{
						(this.state.error.email)?
						<div><span className='error'> {this.state.error.email}</span><br /></div>
						: null
					}
					<FormInput type='password' lable='password' value={this.state.password} name='password' onChange={this.handleChange} />
										{
						(this.state.error.password)?
						<div><span className='error'> {this.state.error.password}</span><br /></div>
						: null
					}
					<FormInput type='password' lable='confirm password' value={this.state.confirmPassword} name='confirmPassword' onChange={this.handleChange} />
										{
						(this.state.error.confirmPassword)?
						<div><span className='error'> {this.state.error.confirmPassword}</span><br /> <br /></div>
						: null
					}
					<CustomButton loading={this.state.loading} type='submit' name='submit'> Sign up </CustomButton>
										{
						(this.state.register_error)?
						<div><span className='error'>Register error</span><br /> <br /></div>
						: null
					}			
				</form>
			</div>
			)
	}
}

export default SignUp;
