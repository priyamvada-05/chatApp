import React from 'react';
import './customButton.component.scss';

const CustomButton=({children, isGoogle, loading, isInverted, ...otherprops})=>{

	let classStyle='';
	if(isGoogle){
		classStyle= 'google-sign-in custom-button'
	}

	else if(isInverted){
		classStyle= 'inverted custom-button'
	}

	else if(loading){
		classStyle='inverted custom-button loader'
	}

	else{
		classStyle='custom-button'
	}
	return(
		<button className={classStyle} {...otherprops}>
			{ loading?
				<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
				  
				 :
				children
			}
		</button>
		)
}

export default CustomButton;
