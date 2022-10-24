import React ,{useRef} from 'react'
import { Link , Outlet } from "react-router-dom";
import Logout from '../Logout'
//MUI
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import AssignmentIndIcon from '@mui/icons-material/AssignmentInd';
import TopicIcon from '@mui/icons-material/Topic';
import AssessmentOutlinedIcon from '@mui/icons-material/AssessmentOutlined';
import { purple } from '@mui/material/colors';

const drawerWidth = 240;



const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })(
    ({ theme, open }) => ({
      flexGrow: 1,
      padding: theme.spacing(3),
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      marginLeft: `-${drawerWidth}px`,
      ...(open && {
        transition: theme.transitions.create('margin', {
          easing: theme.transitions.easing.easeOut,
          duration: theme.transitions.duration.enteringScreen,
        }),
        marginLeft: 0,
      }),
    }),
  );

  const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== 'open',
  })(({ theme, open }) => ({
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: `${drawerWidth}px`,
      transition: theme.transitions.create(['margin', 'width'], {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
    }),
  }));

  const renderSwitchIcon = (param)=>{
    switch(param) {
      case 'Candidates':
        return <AssignmentIndIcon/>;
      case 'Users':
        return <InboxIcon/>;
      case 'Repositories':
        return <TopicIcon/>;
      default:
        return <MailIcon/>;
    }
  }
  const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
  }));

function Admin() {
      const theme = useTheme();
      const [open, setOpen] = React.useState(false);
    
      const handleDrawerOpen = () => {
        setOpen(true);
      };
    
      const handleDrawerClose = () => {
        setOpen(false);
      };

      const focuseLink = (index)=>{
        let linksList = Object.values(ListControl.current.children)
        linksList.map((link,i) => {
          if(i == index)
           link.style.backgroundColor='rgba(0, 0, 0, 0.07)';
          else
          link.style.backgroundColor = ''
        })
     }

     const ListControl = useRef(null);

    return (
        <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        <AppBar position="fixed" open={open} sx={{ width:'100%',padding:0,margin:0}}>
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={handleDrawerOpen}
              edge="start"
              sx={{ mr: 2, ...(open && { display: 'none' }) }}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" noWrap component="div">
              Interview System
            </Typography>
            <Logout/>
              <Link to='/Administrator' onClick={()=> focuseLink()}>
                <AssessmentOutlinedIcon style={{position:"absolute" , right:50, color:'white' ,top:20 }}/>
              </Link>
          </Toolbar>
        </AppBar>
        <Drawer
          sx={{
            width: drawerWidth,
            flexShrink: 0,
            '& .MuiDrawer-paper': {
              width: drawerWidth,
              boxSizing: 'border-box',
            },
          }}
          variant="persistent"
          anchor="left"
          open={open}
        >
          <DrawerHeader>
            <IconButton onClick={handleDrawerClose}>
              {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
            </IconButton>
          </DrawerHeader>
          <Divider />
          <List ref={ListControl}>
            {['Candidates', 'Users', 'Repositories','Questionnaire'].map((text, index) => (
              <ListItem button key={index}  component={Link} to={text} onClick={()=> focuseLink(index)} > 
                <ListItemIcon>
                {renderSwitchIcon(text)}
                </ListItemIcon>      
                <ListItemText primary={text} />
              </ListItem>
            ))}
          </List>
          <Divider />
         
        </Drawer>
        <Main open={open} style={{overflowX: 'hidden',height: '100vh'}}>
          <DrawerHeader />
          <Outlet></Outlet>
        </Main>
      </Box>
    )
}

export default Admin
