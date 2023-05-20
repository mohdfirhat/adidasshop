import React from "react";
import styled from "styled-components";
import { categories } from "../data";
import { CategoryItem } from "./CategoryItem";
import { mobile } from "../responsive";

export const Categories = () => {
  const Container = styled.div``;

  const Title = styled.h1`
    margin-inline-start: 50px;
  `;

  const Wrapper = styled.div`
    display: flex;
    padding: 20px;
    justify-content: space-between;
    ${mobile({ padding: "0px", flexDirection: "column" })};
  `;

  return (
    <Container>
      <Title>Popular Categories</Title>
      <Wrapper>
        {categories.map((item) => (
          <CategoryItem item={item} key={item.id} />
        ))}
      </Wrapper>
    </Container>
  );
};
