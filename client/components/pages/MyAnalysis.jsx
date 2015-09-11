import React from 'react';
import { List, ListItem, Avatar } from 'material-ui';

class MyAnalysis extends React.Component {

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
        <List style={{width: '90%'}}>
          {analysis.map(row => <ListItem
            leftAvatar={<Avatar>{row.title.charAt(0).toUpperCase()}</Avatar>}
            primaryText={row.title}
            secondaryText={<p>{row.keywords.join(', ')}</p>}
            secondaryTextLines={2} />
          )}
        </List>
      </div>
    );
  }

}

export default MyAnalysis;
