import React from 'react';
import { Table, Button } from 'react-bootstrap';
import moment from 'moment';
import NavLink from './../../Router/components/NavLink.jsx';
import FluxComponent from 'flummox/component';

class MyAnalysis extends React.Component {

  constructor(props) {
    super(props);
    this.props.flux.getActions('datalytics').getMyAnalysis(this.props.analysis);
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
        <Table striped bordered condensed hover>
          <thead>
          <tr>
            <th>Titolo</th>
            <th>Keywords</th>
            <th>Data inizio</th>
            <th>Data fine</th>
          </tr>
          </thead>
          <tbody>
          {analysis.map(row => {
            return (<tr>
              <td>{row.title}</td>
              <td><p>{row.keywords.join(', ')}</p></td>
              <td><p>{moment(row.from).calendar()}</p></td>
              <td><p>{moment(row.to).calendar()}</p></td>
              <td>
                <FluxComponent connectToStores={['route']}>
                  <NavLink href={'/analysis/' + row._id}
                     handler={<FluxComponent connectToStores={['datalytics', 'route']}><Button bsStyle="success">Visualizza</Button></FluxComponent>}/>
                </FluxComponent>
              </td>
            </tr>);
          })}
          </tbody>
        </Table>
      </div>
    );
  }

}

export default MyAnalysis;
