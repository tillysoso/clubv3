import React from 'react'
import styled from 'styled-components'
import Wave from './Wave'
import Link from 'gatsby-link'




const SectionGroup = styled.div`
      background: url(${props => props.image});
      height:720px;
      background-size: cover;
      display: grid;
      grid-template-rows: 300px auto;
      grid-gap: 20px;
      position: relative;
      @media (max-width: 640px) {
        height: 820px;
     }
    `

const SectionLogo = styled.img`
      align-self:end;
      width: 80px;
      margin: 0 auto;
      `

const SectionTitleGroup = styled.div`
      display: grid;
      grid-template-columns: 300px auto;
      margin: 0 40px;
      grid-gap: 20px;
      grid-template-rows: auto 100%;
      @media (max-width: 720px) {
        grid - template - columns: 1fr;
      }
    `

const SectionTitle = styled.h3`
      color: black;
      font-size: 50px;
      font-family: "Climate Crisis", sans-serif;
      font-optical-sizing: auto;
      font-weight: 400;
      font-style: normal;
      font-variation-settings: "YEAR" 1979;
      margin: 0;
      line-height: 1.2;
      @media (max-width: 720px){
        font - size: 40px;
      }
    `

const SectionText = styled.p`
      color: white;
      text-shadow: 2px 2px red;
      font-weight: 300;
      font-style: normal;
     `

const WaveBottom = styled.div`
      position: absolute;
      width: 100%;
      bottom: -20px;
     `

const WaveTop = styled.div`
      position: absolute;
      width: 100%;
      top: -20px;
      transform: rotate(180deg);
     `

const Section = props => (
  <SectionGroup image={props.image}>
    <WaveTop><Wave /></WaveTop>
    <WaveBottom><Wave /></WaveBottom>
    <SectionLogo src={props.logo} />
    <SectionTitleGroup>
      <SectionTitle>{props.title} </SectionTitle>
      <SectionText>{props.text}</SectionText>
    </SectionTitleGroup>
  </SectionGroup>
)

export default Section