import { KeyboardArrowLeftOutlined, KeyboardArrowRightOutlined } from '@mui/icons-material';
import React, { useState } from 'react'
import styled from "styled-components";
import { sliderItem } from '../data';
import {mobile} from '../responsive';

const Container = styled.div `
  width:100%;
  height:100vh;
  display: flex;
  background-color: #bbbbbb;
  position: relative;
  overflow: hidden;
  ${mobile({display:'none'})};
`
const Arrow = styled.div `
  width: 50px;
  height: 50px;
  display : flex;
  justify-content: center;
  position: absolute;
  top:50%;
  margin:auto;
  cursor: pointer;
  left: ${(props) => props.direction === 'left' && '10px'};
  right: ${(props) => props.direction === 'right' && '10px'};
  opacity: 50%;
  z-index: 2;
`

const Wrapper = styled.div `
  height: 100%;
  display: flex;
  transition: all 1.5s ease;
  transform:translateX(${props=>props.slideIndex * -100}vw);
`
const Slide = styled.div`
width: 100vw;
height: 100vh;
display: flex;
align-items: center;
background-color: #${props=>props.bg};
`

const ImageContainer = styled.div`
flex:1;
height: 100%;
`

const Image = styled.img`
height: 80%;
`

const InfoContainer = styled.div`
flex:1;
padding: 50px;
`
const Title = styled.h1 `
  font-size: 70px;
`
const Desc = styled.p `
  margin: 50px 0px;
  font-size: 20px;
  font-weight: 500;
  letter-spacing: 3px;
`
const Button = styled.button `
  padding: 10px;
  font-size: 20px;
  background-color: transparent;
  cursor: pointer;
`



const Slider = () => {
  const [slideIndex,setSlideIndex] = useState(0);
  const handleClick = (direction) => {
  if (direction==='left') {
    setSlideIndex(slideIndex > 0 ? slideIndex -1 : 2);
  } else {
    setSlideIndex(slideIndex < 2 ? slideIndex +1 : 0);
  }
  };

  return (
    <Container>
      <Arrow direction='left' onClick={()=>handleClick("left")}>
        <KeyboardArrowLeftOutlined fontSize='large'/>
      </Arrow>
      <Wrapper slideIndex={slideIndex}>
        {sliderItem.map((item)=>(
          <Slide bg={item.bg} key={item.id}>
          <ImageContainer>
            <Image src={item.img} />
          </ImageContainer>
          <InfoContainer>
            <Title>{item.title}</Title>
            <Desc>{item.desc}</Desc>
            <Button>SHOP NOW</Button>
          </InfoContainer>
        </Slide>
        ))}
      </Wrapper>
      <Arrow direction='right' onClick={()=>handleClick("right")}>
        <KeyboardArrowRightOutlined fontSize='large'/>
      </Arrow>
    </Container>
  )
}

export default Slider
