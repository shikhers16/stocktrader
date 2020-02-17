import React from 'react';

const Logout = (props) => {
	if (localStorage.length) localStorage.clear();
	props.checklogin();
	console.log(props);
	props.history.replace('/');
	return (
		<div>Goodbye...</div>
	)
}

export default Logout;