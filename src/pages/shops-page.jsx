import React from 'react';
import SolarSystem from '../components/solar-system';

export default class ShopsPage extends React.Component {

    render() {
        return <SolarSystem history={this.props.history} category_id={this.props.match.params.id} />
    }
}