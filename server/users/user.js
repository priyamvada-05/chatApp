const users = [];

const addUser = ({ id, name, userID }) => {
  name = name.trim().toLowerCase();
  userID = userID.trim().toLowerCase();

  const existingUser = users.find((user) => user.userID === userID && user.name === name);

  if(!name || !userID) return { error: 'Username and room are required.' };
  if(existingUser){
    console.log('existingUser')
  console.log(users)
  //return { user}
  }

  const user = { id, name, userID };

  users.push(user);
  
  return { user };
}

const removeUser = (id) => {
  const index = users.findIndex((user) => user.id === id);

  if(index !== -1) return users.splice(index, 1)[0];
}

const getUser = (id) => users.find((user) => user.id === id);

const getReceiverSocketId = (receiverID) => users.find((user) => user.userID === receiverID);

//const getUsersInRoom = (room) => users.filter((user) => user.room === room);

module.exports = { addUser, removeUser, getUser, getReceiverSocketId };