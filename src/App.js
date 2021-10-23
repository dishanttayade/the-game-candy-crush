import { useState, useEffect } from "react"
const width = 8
const candyColors = [
  'blue',
  'green',
  'orange',
  'purple',
  'red',
  'yellows'
]

function App() {

	const [currentColorArrangement, setCurrentColorArragement] =  useState([])

	const createBoard = () => {
		const randomColorArrangement = []
		for ( let i = 0; i < width*width; i++){
			const randomnumber = Math.floor(Math.random() * candyColors.length)
			const randomColor = candyColors[randomnumber]
			randomColorArrangement.push(randomColor)
		}
		//console.log(randomColorArrangement)
		setCurrentColorArragement(randomColorArrangement)
	}
	useEffect(()=>{
		createBoard()
	}, [])
	//createBoard()
	//console.log(currentColorArrangement)

  return (
    <div>
		GOOD
		{currentColorArrangement}
    </div>
  );
}

export default App;
