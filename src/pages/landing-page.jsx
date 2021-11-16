import React from 'react';
import Galaxy from '../components/galaxy';

class LandingPage extends React.Component{

	  render() {
			return (
				<Galaxy history={this.props.history} />
			);
		}
		
}
export default LandingPage;
