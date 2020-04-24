import React, {useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import AccountCircle from '@material-ui/icons/AccountCircle';
import Switch from '@material-ui/core/Switch';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormGroup from '@material-ui/core/FormGroup';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import Drawer from '@material-ui/core/Drawer';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import Avatar from '@material-ui/core/Avatar';
import { deepOrange, deepPurple } from '@material-ui/core/colors';
import { connect} from 'react-redux';
import { startGettingSelectedUserDataFromDatabase, logoutUser, startGettingUserDataFromDatabase, homePage} from '../../redux/data/sampleDataAction';
//import OfflineBoltIcon from '@material-ui/icons/OfflineBolt';
import OfflineBoltIcon from '@material-ui/icons/FiberManualRecord';
import { green } from '@material-ui/core/colors';
import Pusher from 'pusher-js';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import { withRouter} from 'react-router-dom';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(3),
  },
  title: {
    flexGrow: 1,
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 5,
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    display:'flex',
    justifyContent: 'center',
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerContainer: {
    overflow: 'auto',
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
  orange: {
    color: theme.palette.getContrastText(deepOrange[500]),
    backgroundColor: deepOrange[500],
    width: theme.spacing(4),
    height: theme.spacing(4),
    marginRight: '10px'
  },
  purple: {
    color: theme.palette.getContrastText(deepPurple[500]),
    backgroundColor: deepPurple[500],
    width: theme.spacing(4),
    height: theme.spacing(4),
    marginRight: '10px'
  },
}));

const NavBarComponent= (props)=> {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const [openD, setOpenD] = React.useState(true);
  const socket=props.socket

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleClose1 = () => {
    setAnchorEl(null);
    props.history.push('/sign-in')
    props.logoutUser()
  };

  const handleCloseMenu = ()=>{
    setOpenD((preOpenD) => !preOpenD)
  }

  const handleClick= ()=>{

  }

  const handleClickAway= ()=>{
     setOpenD(false)
  }

  useEffect(() => {
   var pusher = new Pusher('764535e7de3c06e6376d', {
      cluster: 'eu',
      forceTLS: true
    });

    var channel = pusher.subscribe('my-channel');
    
    /*channel.bind('my-event', (data)=>{
      console.log('pusher')
     props.startGettingData({name: props.userDetail[0]['username'], 
                              email: props.userDetail[0]['email']})
    });*/

    channel.bind('my-event', handlePusher)
  },[]);

   const handlePusher=()=>{
     props.startGettingData({name: props.userDetail[0]['username'], 
                              email: props.userDetail[0]['email']})
   }

  return (
    <ClickAwayListener onClickAway={handleClickAway}>
    <div className={classes.root}>
      <AppBar className={classes.appBar} position="fixed">
        <Toolbar>
          <div onClick={handleCloseMenu}>
          <IconButton edge="start"  className={classes.menuButton} color="inherit" aria-label="menu">
            <MenuIcon />
          </IconButton>
          </div>
          <Typography variant="h6" className={classes.title}>
            Chat Application
          </Typography>
            <div>
              <IconButton
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
              >
                <AccountCircle />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={open}
                onClose={handleClose}
              >
              <a href='/sign-in'>
                <MenuItem >Sign Out</MenuItem>
              </a>
              </Menu>
            </div>
        </Toolbar>
      </AppBar>
      
      <Drawer
        className={classes.drawer}
        variant="persistent"
        classes={{
          paper: classes.drawerPaper,
        }}
        open={openD}
      >
      <Toolbar />
        <div className={classes.drawerContainer}>
          <List>
            <ListItem button onClick={()=> props.homePage()}>
                  <Typography variant="h6" className={classes.title}>
                    Home Page
                  </Typography>
            </ListItem>
            <Divider />
            <ListItem >
                  <Typography variant="p" className={classes.title}>
                    Contacts
                  </Typography>
            </ListItem>
            {props.userDetail[0].contact.map((contactObj, index) => (

              <ListItem button onClick={()=>{
                props.getSelectedUserDetail({id: contactObj['userId'], senderUserID: props.userDetail[0]['_id']})
              }} key={index}>
                <Avatar className={classes.purple}>{contactObj['name'][0]}</Avatar>
                <ListItemText primary={contactObj['name']} />
                
                <Divider />
              </ListItem>

            ))}
          </List>
        </div>
    </Drawer>
    </div>
    </ClickAwayListener>
  );
}

const mapStateToProps= (rootReducer)=>{
  return({
    userDetail: rootReducer.sampleData.userDetail
  })
}

const mapDispatchToProps= (dispatch)=>{
  return({
    getSelectedUserDetail: (obj)=> dispatch(startGettingSelectedUserDataFromDatabase(obj)),
    logoutUser: ()=> dispatch(logoutUser()),
    startGettingData: (obj)=> dispatch(startGettingUserDataFromDatabase(obj)),
    homePage: ()=> dispatch(homePage())
  })
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(NavBarComponent))