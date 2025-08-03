import React from 'react'
import Link from 'gatsby-link'
import logo from '../images/react_logo.svg'
import './Header.css'


class Header extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      hasScrolled: false
    }
  }

  componentDidMount() {
    window.addEventListener('scroll', this.handleScroll)
  }

  handleScroll = (event) => {
    const scrollTop = window.pageYOffset

    if (scrollTop > 10) {
      this.setState({ hasScrolled: true })
    } else {
      this.setState({ hasScrolled: false })
    }
  }

  render() {
    return (
      <div className={this.state.hasScrolled ? 'Header HeaderScrolled' : 'Header'} >
        <div className="HeaderGroup">
          <Link to="/"><img src={require('../images/react_logo.svg')} width="30" /></Link>
          <Link to="/cluboso"><img src={require('../images/club.png')} width="30" /></Link>
          <Link to="/treasure"><img src={require('../images/treasure.png')} width="30" /></Link>
          <Link to="/come"><img src={require('../images/hang.png')} width="30" /></Link>
        </div>
      </div>
    )
  }
}

export default Header
