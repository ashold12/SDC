import React from 'react';

class Header extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      hello: 0
    }
  }

  render() {
    return (
      <div className="main-header">
      <div className="main-logo">put logo here</div>
      <div className="main-sale">big sale on the way!!</div>
      </div>
    )
  }

}


export default Header;

