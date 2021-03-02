import React from 'react';

class ProductBreakDown extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      productId: 17762,
      chars: props.characteristics,
    };
    console.log(props.characteristics);
  }

  getCharacteristicsBars() {
    const bar = [];
    const characteristicsToScale = {
      Size: ['too small', 'too big'],
      Width: ['too narrow', 'too big'],
      Quality: ['poor', 'great'],
      Comfort: ['not comfortable', 'extremely comfortable'],
      Length: ['too short', 'too long'],
      Fit: ['too tight', 'too loose'],
    };
    const characteristics = this.props.characteristics
    const names = Object.keys(characteristics);
    for (let i = 0; i < names.length; i += 1) {
      const key = characteristics[names[i]].id;
      const percentage = parseInt(characteristics[names[i]].value).toFixed(0) * 20;

      const inlineStyle = {
        width: `${percentage}%`,
        backgroundColor: '#2196F3',
      };
      bar.push(
        <div key={key} className='rr-product-overview-bar-container'>
          {names[i] + ' '}
          {parseInt(characteristics[names[i]].value).toFixed(0)}
          <div style={inlineStyle} className='rr-product-overview-review-bar'>
            <h2>⇓</h2>
          </div>
          {characteristicsToScale[names[i]][0] + ' ' + characteristicsToScale[names[i]][1]}
        </div>
      );
    }
    return bar;
  }

  render() {
    //We'll need to get the characteristics and create a bar for each one.
    return (
      <div className="rr-product-breakdown">
        {this.getCharacteristicsBars()}
      </div>
    );
  }
}

export default ProductBreakDown;
