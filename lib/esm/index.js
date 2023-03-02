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

var css_248z = "\n.react-supervenn-layout {\n  flex: 1 1 auto;\n  overflow: hidden;\n  display: grid;\n  grid:\n      \".           .           ycount      items      .      \" min-content\n      \"ylabel      yticks      data        xcount     xcount \" auto\n      \".           sets        xticks      .          .      \" min-content\n      \".           sets        xlabel      .          .      \" min-content\n    /  min-content min-content minmax(min-content, 2fr) min-content minmax(min-content, 1fr)\n  ;\n  resize: vertical;\n}\n\n.react-supervenn-data {\n  grid-area: data;\n  display: flex;\n  flex-direction: column;\n  align-items: stretch;\n  justify-items: stretch;\n}\n.react-supervenn-data > div {\n  flex: 1 1 auto;\n  overflow: hidden;\n  display: flex;\n  flex-direction: row;\n  background-color: #eee;\n}\n.react-supervenn-data > div.react-supervenn-alternate {\n  background-color: #ddd;\n}\n.react-supervenn-cell {\n  border: 2px solid white;\n  cursor: pointer;\n}\n.react-supervenn-cell.react-supervenn-selected {\n  border: 2px solid black;\n}\n\n.react-supervenn-ylabel {\n  grid-area: ylabel;\n  position: relative;\n  width: 50px;\n}\n.react-supervenn-ylabel > div {\n  position: absolute;\n  top: 50%;\n  left: 50%;\n  transform: translateX(-50%) translateY(-50%) rotate(-90deg);\n  white-space: nowrap;\n  user-select: none;\n}\n\n.react-supervenn-xlabel {\n  grid-area: xlabel;\n  height: 50px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  user-select: none;\n}\n\n.react-supervenn-yticks {\n  grid-area: yticks;\n  display: flex;\n  flex-direction: column;\n  align-items: stretch;\n}\n.react-supervenn-yticks > div {\n  flex: 1 1 auto;\n  overflow: hidden;\n  display: flex;\n  align-items: center;\n  justify-items: flex-end;\n  border: 2px solid white;\n  cursor: pointer;\n  background-color: #eee;\n}\n.react-supervenn-yticks > div.react-supervenn-alternate {\n  background-color: #ddd;\n}\n.react-supervenn-yticks > div.react-supervenn-selected {\n  border: 2px solid black;\n}\n.react-supervenn-yticks > div > span {\n  user-select: none;\n}\n\n.react-supervenn-xticks {\n  grid-area: xticks;\n  display: flex;\n  flex-direction: row;\n}\n.react-supervenn-xticks > div {\n  height: 50px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  border: 2px solid white;\n  cursor: pointer;\n  background-color: #eee;\n}\n.react-supervenn-xticks > div > span {\n  user-select: none;\n}\n.react-supervenn-xticks > div.react-supervenn-rotated {\n  position: relative;\n}\n.react-supervenn-xticks > div.react-supervenn-rotated > span {\n  position: absolute;\n  top: 50%;\n  left: 50%;\n  transform: translateX(-50%) translateY(-50%) rotate(-90deg);\n  white-space: nowrap;\n  user-select: none;\n}\n.react-supervenn-xticks > div.react-supervenn-selected {\n  border: 2px solid black;\n}\n\n.react-supervenn-ycount {\n  grid-area: ycount;\n  display: flex;\n  flex-direction: row;\n  background-color: #eee;\n}\n.react-supervenn-ycount > div {\n  cursor: pointer;\n  border: 2px solid white;\n  background-color: #eee;\n  display: flex;\n  flex-direction: column;\n  align-content: stretch;\n  justify-content: flex-end;\n}\n.react-supervenn-ycount > div > div {\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  background-color: #aaa;\n}\n.react-supervenn-ycount > div > div > span {\n  user-select: none;\n}\n\n.react-supervenn-xcount {\n  grid-area: xcount;\n  display: flex;\n  flex-direction: column;\n  background-color: #eee;\n}\n.react-supervenn-xcount > div {\n  cursor: pointer;\n  border: 2px solid white;\n  flex: 1 0 auto;\n  display: flex;\n  flex-direction: column;\n}\n.react-supervenn-xcount > div.react-supervenn-alternate {\n  background-color: #ddd;\n}\n.react-supervenn-xcount > div > div {\n  flex: 1 0 auto;\n  display: flex;\n  align-items: center;\n  justify-items: flex-end;\n  align-items: center;\n  background-color: #aaa;\n}\n.react-supervenn-xcount > div > div > span {\n  user-select: none;\n}\n\n.react-supervenn-sets {\n  grid-area: sets;\n  display: flex;\n  flex-direction: column;\n  align-items: stretch;\n  justify-items: stretch;\n}\n.react-supervenn-sets > textarea {\n  min-width: 8em;\n  border: 1px solid #eee;\n  resize: none;\n}\n.react-supervenn-sets > label {\n  color: #666;\n}\n\n.react-supervenn-items {\n  grid-area: items;\n  display: flex;\n  flex-direction: column;\n  align-items: stretch;\n  justify-items: stretch;\n}\n.react-supervenn-items > textarea {\n  min-width: 8em;\n  border: 1px solid #eee;\n  resize: none;\n}\n.react-supervenn-items > label {\n  color: #666;\n}\n\n.react-supervenn-tooltip {\n  opacity: 0;\n  pointer-events: none;\n  position: absolute;\n  background-color: yellow;\n  transform: translate(-50%, -100%) translate(0px, -10px);\n  width: 16em;\n  padding: 10px;\n  text-align: center;\n  z-index: 99;\n  transition: all 50ms, opacity 200ms;\n}\n";
styleInject(css_248z);

var as_percent = function (x) { return "".concat(100 * x, "%"); };
var maybe_plural = function (singular, x) {
    if (x === 1)
        return "".concat(x, " ").concat(singular);
    else
        return "".concat(x, " ").concat(singular, "s");
};
/**
 * A helper to optionally allow a state variable to be controlled by a parent component -- the optional state, dispatch should be provided
 */
function useMaybeManagedState(externalState, setExternalState, defaultState) {
    var _a = React.useState(externalState !== undefined ? externalState : defaultState), internalState = _a[0], setInternalState = _a[1];
    React.useEffect(function () {
        if (externalState !== undefined)
            setInternalState(externalState);
    }, [externalState, setExternalState]);
    var setState = React.useCallback(function (action) {
        if (externalState !== undefined)
            return setExternalState(action);
        else
            return setInternalState(action);
    }, [externalState, setExternalState]);
    return [internalState, setState];
}
/**
 * A react component to render supervenn in HTML
 *
 */
var ReactSupervenn = function (_a) {
    var sets = _a.sets, set_annotations = _a.set_annotations, chunks = _a.chunks, composition_array = _a.composition_array, effective_min_width_for_annotation = _a.effective_min_width_for_annotation, col_widths = _a.col_widths, n_items = _a.n_items, ycounts = _a.ycounts, rotate_col_annotations = _a.rotate_col_annotations, color_by = _a.color_by, color_cycle = _a.color_cycle, alternating_background = _a.alternating_background, _b = _a.set_label, set_label = _b === void 0 ? 'set' : _b, _c = _a.item_label, item_label = _c === void 0 ? 'item' : _c, externalSelection = _a.selection, onSelectionChange = _a.onSelectionChange;
    var tooltipRef = React.useRef(null);
    var _d = useMaybeManagedState(externalSelection, onSelectionChange, {}), selection = _d[0], setSelection = _d[1];
    var _e = React.useMemo(function () {
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
    }, [selection]), selectedRows = _e.selectedRows, selectedCols = _e.selectedCols, selectedItems = _e.selectedItems;
    React.useEffect(function () {
        if (!tooltipRef)
            return;
        var listener = function (evt) {
            if (!tooltipRef.current)
                return;
            var el = document.elementFromPoint(evt.clientX, evt.clientY);
            var tip = el.getAttribute('data-tip');
            if (tip !== null) {
                tooltipRef.current.innerText = tip;
                tooltipRef.current.style.left = "".concat(evt.clientX + window.scrollX, "px");
                tooltipRef.current.style.top = "".concat(evt.clientY + window.scrollY, "px");
                tooltipRef.current.style.opacity = "1.0";
            }
            else {
                tooltipRef.current.style.opacity = "0.0";
            }
        };
        document.addEventListener('mousemove', listener);
        return function () {
            document.removeEventListener('mousemove', listener);
        };
    }, [tooltipRef]);
    return (React.createElement(React.Fragment, null,
        React.createElement("div", { className: "react-supervenn-layout" },
            React.createElement("div", { className: "react-supervenn-data" }, composition_array.map(function (cells, row) { return (React.createElement("div", { key: row, className: classNames({ 'react-supervenn-alternate': alternating_background && row % 2 == 0 }) }, cells.map(function (cell, col) {
                if (cell === 1) {
                    return (React.createElement("div", { key: col, className: classNames({
                            'react-supervenn-cell': true,
                            'react-supervenn-selected': selection["".concat(row, ".").concat(col)],
                        }), "data-tip": "This region has ".concat(maybe_plural(item_label, chunks[col].length), " from ").concat(set_annotations[row], ", click to select."), onClick: function (_) {
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
                    set_label.toUpperCase(),
                    "S (",
                    maybe_plural(set_label, sets.length),
                    ")")),
            React.createElement("div", { className: "react-supervenn-xlabel" },
                item_label.toUpperCase(),
                "S (",
                maybe_plural(item_label, n_items),
                ")"),
            React.createElement("div", { className: "react-supervenn-yticks" }, sets.map(function (_, row) { return (React.createElement("div", { key: row, className: classNames({
                    'react-supervenn-selected': selectedRows[row],
                    'react-supervenn-alternate': alternating_background && row % 2 == 0,
                }), "data-tip": "This row has ".concat(maybe_plural(item_label, sets[row].length), " from ").concat(set_annotations[row], ", click to select."), onClick: function (_) {
                    setSelection(function (selection) {
                        var _selection = __assign({}, selection);
                        for (var col in Object.keys(chunks)) {
                            if (composition_array[row][col]) {
                                _selection["".concat(row, ".").concat(col)] = !selectedRows[row];
                            }
                        }
                        return _selection;
                    });
                } }, set_annotations[row])); })),
            React.createElement("div", { className: "react-supervenn-xticks" }, chunks.map(function (chunk, col) { return (React.createElement("div", { key: col, className: classNames({
                    'react-supervenn-selected': selectedCols[col],
                    'react-supervenn-rotated': rotate_col_annotations,
                }), style: {
                    width: as_percent(col_widths[col] / n_items),
                }, "data-tip": "This column has ".concat(maybe_plural(item_label, chunk.length), " shared by ").concat(maybe_plural(set_label, ycounts[col]), ", click to select."), onClick: function (_) {
                    setSelection(function (selection) {
                        var _selection = __assign({}, selection);
                        for (var row in composition_array) {
                            if (composition_array[row][col]) {
                                _selection["".concat(row, ".").concat(col)] = !selectedCols[col];
                            }
                        }
                        return _selection;
                    });
                } }, chunk.length >= effective_min_width_for_annotation ?
                chunk.length
                : null)); })),
            React.createElement("div", { className: "react-supervenn-ycount" }, chunks.map(function (chunk, col) { return (React.createElement("div", { key: col, style: {
                    width: as_percent(col_widths[col] / n_items),
                }, "data-tip": "This column has ".concat(maybe_plural(item_label, chunk.length), " shared by ").concat(maybe_plural(set_label, ycounts[col]), ", click to select."), onClick: function (_) {
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
                        pointerEvents: 'none',
                        height: as_percent(ycounts[col] / sets.length),
                    } }, chunks[col].length >= effective_min_width_for_annotation ?
                    ycounts[col]
                    : null))); })),
            React.createElement("div", { className: "react-supervenn-xcount" }, sets.map(function (_, row) { return (React.createElement("div", { key: row, className: classNames({ 'react-supervenn-alternate': alternating_background && row % 2 == 0 }), "data-tip": "This row has ".concat(maybe_plural(item_label, sets[row].length), " from ").concat(set_annotations[row], ", click to select."), onClick: function (_) {
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
                        pointerEvents: 'none',
                        width: as_percent(sets[row].length / n_items),
                    } }, sets[row].length))); })),
            React.createElement("div", { className: "react-supervenn-sets", onClick: function (evt) {
                    evt.currentTarget.children[0].select();
                    navigator.clipboard.writeText(Object.keys(selectedRows).map(function (s) { return set_annotations[s]; }).join('\n'));
                } },
                React.createElement("textarea", { rows: 3, readOnly: true, value: Object.keys(selectedRows).map(function (s) { return set_annotations[s]; }).join('\n') }),
                React.createElement("label", null,
                    maybe_plural(set_label, Object.keys(selectedRows).length),
                    ", click to copy")),
            React.createElement("div", { className: "react-supervenn-items", onClick: function (evt) {
                    evt.currentTarget.children[0].select();
                    navigator.clipboard.writeText(Object.keys(selectedItems).join('\n'));
                } },
                React.createElement("textarea", { rows: 4, readOnly: true, value: Object.keys(selectedItems).join('\n') }),
                React.createElement("label", null,
                    maybe_plural(item_label, Object.keys(selectedItems).length),
                    ", click to copy"))),
        React.createElement("div", { ref: tooltipRef, className: "react-supervenn-tooltip" })));
};

export { ReactSupervenn as default };
//# sourceMappingURL=index.js.map
