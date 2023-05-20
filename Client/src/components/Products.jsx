import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { mobile } from "../responsive";
import Product from "./Product";
import axios from "axios";

const Container = styled.div`
  padding: 20px;
  ${mobile({ padding: "0px" })};
`;
const Title = styled.h1`
  margin-inline-start: 50px;
`;
const Wrapper = styled.div`
  padding: 20px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  ${mobile({ padding: "0px" })};
`;
const Products = ({ cat, filters, sort }) => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);

  useEffect(() => {
    const getProducts = async () => {
      try {
        const res = await axios.get(
          cat
            ? `https://adidas-shop.herokuapp.com/api/products?category=${cat}`
            : "https://adidas-shop.herokuapp.com/api/products"
        );
        setProducts(res.data);
      } catch (err) {}
    };
    getProducts();
  }, [cat]);

  useEffect(() => {
    cat &&
      setFilteredProducts(
        products.filter((item) =>
          Object.entries(filters).every(([key, value]) =>
            item[key].includes(value)
          )
        )
      );
  }, [products, cat, filters]);

  useEffect(() => {
    if (sort === "newest") {
      setFilteredProducts((prev) =>
        [...prev].sort((a, b) => a.createdAt - b.createdAt)
      );
    } else if (sort === "asc") {
      setFilteredProducts((prev) =>
        [...prev].sort((a, b) => a.price - b.price)
      );
    } else {
      setFilteredProducts((prev) =>
        [...prev].sort((a, b) => b.price - a.price)
      );
    }
  }, [sort]);

  return (
    <Container>
      <Title>Popular Products</Title>
      <Wrapper>
        {cat
          ? filteredProducts.map((item) => (
              <Product item={item} key={item.id} />
            ))
          : products
              .slice(0, 9)
              .map((item) => <Product item={item} key={item.id} />)}
      </Wrapper>
    </Container>
  );
};

export default Products;
