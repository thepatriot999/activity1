import React from 'react';

class Layout extends React.Component {

	render () {
		return (
			<div>
				<div className="header">
					<h1>Verify-It</h1>
				</div>
			<div> { this.props.children } </div>
			</div>
	       );
	}
}


export default Layout;
