var gameManager = null;
var response = null;
var maze = null;
var start = null;
var end = null;
var previous = null;
var current = null;

var nbr_move = 0;
var marching = MARCHING.FORWARD;
var direction = null;

window.onload = solve;

function solve() {

  console.log('initializing game manager');

  gameManager = new GameManager();
  response = gameManager.init();
  gameManager.draw('solution');

  maze = new Maze(gameManager.getWidth(),gameManager.getHeight());
  start = maze.getCell(response.x,response.y);
  current = start;

  requestAnimationFrame(loop);
}

function loop() {

  updateCellProperties(current, response);

  if (response.atEnd)
  {
    console.log('(' + current.x + ',' + current.y + ') we are DONE the note is ' + response.note);
    end = current;
    maze.draw('maze', current, start, end);
    setTimeout(function() { alert(response.note); }, 1000);
    return;
  }

  console.log('current ' + current.toString());
  maze.draw('maze', current, start, end);

  if (current.isJunction())
  {
    console.log('(' + current.x + ',' + current.y + ') is a junction');

    if (marching == MARCHING.FORWARD)
    {
      if (current.visited)
      {
        console.log('(' + current.x + ',' + current.y + ') visited and marching forward');
        mark(previous, direction, MARKING.NEW);
        mark(current, oppositeDirection(direction), MARKING.NEW);

        direction = oppositeDirection(direction);
        marching = MARCHING.BACKWARD;
      }
      else
      {
        console.log('(' + current.x + ',' + current.y + ') not visited and marching forward');

        // mark X at exit
        if (current != start)
        {
          mark(previous, direction, MARKING.EXIT);
          mark(current, oppositeDirection(direction), MARKING.EXIT);
        }
        direction = selectPath(current);
        marching = MARCHING.FORWARD;
        mark(current, direction, MARKING.NEW);
      }
    }
    else
    {
      if (current == start)
      {
        alert('GIVE UP');
        return;
      }
      if (current.visited)
      {
        tmp_direction = selectPath(current);
        if (tmp_direction == null)
        {
          console.log('marching backward on a visited - chose an exited path');
          direction = selectExitPathNotPrevious(current, direction);
        }
        else
        {
          console.log('marching backward on a visited - chose a different path');
          direction = tmp_direction;
          mark(current, direction, MARKING.NEW);
          marching = MARCHING.FORWARD;
        }
      }
    }
  }
  else
  {
    console.log('(' + current.x + ',' + current.y + ') is not a junction');
    if (direction == null)
    {
      direction = selectPath(current);
    }
    else
    {
      var tmp_direction = selectAnotherPath(current, direction);
      if (tmp_direction == null)
      {
        console.log('(' + current.x + ',' + current.y + ') Dead End');
        direction = oppositeDirection(direction);
        marching = MARCHING.BACKWARD;
      }
      else
      {
        direction = tmp_direction;
      }
    }
  }

  console.log('make a move with direction ' + direction.name);

  response = gameManager.move(direction);

  previous = current;
  previous.visited = true;
  current = maze.getCell(response.x, response.y);
  combineMarking(previous, current);

  nbr_move++;
  
  if (nbr_move <= 10000) {
      requestAnimationFrame(loop);
  }
}

function selectPath(current)
{
  if (current.south != SIDE.WALL && current.southMark == MARKING.UNKNOWN) return DIRECTION.SOUTH;
  if (current.east != SIDE.WALL && current.eastMark == MARKING.UNKNOWN) return DIRECTION.EAST;
  if (current.north != SIDE.WALL && current.northMark == MARKING.UNKNOWN) return DIRECTION.NORTH;
  if (current.west != SIDE.WALL && current.westMark == MARKING.UNKNOWN) return DIRECTION.WEST;
  return null;

  alert('ERROR');
}
function selectExitPathNotPrevious(current, direction)
{
  var opposite = oppositeDirection(direction);
  
  if (current.south != SIDE.WALL && current.southMark == MARKING.EXIT && DIRECTION.SOUTH != opposite) return DIRECTION.SOUTH;
  if (current.east != SIDE.WALL && current.eastMark == MARKING.EXIT && DIRECTION.EAST != opposite) return DIRECTION.EAST;
  if (current.north != SIDE.WALL && current.northMark == MARKING.EXIT && DIRECTION.NORTH != opposite) return DIRECTION.NORTH;
  if (current.west != SIDE.WALL && current.westMark == MARKING.EXIT && DIRECTION.WEST != opposite) return DIRECTION.WEST;

  if (current.south != SIDE.WALL && current.southMark == MARKING.EXIT) return DIRECTION.SOUTH;
  if (current.east != SIDE.WALL && current.eastMark == MARKING.EXIT) return DIRECTION.EAST;
  if (current.north != SIDE.WALL && current.northMark == MARKING.EXIT) return DIRECTION.NORTH;
  if (current.west != SIDE.WALL && current.westMark == MARKING.EXIT) return DIRECTION.WEST;

  return null;
}
function selectAnotherPath(current, direction)
{
  var opposite = oppositeDirection(direction);

  if (current.north != SIDE.WALL && DIRECTION.NORTH != opposite) return DIRECTION.NORTH;
  if (current.west != SIDE.WALL && DIRECTION.WEST != opposite) return DIRECTION.WEST;
  if (current.south != SIDE.WALL && DIRECTION.SOUTH != opposite) return DIRECTION.SOUTH;
  if (current.east != SIDE.WALL && DIRECTION.EAST != opposite) return DIRECTION.EAST;
  return null;

  alert('ERROR');
}
function mark(cell, direction, marking)
{
  switch (direction.value)
  {
    case DIRECTION.NORTH.value:
      cell.northMark = marking;
      break;
    case DIRECTION.WEST.value:
      cell.westMark = marking;
      break;
    case DIRECTION.SOUTH.value:
      cell.southMark = marking;
      break;
    case DIRECTION.EAST.value:
      cell.eastMark = marking;
      break;
  }
}
function oppositeDirection(direction)
{
  switch (direction.value)
  {
    case DIRECTION.NORTH.value: return DIRECTION.SOUTH;
    case DIRECTION.WEST.value: return DIRECTION.EAST;
    case DIRECTION.SOUTH.value: return DIRECTION.NORTH;
    case DIRECTION.EAST.value: return DIRECTION.WEST;
  }

  return null;
}
function updateCellProperties(current, response)
{
  if (response.north == 'BLOCKED') current.north = SIDE.WALL; else current.north = SIDE.OPEN;
  if (response.west == 'BLOCKED') current.west = SIDE.WALL; else current.west = SIDE.OPEN;
  if (response.south == 'BLOCKED') current.south = SIDE.WALL; else current.south = SIDE.OPEN;
  if (response.east == 'BLOCKED') current.east = SIDE.WALL; else current.east = SIDE.OPEN;
}
function combineMarking(previous, current)
{
  if (previous.x == current.x && previous.y < current.y) current.northMark = previous.southMark;
  if (previous.x == current.x && previous.y > current.y) current.southMark = previous.northMark;
  if (previous.x < current.x && previous.y == current.y) current.eastMark = previous.westMark;
  if (previous.x > current.x && previous.y == current.y) current.westMark = previous.eastMark;
}