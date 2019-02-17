import React, { Component } from 'react';


class TownSearch extends Component {

    handleInputChange(val) {
        this.props.onTownSearchChange(val);
    }
    render() {
        // options={this.props.townOptions}
        // onInputChange={(val)=> {this.handleInputChange(val)}}
        return <>
            <div><label htmlFor="town-search">Order by closest proximity</label></div>
            <div><input placeholder="Enter a UK town"
                        name="town-search" /></div>
            </>
    }
}

export default TownSearch;