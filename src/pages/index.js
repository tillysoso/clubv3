import React from 'react'
import Link from 'gatsby-link'
import Card from '../components/Card'
import Section from '../components/Section'
import Wave from '../components/Wave'
import staticdata from '../../staticdata.json'
import Cell from '../components/Cell'
import styled from 'styled-components'

const SectionCaption = styled.p`
font-weight: 600;
font-size: 18px;
text-transform: uppercase;
color: white;
text-align: center;
`

const SectionCellGroup = styled.div`
max-width: 800px;
margin: 0 auto 100px;
display: grid;
grid-template-columns: repeat (2, 1fr);
grid-column-gap: 20px;
padding: 0 20px;

@media (max-width: 800px) {
  grid-template-columns: repeat(1,1fr);
}


`

const IndexPage = () => (
  <div>
    <div className="Hero">
      <div className="HeroGroup">
        <h1>Why are you here?</h1>
        <p>virtual bedroom island? <br />irl me companion guide?!<br />LOOT MY TREASURES!!??<br />idc. cos im glad you're here.</p>
        <Link to="/page-2/">Go to page 2</Link>
      </div>
      <Wave />
    </div>
    <div className="Cards">
      <h2>11 courses, more coming</h2>
      <div className="CardGroup">
        <Card
          title="STICKY"
          text="Yummy"
          image={require('../images/card2.png')} />
        <Card
          title="LOVE"
          text="Bunnies"
          image={require('../images/wallpaper.jpg')} />
        <Card
          title="PAYMENT"
          text="Nerds"
          image={require('../images/card.png')} />
        <Card
          title="MAGIC"
          text="Treasures"
          image={require('../images/hero-wallpaper.jpg')} />
      </div>
    </div>
    <Section
      image={require('../images/card.png')}
      logo={require('../images/react_logo.png')}
      title="Love ya"
      text="You are a dirty boy and I love it. You're  guy of the streets and it makes me wet. You're just kind of a boy slut junkie and I can't get enough of you. Kiss my feet"
    />
    <SectionCaption>12 sections - 6 hrs</SectionCaption>
    <SectionCellGroup>
      {staticdata.cells.map(cell => (
        <Cell
          title={cell.title}
          image={cell.image} />
      ))}
    </SectionCellGroup>
  </div>
)

export default IndexPage
