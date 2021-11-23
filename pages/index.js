import React, { useContext } from 'react';
import {
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  Grid,
  Typography,
} from '@material-ui/core';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import Layout from '../components/Layout';
import db from '../utils/db';
import { Store } from '../utils/store';
import Product from '../models/product';
import axios from 'axios';

export default function Home({ products }) {
  const router = useRouter();
  const { state, dispatch } = useContext(Store);
  const {
    cart: { cartItems },
  } = state;

  const addToCartHandler = async (product) => {
    const existItem = cartItems.find((item) => item._id === product._id);
    const quantity = existItem ? existItem.quantity + 1 : 1;
    const { data } = await axios.get(`/api/products/${product._id}`);
    if (data.countInStock < quantity) {
      window.alert('Sorry. Product is out of stock');
      return;
    }
    dispatch({
      type: 'CART_ADD_ITEM',
      payload: { ...product, quantity },
    });
    router.push('/cart');
  };
  return (
    <Layout>
      <div>
        <h1>Products</h1>
        <Grid container spacing={3}>
          {products.map((product) => (
            <Grid item md={4} key={product.name}>
              <Card>
                <NextLink href={`/product/${product.slug}`} passHref>
                  <CardActionArea>
                    <CardMedia
                      component="img"
                      image={product.image}
                      title={product.name}
                    ></CardMedia>
                    <CardContent>
                      <Typography>{product.name}</Typography>
                    </CardContent>
                    <CardActions>
                      <Typography>${product.price}</Typography>
                      <Button
                        size="small"
                        color="primary"
                        onClick={() => addToCartHandler(product)}
                      >
                        Add to cart
                      </Button>
                    </CardActions>
                  </CardActionArea>
                </NextLink>
              </Card>
            </Grid>
          ))}
        </Grid>
      </div>
    </Layout>
  );
}

export async function getServerSideProps() {
  await db.connect();
  const products = await Product.find({}).lean();
  await db.disconnect();

  return { props: { products: products.map(db.convertDocToObj) } };
}
