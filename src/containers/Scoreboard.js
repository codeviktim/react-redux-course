import React, { Component,propTypes } from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as PlayerActionCreators from '../actions/player';
import Player from '../components/Player';
import Header from '../components/Header';
import AddPlayerForm from '../components/AddPlayerForm';

 class Scoreboard extends Component {
     static propTypes = {
         players : propTypes.array.isRequired
     };
  render() {
       const {dispatch,players} = this.props;  //destructuring  
       const addPlayer = bindActionCreators(PlayerActionCreators.addPlayer , dispatch);
       const removePlayer = bindActionCreators(PlayerActionCreators.removePlayer,dispatch);
       const updatePlayerScore =bindActionCreators(PlayerActionCreators.updatePlayerScore,dispatch);

       //iterate on the player array to return a player component
       const playerComponents = players.map(    (player,index)=>(
           <Player 
                  index = {index}
                  name = {player.name}
                  score = {player.score}
                  key = {player.name}
                  updatePlayerScore = {updatePlayerScore
                }
                removePlayer = {removePlayer}
           />
            ));

        return (
            <div className="scoreboard">
                <Header players={players} />
                <div className="players">
                   {playerComponents}
                </div>
                <AddPlayerForm addPlayer={addPlayer} />
            </div>
        );
    }
};
  //the connect contains a method that will change state to props to components
 const mapStateToProps = state=>{
     {
         players : state
     }
 };
 export default connect(mapStateToProps)(Scoreboard);