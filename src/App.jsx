import React , {useId} from "react"
import Die from "./Components/Die"

function App() {
  const [dice, setDice] = React.useState(allNewDice());

  function allNewDice(){
    const newDice = [];
    for(let i =0 ; i<10 ; i++)
    {
      newDice.push(Math.floor(Math.random()*6)+1)
    } 
    return newDice;
  } 

  function rollDice()
  {
    setDice(allNewDice())
  }

  const diceElement = dice.map((die) => { 
    return <Die key={useId()} value={die} />
  }); 

  return (
   <main>
    <div className="dice-container">
      {diceElement}
    </div>
    <button className="roll-dice" onClick={rollDice}>Roll Dice</button>
   </main>
  )
}

export default App
