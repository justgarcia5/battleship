import React from 'react';

class GameBoard extends React.Component {
  state = {
    spaces: ['', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', ''],
    alert: null,
    player1: false,
    playerTurn: '',
    playerPicks: [],
    player1Icon: 'P1',
    player2Icon: 'P2'
  }

  userClick = (event) => {
    let squareId = parseInt(event.target.id)
    let { player1, playerTurn, playerPicks, player1Icon, player2Icon, spaces } = this.state
    let player1turn = player1 === true ? false : true
    let samePick = playerPicks.filter((pick) => pick === squareId)
    if(player1turn === true) {
      if(!samePick.includes(squareId)) {
        playerTurn = "Player 1 clicked"
        playerPicks.push(squareId)
        spaces[squareId] = player1Icon
      } else {
        player1turn = false
        playerTurn = "Player 1 clicked"
      }
    } else {
      if(!samePick.includes(squareId)) {
        playerTurn = "Player 2 clicked"
        playerPicks.push(squareId)
        spaces[squareId] = player2Icon
      } else {
        playerTurn = "Player 2 clicked"
        player1turn = true
      }
    }
    // console.log(playerTurn, squareId, samePick)
    // console.log(playerPicks)
    this.setState({
      player1: player1turn,
      playerTurn: playerTurn,
      player1Icon: player1Icon,
      player2Icon: player2Icon
    })
  }

  render() {
    let { spaces } = this.state
    let squares = spaces.map((value, index) => {
      return(
        <div className='tiles' key={index} id={index} onClick={this.userClick.bind(this)}>{value}</div>
      )
    })
    return (
      <div>
        <div>{this.state.alert}</div>
        <div className='grid'>{squares}</div>
      </div>
    );
  }
}

export default GameBoard;
