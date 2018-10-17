import React, { Component } from 'react';

export class Auth extends Component {

  constructor (props) {
    super();
    this.props = props;
    this.state = {
      password: '',
    }

    this.setPass = this.setPass.bind(this);
  }
  
  setPass(event) {
    event.preventDefault();
    const {password} = this.state;
    this.props.setPass(password);
  }

  handleChange (event) {
    const { state } = this;
    state[event.target.name] = event.target.value;
    this.setState(state);
  }

  render() {


    return (
        <section className="box padded">
            <h3>Wachtwoord:</h3>
            <div className="">
                <form onSubmit={this.setPass}>
                    <input type="text" name="password" placeholder="wachtwoord, staat in de famapp" onChange={event => this.handleChange(event)} />
                    <button className="btn">Inloggen</button>
                </form>
            </div>
            <div>
                <p style={{textAlign:'center', fontSize:'.7em', marginTop: '40px'}}>
                    Voor alle lieve mensen die deze pagina via github hebben gevonden ❤ stuur me even een berichtje, doen we een keer een biertje 🍺.
                </p>
            </div>
        </section>
    );
  }
}
