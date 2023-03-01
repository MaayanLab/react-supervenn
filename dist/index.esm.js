import 'react';

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
//# sourceMappingURL=index.esm.js.map
