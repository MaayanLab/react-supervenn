import _defineProperty from "@babel/runtime/helpers/defineProperty";
import _slicedToArray from "@babel/runtime/helpers/slicedToArray";
import _typeof from "@babel/runtime/helpers/typeof";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

import React from 'react';

function classes() {
  for (var _len = arguments.length, C = new Array(_len), _key = 0; _key < _len; _key++) {
    C[_key] = arguments[_key];
  }

  if (C.length === 1 && _typeof(C[0]) === 'object') {
    var _C = [];

    for (var c in C[0]) {
      if (C[0][c]) {
        _C.push(c);
      }
    }

    return _C.join(' ');
  } else {
    return C.join(' ');
  }
}

export default function ReactSupervenn(_ref) {
  var style = _ref.style,
      sets = _ref.sets,
      set_annotations = _ref.set_annotations,
      chunks = _ref.chunks,
      composition_array = _ref.composition_array,
      effective_min_width_for_annotation = _ref.effective_min_width_for_annotation,
      col_widths = _ref.col_widths,
      n_items = _ref.n_items,
      ycounts = _ref.ycounts,
      rotate_col_annotations = _ref.rotate_col_annotations,
      color_by = _ref.color_by,
      color_cycle = _ref.color_cycle,
      alternating_background = _ref.alternating_background;

  var W = function W(w) {
    return "".concat(100 * w, "%");
  };

  var H = function H(h) {
    return "".concat(100 * h, "%");
  };

  var _React$useState = React.useState({}),
      _React$useState2 = _slicedToArray(_React$useState, 2),
      selection = _React$useState2[0],
      setSelection = _React$useState2[1];

  var selectedSets = {};
  var selectedItems = {};

  for (var k in selection) {
    if (!selection[k]) continue;

    var _k$split = k.split('.'),
        _k$split2 = _slicedToArray(_k$split, 2),
        row = _k$split2[0],
        col = _k$split2[1];

    selectedSets[set_annotations[row]] = true;

    var _iterator = _createForOfIteratorHelper(chunks[col]),
        _step;

    try {
      for (_iterator.s(); !(_step = _iterator.n()).done;) {
        var item = _step.value;
        selectedItems[item] = true;
      }
    } catch (err) {
      _iterator.e(err);
    } finally {
      _iterator.f();
    }
  }

  return /*#__PURE__*/React.createElement("div", {
    className: style.layout
  }, /*#__PURE__*/React.createElement("div", {
    className: style.data
  }, composition_array.map(function (cells, row) {
    return /*#__PURE__*/React.createElement("div", {
      key: row,
      className: classes(_defineProperty({}, style.alternate, alternating_background && row % 2 == 0))
    }, cells.map(function (cell, col) {
      if (cell === 1) {
        var _classes2;

        return /*#__PURE__*/React.createElement("div", {
          key: col,
          className: classes((_classes2 = {}, _defineProperty(_classes2, style.cell, true), _defineProperty(_classes2, style.selected, selection["".concat(row, ".").concat(col)]), _classes2)),
          onClick: function onClick(_) {
            setSelection(function (selection) {
              return _objectSpread(_objectSpread({}, selection), {}, _defineProperty({}, "".concat(row, ".").concat(col), !selection["".concat(row, ".").concat(col)]));
            });
          },
          style: {
            width: W(col_widths[col] / n_items),
            backgroundColor: color_by === 'column' ? color_cycle[col % color_cycle.length] : color_cycle[row % color_cycle.length],
            userSelect: 'none'
          }
        }, "\xA0");
      } else {
        return /*#__PURE__*/React.createElement("div", {
          key: col,
          className: style.cell,
          style: {
            width: W(col_widths[col] / n_items),
            userSelect: 'none'
          }
        }, "\xA0");
      }
    }));
  })), /*#__PURE__*/React.createElement("div", {
    className: style.ylabel
  }, /*#__PURE__*/React.createElement("div", null, "SETS (", /*#__PURE__*/React.createElement("span", {
    className: style.clickable,
    onClick: function onClick(_) {
      navigator.clipboard.writeText(Object.keys(selectedSets).join('\n'));
    }
  }, Object.keys(selectedSets).length, " sets"), ")")), /*#__PURE__*/React.createElement("div", {
    className: style.xlabel
  }, "ITEMS (", /*#__PURE__*/React.createElement("span", {
    className: style.clickable,
    onClick: function onClick(_) {
      return navigator.clipboard.writeText(Object.keys(selectedItems).join('\n'));
    }
  }, Object.keys(selectedItems).length, " items"), ")"), /*#__PURE__*/React.createElement("div", {
    className: style.yticks
  }, sets.map(function (_, row) {
    return /*#__PURE__*/React.createElement("div", {
      key: row,
      title: JSON.stringify(sets[row])
    }, /*#__PURE__*/React.createElement("span", null, set_annotations[row]));
  })), /*#__PURE__*/React.createElement("div", {
    className: style.xticks
  }, chunks.map(function (chunk, col) {
    return /*#__PURE__*/React.createElement("div", {
      key: col,
      className: classes(_defineProperty({}, style.rotated, rotate_col_annotations)),
      style: {
        width: W(col_widths[col] / n_items)
      },
      title: JSON.stringify(chunk)
    }, /*#__PURE__*/React.createElement("span", null, chunks[col].length >= effective_min_width_for_annotation ? chunks[col].length : null));
  })), /*#__PURE__*/React.createElement("div", {
    className: style.ycount
  }, chunks.map(function (chunk, col) {
    return /*#__PURE__*/React.createElement("div", {
      key: col,
      style: {
        width: W(col_widths[col] / n_items)
      },
      onClick: function onClick(_) {
        setSelection(function (selection) {
          var _selection = _objectSpread({}, selection);

          for (var _row in composition_array) {
            if (composition_array[_row][col]) {
              _selection["".concat(_row, ".").concat(col)] = !_selection["".concat(_row, ".").concat(col)];
            }
          }

          return _selection;
        });
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        height: H(ycounts[col] / sets.length)
      }
    }, /*#__PURE__*/React.createElement("span", null, chunks[col].length >= effective_min_width_for_annotation ? ycounts[col] : null)));
  })), /*#__PURE__*/React.createElement("div", {
    className: style.xcount
  }, sets.map(function (_, row) {
    return /*#__PURE__*/React.createElement("div", {
      key: row,
      className: classes(_defineProperty({}, style.alternate, alternating_background && row % 2 == 0)),
      title: JSON.stringify(sets[row]),
      onClick: function onClick(_) {
        setSelection(function (selection) {
          var _selection = _objectSpread({}, selection);

          for (var _col in Object.keys(chunks)) {
            if (composition_array[row][_col]) {
              _selection["".concat(row, ".").concat(_col)] = !_selection["".concat(row, ".").concat(_col)];
            }
          }

          return _selection;
        });
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        width: W(sets[row].length / n_items)
      }
    }, /*#__PURE__*/React.createElement("span", null, sets[row].length)));
  })));
}