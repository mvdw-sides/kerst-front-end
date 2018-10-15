import React, { Component } from 'react';
import { Route, Switch, Link } from "react-router-dom";
import './styles/App.css';
import axios from 'axios';
import { SelectUser } from './Pages/select';
import { User } from './Pages/user';
import { Overview } from './Pages/overview';

class App extends Component {

  constructor (props) {
    super();
    this.props = props;
    this.state = {
      users: [],
      user: null,
    }

    this.setUser = this.setUser.bind(this);
    this.required = this.required.bind(this);
  }

  componentWillMount() {
    this.getUsers();
  }
  setUser(user) {
    this.setState({user});
    return this.props.history.push(`/user/${user._id}`);
  }

  required(field) {
    if (!field) {
      this.props.history.push(`/`);
      return false;
    }
    return true;
  }

  async getUsers() {
    const response = await axios.get(`${this.props.base}/users`);
    this.setState({users: response.data});
  }

  render() {

    const {users, user} = this.state;

    let menu;
    if (user) {
      menu = (
        <div className="menu">
          <Link to="/overview">Overzicht</Link>
          <Link to={`/user/${user._id}`}>Mijn lijstje</Link>
        </div>
      );
    }
    return (
      <div className="App">
        <header className="header">
          <h2><i className="ion ion-ios-list-outline"></i> <br /> kerst wens lijstjes</h2>
          { menu }
        </header>
        <Switch>
          <Route exact path="/" component={(props) => <SelectUser {...this.props} {...props} users={users} setUser={this.setUser}/>} />
          <Route exact path="/user/:userId" component={(props) => <User {...this.props} required={this.required} {...props} users={users} user={user}/>} />
          <Route exact path="/overview" component={(props) => <Overview {...this.props} required={this.required} {...props} users={users} user={user}/>} />
        </Switch>
      </div>
    );
  }
}

export default App;
