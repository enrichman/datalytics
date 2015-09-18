import React from 'react';
import { Table, Button } from 'react-bootstrap';
import moment from 'moment';
import { Link } from 'react-router';

class TableAnalysis extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    const analysis = this.props.usersAnalysis;
    return (
      <Table striped bordered condensed hover>
        <thead>
        <tr>
          <th>Titolo</th>
          <th>Keywords</th>
          <th>Data creazione</th>
        </tr>
        </thead>
        <tbody>
        {analysis.map(row => {
          return (
            <tr key={row._id}>
              <td>{row.title}</td>
              <td><p>{row.keywords.join(', ')}</p></td>
              <td><p>{moment(row.created_at).calendar()}</p></td>
              <td>
                <Link to={'/analysis/' + row._id}>
                  <Button bsStyle="success">Visualizza</Button>
                </Link>
              </td>
            </tr>
          );
        })}
        </tbody>
      </Table>
    );
  }

}

export default TableAnalysis;
