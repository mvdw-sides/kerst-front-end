import React, { Component } from 'react';

export class SelectUser extends Component {

  constructor (props) {
    super();
    this.props = props;
    this.state = {
      users: props.users
    }
  }
  
  select(user) {
    this.props.setUser(user);
  }

  render() {

    const {users} = this.state;

    const userProfiles = users.map((user, idx) => {
      return (
        <div key={idx} className="profile" onClick={() => this.select(user)}>
          <div className="img" style={{backgroundImage: `url(${user.image})`, border:`2px solid ${user.color}`}} />
          <span>{user.name}</span>
        </div>
      );
    });

    return (
        <section className="box">
            <h3>En jij bent?</h3>
            <div className="user-select">
            { userProfiles }
            </div>
        </section>
    );
  }
}
