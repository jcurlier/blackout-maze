
function Response(mazeGuid, note, atEnd, previouslyVisited, north, east, south, west, x, y)
{
  this.mazeGuid = mazeGuid;
  this.note = note;
  this.atEnd = atEnd;
  this.previouslyVisited = previouslyVisited;
  this.north = north;
  this.east = east;
  this.south = south;
  this.west = west;
  this.x = x;
  this.y = y;

}
Response.prototype.toString = function()
{
  return '[x=' + this.x + ',y=' + this.y
     + ',north=' + this.north + ',west=' + this.west
     + ',south=' + this.south + ',east=' + this.east
     + ',mazeGuid=' + this.mazeGuid
     + ',previouslyVisited=' + this.previouslyVisited + ']';
}