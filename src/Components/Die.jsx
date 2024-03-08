import React from "react";

export default function Die(prop){
    const style ={
        backgroundColor: prop.die.isHeld? "#59E391":"white",
    }
    return(
        <div 
            className="die"
            style={style}
            onClick={()=> prop.holdDice(prop.die.id)
         }>
            <h2>{prop.die.value}</h2>
        </div>
    )
}