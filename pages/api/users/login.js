import nc from 'next-connect';
import User from '../../../models/User';
import db from '../../../utils/db';
import signToken from '../../../utils/auth';
import bcrypt from 'bcryptjs';

const handler = nc();

handler.post(async (req, res) => {
  const { body } = req;
  await db.connect();
  const user = await User.findOne({ email: body.email });
  await db.disconnect();
  if (user && bcrypt.compareSync(body.password, user.password)) {
    const token = signToken(user);
    res.send({
      token,
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    });
  } else {
    res.status(401).send({ message: 'Invalid username or password' });
  }
});

export default handler;
