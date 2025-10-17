import React, { useEffect, useState } from 'react';
import ModernTable from '../components/ModernTable';

export default function Overview(props) {
  const { user, req, required } = props;
  const [items, setItems] = useState([]);

  useEffect(() => {
    if (!required(user)) return;
    (async () => {
      const response = await req.get(`/users/${user._id}/overview`);
      setItems(response.data);
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  const purchase = async (_id) => {
    await req.post(`/users/${user._id}/purchases`, { _id });
    setItems(prev => prev.filter((entry) => entry.item._id !== _id));
  };

  if (!user) return (<div />);

  const mappedItems = items.map((entry) => ({
    _id: entry.item._id,
    product: entry.item.product,
    link: entry.item.link,
    price: entry.item.price,
    factor: entry.item.factor,
    __user: entry.user
  }));

  return (
    <section className="box padded overview">
      <h3>Overzicht van alle wensen (voor cadeautjes kopen)</h3>
      <ModernTable 
        items={mappedItems}
        onPurchase={(id) => purchase(id)}
        showPurchaseButton={true}
        showRequester={true}
        title="Alle wensen"
      />
    </section>
  );
}
