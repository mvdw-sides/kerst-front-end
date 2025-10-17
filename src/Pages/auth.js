import React, { useState } from 'react';

export default function Auth(props) {
  const [password, setPassword] = useState('');

  const onSubmit = (event) => {
    event.preventDefault();
    props.setPass(password);
  };

  return (
    <section className="box padded">
      <h3>Inloggen</h3>
      <div className="">
        <form onSubmit={onSubmit}>
          <input type="password" name="password" placeholder="Wachtwoord (staat in de famapp)" onChange={e => setPassword(e.target.value)} />
          <button className="btn">Inloggen</button>
        </form>
      </div>
      <div>
        <p style={{textAlign:'center', fontSize:'.7em', marginTop: '40px'}}>
          Voor alle lieve mensen die deze pagina via GitHub hebben gevonden ❤ stuur me even een berichtje, doen we een keer een biertje 🍺.
        </p>
      </div>
    </section>
  );
}
