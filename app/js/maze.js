
function Maze(width, height)
{
  console.log('initializing maze dimension (' + width +',' + height + ')');
  this.width = width;
  this.height = height;
  this._buildArray();
}
Maze.prototype.getWidth = function()
{
  return this.width;
}
Maze.prototype.getHeight = function()
{
  return this.height;
}
Maze.prototype.getCell = function(x,y)
{
  return this.mazeArray[x][y];
}
Maze.prototype.setCell = function(x,y,cell)
{
  this.mazeArray[x][y] = cell;
}
Maze.prototype.draw = function(id, current, start, end)
{
  var resultHtml = '<table cellspacing="0" cellpadding="0" border="0">';

  for (var j = 0; j < this.height; j++)
  {
    resultHtml = resultHtml + '<tr>';
    for (var i = this.width - 1; i >= 0; i--)
    {
      var cell = this.getCell(i,j);
      var style = this._buildCellStyle(cell);
      resultHtml = resultHtml + '<td style="height:12px; width:12px; font-size:xx-small; ' + style + '" align="center" valign="center">';
      if (cell == end) resultHtml = resultHtml + 'E';
      else if (cell == current) resultHtml = resultHtml + 'o';
      else if (cell == start) resultHtml = resultHtml + 'S';
      //else if (cell.hasExit()) resultHtml = resultHtml + '<font color=red>X</font>';
      else resultHtml = resultHtml + '&nbsp;';
      resultHtml = resultHtml + '<td>';
    }
    resultHtml = resultHtml + '</tr>';
  }
  resultHtml = resultHtml + '</table>';
  document.getElementById(id).innerHTML  = resultHtml;
}
Maze.prototype._buildArray = function()
{
  this.mazeArray = new Array(this.width);
  for (var i = 0; i < this.width; i++)
  {
    this.mazeArray[i] = new Array(this.height);
    for (var j = 0; j < this.height; j++)
    {
      this.setCell(i,j,new Cell(i,j));
    }
  }
}
Maze.prototype._buildCellStyle = function(cell)
{
  var resultStyle = '';

  resultStyle = resultStyle + this._buildWallForCellStyle(cell.north.value, 'top');
  resultStyle = resultStyle + this._buildWallForCellStyle(cell.west.value, 'right');
  resultStyle = resultStyle + this._buildWallForCellStyle(cell.south.value, 'bottom');
  resultStyle = resultStyle + this._buildWallForCellStyle(cell.east.value, 'left');

  return resultStyle;
}
Maze.prototype._buildWallForCellStyle = function(value, location)
{
  var resultStyle = '';
  switch (value)
  {
    case SIDE.OPEN.value:
      break;
    case SIDE.WALL.value:
      resultStyle = resultStyle + 'border-' + location + ': 1px solid #000000; ';
      break;
    case SIDE.UNKNOWN.value:
      resultStyle = resultStyle + 'border-' + location + ': 1px dotted #0F0F0F; ';
      break
  }
  return resultStyle;
}
