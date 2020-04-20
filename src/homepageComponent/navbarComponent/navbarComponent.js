import React from 'react';
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
import { startGettingSelectedUserDataFromDatabase} from '../../redux/data/sampleDataAction';
//import OfflineBoltIcon from '@material-ui/icons/OfflineBolt';
import OfflineBoltIcon from '@material-ui/icons/FiberManualRecord';
import { green } from '@material-ui/core/colors';

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

  const handleCloseMenu = ()=>{
    setOpenD((preOpenD) => !preOpenD)
  }

  const handleClick= ()=>{

  }



  return (
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
                <MenuItem onClick={handleClose}>Profile</MenuItem>
                <MenuItem onClick={handleClose}>My account</MenuItem>
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
            <ListItem button>
              <ListItemText primary={'Group Chat'} />
            </ListItem>
            {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
              <ListItem button key={text}>
                <Avatar className={classes.orange}>{text[0]}</Avatar>
                <ListItemText primary={text} />

              </ListItem>
            ))}
          </List>
          <Divider />
          <List>
            <ListItem button>
              <ListItemText primary={'Contact'} />
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
  );
}

const mapStateToProps= (rootReducer)=>{
  return({
    userDetail: rootReducer.sampleData.userDetail
  })
}

const mapDispatchToProps= (dispatch)=>{
  return({
    getSelectedUserDetail: (obj)=> dispatch(startGettingSelectedUserDataFromDatabase(obj))
  })
}

export default connect(mapStateToProps, mapDispatchToProps)(NavBarComponent)