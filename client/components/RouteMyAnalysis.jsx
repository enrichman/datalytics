import React from 'react';
import mui from 'material-ui';

class RouteMyAnalysis extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    const props = this.props;
    let analysis;
    if (props !== null) {
      analysis = props.analysis;
    }
    return (
      <div>
        <h1>Le mie analisi</h1>
        <mui.List style={{width: '90%'}}>
          {analysis.map(row => <mui.ListItem
            leftAvatar={<mui.Avatar>{row.title.charAt(0).toUpperCase()}</mui.Avatar>}
            primaryText={row.title}
            secondaryText={<p>{row.keywords.join(', ')}</p>}
            secondaryTextLines={2} />
          )}
        </mui.List>
      </div>
    );
  }

}

export default RouteMyAnalysis;
