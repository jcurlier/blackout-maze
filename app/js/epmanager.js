
function GameManager()
{
  console.log('initializing EP game manager');
  this.width = 50;
  this.height = 50;
  this._buildCacheArray();
  this.useCache = false;
}
GameManager.prototype._buildCacheArray = function()
{
  this.cacheArray = new Array(this.width);
  for (var i = 0; i < this.width; i++)
  {
    this.cacheArray[i] = new Array(this.height);
    for (var j = 0; j < this.height; j++)
    {
      this.cacheArray[i][j] = null;
    }
  }
}
GameManager.prototype.getWidth = function()
{
  return this.width;
}
GameManager.prototype.getHeight = function()
{
  return this.height;
}
GameManager.prototype.draw = function(id)
{
}
GameManager.prototype.init = function()
{
  var response = this._synchronous_ajax('http://www.epdeveloperchallenge.com/api/init', null);
  this.mazeGuid = response.mazeGuid;
  return response;
}
GameManager.prototype.move = function(direction)
{
  var response;

  console.log('looking for cache ' + direction.name + ' from (' + this.x + ',' + this.y + ')');
    
  switch (direction.value)
  {
    case DIRECTION.NORTH.value:
      response = this.cacheArray[this.x][this.y - 1];
      break;
    case DIRECTION.WEST.value:
      response = this.cacheArray[this.x - 1][this.y];
      break;
    case DIRECTION.SOUTH.value:
      response = this.cacheArray[this.x][this.y + 1];
      break;
    case DIRECTION.EAST.value:
      response = this.cacheArray[this.x + 1][this.y];
      break;
  }
  if (response == null)
  {
    if (this.useCache)
    {
      this.jump(this.x, this.y);
      this.useCache = false;      
    }
    console.log('ajax request to move ' + direction.name + ' from (' + this.x + ',' + this.y + ')');
    var parameters = 'mazeGuid=' + this.mazeGuid + '&direction=' + direction.name;
    response = this._synchronous_ajax('http://www.epdeveloperchallenge.com/api/move', parameters);
  }
  else
  {
    response.previouslyVisited = true;
    console.log('ajax response use the cache ' + response.toString());
    this.useCache = true;
    this.x = response.x; 
    this.y = response.y; 
  }
    
  return response;
}
GameManager.prototype.jump = function(x,y)
{
  var parameters = 'mazeGuid=' + this.mazeGuid + '&x=' + x + '&y=' + y;
  response = this._synchronous_ajax('http://www.epdeveloperchallenge.com/api/jump', parameters);
}
GameManager.prototype._synchronous_ajax = function(url, parameters)
{
  var response = null;

  if (window.XMLHttpRequest) AJAX = new XMLHttpRequest();
  else AJAX = new ActiveXObject("Microsoft.XMLHTTP");

  if (AJAX)
  {
    AJAX.open("POST", url, false);
    AJAX.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    AJAX.send(parameters);
    
    console.log('ajax response ' + AJAX.responseText);
    
    //var responseText = '{"currentCell":{"note":"Welcome to the Elastic Path blackout maze challenge! Do you have what it takes to find the end of the maze? Complete it and follow the given instructions to find out more about Elastic Path!","x":0,"y":0,"mazeGuid":"2fc8f508-03df-4b75-ad26-b0c16ec9290d","atEnd":false,"previouslyVisited":false,"north":"BLOCKED","east":"BLOCKED","south":"UNEXPLORED","west":"BLOCKED"}}';
    var responseText = AJAX.responseText
    response = this._buildResponse(responseText);
    
    console.log('response ' + response.toString());
  }
  return response;
}
GameManager.prototype._buildResponse = function(responseText)
{
  var jsonArray = eval('(' + responseText + ')');
  var jsonResponse = jsonArray["currentCell"];

  var mazeGuid = jsonResponse["mazeGuid"];
  var atEnd = jsonResponse["atEnd"];
  var note = jsonResponse["note"];;
  var previouslyVisited = jsonResponse["previouslyVisited"];
  var north = jsonResponse["north"];
  var east = jsonResponse["east"];
  var west = jsonResponse["west"];
  var south = jsonResponse["south"];
  var x = jsonResponse["x"];
  var y = jsonResponse["y"];
  
  var response = new Response(mazeGuid, note, atEnd, previouslyVisited, north, east, south, west, x, y);
  
  this.cacheArray[x][y] = response; 
  this.x = response.x; 
  this.y = response.y; 
  
  return response;
}
