import nc from 'next-connect';
import Product from '../../../models/Product';
import db from '../../../utils/db';

const handler = nc();

handler.get(async (req, res) => {
  const { id } = req.query;
  await db.connect();
  const product = await Product.findById(id);
  await db.disconnect();
  res.send(product);
});

export default handler;
