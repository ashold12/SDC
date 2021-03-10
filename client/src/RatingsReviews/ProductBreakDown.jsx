import React from 'react';

class ProductBreakDown extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      productId: 17762,
      chars: props.characteristics,
    };
  }

  getCharacteristicsBars() {
    const bar = [];
    const characteristicsToScale = {
      Size: ['A size too small', 'A size too wide'],
      Width: ['Too narrow', 'Too wide'],
      Quality: ['Poor', 'Perfect'],
      Comfort: ['Uncomfortable', 'Perfect'],
      Length: ['Runs short', 'Runs long'],
      Fit: ['Runs tight', 'Runs long'],
    };
    if (this.props.characteristics === undefined) {
      return <div />;
    }
    const { characteristics } = this.props;
    const names = Object.keys(characteristics);
    for (let i = 0; i < names.length; i += 1) {
      // const key = characteristics[names[i]].id;
      //let key = characteristics[names[i]];

      // Error checking for null
      let percentage = 0;
      let numberOfStars = 0;

      if (characteristics[names[i]].value !== null) {
        percentage = parseInt(characteristics[names[i]].value, 10).toFixed(0) * 20;
        numberOfStars = parseInt(characteristics[names[i]].value, 10).toFixed(0);
      }
      let key = Date.now();
      const inlineStyle = {
        width: `${percentage}%`,
      };

      bar.push(
        <div key={(key += Math.random() * 100)} className="rr-product-overview-surroundtext">
          {`${names[i]}`}
          <div key={(key += Math.random() * 100)} className="rr-product-overview-bar-container">
            <div
              key={(key += Math.random() * 100)}
              style={inlineStyle}
              className="rr-product-overview-review-bar"
            >
              <b>{'⇓'}</b>
            </div>
          </div>
          <div key={(key += Math.random() * 100)} className="rr-product-overview-text">
            <div key={(key += Math.random() * 100)} className="rr-product-overview-left-text">
              {characteristicsToScale[names[i]][0]}
            </div>
            <div key={(key += Math.random() * 100)} className="rr-product-overview-right-text">
              {characteristicsToScale[names[i]][1]}
            </div>
          </div>
        </div>
      );
    }
    return bar;
  }

  render() {
    //We'll need to get the characteristics and create a bar for each one.
    return <div className="rr-product-breakdown">{this.getCharacteristicsBars()}</div>;
  }
}

export default ProductBreakDown;
