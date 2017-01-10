
function GameManager()
{
  console.log('initializing mock game manager');
}
GameManager.prototype._initialize = function()
{
  this.solution = new Maze(5,5);
  this.solution.setCell(0,0,new Cell(0,0,SIDE.WALL, SIDE.OPEN, SIDE.WALL, SIDE.WALL));
  this.solution.setCell(0,1,new Cell(0,1,SIDE.OPEN, SIDE.OPEN, SIDE.WALL, SIDE.WALL));
  this.solution.setCell(0,2,new Cell(0,2,SIDE.OPEN, SIDE.WALL, SIDE.OPEN, SIDE.WALL));
  this.solution.setCell(0,3,new Cell(0,3,SIDE.OPEN, SIDE.WALL, SIDE.OPEN, SIDE.WALL));
  this.solution.setCell(0,4,new Cell(0,4,SIDE.WALL, SIDE.OPEN, SIDE.OPEN, SIDE.WALL));
  this.solution.setCell(1,0,new Cell(1,0,SIDE.OPEN, SIDE.WALL, SIDE.WALL, SIDE.OPEN));
  this.solution.setCell(1,1,new Cell(1,1,SIDE.WALL, SIDE.OPEN, SIDE.OPEN, SIDE.OPEN));
  this.solution.setCell(1,2,new Cell(1,2,SIDE.OPEN, SIDE.WALL, SIDE.WALL, SIDE.WALL));
  this.solution.setCell(1,3,new Cell(1,3,SIDE.OPEN, SIDE.WALL, SIDE.OPEN, SIDE.WALL));
  this.solution.setCell(1,4,new Cell(1,4,SIDE.WALL, SIDE.WALL, SIDE.OPEN, SIDE.OPEN));
  this.solution.setCell(2,0,new Cell(2,0,SIDE.WALL, SIDE.OPEN, SIDE.WALL, SIDE.WALL));
  this.solution.setCell(2,1,new Cell(2,1,SIDE.OPEN, SIDE.OPEN, SIDE.WALL, SIDE.OPEN));
  this.solution.setCell(2,2,new Cell(2,2,SIDE.OPEN, SIDE.WALL, SIDE.OPEN, SIDE.WALL));
  this.solution.setCell(2,3,new Cell(2,3,SIDE.OPEN, SIDE.WALL, SIDE.OPEN, SIDE.WALL));
  this.solution.setCell(2,4,new Cell(2,4,SIDE.OPEN, SIDE.WALL, SIDE.OPEN, SIDE.WALL));
  this.solution.setCell(3,0,new Cell(3,0,SIDE.WALL, SIDE.OPEN, SIDE.WALL, SIDE.OPEN));
  this.solution.setCell(3,1,new Cell(3,1,SIDE.OPEN, SIDE.WALL, SIDE.WALL, SIDE.OPEN));
  this.solution.setCell(3,2,new Cell(3,2,SIDE.OPEN, SIDE.OPEN, SIDE.OPEN, SIDE.WALL));
  this.solution.setCell(3,3,new Cell(3,3,SIDE.OPEN, SIDE.WALL, SIDE.OPEN, SIDE.WALL));
  this.solution.setCell(3,4,new Cell(3,4,SIDE.WALL, SIDE.OPEN, SIDE.OPEN, SIDE.WALL));
  this.solution.setCell(4,0,new Cell(4,0,SIDE.OPEN, SIDE.WALL, SIDE.WALL, SIDE.OPEN));
  this.solution.setCell(4,1,new Cell(4,1,SIDE.OPEN, SIDE.WALL, SIDE.OPEN, SIDE.WALL));
  this.solution.setCell(4,2,new Cell(4,2,SIDE.WALL, SIDE.WALL, SIDE.OPEN, SIDE.OPEN));
  this.solution.setCell(4,3,new Cell(4,3,SIDE.OPEN, SIDE.WALL, SIDE.WALL, SIDE.WALL));
  this.solution.setCell(4,4,new Cell(4,4,SIDE.WALL, SIDE.WALL, SIDE.OPEN, SIDE.OPEN));

  this.start = this.solution.getCell(2,0);
  this.end = this.solution.getCell(2,4);
  this.current = this.start;
  this.guid = "GUID";
}
GameManager.prototype._buildResponse = function()
{
  var mazeGuid = this.guid;
  var atEnd = this.current == this.end;
  var note = '';
  if (atEnd) note = 'WINNER';;
  var previouslyVisited = false; // NOT SET
  var north = 'BLOCKED';
  if (this.current.north == SIDE.OPEN) north = 'OPEN';
  var east = 'BLOCKED';
  if (this.current.east == SIDE.OPEN) east = 'OPEN';
  var west = 'BLOCKED';
  if (this.current.west == SIDE.OPEN) west = 'OPEN';
  var south = 'BLOCKED';
  if (this.current.south == SIDE.OPEN) south = 'OPEN';
  var x = this.current.x;
  var y = this.current.y;

  return new Response(mazeGuid, note, atEnd, previouslyVisited, north, east, south, west, x, y);
}
GameManager.prototype.getWidth = function()
{
  return this.solution.getWidth();
}
GameManager.prototype.getHeight = function()
{
  return this.solution.getHeight();
}
GameManager.prototype.draw = function(id)
{
  this.solution.draw(id,this.current,this.start,this.end);
}
GameManager.prototype.init = function(x,y)
{
  this._initialize();
  return this._buildResponse();
}
GameManager.prototype.move = function(direction)
{
  switch (direction.value)
  {
    case DIRECTION.NORTH.value:
      this.current = this.solution.getCell(this.current.x, this.current.y + 1);
      break;
    case DIRECTION.WEST.value:
      this.current = this.solution.getCell(this.current.x + 1, this.current.y);
      break;
    case DIRECTION.SOUTH.value:
      this.current = this.solution.getCell(this.current.x, this.current.y - 1);
      break;
    case DIRECTION.EAST.value:
      this.current = this.solution.getCell(this.current.x - 1, this.current.y);
      break;
  }
  return this._buildResponse();
}
GameManager.prototype.jump = function(x,y)
{

}
