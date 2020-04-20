import React from 'react';
import './formInput.component.scss';

const FormInput = ({lable, onChange, ...otherProps})=>{


	return(
		<div className='group'>
			<input className='form-input' onChange={onChange} {...otherProps} required />
				{
				lable?( <lable 
							className={`${otherProps.value.length ? 'shrink' : ''} form-input-label`}

							> {lable}</lable>) : null
				}
		</div>	
		)
}

export default FormInput;