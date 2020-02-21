import React from 'react';

const Logout = (props) => {
	if (localStorage.length) localStorage.clear();
	// Set a fake timeout to get the highest timeout id
	var highestTimeoutId = setTimeout(() => null);
	for (var i = 0; i < highestTimeoutId; i++) {
		clearTimeout(i);
	}
	props.checklogin();
	props.history.replace('/');
	return (
		<div>Goodbye...</div>
	)
}

export default Logout;