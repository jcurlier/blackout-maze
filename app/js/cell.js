
function Cell(x, y,north,west,south,east)
{
  this.x = x;
  this.y = y;
  if (north) this.north = north; else this.north = SIDE.UNKNOWN;
  if (west) this.west = west; else this.west = SIDE.UNKNOWN;
  if (south) this.south = south; else this.south = SIDE.UNKNOWN;
  if (east) this.east = east; else this.east = SIDE.UNKNOWN;
  this.northMark = MARKING.UNKNOWN;
  this.westMark = MARKING.UNKNOWN;
  this.southMark = MARKING.UNKNOWN;
  this.eastMark = MARKING.UNKNOWN;
  this.visited = false;
}
Cell.prototype.isJunction = function()
{
  var openings = 0;
  if (this.north == SIDE.OPEN) openings++;
  if (this.west == SIDE.OPEN) openings++;
  if (this.south == SIDE.OPEN) openings++;
  if (this.east == SIDE.OPEN) openings++;

  return (openings > 2);
}
Cell.prototype.hasExit = function()
{
  return (
    (this.northMark == MARKING.EXIT) ||
    (this.eastMark == MARKING.EXIT) ||
    (this.southMark == MARKING.EXIT) ||
    (this.westMark == MARKING.EXIT));
}
Cell.prototype.toString = function()
{
  return '[x=' + this.x + ',y=' + this.y
     + ',northMark=' + this.northMark.name + ',westMark=' + this.westMark.name
     + ',southMark=' + this.southMark.name + ',eastMark=' + this.eastMark.name
     + ',visited=' + this.visited + ']';
}