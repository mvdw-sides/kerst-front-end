import React, { Component } from 'react';
import axios from 'axios';

export class User extends Component {

  constructor (props) {
      console.log(props)
    super();
    this.props = props;
    this.state = {
      users: props.users,
      user: props.user,
      items: [],
      product: '',
      link: '',
      price: '',
      factor: '',
    }

    this.addItem = this.addItem.bind(this);

  }

  componentWillMount() {
    this.props.required(this.state.user)
    this.getItems();
  }

  async getItems(){
    const response = await axios.get(`${this.props.base}/users/${this.state.user._id}`);
    this.setState({items: response.data.items});
  }

  async addItem(event) {

      event.preventDefault();
      const {items, product, link, price, factor} = this.state;

      if (!product || product === '' || !product.length) {
          return false;
      }
      items.push({
        product, link, price, factor
      });

      const response = await axios.post(`${this.props.base}/users/${this.state.user._id}`, {
        product, link, price, factor
      })

      this.setState({items: response.data.items});
  }

  handleChange (event) {
      const { state } = this;
      state[event.target.name] = event.target.value;
      this.setState(state);
  }


  render() {

    const {user, items} = this.state;

    if (!user) {
        return (<div />);
    }

    const tableRows = items.map((item, idx) => {
        return (
            <tr key={idx}>
                <td>{item.product}</td>
                <td>{item.link}</td>
                <td>{item.price}</td>
                <td>{item.factor}</td>
            </tr>
        );
    });

    return (
        <section className="box padded">
            <h3>Hey {user.name}!</h3>
            <div className="formWrapper">
                <form onSubmit={this.addItem}>
                    <span>Wat*</span>
                    <input type="text" name="product" required onChange={event => this.handleChange(event)}/>
                    <span>Link</span>
                    <input type="text" name="link" onChange={event => this.handleChange(event)}/>
                    <span>Prijs</span>
                    <select name="price" onChange={event => this.handleChange(event)}>
                        <option>€1-€10</option>
                        <option>€10-€25</option>
                        <option>€25-€50</option>
                        <option>€50-€100</option>
                        <option>€100+</option>
                    </select>
                    <span>Hoe graag hebben factor</span>
                    <select name="factor" onChange={event => this.handleChange(event)}>
                        <option>1</option>
                        <option>2</option>
                        <option>3</option>
                        <option>4</option>
                        <option>5</option>
                    </select>
                    <button className="btn btnLarge">Opslaan</button>
                </form>
            </div>
            <h3>Jouw huidige lijst:</h3>
            <div className="tableWrapper">
                <table>
                    <thead>
                        <tr>
                            <th>Product</th>
                            <th>Link</th>
                            <th>Prijs</th>
                            <th>Factor</th>
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
