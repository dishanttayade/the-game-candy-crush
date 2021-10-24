import { useState, useEffect } from "react"
import BlueCandy from './images/blue-candy.png'
import YelloCandy from './images/yellow-candy.png'
import GreenCandy from './images/green-candy.png'
import RedCandy from './images/red-candy.png'
import PurpleCandy from './images/purple-candy.png'
import OrangeCandy from './images/orange-candy.png'
import blank from './images/blank.png'

const width = 8
const candyColors = [
  BlueCandy,
  GreenCandy,
  OrangeCandy,
  PurpleCandy,
  RedCandy,
  YelloCandy
]

function App() {

	const [currentColorArrangement, setCurrentColorArragement] =  useState([])
	const [squareBeingDragged, setSquareBeingDragged] = useState(null)
	const [squareBeingReplaced, setSquareBeingReplaced] = useState(null)

	const checkForColumnOfThree = () => {
		for (let i = 0; i <= 47; i++){
			const columnOfThree  = [i, i + width, i+ width * 2]
			const decidedColor = currentColorArrangement[i]
			if(columnOfThree.every(square => currentColorArrangement[square] === decidedColor)){
				columnOfThree.forEach(square => currentColorArrangement[square] = blank)
				return true
			}
		}
	}
	const checkForColumnOfFour = () => {
		for (let i = 0; i <= 39; i++){
			const columnOfFour = [i, i + width, i+ width * 2, i + width * 3]
			const decidedColor = currentColorArrangement[i]
			if(columnOfFour.every(square => currentColorArrangement[square] === decidedColor)){
				columnOfFour.forEach(square => currentColorArrangement[square] = blank)
				return true
			}
		}
	}
	const checkForRowOfFour = () => {
		for (let i = 0; i < 64; i++){
			const rowOfFour = [i, i + 1, i+ 2, i + 3]
			const decidedColor = currentColorArrangement[i]
			const notValid = [5, 6, 7, 13, 14, 15, 21, 22, 23, 29, 30, 31, 37, 38, 39, 45, 46,47, 53, 54, 55, 62, 63, 64]
			if (notValid.includes(i)) continue
			if(rowOfFour.every(square => currentColorArrangement[square] === decidedColor)){
				rowOfFour.forEach(square => currentColorArrangement[square] = blank)
				return true
			}
			// if(i%width>4)
			// 	i = i + 3
		}
	}
	const checkForRowOfThree = () => {
		for (let i = 0; i < 64; i++){
			const rowOfThree  = [i, i + 1, i+2]
			const decidedColor = currentColorArrangement[i]
			const notValid = [6, 7, 14, 15, 22, 23, 30, 31, 38, 39, 46,47, 54, 55, 63, 64]
			if (notValid.includes(i)) continue
			if(rowOfThree.every(square => currentColorArrangement[square] === decidedColor)){
				rowOfThree.forEach(square => currentColorArrangement[square] = blank)
				return true
			}
			// if(i%width>5)
			// 	i = i + 2
		}
	}

	const moveIntoSqaureBelow = () => {
		for(let i = 0; i <= 55; i++){
			const firstRow = [0, 1, 2, 3, 4, 5, 6, 7]
			const isFirstRow = firstRow.includes(i)

			if(isFirstRow && currentColorArrangement[i] === blank){
				let randomNumber = Math.floor(Math.random() * candyColors.length)
				currentColorArrangement[i] = candyColors[randomNumber]
			}

			if(currentColorArrangement[i + width] === blank){
				currentColorArrangement[i + width] = currentColorArrangement[i]
				currentColorArrangement[i] = blank
			}
		}
	}

	const dragStart = (e) => {
		console.log(e.target)
		console.log('drag start')
		setSquareBeingDragged(e.target)
	}
	const dragDrop = (e) => {
		console.log(e.target)
		console.log('drag drop')
		setSquareBeingReplaced(e.target)
	}
	const dragEnd = (e) => {
		// console.log(e.target)
		console.log('drag end')
		const squareBeingDraggedId = parseInt(squareBeingDragged.getAttribute('data-id'))
		const squareBeingReplacedId = parseInt(squareBeingReplaced.getAttribute('data-id'))

		currentColorArrangement[squareBeingReplacedId] = squareBeingDragged.getAttribute('src')
		currentColorArrangement[squareBeingDraggedId] = squareBeingReplaced.getAttribute('src')

		console.log('squareBeingDraggedId', squareBeingDraggedId)
		console.log('squareBeingReplacedId', squareBeingReplacedId)

		const validMoves = [
			squareBeingDraggedId - 1,
			squareBeingDraggedId - width,
			squareBeingDraggedId + 1,
			squareBeingDraggedId + width
		]

		const validMove = validMoves.includes(squareBeingReplacedId)

		const isColumnOfFour = checkForColumnOfFour()
		const isColumnOfThree = checkForColumnOfThree()
		const isRowOfFour = checkForRowOfFour()
		const isRowOfThree = checkForRowOfThree()

		if(squareBeingReplacedId && validMove && (isRowOfFour || isRowOfThree || isColumnOfFour || isColumnOfThree)){
			setSquareBeingDragged(null)
			setSquareBeingReplaced(null)
		}else{
			currentColorArrangement[squareBeingReplacedId] = squareBeingReplaced.getAttribute('src')
			currentColorArrangement[squareBeingDraggedId] = squareBeingDragged.getAttribute('src')
			setCurrentColorArragement([...currentColorArrangement])
		}

	}

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

	useEffect(()=>{
		const timer = setInterval(() =>{
			checkForColumnOfFour()
			checkForColumnOfThree()
			checkForRowOfThree()
			checkForRowOfFour()
			moveIntoSqaureBelow()
			setCurrentColorArragement([...currentColorArrangement])
		}, 150)
		return () => clearInterval(timer)
	}, [checkForColumnOfThree ,checkForColumnOfFour,checkForRowOfThree,checkForRowOfFour,moveIntoSqaureBelow ,currentColorArrangement])

  return (
    <div className="app">
		{/* GOOD
		{currentColorArrangement} */}
		<div className="game">
			{currentColorArrangement.map((candyColor, index) => (
				<img
					key={index}
					style={{backgroundColor:candyColor}}
					src={candyColor}
					alt={candyColor}
					data-id={index}
					draggable={true}
					onDragStart={dragStart}
					onDragOver={(e)=> e.preventDefault()}
					onDragEnter={(e)=> e.preventDefault()}
					onDragLeave={(e)=> e.preventDefault()}
					onDrop={dragDrop}
					onDragEnd={dragEnd}
				/>
			))}
		</div>
    </div>
  );
}

export default App;
