var routeSteps = []
var routeBattles = []
var grid = [
	["A", ".", ".", ".", "."],

	[".", "N", ".", "S", "."],

	[".", ".", ".", ".", "B"],
]
var start = [0, 0]
var finish = [2, 4]

function newMatrix(matrix) {
	let newMap = []
	for (var i = 0; i < matrix.length; i++) {
		let newElement = Array.from(matrix[i])
		newMap.push(newElement)
	}
	return newMap
}

function goToB(map, position, finish, steps, battles) {
	//console.log('Satoshi: ' + position, 'Pueblo B: ' + finish)

	if (position[0] == finish[0] && position[1] == finish[1]) {
		routeSteps.push(steps)
		routeBattles.push(battles)
		return
	}

	steps++

	let newMap = newMatrix(map)

	movingAround("up", newMap, position, finish, steps, battles)
	movingAround("down", newMap, position, finish, steps, battles)
	movingAround("left", newMap, position, finish, steps, battles)
	movingAround("right", newMap, position, finish, steps, battles)
}

function movingAround(to, map, position, finish, steps, battles) {
	let movement = limits(position[0], position[1], to, map)
	let newMap = newMatrix(map)
	let newBattles = battles

	if (movement.ans == "行ける") {
		if (map[movement.x][movement.y] == "." || map[movement.x][movement.y] == "B") {
			let newPosition = [movement.x, movement.y]
			newMap[position[0]][position[1]] = "#"

			newBattles = lookingAround("up", map, position, newBattles)
			newBattles = lookingAround("down", map, position, newBattles)
			newBattles = lookingAround("left", map, position, newBattles)
			newBattles = lookingAround("right", map, position, newBattles)

			goToB(newMap, newPosition, finish, steps, newBattles)
		}
	}
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

function lookingAround(to, map, position, battles) {
	// Look to up
	if (to == "up" && position[0] - 1 >= 0) {
		battles = map[position[0] - 1][position[1]] == "S" ? battles + 1 : battles
	}

	// Look to down
	if (to == "down" && position[0] + 1 < grid.length) {
		battles = map[position[0] + 1][position[1]] == "N" ? battles + 1 : battles
	}

	// Look to left
	if (to == "left" && position[1] - 1 >= 0) {
		battles = map[position[0]][position[1] - 1] == "E" ? battles + 1 : battles
	}

	// Look to right
	if (to == "right" && position[1] + 1 < grid[0].length) {
		battles = map[position[0]][position[1] + 1] == "W" ? battles + 1 : battles
	}

	return battles
}

function perfectPath(steps, battles) {
	let min = Math.min(...steps)
	let max = 0

	let battleIndex = []

	for (var i = 0; i < steps.length; i++) {
		if (steps[i] == min) {
			battleIndex.push(i)
		}
	}

	for (var i = 0; i < battleIndex.length; i++) {
		if (battles[battleIndex[i]] > max) {
			max = battles[battleIndex[i]]
		}
	}

	console.log(min, max)
}

goToB(grid, start, finish, 0, 0)
perfectPath(routeSteps, routeBattles)