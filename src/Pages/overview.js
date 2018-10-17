import React, { Component } from 'react';

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
    const response = await this.props.req.get(`/users/${this.state.user._id}/overview`);
    this.setState({items: response.data});
  }

  async purchase(_id) {
    await this.props.req.post(`/users/${this.state.user._id}/purchases`, { _id });
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
        const link = item.item.link ? (
            <a href={item.item.link}rel="noopener noreferrer" target="_blank">Link</a>
        ) : null;

        return (
            <tr key={idx}>
                <td>
                <div style={{float:'left', display: 'inline-block', border: `2px solid ${item.user.color}` ,width:'20px',height:'20px', borderRadius:'100px', backgroundSize:'contain', backgroundImage:`url(${item.user.image})`}}></div>
                <span style={{float:'left', color: item.user.color, paddingLeft: '5px'}}>{item.user.name}</span>
                </td>
                <td>{item.item.product}</td>
                <td>{link}</td>
                <td>{item.item.price}</td>
                <td>{item.item.factor}</td>
                <td><span className="btn btnSmall" onClick={() => {this.purchase(item.item._id)}}>Meld als gekocht</span></td>
            </tr>
        );
    });

    return (
        <section className="box padded overview">
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
