import React from 'react'
import styled from 'styled-components'

const CellGroup = styled.div`
display: grid;
grid-template-columns: 60px auto;
grid-gap: 25px;
align-items: center;
`
const CellImage = styled.div`
  width: 60px;
  height: 60px;
  background: white;
  bordewr-radius: 10px;
  background-image: url(${props => props.image});
  background-size: 60px;
  `
const CellTitle = styled.div`
  font-size: 24px;
  bordeer-bottom: 1px solid rbga (0,0,0,0.1);
  padding: 30px;
`

const Cell = props => (
  <CellGroup>
    <CellImage image={props.image}></CellImage>
    <CellTitle>{props.title}</CellTitle>
  </CellGroup>
)

export default Cell
