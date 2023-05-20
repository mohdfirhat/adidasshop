import styled from "@emotion/styled";
import {
  Facebook,
  Instagram,
  MailOutline,
  Phone,
  Pinterest,
  Room,
  Twitter,
} from "@mui/icons-material";
import React from "react";
import { Link } from "react-router-dom";
import { mobile } from "../responsive";

const Container = styled.div`
  display: flex;
  ${mobile({ flexDirection: "column" })};
`;
const Left = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  padding: 20px;
  margin: 20px 0px;
  padding: 20px;
`;
const Center = styled.div`
  flex: 1;
  padding: 20px;
  ${mobile({ display: "none" })};
`;
const Title = styled.h3`
  margin-bottom: 30px;
`;
const List = styled.ul`
  margin: 0;
  padding: 0;
  list-style: none;
  display: flex;
  flex-wrap: wrap;
`;
const ListItem = styled.li`
  width: 50%;
  margin-bottom: 10px;
`;
const Right = styled.div`
  flex: 1;
  padding: 20px;
`;
const ContactItem = styled.p`
  margin-bottom: 20px;
  display: flex;
  align-items: center;
`;
const Payment = styled.img`
  width: 80%;
`;

const Logo = styled.h1``;
const Desc = styled.p`
  margin: 20px 0px;
`;
const SocialContainer = styled.div`
  display: flex;
`;
const SocialIcon = styled.div`
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Footer = () => {
  return (
    <Container>
      <Left>
        <Logo>adidas</Logo>
        <Desc>The brand with three strips.</Desc>
        <SocialContainer>
          <SocialIcon>
            <Facebook />
          </SocialIcon>
          <SocialIcon>
            <Instagram />
          </SocialIcon>
          <SocialIcon>
            <Twitter />
          </SocialIcon>
          <SocialIcon>
            <Pinterest />
          </SocialIcon>
        </SocialContainer>
      </Left>
      <Center>
        <Title>Useful Links</Title>
        <List>
          <ListItem><Link to={"/"} style={{ textDecoration: "none", color: "black" }}>Home</Link></ListItem>
          <ListItem><Link to={"/cart"} style={{ textDecoration: "none", color: "black" }}>Cart</Link></ListItem>
          <ListItem><Link to={"/products/men"} style={{ textDecoration: "none", color: "black" }}>Men Fashion</Link></ListItem>
          <ListItem><Link to={"/products/woman"} style={{ textDecoration: "none", color: "black" }}>Woman Fashion</Link></ListItem>
          <ListItem>Wishlist</ListItem>
          <ListItem>Terms</ListItem>
        </List>
      </Center>
      <Right>
        <Title>Contact</Title>
        <ContactItem>
          <Room style={{ marginRight: "0px" }} />
          622 Dixie Path , South Tobinchester 98336
        </ContactItem>
        <ContactItem>
          <Phone style={{ marginRight: "0px" }} />
          +1 234 5678
        </ContactItem>
        <ContactItem>
          <MailOutline style={{ marginRight: "0px" }} />
          contact@notadidas.com
        </ContactItem>
        <Payment src="https://user-images.githubusercontent.com/52581/44384465-5e312780-a570-11e8-9336-7b54978a9e64.png" />
      </Right>
    </Container>
  );
};

export default Footer;
