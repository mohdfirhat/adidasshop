import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import Navbar from "../components/Navbar";
import { register } from "../redux/apiCalls";
import { mobile } from "../responsive";

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background: linear-gradient(
      rgba(255, 255, 255, 0.5),
      rgba(255, 255, 255, 0.5)
    ),
    url("https://firebasestorage.googleapis.com/v0/b/shop-9f780.appspot.com/o/registerpage.jpeg?alt=media&token=d3256da1-353b-459d-b22c-25c8e6f6e1f2");

  display: flex;
  align-items: center;
  justify-content: center;
`;
const Wrapper = styled.div`
  width: 30%;
  padding: 20px;
  background-color: white;
  ${mobile({ width: "75%" })};
`;
const Title = styled.h1`
  font-size: 24px;
  font-weight: 300;
`;
const Form = styled.form`
  display: flex;
  flex-wrap: wrap;
`;
const Input = styled.input`
  flex: 1;
  min-width: 60%;
  margin: 20px 10px 0px 0px;
  padding: 10px;
`;
const Agreement = styled.span`
  font-size: 12px;
  margin: 20px 0px;
`;
const ErrorMsg = styled.span`
  font-size: 12px;
  margin: 20px 0px;
`;
const Button = styled.button`
  width: 40%;
  border: none;
  padding: 15px 20px;
  background-color: black;
  color: white;
  cursor: pointer;
  &:disabled {
    color: green;
    cursor: not-allowed;
  }
`;

const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const { isRegistering, registerError } = useSelector((state) => state.user);

  const handleClick = (e) => {
    e.preventDefault();
    register(dispatch, { username, email, password });
  };

  return (
    <div>
      <Navbar />
      <Container>
        <Wrapper>
          <Title>CREATE AN ACCOUNT</Title>
          <Form>
            <Input
              placeholder="Username"
              onChange={(e) => setUsername(e.target.value)}
            />
            <Input
              placeholder="Email"
              onChange={(e) => setEmail(e.target.value)}
            />
            <Input
              placeholder="Password"
              type="password"
              onChange={(e) => setPassword(e.target.value)}
            />
            {registerError && (
              <ErrorMsg>There is an error please try again.</ErrorMsg>
            )}
            <Agreement>
              By creating an account, I consent to the processing of my presonal
              data in arrordance with the <b>PRIVACY POLICY</b>
            </Agreement>
            <Button onClick={handleClick} disabled={isRegistering}>
              CREATE
            </Button>
          </Form>
        </Wrapper>
      </Container>
    </div>
  );
};

export default Register;
