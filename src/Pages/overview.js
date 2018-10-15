import React, { Component } from 'react';
import axios from 'axios';

export class Overview extends Component {

  constructor (props) {
    super();
    this.props = props;
    this.state = {
      users: props.users,
      user: props.user,
      items: [],
    }
  }

  componentWillMount() {
    this.props.required(this.state.user)
    this.getItems();
  }

  async getItems(){
    const response = await axios.get(`${this.props.base}/users/${this.state.user._id}/overview`);
    this.setState({items: response.data});
  }

  async purchase(_id) {
    await axios.post(`${this.props.base}/users/${this.state.user._id}/purchases`, { _id });
    const items = this.state.items.filter((item) => {
        return (item.item._id !== _id)
    });
    this.setState({items});
  }


  render() {

    const {user, items} = this.state;

    if (!user) {
        return (<div />);
    }

    const tableRows = items.map((item, idx) => {
        return (
            <tr key={idx}>
                <td>
                <div style={{float:'left', display: 'inline-block', border: `2px solid ${item.user.color}` ,width:'20px',height:'20px', borderRadius:'100px', backgroundSize:'contain', backgroundImage:`url(${item.user.image})`}}></div>
                <span style={{float:'left', color: item.user.color, paddingLeft: '5px'}}>{item.user.name}</span>
                </td>
                <td>{item.item.product}</td>
                <td>{item.item.link}</td>
                <td>{item.item.price}</td>
                <td>{item.item.factor}</td>
                <td><span className="btn btnSmall" onClick={() => {this.purchase(item.item._id)}}>Meld als gekocht</span></td>
            </tr>
        );
    });

    return (
        <section className="box padded">
            <h3>De huidige lijst:</h3>
            <div className="tableWrapper">
                <table>
                    <thead>
                        <tr>
                            <th>Gebruiker</th>
                            <th>Product</th>
                            <th>Link</th>
                            <th>Prijs</th>
                            <th>Factor</th>
                            <th>status</th>
                        </tr>
                    </thead>
                    <tbody>
                        { tableRows }
                    </tbody>
                </table>
            </div>
        </section>
    );
  }
}
