import React  from "react"
import Die from "./Components/Die"
import { nanoid } from "nanoid";
import Confetti from 'react-confetti'
function App() {
  const[diceRollCount, setDiceRollCount] = React.useState(0);
  const [dice, setDice] = React.useState(allNewDice());
  const [tenzies, setTenzies] = React.useState(false);
  
  React.useEffect(() => {
    const allHeld = dice.every(die => die.isHeld)
    const firstValue = dice[0].value
    const allSameValue = dice.every(die => die.value === firstValue)
    if (allHeld && allSameValue) {
        setTenzies(true)
    }
}, [dice])
  function genrateNewDie()
  {
    return Math.ceil(Math.random() * 6)
  }
  function allNewDice(){
    const newDice = [];

    for(let i =0 ; i<10 ; i++)
    {
      newDice.push({ 
        value: genrateNewDie(), 
        isHeld: false,
        id: nanoid()
      })
    } 

    return newDice;
  } 

  function rollDice()
  {
    setDiceRollCount((preValue)=>{
      return  preValue+1;
    })
    setDice(
      (preValue) =>{
        return preValue.map(
          (dice)=>{
            return dice.isHeld? dice : 
            {...dice, value: genrateNewDie(), 
            }
          }
        )
      }
    )
  }

  function holdDice(id)
  {
    setDice((preValue)=>{
      return preValue.map((dice)=>{
        return dice.id === id ?
        { ...dice, isHeld: !dice.isHeld } : 
        dice
      })
    })
  } 

  const diceElement = dice.map((die) => { 
    return <Die 
    key={die.id} 
    die={die} 
    holdDice={holdDice}/>
  }); 

  function newGame()
  {
    setTenzies(false);
    setDice(allNewDice())

  }
  return (
   <main>
    {diceRollCount ? <p className="roll-count">Dice Rolls: {diceRollCount}</p> : ""}
    <h1 className="title">Tenzies</h1>
    <p className="instructions">Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p>
    <div className="dice-container">
      {diceElement}
    </div>
    {!tenzies && <button className="roll-dice" onClick={rollDice}>Roll Dice</button>}
    {tenzies && <button className="roll-dice" onClick={newGame}>New Game</button>}
    {tenzies && <Confetti/>}
   </main>
  )
}

export default App
