'use strict';

var React = require('react');

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

var commonjsGlobal = typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

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

function commonjsRequire(path) {
	throw new Error('Could not dynamically require "' + path + '". Please configure the dynamicRequireTargets or/and ignoreDynamicRequires option of @rollup/plugin-commonjs appropriately for this require call to work.');
}

var pluralizeExports = {};
var pluralize$1 = {
  get exports(){ return pluralizeExports; },
  set exports(v){ pluralizeExports = v; },
};

/* global define */

(function (module, exports) {
	(function (root, pluralize) {
	  /* istanbul ignore else */
	  if (typeof commonjsRequire === 'function' && 'object' === 'object' && 'object' === 'object') {
	    // Node.
	    module.exports = pluralize();
	  } else {
	    // Browser global.
	    root.pluralize = pluralize();
	  }
	})(commonjsGlobal, function () {
	  // Rule storage - pluralize and singularize need to be run sequentially,
	  // while other rules can be optimized using an object for instant lookups.
	  var pluralRules = [];
	  var singularRules = [];
	  var uncountables = {};
	  var irregularPlurals = {};
	  var irregularSingles = {};

	  /**
	   * Sanitize a pluralization rule to a usable regular expression.
	   *
	   * @param  {(RegExp|string)} rule
	   * @return {RegExp}
	   */
	  function sanitizeRule (rule) {
	    if (typeof rule === 'string') {
	      return new RegExp('^' + rule + '$', 'i');
	    }

	    return rule;
	  }

	  /**
	   * Pass in a word token to produce a function that can replicate the case on
	   * another word.
	   *
	   * @param  {string}   word
	   * @param  {string}   token
	   * @return {Function}
	   */
	  function restoreCase (word, token) {
	    // Tokens are an exact match.
	    if (word === token) return token;

	    // Lower cased words. E.g. "hello".
	    if (word === word.toLowerCase()) return token.toLowerCase();

	    // Upper cased words. E.g. "WHISKY".
	    if (word === word.toUpperCase()) return token.toUpperCase();

	    // Title cased words. E.g. "Title".
	    if (word[0] === word[0].toUpperCase()) {
	      return token.charAt(0).toUpperCase() + token.substr(1).toLowerCase();
	    }

	    // Lower cased words. E.g. "test".
	    return token.toLowerCase();
	  }

	  /**
	   * Interpolate a regexp string.
	   *
	   * @param  {string} str
	   * @param  {Array}  args
	   * @return {string}
	   */
	  function interpolate (str, args) {
	    return str.replace(/\$(\d{1,2})/g, function (match, index) {
	      return args[index] || '';
	    });
	  }

	  /**
	   * Replace a word using a rule.
	   *
	   * @param  {string} word
	   * @param  {Array}  rule
	   * @return {string}
	   */
	  function replace (word, rule) {
	    return word.replace(rule[0], function (match, index) {
	      var result = interpolate(rule[1], arguments);

	      if (match === '') {
	        return restoreCase(word[index - 1], result);
	      }

	      return restoreCase(match, result);
	    });
	  }

	  /**
	   * Sanitize a word by passing in the word and sanitization rules.
	   *
	   * @param  {string}   token
	   * @param  {string}   word
	   * @param  {Array}    rules
	   * @return {string}
	   */
	  function sanitizeWord (token, word, rules) {
	    // Empty string or doesn't need fixing.
	    if (!token.length || uncountables.hasOwnProperty(token)) {
	      return word;
	    }

	    var len = rules.length;

	    // Iterate over the sanitization rules and use the first one to match.
	    while (len--) {
	      var rule = rules[len];

	      if (rule[0].test(word)) return replace(word, rule);
	    }

	    return word;
	  }

	  /**
	   * Replace a word with the updated word.
	   *
	   * @param  {Object}   replaceMap
	   * @param  {Object}   keepMap
	   * @param  {Array}    rules
	   * @return {Function}
	   */
	  function replaceWord (replaceMap, keepMap, rules) {
	    return function (word) {
	      // Get the correct token and case restoration functions.
	      var token = word.toLowerCase();

	      // Check against the keep object map.
	      if (keepMap.hasOwnProperty(token)) {
	        return restoreCase(word, token);
	      }

	      // Check against the replacement map for a direct word replacement.
	      if (replaceMap.hasOwnProperty(token)) {
	        return restoreCase(word, replaceMap[token]);
	      }

	      // Run all the rules against the word.
	      return sanitizeWord(token, word, rules);
	    };
	  }

	  /**
	   * Check if a word is part of the map.
	   */
	  function checkWord (replaceMap, keepMap, rules, bool) {
	    return function (word) {
	      var token = word.toLowerCase();

	      if (keepMap.hasOwnProperty(token)) return true;
	      if (replaceMap.hasOwnProperty(token)) return false;

	      return sanitizeWord(token, token, rules) === token;
	    };
	  }

	  /**
	   * Pluralize or singularize a word based on the passed in count.
	   *
	   * @param  {string}  word      The word to pluralize
	   * @param  {number}  count     How many of the word exist
	   * @param  {boolean} inclusive Whether to prefix with the number (e.g. 3 ducks)
	   * @return {string}
	   */
	  function pluralize (word, count, inclusive) {
	    var pluralized = count === 1
	      ? pluralize.singular(word) : pluralize.plural(word);

	    return (inclusive ? count + ' ' : '') + pluralized;
	  }

	  /**
	   * Pluralize a word.
	   *
	   * @type {Function}
	   */
	  pluralize.plural = replaceWord(
	    irregularSingles, irregularPlurals, pluralRules
	  );

	  /**
	   * Check if a word is plural.
	   *
	   * @type {Function}
	   */
	  pluralize.isPlural = checkWord(
	    irregularSingles, irregularPlurals, pluralRules
	  );

	  /**
	   * Singularize a word.
	   *
	   * @type {Function}
	   */
	  pluralize.singular = replaceWord(
	    irregularPlurals, irregularSingles, singularRules
	  );

	  /**
	   * Check if a word is singular.
	   *
	   * @type {Function}
	   */
	  pluralize.isSingular = checkWord(
	    irregularPlurals, irregularSingles, singularRules
	  );

	  /**
	   * Add a pluralization rule to the collection.
	   *
	   * @param {(string|RegExp)} rule
	   * @param {string}          replacement
	   */
	  pluralize.addPluralRule = function (rule, replacement) {
	    pluralRules.push([sanitizeRule(rule), replacement]);
	  };

	  /**
	   * Add a singularization rule to the collection.
	   *
	   * @param {(string|RegExp)} rule
	   * @param {string}          replacement
	   */
	  pluralize.addSingularRule = function (rule, replacement) {
	    singularRules.push([sanitizeRule(rule), replacement]);
	  };

	  /**
	   * Add an uncountable word rule.
	   *
	   * @param {(string|RegExp)} word
	   */
	  pluralize.addUncountableRule = function (word) {
	    if (typeof word === 'string') {
	      uncountables[word.toLowerCase()] = true;
	      return;
	    }

	    // Set singular and plural references for the word.
	    pluralize.addPluralRule(word, '$0');
	    pluralize.addSingularRule(word, '$0');
	  };

	  /**
	   * Add an irregular word definition.
	   *
	   * @param {string} single
	   * @param {string} plural
	   */
	  pluralize.addIrregularRule = function (single, plural) {
	    plural = plural.toLowerCase();
	    single = single.toLowerCase();

	    irregularSingles[single] = plural;
	    irregularPlurals[plural] = single;
	  };

	  /**
	   * Irregular rules.
	   */
	  [
	    // Pronouns.
	    ['I', 'we'],
	    ['me', 'us'],
	    ['he', 'they'],
	    ['she', 'they'],
	    ['them', 'them'],
	    ['myself', 'ourselves'],
	    ['yourself', 'yourselves'],
	    ['itself', 'themselves'],
	    ['herself', 'themselves'],
	    ['himself', 'themselves'],
	    ['themself', 'themselves'],
	    ['is', 'are'],
	    ['was', 'were'],
	    ['has', 'have'],
	    ['this', 'these'],
	    ['that', 'those'],
	    // Words ending in with a consonant and `o`.
	    ['echo', 'echoes'],
	    ['dingo', 'dingoes'],
	    ['volcano', 'volcanoes'],
	    ['tornado', 'tornadoes'],
	    ['torpedo', 'torpedoes'],
	    // Ends with `us`.
	    ['genus', 'genera'],
	    ['viscus', 'viscera'],
	    // Ends with `ma`.
	    ['stigma', 'stigmata'],
	    ['stoma', 'stomata'],
	    ['dogma', 'dogmata'],
	    ['lemma', 'lemmata'],
	    ['schema', 'schemata'],
	    ['anathema', 'anathemata'],
	    // Other irregular rules.
	    ['ox', 'oxen'],
	    ['axe', 'axes'],
	    ['die', 'dice'],
	    ['yes', 'yeses'],
	    ['foot', 'feet'],
	    ['eave', 'eaves'],
	    ['goose', 'geese'],
	    ['tooth', 'teeth'],
	    ['quiz', 'quizzes'],
	    ['human', 'humans'],
	    ['proof', 'proofs'],
	    ['carve', 'carves'],
	    ['valve', 'valves'],
	    ['looey', 'looies'],
	    ['thief', 'thieves'],
	    ['groove', 'grooves'],
	    ['pickaxe', 'pickaxes'],
	    ['passerby', 'passersby']
	  ].forEach(function (rule) {
	    return pluralize.addIrregularRule(rule[0], rule[1]);
	  });

	  /**
	   * Pluralization rules.
	   */
	  [
	    [/s?$/i, 's'],
	    [/[^\u0000-\u007F]$/i, '$0'],
	    [/([^aeiou]ese)$/i, '$1'],
	    [/(ax|test)is$/i, '$1es'],
	    [/(alias|[^aou]us|t[lm]as|gas|ris)$/i, '$1es'],
	    [/(e[mn]u)s?$/i, '$1s'],
	    [/([^l]ias|[aeiou]las|[ejzr]as|[iu]am)$/i, '$1'],
	    [/(alumn|syllab|vir|radi|nucle|fung|cact|stimul|termin|bacill|foc|uter|loc|strat)(?:us|i)$/i, '$1i'],
	    [/(alumn|alg|vertebr)(?:a|ae)$/i, '$1ae'],
	    [/(seraph|cherub)(?:im)?$/i, '$1im'],
	    [/(her|at|gr)o$/i, '$1oes'],
	    [/(agend|addend|millenni|dat|extrem|bacteri|desiderat|strat|candelabr|errat|ov|symposi|curricul|automat|quor)(?:a|um)$/i, '$1a'],
	    [/(apheli|hyperbat|periheli|asyndet|noumen|phenomen|criteri|organ|prolegomen|hedr|automat)(?:a|on)$/i, '$1a'],
	    [/sis$/i, 'ses'],
	    [/(?:(kni|wi|li)fe|(ar|l|ea|eo|oa|hoo)f)$/i, '$1$2ves'],
	    [/([^aeiouy]|qu)y$/i, '$1ies'],
	    [/([^ch][ieo][ln])ey$/i, '$1ies'],
	    [/(x|ch|ss|sh|zz)$/i, '$1es'],
	    [/(matr|cod|mur|sil|vert|ind|append)(?:ix|ex)$/i, '$1ices'],
	    [/\b((?:tit)?m|l)(?:ice|ouse)$/i, '$1ice'],
	    [/(pe)(?:rson|ople)$/i, '$1ople'],
	    [/(child)(?:ren)?$/i, '$1ren'],
	    [/eaux$/i, '$0'],
	    [/m[ae]n$/i, 'men'],
	    ['thou', 'you']
	  ].forEach(function (rule) {
	    return pluralize.addPluralRule(rule[0], rule[1]);
	  });

	  /**
	   * Singularization rules.
	   */
	  [
	    [/s$/i, ''],
	    [/(ss)$/i, '$1'],
	    [/(wi|kni|(?:after|half|high|low|mid|non|night|[^\w]|^)li)ves$/i, '$1fe'],
	    [/(ar|(?:wo|[ae])l|[eo][ao])ves$/i, '$1f'],
	    [/ies$/i, 'y'],
	    [/\b([pl]|zomb|(?:neck|cross)?t|coll|faer|food|gen|goon|group|lass|talk|goal|cut)ies$/i, '$1ie'],
	    [/\b(mon|smil)ies$/i, '$1ey'],
	    [/\b((?:tit)?m|l)ice$/i, '$1ouse'],
	    [/(seraph|cherub)im$/i, '$1'],
	    [/(x|ch|ss|sh|zz|tto|go|cho|alias|[^aou]us|t[lm]as|gas|(?:her|at|gr)o|[aeiou]ris)(?:es)?$/i, '$1'],
	    [/(analy|diagno|parenthe|progno|synop|the|empha|cri|ne)(?:sis|ses)$/i, '$1sis'],
	    [/(movie|twelve|abuse|e[mn]u)s$/i, '$1'],
	    [/(test)(?:is|es)$/i, '$1is'],
	    [/(alumn|syllab|vir|radi|nucle|fung|cact|stimul|termin|bacill|foc|uter|loc|strat)(?:us|i)$/i, '$1us'],
	    [/(agend|addend|millenni|dat|extrem|bacteri|desiderat|strat|candelabr|errat|ov|symposi|curricul|quor)a$/i, '$1um'],
	    [/(apheli|hyperbat|periheli|asyndet|noumen|phenomen|criteri|organ|prolegomen|hedr|automat)a$/i, '$1on'],
	    [/(alumn|alg|vertebr)ae$/i, '$1a'],
	    [/(cod|mur|sil|vert|ind)ices$/i, '$1ex'],
	    [/(matr|append)ices$/i, '$1ix'],
	    [/(pe)(rson|ople)$/i, '$1rson'],
	    [/(child)ren$/i, '$1'],
	    [/(eau)x?$/i, '$1'],
	    [/men$/i, 'man']
	  ].forEach(function (rule) {
	    return pluralize.addSingularRule(rule[0], rule[1]);
	  });

	  /**
	   * Uncountable rules.
	   */
	  [
	    // Singular words with no plurals.
	    'adulthood',
	    'advice',
	    'agenda',
	    'aid',
	    'aircraft',
	    'alcohol',
	    'ammo',
	    'analytics',
	    'anime',
	    'athletics',
	    'audio',
	    'bison',
	    'blood',
	    'bream',
	    'buffalo',
	    'butter',
	    'carp',
	    'cash',
	    'chassis',
	    'chess',
	    'clothing',
	    'cod',
	    'commerce',
	    'cooperation',
	    'corps',
	    'debris',
	    'diabetes',
	    'digestion',
	    'elk',
	    'energy',
	    'equipment',
	    'excretion',
	    'expertise',
	    'firmware',
	    'flounder',
	    'fun',
	    'gallows',
	    'garbage',
	    'graffiti',
	    'hardware',
	    'headquarters',
	    'health',
	    'herpes',
	    'highjinks',
	    'homework',
	    'housework',
	    'information',
	    'jeans',
	    'justice',
	    'kudos',
	    'labour',
	    'literature',
	    'machinery',
	    'mackerel',
	    'mail',
	    'media',
	    'mews',
	    'moose',
	    'music',
	    'mud',
	    'manga',
	    'news',
	    'only',
	    'personnel',
	    'pike',
	    'plankton',
	    'pliers',
	    'police',
	    'pollution',
	    'premises',
	    'rain',
	    'research',
	    'rice',
	    'salmon',
	    'scissors',
	    'series',
	    'sewage',
	    'shambles',
	    'shrimp',
	    'software',
	    'species',
	    'staff',
	    'swine',
	    'tennis',
	    'traffic',
	    'transportation',
	    'trout',
	    'tuna',
	    'wealth',
	    'welfare',
	    'whiting',
	    'wildebeest',
	    'wildlife',
	    'you',
	    /pok[eé]mon$/i,
	    // Regexes.
	    /[^aeiou]ese$/i, // "chinese", "japanese"
	    /deer$/i, // "deer", "reindeer"
	    /fish$/i, // "fish", "blowfish", "angelfish"
	    /measles$/i,
	    /o[iu]s$/i, // "carnivorous"
	    /pox$/i, // "chickpox", "smallpox"
	    /sheep$/i
	  ].forEach(pluralize.addUncountableRule);

	  return pluralize;
	});
} (pluralize$1));

var pluralize = pluralizeExports;

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

var css_248z = "\n.react-supervenn-layout {\n  flex: 1 0 auto;\n  overflow: hidden;\n  display: grid;\n  grid:\n      \"ylabel  ycount  items \" min-content\n      \"yticks  data    xcount\" auto\n      \"sets    xticks  xlabel\" min-content\n    /  min-content auto min-content min-content\n  ;\n}\n\n.react-supervenn-data {\n  grid-area: data;\n  display: flex;\n  flex-direction: column;\n  align-items: stretch;\n  justify-items: stretch;\n}\n.react-supervenn-data > div {\n  flex: 1 0 auto;\n  overflow: hidden;\n  display: flex;\n  flex-direction: row;\n  white-space: nowrap;\n  background-color: #eee;\n  color: #eee;\n}\n.react-supervenn-data > div.react-supervenn-alternate {\n  background-color: #ddd;\n  color: #ddd;\n}\n.react-supervenn-cell {\n  border: 2px solid white;\n  cursor: pointer;\n}\n.react-supervenn-cell.react-supervenn-selected {\n  border: 2px solid black;\n}\n\n.react-supervenn-ylabel {\n  flex: 1 0 auto;\n  white-space: nowrap;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  user-select: none;\n}\n\n.react-supervenn-xlabel {\n  grid-area: xlabel;\n  flex: 1 0 auto;\n  white-space: nowrap;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  user-select: none;\n}\n\n.react-supervenn-yticks {\n  grid-area: yticks;\n  display: grid;\n  grid-auto-rows: 1fr;\n}\n.react-supervenn-yticks > div {\n  text-align: right;\n  white-space: break-spaces;\n  padding: 5px;\n  border: 2px solid white;\n  cursor: pointer;\n  background-color: #eee;\n}\n.react-supervenn-yticks > div.react-supervenn-alternate {\n  background-color: #ddd;\n}\n.react-supervenn-yticks > div.react-supervenn-selected {\n  border: 2px solid black;\n}\n\n.react-supervenn-xticks {\n  grid-area: xticks;\n  display: flex;\n  flex-direction: row;\n}\n.react-supervenn-xticks > div {\n  height: 65px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  border: 2px solid white;\n  cursor: pointer;\n  background-color: #eee;\n}\n.react-supervenn-xticks > div > span {\n  user-select: none;\n}\n.react-supervenn-xticks > div.react-supervenn-rotated {\n  position: relative;\n}\n.react-supervenn-xticks > div.react-supervenn-rotated > span {\n  position: absolute;\n  top: 50%;\n  left: 50%;\n  transform: translateX(-50%) translateY(-50%) rotate(-90deg);\n  white-space: nowrap;\n  user-select: none;\n}\n.react-supervenn-xticks > div.react-supervenn-selected {\n  border: 2px solid black;\n}\n\n.react-supervenn-ycount {\n  grid-area: ycount;\n  display: flex;\n  flex-direction: row;\n  background-color: #eee;\n}\n.react-supervenn-ycount > div {\n  cursor: pointer;\n  border: 2px solid white;\n  background-color: #eee;\n  display: flex;\n  flex-direction: column;\n  align-content: stretch;\n  justify-content: flex-end;\n}\n.react-supervenn-ycount > div > div {\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  background-color: #aaa;\n}\n.react-supervenn-ycount > div > div > span {\n  user-select: none;\n}\n\n.react-supervenn-xcount {\n  grid-area: xcount;\n  display: grid;\n  grid-auto-rows: 1fr;\n  background-color: #eee;\n}\n.react-supervenn-xcount > div {\n  cursor: pointer;\n  border: 2px solid white;\n  display: flex;\n  flex-direction: column;\n}\n.react-supervenn-xcount > div.react-supervenn-alternate {\n  background-color: #ddd;\n}\n.react-supervenn-xcount > div > div {\n  flex: 1 0 auto;\n  display: flex;\n  align-items: center;\n  justify-items: flex-end;\n  align-items: center;\n  background-color: #aaa;\n}\n.react-supervenn-xcount > div > div > span {\n  user-select: none;\n}\n\n.react-supervenn-sets {\n  grid-area: sets;\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  justify-items: stretch;\n}\n.react-supervenn-sets > textarea {\n  cursor: pointer;\n  pointer-events: none;\n  width: 100%;\n  border: 2px solid #eee;\n  resize: none;\n  box-sizing: border-box;\n  overflow-y: scroll;\n}\n.react-supervenn-sets > label {\n  cursor: pointer;\n  pointer-events: none;\n  color: #666;\n  white-space: nowrap;\n}\n\n.react-supervenn-items {\n  grid-area: items;\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  justify-items: stretch;\n}\n.react-supervenn-items > textarea {\n  cursor: pointer;\n  pointer-events: none;\n  width: 100%;\n  border: 2px solid #eee;\n  resize: none;\n  box-sizing: border-box;\n  overflow-y: scroll;\n}\n.react-supervenn-items > label {\n  cursor: pointer;\n  pointer-events: none;\n  white-space: pre;\n  color: #666;\n}\n\n.react-supervenn-tooltip {\n  opacity: 0;\n  pointer-events: none;\n  position: absolute;\n  background-color: yellow;\n  transform: translate(-50%, -100%) translate(0px, -10px);\n  width: 16em;\n  padding: 10px;\n  text-align: center;\n  z-index: 99;\n  transition: all 50ms, opacity 200ms;\n}\n";
styleInject(css_248z);

var as_percent = function (x) { return "".concat(100 * x, "%"); };
var maybe_plural = function (singular, x) {
    if (x === 1)
        return "".concat(x, " ").concat(singular);
    else
        return "".concat(x, " ").concat(pluralize(singular));
};
var pad_left_jsx = function (x, n) {
    var jsx = [];
    var x_str = x.toString();
    if (n !== undefined) {
        for (var i = 0; i < n - x_str.length; i++) {
            jsx.push(React.createElement(React.Fragment, null, "\u00A0"));
        }
        jsx.push(React.createElement(React.Fragment, null, x_str));
    }
    return React.createElement("span", { style: { whiteSpace: 'pre', fontFamily: 'monospace' } }, jsx);
};
var maybe_plural_jsx = function (singular, x, n) {
    var x_jsx = pad_left_jsx(x, n);
    if (x === 1)
        return React.createElement(React.Fragment, null,
            x_jsx,
            " \u00A0",
            singular);
    else
        return React.createElement(React.Fragment, null,
            x_jsx,
            " ",
            pluralize(singular));
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
                            color: color_by === 'column' ? color_cycle[col % color_cycle.length] : color_cycle[row % color_cycle.length],
                            userSelect: 'none',
                        } }, chunks[col].length >= effective_min_width_for_annotation ?
                        chunks[col].length
                        : null));
                }
                else {
                    return (React.createElement("div", { key: col, className: "react-supervenn-cell", style: {
                            width: as_percent(col_widths[col] / n_items),
                            userSelect: 'none',
                        } }, chunks[col].length >= effective_min_width_for_annotation ?
                        chunks[col].length
                        : null));
                }
            }))); })),
            React.createElement("div", { className: "react-supervenn-ylabel" }, maybe_plural(set_label, sets.length)),
            React.createElement("div", { className: "react-supervenn-xlabel" }, maybe_plural(item_label, n_items)),
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
            React.createElement("div", { className: "react-supervenn-sets", "data-tip": "Click to copy ".concat(maybe_plural(set_label, Object.keys(selectedRows).length), " to clipboard"), onClick: function (evt) {
                    evt.currentTarget.children[0].select();
                    navigator.clipboard.writeText(Object.keys(selectedRows).map(function (s) { return set_annotations[s]; }).join('\n'));
                } },
                React.createElement("textarea", { readOnly: true, value: Object.keys(selectedRows).map(function (s) { return set_annotations[s]; }).join('\n') }),
                React.createElement("label", null,
                    maybe_plural_jsx(set_label, Object.keys(selectedRows).length, Math.ceil(Math.log10(sets.length))),
                    ", ",
                    React.createElement("u", null, "\uD83D\uDCCB"))),
            React.createElement("div", { className: "react-supervenn-items", "data-tip": "Click to copy ".concat(maybe_plural(item_label, Object.keys(selectedItems).length), " to clipboard"), onClick: function (evt) {
                    evt.currentTarget.children[0].select();
                    navigator.clipboard.writeText(Object.keys(selectedItems).join('\n'));
                } },
                React.createElement("textarea", { readOnly: true, value: Object.keys(selectedItems).join('\n') }),
                React.createElement("label", null,
                    maybe_plural_jsx(item_label, Object.keys(selectedItems).length, Math.ceil(Math.log10(n_items))),
                    ", ",
                    React.createElement("u", null, "\uD83D\uDCCB")))),
        React.createElement("div", { ref: tooltipRef, className: "react-supervenn-tooltip" })));
};

module.exports = ReactSupervenn;
//# sourceMappingURL=index.js.map
