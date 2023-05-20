import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import styled from "styled-components";
import Announcement from "../components/Announcement";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { userRequest } from "../requestMethods";
import { mobile } from "../responsive";
import { clearCart } from "../redux/cartRedux";

const Container = styled.div``;

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`;
const OrderDetail = styled.div`
  display: flex;
  padding: 10px;
`;

const Product = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 10px 0px;
  ${mobile({ flexDirection: "column" })};
`;
const ProductDetail = styled.div`
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
const ProductQuantity = styled.span``;
const ProductColorDisplay = styled.div`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: ${(props) => props.color};
  border: 2px solid black;
  margin-top: 5px;
`;
const ProductSize = styled.span``;

const Hr = styled.hr`
  background-color: #eee;
  border: none;
  height: 1px;
`;

const Button = styled.button`
    margin-top: 20px;
    padding: 10px;
`;


const Success = () => {
  const location = useLocation();
  const data = location.state;
  const cart = location.state.cart;
  const dispatch = useDispatch();

  const currentUser = useSelector((state) => state.user.currentUser)
  const [orderId, setOrderId] = useState(null);

  useEffect(()=> {
    const createOrder = async () => {
      try {
        const res = await userRequest.post("/orders", {
          userId: currentUser._id,
          stripeId: data.id,
          products: cart.products.map((item) => ({
            _id: item._id,
            quantity: item._quantity,
          })),
          amount: cart.total,
          address: data.billing_details.address,
        });
        setOrderId(res.data._id);
      } catch { }
    };
    data && createOrder();
    dispatch(clearCart());
  },[data,cart,currentUser,dispatch])

  return (
    <Container>
    <Navbar/>
    <Announcement/>
    <Wrapper>
        {orderId ? 
          <OrderDetail>
            Order has been created successfully. Your order number is {orderId}
          </OrderDetail>
            : 
            <OrderDetail>
            Successful. Your order is being prepared...
            </OrderDetail>
        }
            
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
                    <ProductQuantity>
                      <b>Quantity:</b> {product.quantity}
                    </ProductQuantity>
                  </Details>
                </ProductDetail>
                <Hr />
                </Product>
        ))}
        <Link to={"/"}>
        <Button>Go to Homepage</Button>
        </Link>
    </Wrapper>
    <Footer/>
    </Container>
  );
};

export default Success;