import React from "react";
import styled from "styled-components";

const Container = styled.div`
  height: 30px;
  background-color: black;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  font-weight: 500;
  text-align: center;
`;

const Announcement = () => {
  return (
    <Container>
      This is a mock website intended to showcase the frontend and backend
      development of the website made by MohdFirhat. Do contact us at
      mohd.firhat@hotmail.com for enquiries.
    </Container>
  );
};

export default Announcement;
