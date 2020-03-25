import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { 
	AppBar,
	Button,
	IconButton,
	MenuItem,
	Menu,
	Toolbar,
	Typography,
} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import AccountCircle from '@material-ui/icons/AccountCircle';

import AppContext from '../../../utils/AppContext';

import useStyles from './Header.styles';
import './Header.styles.scss';

export default function Header() {
	const { user, fnLogOut } = useContext(AppContext);

	const history= useHistory();

	const classes = useStyles();

	const [anchorEl, setAnchorEl] = React.useState(null);
	const open = Boolean(anchorEl);

	const handleMenu = event => {
		setAnchorEl(event.currentTarget);
	};

	const handleClose = () => {
		setAnchorEl(null);
	};

	const handleLogoutClick = () => {
		handleClose();
		fnLogOut();
	}

	return (
		<div className={classes.root}>
			<AppBar position="static" className={classes.root}>
				<Toolbar>
				<IconButton 
					edge="start" 
					className={classes.menuButton} 
					id='menu-button'
					color="inherit"
				>
					<MenuIcon />
				</IconButton>
				<Typography variant="h6" className={classes.title}>
					Calen
				</Typography>
				{user.username ? (
					<div>
					<IconButton
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
						style={{top:48}}
						open={open}
						onClose={handleClose}
					>
						<MenuItem onClick={handleLogoutClick}>Logout</MenuItem>
						{/* <MenuItem onClick={handleClose}>My account</MenuItem> */}
					</Menu>
					</div>
				) : (
					<Button color="secondary" onClick={()=> history.push('/login')}>
						Login
					</Button>
				)
				}
				</Toolbar>
			</AppBar>
		</div>
	);
}
