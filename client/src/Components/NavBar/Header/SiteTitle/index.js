import React from 'react';
import { NavLink } from 'react-router-dom';

import './styles.scss';

export default function SiteTitle() {
	return (
		<div className='siteTitle'>
			<NavLink to='/'>
				<h1>iOrganizer</h1>
			</NavLink>
		</div>
	)
}
