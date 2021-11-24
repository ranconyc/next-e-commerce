import jwt from 'jsonwebtoken';

const signToken = ({ _id, name, email, isAdmin }) =>
  jwt.sign({ _id, name, email, isAdmin }, process.env.JWT_SECRET, {
    expiresIn: '30d',
  });

export default signToken;
