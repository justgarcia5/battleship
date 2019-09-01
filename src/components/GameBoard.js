import React from 'react';

class GameBoard extends React.Component {
  state = {
    spaces: [],
    alert: null,
    player1: false,
    player2: false,
    playerTurn: '',
    playerPicks: [],
  }

  click = (event) => {
    let { player1, player2, playerTurn, playerPicks } = this.state
    let player1turn = player1 === true ? false : true
    if(player1turn === true) {
      player2 = false
      playerTurn = "Player 1 clicked"
      playerPicks.push(event.target.id)
    } else {
      player2 = true
      playerTurn = "Player 2 clicked"
      playerPicks.push(event.target.id)
    }
    console.log(event.target.id)
    this.setState({
      player1: player1turn,
      player2: player2,
      playerTurn: playerTurn
    })
  }

  componentDidMount = () => {
    this.spacesGenerator()
  }

  spacesGenerator = () => {
    let { spaces } = this.state
    let tile = ''
    spaces.push(tile)
    this.setState({ spaces: spaces})
  }

  render() {
    let { spaces } = this.state
    let squares = spaces.map((value, index) => {
      return(
        <div className='tiles' key={index} id={index}>{value}</div>
      )
    })

    console.log(this.state.playerTurn, this.state.playerPicks)

    return (
      <div>
        <div>{this.state.alert}</div>
        <div className='grid' onClick={this.click.bind(this)}>{squares}</div>
      </div>
    );
  }
}

export default GameBoard;
