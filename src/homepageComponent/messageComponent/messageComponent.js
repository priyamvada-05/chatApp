import React from 'react';
import './messageComponent.scss';
import { connect} from 'react-redux'

const MessageComponent= (props)=>{
	let isSentByCurrentUser= true
	let message= props.message
	let name= props.name
	if (name != 'me'){
		isSentByCurrentUser=false
	}

	console.log('messageContainer')
	console.log(message)
	return(
		<div>
			{message.map((item)=>
				item.user== props.userDetail[0]['username']?
						(<div className="messageContainer justifyEnd">
							<div className="messageBox backgroundBlue">
								<p className="messageText colorWhite">{item.text}</p>
							</div>
						</div>)
				:       (<div className="messageContainer justifyStart">
				        	<div className="messageBox backgroundLight">
				        		<p className="messageText colorDark">{item.text}</p>
				        	</div>
				        </div>)
			)}
		</div>
		)
}

const mapStateToProps=(rootReducer)=>{
  return({
    //selectedUser: rootReducer.sampleData.selectedUserDetail,
    userDetail: rootReducer.sampleData.userDetail
  })
}
export default connect(mapStateToProps)(MessageComponent)



		   /* name!= 'me'?
		     (message.map((text)=>
							        <div className="messageContainer justifyEnd">
							          <div className="messageBox backgroundBlue">
							            <p className="messageText colorWhite">{text}</p>
							          </div>
							        </div>
		             		))
        
        :(message.map((text)=>
                		          <div className="messageContainer justifyStart">
        				            <div className="messageBox backgroundLight">
        				              <p className="messageText colorDark">{text}</p>
        				            </div>
        				          </div>
                		))*/

