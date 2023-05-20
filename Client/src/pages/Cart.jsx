import { Add, Remove, Delete } from "@mui/icons-material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { mobile } from "../responsive";
import StripeCheckout from "react-stripe-checkout";
import { userRequest } from "../requestMethods";
import { useNavigate } from "react-router-dom";
import { removeCartItem , reduceCartQuantity , addCartQuantity} from "../redux/cartRedux";
import Announcement from "../components/Announcement";

const KEY = process.env.REACT_APP_STRIPE;

const Container = styled.div``;
const Wrapper = styled.div`
  padding: 20px;
  ${mobile({ padding: "10px" })};
`;
const Title = styled.h1`
  font-weight: 300;
  text-align: center;
`;
const Top = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px;
`;
const TopButton = styled.button`
  padding: 10px;
  font-weight: 600;
  cursor: pointer;
  border: ${(props) => props.type === "filled" && "none"};
  background-color: ${(props) =>
    props.type === "filled" ? "black" : "transparent"};
  color: ${(props) => props.type === "filled" && "white"};
  &:disabled {
    background: grey;
    color: red;
    cursor: not-allowed;
  }
`;

const TopTexts = styled.div`
  ${mobile({ display: "none" })};
`;
const TopText = styled.span`
  text-decoration: underline;
  cursor: pointer;
  margin: 0px 10px;
`;

const Bottom = styled.div`
  display: flex;
  justify-content: space-between;
  ${mobile({ flexDirection: "column" })};
`;

const Info = styled.div`
  flex: 3;
`;
const Product = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 10px 0px;
  ${mobile({ flexDirection: "column" })};
`;
const ProductDetail = styled.div`
  flex: 2;
  display: flex;
`;
const Image = styled.img`
  width: 200px;
`;
const Details = styled.div`
  flex: 1;
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;
const ProductName = styled.span``;
const ProductId = styled.span``;
const ProductColor = styled.span``;
const ProductColorDisplay = styled.div`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: ${(props) => props.color};
  border: 2px solid black;
  margin-top: 5px;
`;
const ProductSize = styled.span``;
const PriceDetail = styled.span`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
const ProductAmountContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
`;
const DeleteButton = styled.button`
  background-color: white;
`;

const ProductAmount = styled.div`
  font-size: 24px;
  margin: 5px;
  ${mobile({ margin: "5px 15px" })};
`;
const ProductPrice = styled.div`
  font-size: 30px;
  font-weight: 200;
  ${mobile({ marginBottom: "20px" })};
`;
const Hr = styled.hr`
  background-color: #eee;
  border: none;
  height: 1px;
`;
const Summary = styled.div`
  flex: 1;
  border: 0.5px solid lightgray;
  border-radius: 10px;
  padding: 20px;
  height: 50vh;
`;

const SummaryTitle = styled.h1`
  font-weight: 200;
`;
const SummaryItem = styled.div`
  margin: 30px 0px;
  display: flex;
  justify-content: space-between;
  font-weight: ${(props) => props.type === "total" && "500"};
  font-size: ${(props) => props.type === "total" && "24px"};
`;
const SummaryItemText = styled.span``;
const SummaryItemPrice = styled.span``;
const Button = styled.button`
  width: 100%;
  padding: 10px;
  background: black;
  color: white;
  font-weight: 600;
  cursor: pointer;
  &:disabled {
    background: grey;
    color: red;
    cursor: not-allowed;
  }
`;
const QuantButton = styled.button`
  width: 100%;
  padding: 0px;
  background: black;
  color: white;
  font-weight: 600;
  cursor: pointer;
  &:disabled {
    background: white;
    color: red;
    cursor: not-allowed;
  }
`;

const Cart = () => {
  const cart = useSelector((state) => state.cart);
  const { currentUser } = useSelector((state) => state.user);
  const [stripeToken, setStripeToken] = useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onToken = (token) => {
    setStripeToken(token);
  };


  useEffect(() => {
    const makeRequest = async () => {
      try {
        const res = await userRequest.post("/checkout/payment", {
          tokenId: stripeToken.id,
          amount: cart.total * 100,
        });
        navigate("/success", { state: { ...res.data , cart }});
      } catch {}
    };
    stripeToken && makeRequest();
  }, [stripeToken, cart, cart.total, navigate]);

  return (
    <Container>
      <Navbar />
      <Announcement/>
      <Wrapper>
        <Title>YOUR BAG</Title>
        <Top>
          <TopButton>CONTINUE SHOPPING</TopButton>
          <TopTexts>
            <TopText>Cart ({cart.quantity})</TopText>
            <TopText>Your Wishlist (0)</TopText>
          </TopTexts>
          {currentUser ? (
            <StripeCheckout
              name="Lama Shop"
              image="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a8/Original_Adidas_logo.svg/2077px-Original_Adidas_logo.svg.png"
              billingAddress
              shippingAddress
              description={`Your total is $${cart.total}`}
              amount={cart.total * 100}
              token={onToken}
              stripeKey={KEY}>
              <TopButton type="filled">CHECKOUT NOW</TopButton>
            </StripeCheckout>
          ) : (
            <TopButton type="filled" disabled>
              LOGIN TO ENABLE CHECKOUT
            </TopButton>
          )}
        </Top>
        <Bottom>
          <Info>
            {cart.products.map((product) => (
              <Product key={product._id + product.color + product.size}>
                <ProductDetail>
                  <Image src={product.img} />
                  <Details>
                    <ProductName>
                      <b>Product:</b> {product.title}
                    </ProductName>
                    <ProductId>
                      <b>ID:</b> {product._id}
                    </ProductId>
                    <ProductColor>
                      <b>Color: </b>
                      <ProductColorDisplay color={product.color} />
                    </ProductColor>
                    <ProductSize>
                      <b>Size: </b> {product.size}
                    </ProductSize>
                  </Details>
                </ProductDetail>
                <PriceDetail>
                  <DeleteButton
                    onClick={() => dispatch(removeCartItem(product))}>
                    <Delete />
                  </DeleteButton>
                  <ProductAmountContainer>
                    <QuantButton disabled={product.quantity ===1} onClick={() => dispatch(reduceCartQuantity(product))}>
                      <Remove />
                    </QuantButton>
                    <ProductAmount>{product.quantity}</ProductAmount>
                    <QuantButton onClick={() => dispatch(addCartQuantity(product))}>
                      <Add />
                    </QuantButton>
                  </ProductAmountContainer>
                  <ProductPrice>
                    ${product.price * product.quantity}
                  </ProductPrice>
                </PriceDetail>
              </Product>
            ))}
            <Hr />
          </Info>
          <Summary>
            <SummaryTitle>ORDER SUMMARY</SummaryTitle>
            <SummaryItem>
              <SummaryItemText>Subtotal</SummaryItemText>
              <SummaryItemPrice>${cart.total}</SummaryItemPrice>
            </SummaryItem>
            <SummaryItem>
              <SummaryItemText>Estimated Shipping</SummaryItemText>
              <SummaryItemPrice>$5.90</SummaryItemPrice>
            </SummaryItem>
            <SummaryItem>
              <SummaryItemText>Discount</SummaryItemText>
              <SummaryItemPrice>-$5.90</SummaryItemPrice>
            </SummaryItem>
            <SummaryItem type="total">
              <SummaryItemText>Total</SummaryItemText>
              <SummaryItemPrice>${cart.total}</SummaryItemPrice>
            </SummaryItem>
            {currentUser ? (
              <StripeCheckout
                name="Adidas Shop"
                image="https://cdn-icons-png.flaticon.com/512/731/731962.png?w=1060&t=st=1684048976~exp=1684049576~hmac=0ba70ebf4ce051c179e6a5b99a2b08bd247fe31dbf59e03f03fb090a004fdc71"
                billingAddress
                shippingAddress
                currency="SGD"
                description={`Your total is $${cart.total}`}
                amount={cart.total * 100}
                token={onToken}
                stripeKey={KEY}>
                <Button>CHECKOUT NOW</Button>
              </StripeCheckout>
            ) : (
              <>
                <Button disabled>LOGIN TO ENABLE CHECKOUT</Button>
              </>
            )}
          </Summary>
        </Bottom>
      </Wrapper>
      <Footer />
    </Container>
  );
};

export default Cart;
