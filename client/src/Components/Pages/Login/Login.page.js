import React, { useRef, useContext, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { 
	Button,
	TextField, 
	Container,
	Paper,
	Divider,
	Link
} from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';

import AppContext from '../../../utils/AppContext';

import useStyles from './Login.styles';

export default function LoginForm() {
	const { fnLogin } = useContext(AppContext);
	const [hasError, setHasError] = useState(false);


	const classes = useStyles();

	const usernameEl = useRef();
	const passwordEl = useRef();

	const history= useHistory();

	const handleLoginClick = async (e) => {
		e.preventDefault();
		const username = usernameEl.current.value;
		const password = passwordEl.current.value;
		try {
			await fnLogin(username,password);
			history.push('/dashboard');
		} catch (error) {
			setHasError(true);
		}
		
	}
	const goToPage = (e,location) => {
		e.preventDefault();
		history.push(location);
	}

	return (
		<Container className={classes.root}>
			<Paper className={classes.paper}>
				<h1 className={classes.title}>Log in</h1>
				{
					hasError && 
					<Alert severity="error">Incorrect username or password</Alert>
				}
				<TextField 
					id="username" 
					label="Username"
					fullWidth
					inputRef={usernameEl}
				/>
				<br />
				<TextField 
					id="password" 
					label="Password" 
					type="password"
					fullWidth
					inputRef={passwordEl}
				/>
				<br />
				<Button 
					variant="outlined"
					onClick={handleLoginClick}
					color='primary'
					className={classes.button}
				>
					Login
				</Button>
				<br />
				<Divider  className={classes.divider}/>
				<p>
					<Link href="#" onClick={(e)=>goToPage(e,'/forgotpassword')}>
						Forgot password
					</Link>
				</p>
				<p>
					Don't have an account?&nbsp;
					<Link href="#" onClick={(e)=>goToPage(e,'/signup')}>
						Sign up
					</Link>
				</p>
			</Paper>
		</Container>
	)
}