import React from 'react';

/******************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */

var __assign = function() {
    __assign = Object.assign || function __assign(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};

var classnamesExports = {};
var classnames = {
  get exports(){ return classnamesExports; },
  set exports(v){ classnamesExports = v; },
};

/*!
	Copyright (c) 2018 Jed Watson.
	Licensed under the MIT License (MIT), see
	http://jedwatson.github.io/classnames
*/

(function (module) {
	/* global define */

	(function () {

		var hasOwn = {}.hasOwnProperty;

		function classNames() {
			var classes = [];

			for (var i = 0; i < arguments.length; i++) {
				var arg = arguments[i];
				if (!arg) continue;

				var argType = typeof arg;

				if (argType === 'string' || argType === 'number') {
					classes.push(arg);
				} else if (Array.isArray(arg)) {
					if (arg.length) {
						var inner = classNames.apply(null, arg);
						if (inner) {
							classes.push(inner);
						}
					}
				} else if (argType === 'object') {
					if (arg.toString !== Object.prototype.toString && !arg.toString.toString().includes('[native code]')) {
						classes.push(arg.toString());
						continue;
					}

					for (var key in arg) {
						if (hasOwn.call(arg, key) && arg[key]) {
							classes.push(key);
						}
					}
				}
			}

			return classes.join(' ');
		}

		if (module.exports) {
			classNames.default = classNames;
			module.exports = classNames;
		} else {
			window.classNames = classNames;
		}
	}());
} (classnames));

var classNames = classnamesExports;

function styleInject(css, ref) {
  if ( ref === void 0 ) ref = {};
  var insertAt = ref.insertAt;

  if (!css || typeof document === 'undefined') { return; }

  var head = document.head || document.getElementsByTagName('head')[0];
  var style = document.createElement('style');
  style.type = 'text/css';

  if (insertAt === 'top') {
    if (head.firstChild) {
      head.insertBefore(style, head.firstChild);
    } else {
      head.appendChild(style);
    }
  } else {
    head.appendChild(style);
  }

  if (style.styleSheet) {
    style.styleSheet.cssText = css;
  } else {
    style.appendChild(document.createTextNode(css));
  }
}

var css_248z = "\n.react-supervenn-layout {\n  flex: 1 1 auto;\n  overflow: hidden;\n  display: grid;\n  grid:\n      \".           .           ycount      .          \" min-content\n      \"ylabel      yticks      data        xcount     \" auto\n      \".           .           xticks      .          \" min-content\n      \"sets        sets        xlabel      items      \" min-content\n    /  min-content min-content minmax(min-content, 2fr) minmax(min-content, 1fr)\n  ;\n  resize: vertical;\n}\n\n.react-supervenn-data {\n  grid-area: data;\n  display: flex;\n  flex-direction: column;\n  align-items: stretch;\n  justify-items: stretch;\n}\n.react-supervenn-data > div {\n  flex: 1 1 auto;\n  overflow: hidden;\n  display: flex;\n  flex-direction: row;\n  background-color: #eee;\n}\n.react-supervenn-data > div.react-supervenn-alternate {\n  background-color: #ddd;\n}\n.react-supervenn-cell {\n  border: 2px solid white;\n  cursor: pointer;\n}\n.react-supervenn-cell.react-supervenn-selected {\n  border: 2px solid black;\n}\n\n.react-supervenn-ylabel {\n  grid-area: ylabel;\n  position: relative;\n  width: 50px;\n}\n.react-supervenn-ylabel > div {\n  position: absolute;\n  top: 50%;\n  left: 50%;\n  transform: translateX(-50%) translateY(-50%) rotate(-90deg);\n  white-space: nowrap;\n  user-select: none;\n}\n\n.react-supervenn-xlabel {\n  grid-area: xlabel;\n  height: 50px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  user-select: none;\n}\n\n.react-supervenn-yticks {\n  grid-area: yticks;\n  display: flex;\n  flex-direction: column;\n  align-items: stretch;\n}\n.react-supervenn-yticks .react-supervenn-selected {\n  font-weight: bold;\n}\n.react-supervenn-yticks > div {\n  flex: 1 1 auto;\n  overflow: hidden;\n  display: flex;\n  align-items: center;\n  justify-items: flex-end;\n  border: 2px solid white;\n  cursor: pointer;\n}\n.react-supervenn-yticks > div > span {\n  user-select: none;\n}\n\n.react-supervenn-xticks {\n  grid-area: xticks;\n  display: flex;\n  flex-direction: row;\n}\n.react-supervenn-xticks .react-supervenn-selected {\n  font-weight: bold;\n}\n.react-supervenn-xticks > div {\n  height: 50px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  border: 2px solid white;\n  cursor: pointer;\n}\n.react-supervenn-xticks > div > span {\n  user-select: none;\n}\n.react-supervenn-xticks > div.react-supervenn-rotated {\n  position: relative;\n}\n.react-supervenn-xticks > div.react-supervenn-rotated > span {\n  position: absolute;\n  top: 50%;\n  left: 50%;\n  transform: translateX(-50%) translateY(-50%) rotate(-90deg);\n  white-space: nowrap;\n  user-select: none;\n}\n\n.react-supervenn-ycount {\n  grid-area: ycount;\n  display: flex;\n  flex-direction: row;\n  background-color: #eee;\n  height: 50px;\n}\n.react-supervenn-ycount > div {\n  cursor: pointer;\n  border: 2px solid white;\n  background-color: #eee;\n  display: flex;\n  flex-direction: column;\n  align-content: stretch;\n  justify-content: flex-end;\n}\n.react-supervenn-ycount > div > div {\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  background-color: #aaa;\n}\n.react-supervenn-ycount > div > div > span {\n  user-select: none;\n}\n\n.react-supervenn-xcount {\n  grid-area: xcount;\n  display: flex;\n  flex-direction: column;\n  background-color: #eee;\n}\n.react-supervenn-xcount > div {\n  cursor: pointer;\n  border: 2px solid white;\n  flex: 1 0 auto;\n  display: flex;\n  flex-direction: column;\n}\n.react-supervenn-xcount > div.react-supervenn-alternate {\n  background-color: #ddd;\n}\n.react-supervenn-xcount > div > div {\n  flex: 1 0 auto;\n  display: flex;\n  align-items: center;\n  justify-items: flex-end;\n  align-items: center;\n  background-color: #aaa;\n}\n.react-supervenn-xcount > div > div > span {\n  user-select: none;\n}\n\n.react-supervenn-sets {\n  grid-area: sets;\n  display: flex;\n  flex-direction: column;\n  align-items: stretch;\n  justify-items: stretch;\n}\n.react-supervenn-sets > textarea { \n  flex: 1 0 auto;\n  resize: none;\n}\n\n.react-supervenn-items {\n  grid-area: items;\n  display: flex;\n  flex-direction: column;\n  align-items: stretch;\n  justify-items: stretch;\n}\n.react-supervenn-items > textarea { \n  flex: 1 0 auto;\n  resize: none;\n}";
styleInject(css_248z);

var as_percent = function (x) { return "".concat(100 * x, "%"); };
/**
 * A react component to render supervenn in HTML
 *
 */
var ReactSupervenn = function (_a) {
    var sets = _a.sets, set_annotations = _a.set_annotations, chunks = _a.chunks, composition_array = _a.composition_array, effective_min_width_for_annotation = _a.effective_min_width_for_annotation, col_widths = _a.col_widths, n_items = _a.n_items, ycounts = _a.ycounts, rotate_col_annotations = _a.rotate_col_annotations, color_by = _a.color_by, color_cycle = _a.color_cycle, alternating_background = _a.alternating_background;
    var _b = React.useState({}), selection = _b[0], setSelection = _b[1];
    var _c = React.useMemo(function () {
        var selectedRows = {};
        var selectedCols = {};
        var selectedItems = {};
        for (var k in selection) {
            if (!selection[k])
                continue;
            var _a = k.split('.'), row = _a[0], col = _a[1];
            selectedRows[row] = true;
            selectedCols[col] = true;
            for (var _i = 0, _b = chunks[col]; _i < _b.length; _i++) {
                var item = _b[_i];
                selectedItems[item] = true;
            }
        }
        return { selectedRows: selectedRows, selectedCols: selectedCols, selectedItems: selectedItems };
    }, [selection]), selectedRows = _c.selectedRows, selectedCols = _c.selectedCols, selectedItems = _c.selectedItems;
    return (React.createElement("div", { className: "react-supervenn-layout" },
        React.createElement("div", { className: "react-supervenn-data" }, composition_array.map(function (cells, row) { return (React.createElement("div", { key: row, className: classNames({ 'react-supervenn-alternate': alternating_background && row % 2 == 0 }) }, cells.map(function (cell, col) {
            if (cell === 1) {
                return (React.createElement("div", { key: col, className: classNames({
                        'react-supervenn-cell': true,
                        'react-supervenn-selected': selection["".concat(row, ".").concat(col)],
                    }), onClick: function (_) {
                        setSelection(function (selection) {
                            var _a;
                            return (__assign(__assign({}, selection), (_a = {}, _a["".concat(row, ".").concat(col)] = !selection["".concat(row, ".").concat(col)], _a)));
                        });
                    }, style: {
                        width: as_percent(col_widths[col] / n_items),
                        backgroundColor: color_by === 'column' ? color_cycle[col % color_cycle.length] : color_cycle[row % color_cycle.length],
                        userSelect: 'none',
                    } }, "\u00A0"));
            }
            else {
                return (React.createElement("div", { key: col, className: "react-supervenn-cell", style: {
                        width: as_percent(col_widths[col] / n_items),
                        userSelect: 'none',
                    } }, "\u00A0"));
            }
        }))); })),
        React.createElement("div", { className: "react-supervenn-ylabel" },
            React.createElement("div", null,
                "SETS (",
                React.createElement("span", null,
                    Object.keys(selectedRows).length,
                    " sets"),
                ")")),
        React.createElement("div", { className: "react-supervenn-xlabel" },
            "ITEMS (",
            React.createElement("span", null,
                Object.keys(selectedItems).length,
                " items"),
            ")"),
        React.createElement("div", { className: "react-supervenn-yticks" }, sets.map(function (_, row) { return (React.createElement("div", { key: row, className: classNames({
                'react-supervenn-selected': selectedRows[row],
            }), onClick: function (_) {
                setSelection(function (selection) {
                    var _selection = __assign({}, selection);
                    for (var col in Object.keys(chunks)) {
                        if (composition_array[row][col]) {
                            _selection["".concat(row, ".").concat(col)] = !selectedRows[row];
                        }
                    }
                    return _selection;
                });
            } },
            React.createElement("span", null, set_annotations[row]))); })),
        React.createElement("div", { className: "react-supervenn-xticks" }, chunks.map(function (chunk, col) { return (React.createElement("div", { key: col, className: classNames({
                'react-supervenn-selected': selectedCols[col],
                'react-supervenn-rotated': rotate_col_annotations,
            }), style: {
                width: as_percent(col_widths[col] / n_items),
            }, onClick: function (_) {
                setSelection(function (selection) {
                    var _selection = __assign({}, selection);
                    for (var row in composition_array) {
                        if (composition_array[row][col]) {
                            _selection["".concat(row, ".").concat(col)] = !selectedCols[col];
                        }
                    }
                    return _selection;
                });
            } },
            React.createElement("span", null, chunks[col].length >= effective_min_width_for_annotation ?
                chunks[col].length
                : null))); })),
        React.createElement("div", { className: "react-supervenn-ycount" }, chunks.map(function (chunk, col) { return (React.createElement("div", { key: col, style: {
                width: as_percent(col_widths[col] / n_items),
            }, onClick: function (_) {
                setSelection(function (selection) {
                    var _selection = __assign({}, selection);
                    for (var row in composition_array) {
                        if (composition_array[row][col]) {
                            _selection["".concat(row, ".").concat(col)] = !selectedCols[col];
                        }
                    }
                    return _selection;
                });
            } },
            React.createElement("div", { style: {
                    height: as_percent(ycounts[col] / sets.length),
                } },
                React.createElement("span", null, chunks[col].length >= effective_min_width_for_annotation ?
                    ycounts[col]
                    : null)))); })),
        React.createElement("div", { className: "react-supervenn-xcount" }, sets.map(function (_, row) { return (React.createElement("div", { key: row, className: classNames({ 'react-supervenn-alternate': alternating_background && row % 2 == 0 }), onClick: function (_) {
                setSelection(function (selection) {
                    var _selection = __assign({}, selection);
                    for (var col in Object.keys(chunks)) {
                        if (composition_array[row][col]) {
                            _selection["".concat(row, ".").concat(col)] = !selectedRows[row];
                        }
                    }
                    return _selection;
                });
            } },
            React.createElement("div", { style: {
                    width: as_percent(sets[row].length / n_items),
                } },
                React.createElement("span", null, sets[row].length)))); })),
        React.createElement("div", { className: "react-supervenn-sets" },
            React.createElement("textarea", { rows: 5, readOnly: true, onSelect: function (evt) {
                    evt.currentTarget.select();
                    navigator.clipboard.writeText(Object.keys(selectedRows).map(function (s) { return set_annotations[s]; }).join('\n'));
                }, placeholder: "Selected sets show up here, click to copy", value: Object.keys(selectedRows).map(function (s) { return set_annotations[s]; }).join('\n') })),
        React.createElement("div", { className: "react-supervenn-items" },
            React.createElement("textarea", { rows: 5, readOnly: true, onSelect: function (evt) {
                    evt.currentTarget.select();
                    navigator.clipboard.writeText(Object.keys(selectedItems).join('\n'));
                }, placeholder: "Selected items show up here, click to copy", value: Object.keys(selectedItems).join('\n') }))));
};

export { ReactSupervenn as default };
//# sourceMappingURL=index.js.map
