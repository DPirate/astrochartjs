// Generated by CoffeeScript 1.7.1

/*
Created by Rajasekar Elango on 4/3/14.
 */

(function() {
  var CONSTANTS, Cell, Dimension, Item, Point, drawHouse, findLocation, getCellForHouse, getItems, log;

  this.AstroChart = function(elementId) {
    this.elementId = elementId;
    return {
      draw: (function(_this) {
        return function(data, options) {
          var houseCell, houseNo, housePosition, houseSize, houseSpacingHeight, houseSpacingWidth, startPosition, svg, _i, _len, _ref, _results;
          svg = Snap(elementId);
          houseSize = new Dimension(options.width, options.height);
          Point(startPosition = new Point(0, 0));
          _ref = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
          _results = [];
          for (_i = 0, _len = _ref.length; _i < _len; _i++) {
            houseNo = _ref[_i];
            houseSpacingWidth = CONSTANTS.get('HOUSE_SPACING_WIDTH');
            houseSpacingHeight = CONSTANTS.get('HOUSE_SPACING_HEIGHT');
            Cell(houseCell = getCellForHouse(houseNo));
            Point(housePosition = startPosition.move(houseCell.row * (houseSize.width + houseSpacingWidth), houseCell.col * (houseSize.height + houseSpacingHeight)));
            log("--------");
            log(startPosition);
            log(housePosition);
            _results.push(drawHouse(svg, housePosition, houseSize, data[houseNo]));
          }
          return _results;
        };
      })(this)
    };
  };

  getCellForHouse = function(houseNo) {
    switch (houseNo) {
      case 1:
        return new Cell(1, 0);
      case 2:
        return new Cell(2, 0);
      case 3:
        return new Cell(3, 0);
      case 4:
        return new Cell(3, 1);
      case 5:
        return new Cell(3, 2);
      case 6:
        return new Cell(3, 3);
      case 7:
        return new Cell(2, 3);
      case 8:
        return new Cell(1, 3);
      case 9:
        return new Cell(0, 3);
      case 10:
        return new Cell(0, 2);
      case 11:
        return new Cell(0, 1);
      case 12:
        return new Cell(0, 0);
      default:
        throw "houseNo should be between 1 and 12";
    }
  };

  getItems = function(data) {
    var items;
    switch ((data != null ? data.length : void 0)) {
      case 1:
        items = [new Item(data[0], new Cell(1, 1))];
        break;
      case 2:
        items = [new Item(data[0], new Cell(0, 0)), new Item(data[1], new Cell(2, 2))];
        break;
      case 3:
        items = [new Item(data[0], new Cell(0, 1)), new Item(data[1], new Cell(2, 0)), new Item(data[2], new Cell(2, 2))];
        break;
      case 4:
        items = [new Item(data[0], new Cell(0, 0)), new Item(data[1], new Cell(0, 2)), new Item(data[2], new Cell(2, 0)), new Item(data[3], new Cell(2, 2))];
        break;
      case 5:
        items = [new Item(data[0], new Cell(0, 0)), new Item(data[1], new Cell(0, 2)), new Item(data[2], new Cell(2, 0)), new Item(data[3], new Cell(2, 2)), new Item(data[4], new Cell(1, 1))];
        break;
      case 6:
        items = [new Item(data[0], new Cell(0, 0)), new Item(data[1], new Cell(0, 1)), new Item(data[2], new Cell(0, 2)), new Item(data[3], new Cell(2, 0)), new Item(data[4], new Cell(2, 1)), new Item(data[5], new Cell(2, 2))];
        break;
      case 7:
        items = [new Item(data[0], new Cell(0, 0)), new Item(data[1], new Cell(0, 1)), new Item(data[2], new Cell(0, 2)), new Item(data[3], new Cell(2, 0)), new Item(data[4], new Cell(2, 1)), new Item(data[5], new Cell(2, 2)), new Item(data[6], new Cell(1, 1))];
        break;
      case 8:
        items = [new Item(data[0], new Cell(0, 0)), new Item(data[1], new Cell(0, 1)), new Item(data[2], new Cell(0, 2)), new Item(data[3], new Cell(2, 0)), new Item(data[4], new Cell(2, 1)), new Item(data[5], new Cell(2, 2)), new Item(data[6], new Cell(1, 0)), new Item(data[7], new Cell(1, 2))];
        break;
      case 9:
        items = [new Item(data[0], new Cell(0, 0)), new Item(data[1], new Cell(0, 1)), new Item(data[2], new Cell(0, 2)), new Item(data[3], new Cell(1, 0)), new Item(data[4], new Cell(1, 1)), new Item(data[5], new Cell(1, 2)), new Item(data[6], new Cell(2, 0)), new Item(data[7], new Cell(2, 1)), new Item(data[8], new Cell(2, 2))];
    }
    return items;
  };

  drawHouse = function(svg, housePosition, houseSize, data) {
    var cellPosition, item, items, point, scaledSize, _i, _len;
    svg.rect(housePosition.x, housePosition.y, houseSize.width, houseSize.height).attr({
      fill: "white",
      stroke: "black"
    });
    Dimension(scaledSize = houseSize.scale(CONSTANTS.get('CELL_WIDTH_OFFSET_PERCENT'), CONSTANTS.get('CELL_HEIGHT_OFFSET_PERCENT')));
    Point(cellPosition = housePosition.move(scaledSize.width, scaledSize.height));
    items = getItems(data);
    if (items != null) {
      for (_i = 0, _len = items.length; _i < _len; _i++) {
        item = items[_i];
        point = findLocation(cellPosition, houseSize, item.cell);
        svg.text(point.x, point.y, item.text);
      }
    }
  };

  findLocation = function(cellPosition, houseSize, cell) {
    var gridHeight, gridWidth, point;
    gridWidth = houseSize.width / CONSTANTS.get('CELL_TOTAL_ROWS');
    gridHeight = houseSize.height / CONSTANTS.get('CELL_TOTAL_COLS');
    point = cellPosition.move(cell.row * gridWidth, cell.col * gridHeight);
    log(point);
    return point;
  };

  log = function(msg) {
    return CONSTANTS.get('DEBUG') && console.log(msg);
  };

  Cell = (function() {
    function Cell(row, col) {
      this.row = row;
      this.col = col;
    }

    return Cell;

  })();

  CONSTANTS = (function() {
    var private_;
    private_ = {
      DEBUG: false,
      HOUSE_SPACING_WIDTH: 5,
      HOUSE_SPACING_HEIGHT: 5,
      CELL_WIDTH_OFFSET_PERCENT: 0.05,
      CELL_HEIGHT_OFFSET_PERCENT: 0.25,
      CELL_TOTAL_ROWS: 3,
      CELL_TOTAL_COLS: 3
    };
    return {
      get: function(name) {
        return private_[name];
      }
    };
  })();

  Dimension = (function() {
    function Dimension(width, height) {
      this.width = width;
      this.height = height;
    }

    Dimension.prototype.scale = function(x, y) {
      return new Dimension(this.width * x, this.height * y);
    };

    return Dimension;

  })();

  Item = (function() {
    function Item(text, cell) {
      this.text = text;
      this.cell = cell;
    }

    return Item;

  })();

  Point = (function() {
    function Point(x, y) {
      this.x = x;
      this.y = y;
    }

    Point.prototype.move = function(x, y) {
      return new Point(this.x + x, this.y + y);
    };

    return Point;

  })();

}).call(this);
