import React, { useEffect, useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';
import ModernForm from '../components/ModernForm';
import ModernTable from '../components/ModernTable';

export default function User(props) {
  const params = useParams();
  const { users, req, required } = props;
  const [user, setUser] = useState(null);
  const [items, setItems] = useState([]);

  useEffect(() => {
    const found = users.find(u => u._id === params.userId) || null;
    setUser(found);
    if (found && required(found)) {
      (async () => {
        const response = await req.get(`/users/${found._id}`);
        setItems(response.data.items);
      })();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params.userId, users]);

  const addItem = async (formData) => {
    const { product, link, price, factor } = formData;
    if (!product || !product.length) return;
    const response = await req.post(`/users/${user._id}`, { product, link, price, factor });
    setItems(response.data.items);
  };

  if (!user) return (<div />);

  return (
    <section className="box padded">
      <h3>Hey {user.name}! 👋</h3>
      <ModernForm onSubmit={addItem} />
      <ModernTable items={items} title="Jouw wenslijstje" />
    </section>
  );
}
