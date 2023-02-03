import { Button } from '@material-ui/core';
import React, { Component } from 'react';

class Unauthenticated extends Component {
	render() {
		return (
			<div className="w-full h-full flex items-center justify-center flex-column px-6">
				<img src="/assets/images/illustrations/mobile-message.svg" alt="login first" className="mb-4" style={{ width: 300 }} />
				<p>Login terlebih dahulu untuk mengakses Alan Finance</p>
				<Button href="https://office.alan.co.id/" variant="contained" color="primary">
					Login
				</Button>
			</div>
		);
	}
}

export default Unauthenticated;
