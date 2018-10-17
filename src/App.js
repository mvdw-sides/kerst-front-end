import React, { Component } from 'react';
import { Route, Switch, Link } from "react-router-dom";
import './styles/App.css';
import axios from 'axios';
import { SelectUser } from './Pages/select';
import { User } from './Pages/user';
import { Overview } from './Pages/overview';
import { Auth } from './Pages/auth';

class App extends Component {

  constructor (props) {
    super();
    this.props = props;
    this.req = null;
    this.state = {
      users: [],
      user: null,
      auth: null,
    }

    this.setUser = this.setUser.bind(this);
    this.required = this.required.bind(this);
    this.setPass = this.setPass.bind(this);
  }

  async componentWillMount() {
    await this.getPassword();
    await this.setReq();
    this.getUsers();

  }

  async setReq() {
    const instance = axios.create({
      baseURL: this.props.base,
      headers: {
        common: {
          Authorization: this.state.auth
        }
      }
    });
    this.req = instance;
    return true;
  }

  getPassword() {
    const auth = localStorage.getItem('pw');
    this.setState({auth});
  }

  async setPass(pw) {
    localStorage.setItem('pw', pw);
    this.setState({auth: pw});
    await this.getPassword();
    await this.setReq();
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
    const response = await this.req.get(`/users`);
    this.setState({users: response.data});
  }

  render() {

    const {users, user, auth} = this.state;

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
        { !auth ? <Auth {...this.props} setPass={this.setPass}/> : (
          <Switch>
          <Route exact path="/" component={(props) => <SelectUser {...this.props} req={this.req} {...props} users={users} setUser={this.setUser}/>} />
          <Route exact path="/user/:userId" component={(props) => <User {...this.props} req={this.req} required={this.required} {...props} users={users} user={user}/>} />
          <Route exact path="/overview" component={(props) => <Overview {...this.props} req={this.req} required={this.required} {...props} users={users} user={user}/>} />
        </Switch>
        )}
      </div>
    );
  }
}

export default App;
