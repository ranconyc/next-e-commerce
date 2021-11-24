import db from '../../utils/db';

export default function handler(req, res) {
  db.connect();
  db.disconnect();
  res.status(200).json({ name: 'John Doe' });
}
