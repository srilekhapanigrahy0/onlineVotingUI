import React from 'react';
import { Link } from 'react-router-dom';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { makeStyles } from '@mui/styles';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import HomeIcon from '@mui/icons-material/Home';
import FactoryIcon from '@mui/icons-material/Factory';
import ListRoundedIcon from '@mui/icons-material/ListRounded';
import SettingsIcon from '@mui/icons-material/Settings';
import InfoIcon from '@mui/icons-material/Info';
import ContactMailIcon from '@mui/icons-material/ContactMail';
import HelpIcon from '@mui/icons-material/Help';
import FeedbackIcon from '@mui/icons-material/Feedback';
import PersonIcon from '@mui/icons-material/Person';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import BusinessIcon from '@mui/icons-material/Business';
import GroupIcon from '@mui/icons-material/Group';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import QuestionAnswerIcon from '@mui/icons-material/QuestionAnswer';
import SupportIcon from '@mui/icons-material/Support';
import RateReviewIcon from '@mui/icons-material/RateReview';
import VisibilityIcon from '@mui/icons-material/Visibility';

const useStyles = makeStyles((theme) => ({
  drawer: {
    width: 300, // Increased width
    flexShrink: 0,
  },
  drawerPaper: {
    width: 300, // Increased width
  },
  toolbar: theme.mixins.toolbar,
  closeButton: {
    display: 'flex',
    justifyContent: 'flex-end',
    padding: theme.spacing(1),
  },
  profile: {
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(2),
  },
  avatar: {
    marginRight: theme.spacing(2),
  },
  listItem: {
    cursor: 'pointer', // Change cursor to pointer
  },
}));

const Sidebar = ({ open, onClose }) => {
  const classes = useStyles();
  const [openMenu, setOpenMenu] = React.useState(null);

  const handleMenuClick = (menu) => {
    setOpenMenu((prevOpenMenu) => (prevOpenMenu === menu ? null : menu));
  };

  const handleItemClick = () => {
    onClose(); // Close the sidebar when a menu or submenu item is clicked
  };

  const menus = [
    { name: 'Home', icon: <HomeIcon />, submenus: [], link: '/' }, // No submenus for Home
    { name: 'Company', icon: <BusinessIcon />, submenus: [], link: '/company'},
    { name: 'Election', icon: <InfoIcon />, submenus: []},
    { name: 'Candidate', icon: <InfoIcon />, submenus: [
      { name: 'Candidate registration', icon: <BusinessIcon />, link: '/company' },
      { name: 'Team', icon: <GroupIcon />, link: '/team' },
    ]},
    { name: 'Voter', icon: <InfoIcon />, submenus: [
      { name: 'Voter list upload', icon: <BusinessIcon />, link: '/company' },
    ]},
    { name: 'master configuration', icon: <ContactMailIcon />, submenus: [
      { name: 'Country', icon: <EmailIcon />, link: '/contact/email' },
      { name: 'State', icon: <PhoneIcon />, link: '/contact/phone' },
      { name: 'District', icon: <PhoneIcon />, link: '/contact/phone' },
    ]},
    { name: 'Admin Panel', icon: <ContactMailIcon />, submenus: [
      { name: 'user list', icon: <EmailIcon />, link: '/contact/email' },
      { name: 'master roles', icon: <PhoneIcon />, link: '/contact/phone' },
      { name: 'user role mapping', icon: <PhoneIcon />, link: '/contact/phone' },
    ]},
    { name: 'Help', icon: <HelpIcon />, submenus: [
      { name: 'FAQ', icon: <QuestionAnswerIcon />, link: '/help/faq' },
      { name: 'Support', icon: <SupportIcon />, link: '/help/support' },
    ]},
    { name: 'Feedback', icon: <FeedbackIcon />, submenus: [
      { name: 'Submit Feedback', icon: <RateReviewIcon />, link: '/feedback/submit' },
      { name: 'View Feedback', icon: <VisibilityIcon />, link: '/feedback/view' },
    ]},
  ];

  return (
    <Drawer
      className={classes.drawer}
      variant="persistent"
      open={open}
      classes={{
        paper: classes.drawerPaper,
      }}
      anchor="left"
    >
      <div className={classes.toolbar} />
      <div className={classes.closeButton}>
        <IconButton onClick={onClose}>
          <CloseIcon />
        </IconButton>
      </div>
      <div className={classes.profile}>
        <Avatar className={classes.avatar} src="/path/to/profile.jpg" />
        <Typography variant="h6">Hello, First_Name</Typography>
      </div>
      <List>
        {menus.map((menu) => (
          <div key={menu.name}>
            {menu.link ? (
              <ListItem button component={Link} to={menu.link} className={classes.listItem} onClick={handleItemClick}>
                <ListItemIcon>{menu.icon}</ListItemIcon>
                <ListItemText primary={menu.name} />
              </ListItem>
            ) : (
              <ListItem button onClick={() => handleMenuClick(menu.name)} className={classes.listItem}>
                <ListItemIcon>{menu.icon}</ListItemIcon>
                <ListItemText primary={menu.name} />
                {menu.submenus.length > 0 && (openMenu === menu.name ? <ExpandLess /> : <ExpandMore />)}
              </ListItem>
            )}
            {menu.submenus.length > 0 && (
              <Collapse in={openMenu === menu.name} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                  {menu.submenus.map((submenu) => (
                    <ListItem button key={submenu.name} component={Link} to={submenu.link} sx={{ pl: 4 }} className={classes.listItem} onClick={handleItemClick}>
                      <ListItemIcon>{submenu.icon}</ListItemIcon>
                      <ListItemText primary={submenu.name} />
                    </ListItem>
                  ))}
                </List>
              </Collapse>
            )}
          </div>
        ))}
      </List>
    </Drawer>
  );
};

export default Sidebar;