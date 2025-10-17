import React from 'react';

export default function SelectUser(props) {
  const { users, setUser } = props;

  const userProfiles = users.map((user, idx) => (
    <div key={idx} className="profile-row" onClick={() => setUser(user)} title={`Ik ben ${user.name}`}>
      <div className="avatar" style={{backgroundImage: `url(${user.image})`, border:`2px solid ${user.color}`}} />
      <span className="name">{user.name}</span>
      <span className="chevron">→</span>
    </div>
  ));

  return (
    <section className="box">
      <h3>Wie ben jij? 👋</h3>
      <p style={{textAlign: 'center', color: '#6b7280', marginBottom: '24px'}}>
        Klik op jezelf om je wenslijstje te bekijken
      </p>
      <div className="user-list">
        { userProfiles }
      </div>
    </section>
  );
}
