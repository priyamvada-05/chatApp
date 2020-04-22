const express=require('express');
const routes=express.Router();
const chatUserModel = require('../data-model/dataModelUpdated')
const messageModel= require('../data-model/messageModel');

routes.post('/data/addUserByDefault', (req, res)=>{
  const {username, email}= req.body;

  let chatUserModelObj = new chatUserModel({username, email})
  chatUserModelObj.save().then((data)=>{
    console.log('user saved to db')
    res.send({status: 'User saved to db'})
  }).catch((err)=>{
    console.log(err)
  })
})

routes.post('/data/addUserByRef', (req, res)=>{
      const {refUserID, username, email}= req.body;
          console.log('data')
          console.log(req.body)
      chatUserModel.find({_id:refUserID}).then((data)=>{
          console.log('data')
          console.log(data)
          let userId= data[0]['_id']
          let usernameContact= data[0]['username']

          chatUserModelObj= new chatUserModel({username, email})
          chatUserModelObj.save().then((dataObj)=>{
            console.log(dataObj)
           chatUserModel.findOneAndUpdate({_id: dataObj['_id']}, 
                                           {$push:{ contact: {userId, 
                                             name: usernameContact}}}).then((dataAddedUser)=>{
          chatUserModel.findOneAndUpdate({_id: refUserID},{$push:{ contact: {userId: dataAddedUser['_id'], 
                                             name: dataAddedUser['username']}}}).then((data)=>{
          
          const messageModelObj1= new messageModel({senderUserID: refUserID, receiverUserID: dataAddedUser['_id']})
          const messageModelObj2= new messageModel({senderUserID: dataAddedUser['_id'], receiverUserID: refUserID})
          messageModelObj1.save().then((data)=>{
            messageModelObj2.save().then((data)=>{
              console.log('saved user to db and updated contact by ref id')
              res.send({status: 'true'})
            })
          })
          
                                             })
          
  })
          })
        }).catch((err)=>{
          console.log(err)
        })

      
})

routes.post('/data/upLoad', (req, res)=>{


  let messageModelobj= new messageModel({senderUserID: '5e978803012dec4e509a939d',
                                          receiverUserID: '5e974ef62c563f16c4c5f429'})
  messageModelobj.save().then((data)=>{
    console.log('saved to db')
  }).catch((err)=>{
    console.log(err)
  })
	/*chatUserModel.findOneAndUpdate({_id: '5e978803012dec4e509a939d'}, {$push:{ contact: 'Admin1'}}).then((data)=>{
		console.log('saved contact to db')
	}).catch((err)=>{
		console.log(error)
	})*/

})

routes.post('/data/refID/getUser', (req, res)=>{
  const { _id}= req.body;

  chatUserModel.find({_id}).then((data)=>{
    res.send(data)
  })
})

routes.post('/data/viewUser', (req, res)=>{
  console.log(req.body)
  const {name, email}= req.body;
  chatUserModel.aggregate([
    {'$match': {'username': name.toLowerCase(), 'email': email.toLowerCase()}},
    {'$project':{
      '_id':1,
      'username':1,
      'email':1,
      'contact':1
    }}
    ]).then((data)=>{
    console.log(data)
    res.send(data)
  }).catch((err)=>{
    console.log(error)
  })

})

routes.post('/data/viewSelectedUser',  (req, res)=>{
  console.log(req.body)
  const {id, senderUserID}= req.body;
  chatUserModel.find({_id: id}).then((data)=>{
      console.log(data)
      let receiverUserID= String(data[0]['_id'])
      messageModel.aggregate([
    {'$match': {'senderUserID': senderUserID, 'receiverUserID': receiverUserID}},
    {'$project':{
      '_id':0,
      'message':1
    }}
    ]).then((messageData)=>{
      console.log(messageData)
      if(messageData.length>0){
                res.send([{
                  '_id': data[0]['_id'],
                  'username': data[0]['username'],
                  'email': data[0]['email'],
                  'contact': data[0]['contact'],
                  'status': data[0]['status'],
                  'message': messageData[0]['message']
    }])
      }
      else{
                res.send([{
                  '_id': data[0]['_id'],
                  'username': data[0]['username'],
                  'email': data[0]['email'],
                  'contact': data[0]['contact'],
                  'message': messageData
    }])
      }


    })
    }).catch((err)=>{
      console.log(err)
    })

 
 
 /*console.log({
    '_id': data[0]['_id'],
    'username': data[0]['username'],
    'email': data[0]['email'],
    'contact': data[0]['contact'],
    'message': messageData
    })*/




})

routes.post('/data/viewMessageWithSelectedUser', (req, res)=>{
  console.log(req.body)
  const {senderUserID, receiverUserID}= req.body;
  chatUserModel.aggregate([
    {'$match': {'senderUserID': senderUserID, 'receiverUserID': receiverUserID}},
    {'$project':{
      '_id':0,
      'message':1
    }}
    ]).then((data)=>{
    console.log(data)
    res.send(data)
  }).catch((err)=>{
    console.log(error)
  })

})





/*
{ _id:
   { _data:
      '825E978AA60000007D2B022C0100296E5A1004F05A592A2E094C5CA18183C318ECB181466
45F696400645E978803012DEC4E509A939D0004' },
  operationType: 'update',
  clusterTime:
   Timestamp { _bsontype: 'Timestamp', low_: 125, high_: 1586989734 },
  ns: { db: 'test', coll: 'chatusermodels' },
  documentKey: { _id: 5e978803012dec4e509a939d },
  updateDescription: { updatedFields: { contact: [Array] }, removedFields: [] }
}

*/


module.exports=routes;