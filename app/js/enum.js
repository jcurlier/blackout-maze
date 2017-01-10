
var SIDE = {
  OPEN : {value: 0, name: "OPEN", code: "O"},
  WALL: {value: 1, name: "WALL", code: "W"},
  UNKNOWN: {value: 2, name: "UNKNOWN", code: "U"}
}
var DIRECTION = {
  NORTH : {value: 0, name: "NORTH", code: "N"},
  WEST: {value: 1, name: "WEST", code: "W"},
  SOUTH: {value: 2, name: "SOUTH", code: "S"},
  EAST: {value: 3, name: "EAST", code: "E"}
}
var MARKING = {
  EXIT : {value: 0, name: "EXIT", code: "X"},
  NEW: {value: 1, name: "NEW", code: "N"},
  UNKNOWN: {value: 2, name: "UNKNOWN", code: "U"}
}
var MARCHING = {
  FORWARD : {value: 0, name: "EXIT", code: "F"},
  BACKWARD: {value: 1, name: "NEW", code: "B"}
}