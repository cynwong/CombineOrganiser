import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Header from './Components/NavBar/Header/Header';
import Home from './Components/Pages/Home/Home.page';
import SignUp from './Components/Pages/SignUp/SignUp.page';
import DashBoard from './Components/Pages/DashBoard/DashBoard.page';
import Events from './Components/Pages/Events/Events.page';

import AppContext from './utils/AppContext';
import API from './utils/API';

import './App.scss';

function App() {
	const [userInfo, setUserInfo] = useState({
		username: null,
		firstName: null,
		lastName: null,
	});
	
	// const [error, setError] = useState('');
	const fnLogin = async (username, password) => {
		try {
			const { data: { success, user } } = await API.login(username, password);
			if(success) {
				setUserInfo({
					username: user.username,
					firstName: user.firstName,
					lastName: user.lastName,
					events: user.events ? user.events: []
				});
			}
		} catch (err) {
			console.error(err); //TODO
		}
	}
	const fnLogOut = async () => {
		try {
			const { data: { success } } = await API.logOut();
			if (success) {
				setUserInfo({
					username: null,
					firstName: null,
					lastName: null,
				});
				
			}
		} catch (error) {
			console.log(error);
		}
	}
	const appContextValues = {
		user: userInfo,
		fnLogin,
		fnLogOut
	};
	return (
		<AppContext.Provider value={appContextValues} >
			<div className="wrapper">
				<Router>
					<Header />
					<main>
						<Switch>
							<Route exact path='/' component={Home} />
							{
								userInfo.username ? (
									[
										<Route exact path='/dashboard' key='dashboard' component={DashBoard} />,
										<Route exact path='/events/new' key='newEvent' component={Events} />,
									]
								) : (
									<Route exact path='/signup' component={SignUp} />
								)
							}
							
						</Switch>
					</main>
				</Router>
			</div>
		</AppContext.Provider>
	);
}

export default App;
