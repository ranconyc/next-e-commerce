import nc from 'next-connect';
import User from '../../../models/User';
import db from '../../../utils/db';
import signToken from '../../../utils/auth';
import bcrypt from 'bcryptjs';

const handler = nc();

handler.post(async (req, res) => {
  const { body } = req;
  await db.connect();
  const newUser = new User({
    name: body.name,
    email: body.email,
    password: bcrypt.hashSync(body.password),
    isAdmin: false,
  });
  const user = await newUser.save();
  await db.disconnect();

  const token = signToken(user);
  res.send({
    token,
    _id: user._id,
    name: user.name,
    email: user.email,
    isAdmin: user.isAdmin,
  });
});

export default handler;
