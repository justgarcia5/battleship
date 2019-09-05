import React from 'react';

class GameBoard extends React.Component {
  state = {
    spaces: [],
    alert: null,
    player1: false,
    playerTurn: '',
    playerPicks: [],
    player1Icon: 'P1',
    player2Icon: 'P2',
    player1Ships: [],
    player2Ships: [],
    player2Hit: [],
    player1Hit: []
  }

  userClick = (event) => {
    let squareId = parseInt(event.target.id)
    let { player1, playerTurn, playerPicks, player1Icon, player2Icon, spaces } = this.state
    let player1turn = player1 === true ? false : true
    let samePick = playerPicks.filter((pick) => pick === squareId)
    if(player1turn === true) {
      if(!samePick.includes(squareId) && spaces[squareId] !== player2Icon) {
        playerTurn = "Player 1 clicked"
        playerPicks.push(squareId)
        this.shipHitHandler(event)
        spaces[squareId] = player1Icon
      } else {
        player1turn = false
        playerTurn = "Player 1 clicked"
      }
    } else {
      if(!samePick.includes(squareId)) {
        playerTurn = "Player 2 clicked"
        playerPicks.push(event)
        this.shipHitHandler(event)
        spaces[squareId] = player2Icon
      } else {
        playerTurn = "Player 2 clicked"
        player1turn = true
      }
    }
    // console.log(player1hit, player2hit, player2Ships)
    // console.log(playerTurn, squareId, samePick)
    // console.log(playerPicks)
    this.setState({
      player1: player1turn,
      playerTurn: playerTurn,
      player1Icon: player1Icon,
      player2Icon: player2Icon
    })
  }

  shipHitHandler = (event) => {
    let squareId = parseInt(event.target.id)
    let { player1Ships, player2Ships, player1Hit, player2Hit} = this.state
    let player1hit = player1Ships.filter((hit) => hit === squareId)
    let player2hit = player2Ships.filter((hit) => hit === squareId)
    if(player1hit === true) {
      console.log('Player1 own ship')
    } else {
      console.log('Fire')
    }

    console.log(player1Ships, player2Ships)
    console.log(player1hit, player2hit)
  }

  spacesGenerator = (item, times) => {
    let { spaces } = this.state
    for(let i = 0; i < times; i++) {
      spaces.push(item)
      this.setState({ spaces: spaces })
    }
  }

  componentDidMount = () => {
    this.spacesGenerator('', 60)
    this.getPlayerShips()
  }

  getPlayerShips = () => {
    let { player1Ships, player2Ships } = this.state
    let count = 0
    while(count <= 4) {
      let playerships = Math.floor(Math.random() * 60)
      player1Ships.push(playerships)
      count++
    }
    let count2 = 0
    while(count2 <= 4) {
      let playerships = Math.floor(Math.random() * 60)
      player2Ships.push(playerships)
      count2++
    }
    console.log(player1Ships, player2Ships)
    this.setState({
      player1Ships: player1Ships,
      player2Ships: player2Ships
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
