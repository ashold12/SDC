import React from 'react';
import {
  MdExpandMore,
  MdExpandLess,
  MdKeyboardArrowRight,
  MdKeyboardArrowLeft,
} from 'react-icons/md';

class Header extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      show: true,
    };
    this.handleArrowClick = this.handleArrowClick.bind(this);
  }

  componentDidMount() {
    window.setInterval(() => {
      this.handleArrowClick()
    }, 4500)
  }

  handleArrowClick() {
    this.setState({ show: !this.state.show });
  }

  render() {
    const { show } = this.state;
    return (
      <div className="main-header">
        <div className="main-logo">HAMILTON</div>
        <div className="main-sale">
          <span>
            <MdKeyboardArrowLeft id="main-header-left" onClick={this.handleArrowClick} />

            {show && <span id="main-sale-text">FREE SHIPPING & 60 DAY FREE RETURNS!</span>}

            {!show && <span id="main-sale-text">HURRY BEFORE SALE ENDS!</span>}
            <MdKeyboardArrowRight id="main-header-right"onClick={this.handleArrowClick} />
          </span>
        </div>
      </div>
    );
  }
}

export default Header;
