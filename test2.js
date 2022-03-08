var grid = [
	['#','.','.','.','N','.','.','.','.','.','.','.','E','.',],
	['.','.','.','.','.','.','.','A','.','.','#','S','.','N',],
	['.','.','.','.','.','.','.','#','.','#','.','.','#','S',],
	['.','#','.','.','.','.','.','.','.','.','.','.','.','.',],
	['.','.','E','.','.','#','.','.','.','.','.','#','.','.',],
	['#','.','.','.','.','.','.','N','.','.','.','.','.','.',],
	['.','.','.','.','E','.','.','.','E','.','.','.','.','.',],
	['.','.','.','#','.','#','.','#','.','.','.','.','.','.',],
	['.','#','.','.','.','.','.','.','.','.','#','.','#','.',],
	['.','.','#','#','.','.','.','.','#','.','.','.','B','.',],
	['#','.','.','.','.','.','.','#','.','.','.','.','.','.',],
	['.','.','.','.','.','.','.','.','.','.','.','.','.','.',],
	['.','.','.','.','.','.','#','#','.','.','.','.','.','.',],
	['.','.','N','.','.','.','.','.','.','N','#','.','.','.',]
]

var start = [1, 7]
var finish = [9, 12]

var routeSteps = []
var routeBattles = 0
var ok = true

var coordinates = []
var relationsData = []

var maxValues = []

function firstStep(map, position) {
	routing("up", map, position, 0)
	routing("down", map, position, 0)
	routing("left", map, position, 0)
	routing("right", map, position, 0)
}


function routing(to, map, position, level) {
	let movement = limits(position[0], position[1], to, map)

	if (movement.ans == "行ける") {
		if (map[movement.x][movement.y] == "." || map[movement.x][movement.y] == "B") {
			if (map[movement.x][movement.y] == "B") {
				ok = false
			} else {
				map[movement.x][movement.y] = level + 1
			}
		}
	}
}

function goToA(map, position, finish, level) {

	if (position[0] == finish[0] && position[1] == finish[1]) {
		return
	}

	level--

	reverse("up", map, position, finish, level)
	reverse("down", map, position, finish, level)
	reverse("left", map, position, finish, level)
	reverse("right", map, position, finish, level)
}

function reverse(to, map, position, finish, level) {
	let movement = limits(position[0], position[1], to, map)

	if (movement.ans == "行ける") {
		if (map[movement.x][movement.y] == level && map[movement.x][movement.y] != "A") {
			let newPosition = [movement.x, movement.y]
			map[movement.x][movement.y] = "T"
			goToA(map, newPosition, finish, level)
		}
	}
}

function lookingAround(to, map, position, battles) {


	// Look to up
	if (to == "up" && position[0] - 1 >= 0) {

		for(var i = 1; position[0] - i >= 0; i++) {

			if ((map[position[0] - i][position[1]]) == "#" || 
				(map[position[0] - i][position[1]]) == "N" || 
				(map[position[0] - i][position[1]]) == "E" || 
				(map[position[0] - i][position[1]]) == "W" ||
				(map[position[0] - i][position[1]]) == "A" ||
				(map[position[0] - i][position[1]]) == "B") {
				break
			}

			if ((map[position[0] - i][position[1]]) == "S") {
				battles = battles + 1
				break
			}

		}
	}

	// Look to down
	if (to == "down" && position[0] + 1 < grid.length) {

		for(var i = 1; position[0] + i < grid.length; i++) {

			if ((map[position[0] + i][position[1]]) == "#" || 
				(map[position[0] + i][position[1]]) == "S" || 
				(map[position[0] + i][position[1]]) == "E" || 
				(map[position[0] + i][position[1]]) == "W" ||
				(map[position[0] + i][position[1]]) == "A" ||
				(map[position[0] + i][position[1]]) == "B") {
				break
			}

			if ((map[position[0] + i][position[1]]) == "N") {
				battles = battles + 1
				break
			}

		}

	}

	// Look to left
	if (to == "left" && position[1] - 1 >= 0) {

		for(var i = 1; position[1] - i >= 0; i++) {

			if ((map[position[0]][position[1] - i]) == "#" || 
				(map[position[0]][position[1] - i]) == "S" || 
				(map[position[0]][position[1] - i]) == "N" || 
				(map[position[0]][position[1] - i]) == "W" ||
				(map[position[0]][position[1] - i]) == "A" ||
				(map[position[0]][position[1] - i]) == "B") {
				break
			}

			if ((map[position[0]][position[1] - i]) == "E") {
				battles = battles + 1
				break
			}

		}
	}

	// Look to right
	if (to == "right" && position[1] + 1 < grid[0].length) {

		for(var i = 1; position[1] + i < grid[0].length; i++) {

			if ((map[position[0]][position[1] + i]) == "#" || 
				(map[position[0]][position[1] + i]) == "S" || 
				(map[position[0]][position[1] + i]) == "N" || 
				(map[position[0]][position[1] + i]) == "E" ||
				(map[position[0]][position[1] + i]) == "A" ||
				(map[position[0]][position[1] + i]) == "B") {
				break
			}

			if ((map[position[0]][position[1] + i]) == "W") {
				battles = battles + 1
				break
			}

		}
	}

	return battles
}

function limits(x, y, to, map) {
	let ans = "行けない"

	if (to == "up" && x - 1 >= 0) {
		x = x - 1
		y = y
		ans = "行ける"
	}

	if (to == "down" && x + 1 < map.length) {
		x = x + 1
		y = y
		ans = "行ける"
	}

	if (to == "left" && y - 1 >= 0) {
		x = x
		y = y - 1
		ans = "行ける"
	}

	if (to == "right" && y + 1 < map[0].length) {
		x = x
		y = y + 1
		ans = "行ける"
	}
	return {x, y, ans}
}

function expansion(map, level) {

	while(ok) {

		for(var i = 0; i < map.length; i++) {
			for(var j = 0; j < map[i].length; j++) {
				if (map[i][j] == level) {
					routing("up", map, [i, j], level)
					routing("down", map, [i, j], level)
					routing("left", map, [i, j], level)
					routing("right", map, [i, j], level)
				} else {
					continue
				}
			}
		}
		level++
		routeSteps = level
	}
}

function nextToB(start, finish) {

	let steps = 0

	let differenceX = Math.abs(start[1] - finish[1])
	let differenceY = Math.abs(start[0] - finish[0])

	if((differenceY == 0 && differenceX == 1) || (differenceY == 1 && differenceX == 0)) {
		steps = 1
	}
	return steps
}

// Nueva funcion
function coordinatesOfT() {

	for(var i = 0; i < grid.length; i++) {
			for(var j = 0; j < grid[i].length; j++) {
				if (grid[i][j] == "T") {
					coordinates.push([[i,j]])
				}
			}
		}

}

function relations(array, finish) {

	var relationsIndex = 0

	while(array.length > 1) {

		relationsData.push([array[0][0]])

		for(var i = 1; i < array.length; i++) {

			let differenceX = Math.abs(array[0][0][1] - array[i][0][1])
			let differenceY = Math.abs(array[0][0][0] - array[i][0][0])

			if((differenceY == 0 && differenceX == 1) || (differenceY == 1 && differenceX == 0)) {
				relationsData[relationsIndex].push(array[i][0])
			}
		}
		array.shift()

		relationsIndex++
	}

	relationsData.push([array[0][0]])
	array.shift()

}

function rating(array, map) {

	for(var i = 0; i < array.length; i++) {

		let total = 0
		let horizontalBattles = 0
		let verticalBattles = 0

		verticalBattles = lookingAround("up", map, [array[i][0][0],array[i][0][1]], verticalBattles)
		verticalBattles = lookingAround("down", map, [array[i][0][0],array[i][0][1]], verticalBattles)
		horizontalBattles = lookingAround("left", map, [array[i][0][0],array[i][0][1]], horizontalBattles)
		horizontalBattles = lookingAround("right", map, [array[i][0][0],array[i][0][1]], horizontalBattles)

		total = total + verticalBattles + horizontalBattles

		array[i][0].push(["V: " + verticalBattles, "H: " + horizontalBattles, "Total: " + total])

		for(var j = 1; j < array[i].length; j++) {

			let differenceX = Math.abs(array[i][0][1] - array[i][j][1])
			let differenceY = Math.abs(array[i][0][0] - array[i][j][0])

			if((differenceY == 0 && differenceX == 1)) {
				verticalBattles = lookingAround("up", map, [array[i][j][0],array[i][j][1]], verticalBattles)
				verticalBattles = lookingAround("down", map, [array[i][j][0],array[i][j][1]], verticalBattles)
				array[i][j]["V"] = verticalBattles
				
				array[i][j]["Total: "] = total
			}

			if((differenceY == 1 && differenceX == 0)) {
				horizontalBattles = lookingAround("left", map, [array[i][j][0],array[i][j][1]], horizontalBattles)
				horizontalBattles = lookingAround("right", map, [array[i][j][0],array[i][j][1]], horizontalBattles)
				array[i][j]["H"] = horizontalBattles

				array[i][j]["Total: "] = total
			}

		}
		
	}
}

	routeSteps = nextToB(start, finish)

if (routeSteps != 1) {
	firstStep(grid, start)
	expansion(grid, 1)
	goToA(grid, finish, start, routeSteps) 
	//routeBattles = countingBattles(grid)
	//console.log(grid)
	console.log(routeSteps)
}

coordinatesOfT()
//console.log(coordinates)

relations(coordinates, finish)

console.log(relationsData)
console.log(coordinates)

rating(relationsData,grid)