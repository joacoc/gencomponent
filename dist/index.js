'use strict';

var jsxRuntime = require('react/jsx-runtime');
var React = require('react');
var zodToJsonSchema = require('zod-to-json-schema');

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
/* global Reflect, Promise, SuppressedError, Symbol, Iterator */


function __awaiter(thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
}

function __generator(thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
}

typeof SuppressedError === "function" ? SuppressedError : function (error, suppressed, message) {
    var e = new Error(message);
    return e.name = "SuppressedError", e.error = error, e.suppressed = suppressed, e;
};

/**
 * Server action to generate content through genblock
 * This keeps your API endpoint secure by handling the request server-side
 */
function generate(params) {
    return __awaiter(this, void 0, void 0, function () {
        var apiUrl, response, errorText, data, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    apiUrl = process.env.GENERATIVE_API_URL ||
                        "https://02aacx9iw0.execute-api.us-east-2.amazonaws.com/gen";
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 6, , 7]);
                    return [4 /*yield*/, fetch(apiUrl, {
                            method: "POST",
                            headers: {
                                "Content-Type": "application/json",
                            },
                            body: JSON.stringify(params),
                        })];
                case 2:
                    response = _a.sent();
                    if (!!response.ok) return [3 /*break*/, 4];
                    return [4 /*yield*/, response.text()];
                case 3:
                    errorText = _a.sent();
                    throw new Error("API request failed: ".concat(response.status, " ").concat(errorText));
                case 4: return [4 /*yield*/, response.json()];
                case 5:
                    data = _a.sent();
                    return [2 /*return*/, data];
                case 6:
                    error_1 = _a.sent();
                    console.error("Error in generate server action:", error_1);
                    throw error_1;
                case 7: return [2 /*return*/];
            }
        });
    });
}

function useGenerativeBlock(_a) {
    var _this = this;
    var serverAction = _a.serverAction, endpoint = _a.endpoint, schema = _a.schema, prompt = _a.prompt, variants = _a.variants, _b = _a.model, model = _b === void 0 ? "claude-sonnet-4-20250514" : _b, _c = _a.id, id = _c === void 0 ? "" : _c;
    var _d = React.useState({ loading: true, data: null }), _e = _d[0], loading = _e.loading, data = _e.data, setState = _d[1];
    var hasRunRef = React.useRef(false);
    React.useEffect(function () {
        if (hasRunRef.current) {
            return;
        }
        hasRunRef.current = true;
        var asyncOp = function () { return __awaiter(_this, void 0, void 0, function () {
            var schemaString, response, response, data_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        setState({ loading: true, data: null });
                        schemaString = schema
                            ? JSON.stringify(zodToJsonSchema.zodToJsonSchema(schema, "schema"))
                            : undefined;
                        if (!serverAction) return [3 /*break*/, 2];
                        return [4 /*yield*/, serverAction({
                                prompt: prompt,
                                schema: schemaString,
                                variants: variants,
                            })];
                    case 1:
                        response = _a.sent();
                        setState({ loading: false, data: response });
                        return [3 /*break*/, 5];
                    case 2: return [4 /*yield*/, fetch(endpoint || "/api/generate", {
                            method: "POST",
                            headers: {
                                "Content-Type": "application/json",
                            },
                            body: JSON.stringify({
                                prompt: prompt,
                                schema: schemaString,
                                variants: variants,
                            }),
                        })];
                    case 3:
                        response = _a.sent();
                        return [4 /*yield*/, response.json()];
                    case 4:
                        data_1 = _a.sent();
                        setState({ loading: false, data: data_1 });
                        _a.label = 5;
                    case 5: return [2 /*return*/];
                }
            });
        }); };
        asyncOp();
    }, [serverAction, endpoint, prompt, schema, model, id, variants]);
    return {
        loading: loading,
        data: data,
    };
}

function r(e){var t,f,n="";if("string"==typeof e||"number"==typeof e)n+=e;else if("object"==typeof e)if(Array.isArray(e)){var o=e.length;for(t=0;t<o;t++)e[t]&&(f=r(e[t]))&&(n&&(n+=" "),n+=f);}else for(f in e)e[f]&&(n&&(n+=" "),n+=f);return n}function clsx(){for(var e,t,f=0,n="",o=arguments.length;f<o;f++)(e=arguments[f])&&(t=r(e))&&(n&&(n+=" "),n+=t);return n}

const CLASS_PART_SEPARATOR = '-';
const createClassGroupUtils = config => {
  const classMap = createClassMap(config);
  const {
    conflictingClassGroups,
    conflictingClassGroupModifiers
  } = config;
  const getClassGroupId = className => {
    const classParts = className.split(CLASS_PART_SEPARATOR);
    // Classes like `-inset-1` produce an empty string as first classPart. We assume that classes for negative values are used correctly and remove it from classParts.
    if (classParts[0] === '' && classParts.length !== 1) {
      classParts.shift();
    }
    return getGroupRecursive(classParts, classMap) || getGroupIdForArbitraryProperty(className);
  };
  const getConflictingClassGroupIds = (classGroupId, hasPostfixModifier) => {
    const conflicts = conflictingClassGroups[classGroupId] || [];
    if (hasPostfixModifier && conflictingClassGroupModifiers[classGroupId]) {
      return [...conflicts, ...conflictingClassGroupModifiers[classGroupId]];
    }
    return conflicts;
  };
  return {
    getClassGroupId,
    getConflictingClassGroupIds
  };
};
const getGroupRecursive = (classParts, classPartObject) => {
  if (classParts.length === 0) {
    return classPartObject.classGroupId;
  }
  const currentClassPart = classParts[0];
  const nextClassPartObject = classPartObject.nextPart.get(currentClassPart);
  const classGroupFromNextClassPart = nextClassPartObject ? getGroupRecursive(classParts.slice(1), nextClassPartObject) : undefined;
  if (classGroupFromNextClassPart) {
    return classGroupFromNextClassPart;
  }
  if (classPartObject.validators.length === 0) {
    return undefined;
  }
  const classRest = classParts.join(CLASS_PART_SEPARATOR);
  return classPartObject.validators.find(({
    validator
  }) => validator(classRest))?.classGroupId;
};
const arbitraryPropertyRegex = /^\[(.+)\]$/;
const getGroupIdForArbitraryProperty = className => {
  if (arbitraryPropertyRegex.test(className)) {
    const arbitraryPropertyClassName = arbitraryPropertyRegex.exec(className)[1];
    const property = arbitraryPropertyClassName?.substring(0, arbitraryPropertyClassName.indexOf(':'));
    if (property) {
      // I use two dots here because one dot is used as prefix for class groups in plugins
      return 'arbitrary..' + property;
    }
  }
};
/**
 * Exported for testing only
 */
const createClassMap = config => {
  const {
    theme,
    prefix
  } = config;
  const classMap = {
    nextPart: new Map(),
    validators: []
  };
  const prefixedClassGroupEntries = getPrefixedClassGroupEntries(Object.entries(config.classGroups), prefix);
  prefixedClassGroupEntries.forEach(([classGroupId, classGroup]) => {
    processClassesRecursively(classGroup, classMap, classGroupId, theme);
  });
  return classMap;
};
const processClassesRecursively = (classGroup, classPartObject, classGroupId, theme) => {
  classGroup.forEach(classDefinition => {
    if (typeof classDefinition === 'string') {
      const classPartObjectToEdit = classDefinition === '' ? classPartObject : getPart(classPartObject, classDefinition);
      classPartObjectToEdit.classGroupId = classGroupId;
      return;
    }
    if (typeof classDefinition === 'function') {
      if (isThemeGetter(classDefinition)) {
        processClassesRecursively(classDefinition(theme), classPartObject, classGroupId, theme);
        return;
      }
      classPartObject.validators.push({
        validator: classDefinition,
        classGroupId
      });
      return;
    }
    Object.entries(classDefinition).forEach(([key, classGroup]) => {
      processClassesRecursively(classGroup, getPart(classPartObject, key), classGroupId, theme);
    });
  });
};
const getPart = (classPartObject, path) => {
  let currentClassPartObject = classPartObject;
  path.split(CLASS_PART_SEPARATOR).forEach(pathPart => {
    if (!currentClassPartObject.nextPart.has(pathPart)) {
      currentClassPartObject.nextPart.set(pathPart, {
        nextPart: new Map(),
        validators: []
      });
    }
    currentClassPartObject = currentClassPartObject.nextPart.get(pathPart);
  });
  return currentClassPartObject;
};
const isThemeGetter = func => func.isThemeGetter;
const getPrefixedClassGroupEntries = (classGroupEntries, prefix) => {
  if (!prefix) {
    return classGroupEntries;
  }
  return classGroupEntries.map(([classGroupId, classGroup]) => {
    const prefixedClassGroup = classGroup.map(classDefinition => {
      if (typeof classDefinition === 'string') {
        return prefix + classDefinition;
      }
      if (typeof classDefinition === 'object') {
        return Object.fromEntries(Object.entries(classDefinition).map(([key, value]) => [prefix + key, value]));
      }
      return classDefinition;
    });
    return [classGroupId, prefixedClassGroup];
  });
};

// LRU cache inspired from hashlru (https://github.com/dominictarr/hashlru/blob/v1.0.4/index.js) but object replaced with Map to improve performance
const createLruCache = maxCacheSize => {
  if (maxCacheSize < 1) {
    return {
      get: () => undefined,
      set: () => {}
    };
  }
  let cacheSize = 0;
  let cache = new Map();
  let previousCache = new Map();
  const update = (key, value) => {
    cache.set(key, value);
    cacheSize++;
    if (cacheSize > maxCacheSize) {
      cacheSize = 0;
      previousCache = cache;
      cache = new Map();
    }
  };
  return {
    get(key) {
      let value = cache.get(key);
      if (value !== undefined) {
        return value;
      }
      if ((value = previousCache.get(key)) !== undefined) {
        update(key, value);
        return value;
      }
    },
    set(key, value) {
      if (cache.has(key)) {
        cache.set(key, value);
      } else {
        update(key, value);
      }
    }
  };
};
const IMPORTANT_MODIFIER = '!';
const createParseClassName = config => {
  const {
    separator,
    experimentalParseClassName
  } = config;
  const isSeparatorSingleCharacter = separator.length === 1;
  const firstSeparatorCharacter = separator[0];
  const separatorLength = separator.length;
  // parseClassName inspired by https://github.com/tailwindlabs/tailwindcss/blob/v3.2.2/src/util/splitAtTopLevelOnly.js
  const parseClassName = className => {
    const modifiers = [];
    let bracketDepth = 0;
    let modifierStart = 0;
    let postfixModifierPosition;
    for (let index = 0; index < className.length; index++) {
      let currentCharacter = className[index];
      if (bracketDepth === 0) {
        if (currentCharacter === firstSeparatorCharacter && (isSeparatorSingleCharacter || className.slice(index, index + separatorLength) === separator)) {
          modifiers.push(className.slice(modifierStart, index));
          modifierStart = index + separatorLength;
          continue;
        }
        if (currentCharacter === '/') {
          postfixModifierPosition = index;
          continue;
        }
      }
      if (currentCharacter === '[') {
        bracketDepth++;
      } else if (currentCharacter === ']') {
        bracketDepth--;
      }
    }
    const baseClassNameWithImportantModifier = modifiers.length === 0 ? className : className.substring(modifierStart);
    const hasImportantModifier = baseClassNameWithImportantModifier.startsWith(IMPORTANT_MODIFIER);
    const baseClassName = hasImportantModifier ? baseClassNameWithImportantModifier.substring(1) : baseClassNameWithImportantModifier;
    const maybePostfixModifierPosition = postfixModifierPosition && postfixModifierPosition > modifierStart ? postfixModifierPosition - modifierStart : undefined;
    return {
      modifiers,
      hasImportantModifier,
      baseClassName,
      maybePostfixModifierPosition
    };
  };
  if (experimentalParseClassName) {
    return className => experimentalParseClassName({
      className,
      parseClassName
    });
  }
  return parseClassName;
};
/**
 * Sorts modifiers according to following schema:
 * - Predefined modifiers are sorted alphabetically
 * - When an arbitrary variant appears, it must be preserved which modifiers are before and after it
 */
const sortModifiers = modifiers => {
  if (modifiers.length <= 1) {
    return modifiers;
  }
  const sortedModifiers = [];
  let unsortedModifiers = [];
  modifiers.forEach(modifier => {
    const isArbitraryVariant = modifier[0] === '[';
    if (isArbitraryVariant) {
      sortedModifiers.push(...unsortedModifiers.sort(), modifier);
      unsortedModifiers = [];
    } else {
      unsortedModifiers.push(modifier);
    }
  });
  sortedModifiers.push(...unsortedModifiers.sort());
  return sortedModifiers;
};
const createConfigUtils = config => ({
  cache: createLruCache(config.cacheSize),
  parseClassName: createParseClassName(config),
  ...createClassGroupUtils(config)
});
const SPLIT_CLASSES_REGEX = /\s+/;
const mergeClassList = (classList, configUtils) => {
  const {
    parseClassName,
    getClassGroupId,
    getConflictingClassGroupIds
  } = configUtils;
  /**
   * Set of classGroupIds in following format:
   * `{importantModifier}{variantModifiers}{classGroupId}`
   * @example 'float'
   * @example 'hover:focus:bg-color'
   * @example 'md:!pr'
   */
  const classGroupsInConflict = [];
  const classNames = classList.trim().split(SPLIT_CLASSES_REGEX);
  let result = '';
  for (let index = classNames.length - 1; index >= 0; index -= 1) {
    const originalClassName = classNames[index];
    const {
      modifiers,
      hasImportantModifier,
      baseClassName,
      maybePostfixModifierPosition
    } = parseClassName(originalClassName);
    let hasPostfixModifier = Boolean(maybePostfixModifierPosition);
    let classGroupId = getClassGroupId(hasPostfixModifier ? baseClassName.substring(0, maybePostfixModifierPosition) : baseClassName);
    if (!classGroupId) {
      if (!hasPostfixModifier) {
        // Not a Tailwind class
        result = originalClassName + (result.length > 0 ? ' ' + result : result);
        continue;
      }
      classGroupId = getClassGroupId(baseClassName);
      if (!classGroupId) {
        // Not a Tailwind class
        result = originalClassName + (result.length > 0 ? ' ' + result : result);
        continue;
      }
      hasPostfixModifier = false;
    }
    const variantModifier = sortModifiers(modifiers).join(':');
    const modifierId = hasImportantModifier ? variantModifier + IMPORTANT_MODIFIER : variantModifier;
    const classId = modifierId + classGroupId;
    if (classGroupsInConflict.includes(classId)) {
      // Tailwind class omitted due to conflict
      continue;
    }
    classGroupsInConflict.push(classId);
    const conflictGroups = getConflictingClassGroupIds(classGroupId, hasPostfixModifier);
    for (let i = 0; i < conflictGroups.length; ++i) {
      const group = conflictGroups[i];
      classGroupsInConflict.push(modifierId + group);
    }
    // Tailwind class not in conflict
    result = originalClassName + (result.length > 0 ? ' ' + result : result);
  }
  return result;
};

/**
 * The code in this file is copied from https://github.com/lukeed/clsx and modified to suit the needs of tailwind-merge better.
 *
 * Specifically:
 * - Runtime code from https://github.com/lukeed/clsx/blob/v1.2.1/src/index.js
 * - TypeScript types from https://github.com/lukeed/clsx/blob/v1.2.1/clsx.d.ts
 *
 * Original code has MIT license: Copyright (c) Luke Edwards <luke.edwards05@gmail.com> (lukeed.com)
 */
function twJoin() {
  let index = 0;
  let argument;
  let resolvedValue;
  let string = '';
  while (index < arguments.length) {
    if (argument = arguments[index++]) {
      if (resolvedValue = toValue(argument)) {
        string && (string += ' ');
        string += resolvedValue;
      }
    }
  }
  return string;
}
const toValue = mix => {
  if (typeof mix === 'string') {
    return mix;
  }
  let resolvedValue;
  let string = '';
  for (let k = 0; k < mix.length; k++) {
    if (mix[k]) {
      if (resolvedValue = toValue(mix[k])) {
        string && (string += ' ');
        string += resolvedValue;
      }
    }
  }
  return string;
};
function createTailwindMerge(createConfigFirst, ...createConfigRest) {
  let configUtils;
  let cacheGet;
  let cacheSet;
  let functionToCall = initTailwindMerge;
  function initTailwindMerge(classList) {
    const config = createConfigRest.reduce((previousConfig, createConfigCurrent) => createConfigCurrent(previousConfig), createConfigFirst());
    configUtils = createConfigUtils(config);
    cacheGet = configUtils.cache.get;
    cacheSet = configUtils.cache.set;
    functionToCall = tailwindMerge;
    return tailwindMerge(classList);
  }
  function tailwindMerge(classList) {
    const cachedResult = cacheGet(classList);
    if (cachedResult) {
      return cachedResult;
    }
    const result = mergeClassList(classList, configUtils);
    cacheSet(classList, result);
    return result;
  }
  return function callTailwindMerge() {
    return functionToCall(twJoin.apply(null, arguments));
  };
}
const fromTheme = key => {
  const themeGetter = theme => theme[key] || [];
  themeGetter.isThemeGetter = true;
  return themeGetter;
};
const arbitraryValueRegex = /^\[(?:([a-z-]+):)?(.+)\]$/i;
const fractionRegex = /^\d+\/\d+$/;
const stringLengths = /*#__PURE__*/new Set(['px', 'full', 'screen']);
const tshirtUnitRegex = /^(\d+(\.\d+)?)?(xs|sm|md|lg|xl)$/;
const lengthUnitRegex = /\d+(%|px|r?em|[sdl]?v([hwib]|min|max)|pt|pc|in|cm|mm|cap|ch|ex|r?lh|cq(w|h|i|b|min|max))|\b(calc|min|max|clamp)\(.+\)|^0$/;
const colorFunctionRegex = /^(rgba?|hsla?|hwb|(ok)?(lab|lch))\(.+\)$/;
// Shadow always begins with x and y offset separated by underscore optionally prepended by inset
const shadowRegex = /^(inset_)?-?((\d+)?\.?(\d+)[a-z]+|0)_-?((\d+)?\.?(\d+)[a-z]+|0)/;
const imageRegex = /^(url|image|image-set|cross-fade|element|(repeating-)?(linear|radial|conic)-gradient)\(.+\)$/;
const isLength = value => isNumber(value) || stringLengths.has(value) || fractionRegex.test(value);
const isArbitraryLength = value => getIsArbitraryValue(value, 'length', isLengthOnly);
const isNumber = value => Boolean(value) && !Number.isNaN(Number(value));
const isArbitraryNumber = value => getIsArbitraryValue(value, 'number', isNumber);
const isInteger = value => Boolean(value) && Number.isInteger(Number(value));
const isPercent = value => value.endsWith('%') && isNumber(value.slice(0, -1));
const isArbitraryValue = value => arbitraryValueRegex.test(value);
const isTshirtSize = value => tshirtUnitRegex.test(value);
const sizeLabels = /*#__PURE__*/new Set(['length', 'size', 'percentage']);
const isArbitrarySize = value => getIsArbitraryValue(value, sizeLabels, isNever);
const isArbitraryPosition = value => getIsArbitraryValue(value, 'position', isNever);
const imageLabels = /*#__PURE__*/new Set(['image', 'url']);
const isArbitraryImage = value => getIsArbitraryValue(value, imageLabels, isImage);
const isArbitraryShadow = value => getIsArbitraryValue(value, '', isShadow);
const isAny = () => true;
const getIsArbitraryValue = (value, label, testValue) => {
  const result = arbitraryValueRegex.exec(value);
  if (result) {
    if (result[1]) {
      return typeof label === 'string' ? result[1] === label : label.has(result[1]);
    }
    return testValue(result[2]);
  }
  return false;
};
const isLengthOnly = value =>
// `colorFunctionRegex` check is necessary because color functions can have percentages in them which which would be incorrectly classified as lengths.
// For example, `hsl(0 0% 0%)` would be classified as a length without this check.
// I could also use lookbehind assertion in `lengthUnitRegex` but that isn't supported widely enough.
lengthUnitRegex.test(value) && !colorFunctionRegex.test(value);
const isNever = () => false;
const isShadow = value => shadowRegex.test(value);
const isImage = value => imageRegex.test(value);
const getDefaultConfig = () => {
  const colors = fromTheme('colors');
  const spacing = fromTheme('spacing');
  const blur = fromTheme('blur');
  const brightness = fromTheme('brightness');
  const borderColor = fromTheme('borderColor');
  const borderRadius = fromTheme('borderRadius');
  const borderSpacing = fromTheme('borderSpacing');
  const borderWidth = fromTheme('borderWidth');
  const contrast = fromTheme('contrast');
  const grayscale = fromTheme('grayscale');
  const hueRotate = fromTheme('hueRotate');
  const invert = fromTheme('invert');
  const gap = fromTheme('gap');
  const gradientColorStops = fromTheme('gradientColorStops');
  const gradientColorStopPositions = fromTheme('gradientColorStopPositions');
  const inset = fromTheme('inset');
  const margin = fromTheme('margin');
  const opacity = fromTheme('opacity');
  const padding = fromTheme('padding');
  const saturate = fromTheme('saturate');
  const scale = fromTheme('scale');
  const sepia = fromTheme('sepia');
  const skew = fromTheme('skew');
  const space = fromTheme('space');
  const translate = fromTheme('translate');
  const getOverscroll = () => ['auto', 'contain', 'none'];
  const getOverflow = () => ['auto', 'hidden', 'clip', 'visible', 'scroll'];
  const getSpacingWithAutoAndArbitrary = () => ['auto', isArbitraryValue, spacing];
  const getSpacingWithArbitrary = () => [isArbitraryValue, spacing];
  const getLengthWithEmptyAndArbitrary = () => ['', isLength, isArbitraryLength];
  const getNumberWithAutoAndArbitrary = () => ['auto', isNumber, isArbitraryValue];
  const getPositions = () => ['bottom', 'center', 'left', 'left-bottom', 'left-top', 'right', 'right-bottom', 'right-top', 'top'];
  const getLineStyles = () => ['solid', 'dashed', 'dotted', 'double', 'none'];
  const getBlendModes = () => ['normal', 'multiply', 'screen', 'overlay', 'darken', 'lighten', 'color-dodge', 'color-burn', 'hard-light', 'soft-light', 'difference', 'exclusion', 'hue', 'saturation', 'color', 'luminosity'];
  const getAlign = () => ['start', 'end', 'center', 'between', 'around', 'evenly', 'stretch'];
  const getZeroAndEmpty = () => ['', '0', isArbitraryValue];
  const getBreaks = () => ['auto', 'avoid', 'all', 'avoid-page', 'page', 'left', 'right', 'column'];
  const getNumberAndArbitrary = () => [isNumber, isArbitraryValue];
  return {
    cacheSize: 500,
    separator: ':',
    theme: {
      colors: [isAny],
      spacing: [isLength, isArbitraryLength],
      blur: ['none', '', isTshirtSize, isArbitraryValue],
      brightness: getNumberAndArbitrary(),
      borderColor: [colors],
      borderRadius: ['none', '', 'full', isTshirtSize, isArbitraryValue],
      borderSpacing: getSpacingWithArbitrary(),
      borderWidth: getLengthWithEmptyAndArbitrary(),
      contrast: getNumberAndArbitrary(),
      grayscale: getZeroAndEmpty(),
      hueRotate: getNumberAndArbitrary(),
      invert: getZeroAndEmpty(),
      gap: getSpacingWithArbitrary(),
      gradientColorStops: [colors],
      gradientColorStopPositions: [isPercent, isArbitraryLength],
      inset: getSpacingWithAutoAndArbitrary(),
      margin: getSpacingWithAutoAndArbitrary(),
      opacity: getNumberAndArbitrary(),
      padding: getSpacingWithArbitrary(),
      saturate: getNumberAndArbitrary(),
      scale: getNumberAndArbitrary(),
      sepia: getZeroAndEmpty(),
      skew: getNumberAndArbitrary(),
      space: getSpacingWithArbitrary(),
      translate: getSpacingWithArbitrary()
    },
    classGroups: {
      // Layout
      /**
       * Aspect Ratio
       * @see https://tailwindcss.com/docs/aspect-ratio
       */
      aspect: [{
        aspect: ['auto', 'square', 'video', isArbitraryValue]
      }],
      /**
       * Container
       * @see https://tailwindcss.com/docs/container
       */
      container: ['container'],
      /**
       * Columns
       * @see https://tailwindcss.com/docs/columns
       */
      columns: [{
        columns: [isTshirtSize]
      }],
      /**
       * Break After
       * @see https://tailwindcss.com/docs/break-after
       */
      'break-after': [{
        'break-after': getBreaks()
      }],
      /**
       * Break Before
       * @see https://tailwindcss.com/docs/break-before
       */
      'break-before': [{
        'break-before': getBreaks()
      }],
      /**
       * Break Inside
       * @see https://tailwindcss.com/docs/break-inside
       */
      'break-inside': [{
        'break-inside': ['auto', 'avoid', 'avoid-page', 'avoid-column']
      }],
      /**
       * Box Decoration Break
       * @see https://tailwindcss.com/docs/box-decoration-break
       */
      'box-decoration': [{
        'box-decoration': ['slice', 'clone']
      }],
      /**
       * Box Sizing
       * @see https://tailwindcss.com/docs/box-sizing
       */
      box: [{
        box: ['border', 'content']
      }],
      /**
       * Display
       * @see https://tailwindcss.com/docs/display
       */
      display: ['block', 'inline-block', 'inline', 'flex', 'inline-flex', 'table', 'inline-table', 'table-caption', 'table-cell', 'table-column', 'table-column-group', 'table-footer-group', 'table-header-group', 'table-row-group', 'table-row', 'flow-root', 'grid', 'inline-grid', 'contents', 'list-item', 'hidden'],
      /**
       * Floats
       * @see https://tailwindcss.com/docs/float
       */
      float: [{
        float: ['right', 'left', 'none', 'start', 'end']
      }],
      /**
       * Clear
       * @see https://tailwindcss.com/docs/clear
       */
      clear: [{
        clear: ['left', 'right', 'both', 'none', 'start', 'end']
      }],
      /**
       * Isolation
       * @see https://tailwindcss.com/docs/isolation
       */
      isolation: ['isolate', 'isolation-auto'],
      /**
       * Object Fit
       * @see https://tailwindcss.com/docs/object-fit
       */
      'object-fit': [{
        object: ['contain', 'cover', 'fill', 'none', 'scale-down']
      }],
      /**
       * Object Position
       * @see https://tailwindcss.com/docs/object-position
       */
      'object-position': [{
        object: [...getPositions(), isArbitraryValue]
      }],
      /**
       * Overflow
       * @see https://tailwindcss.com/docs/overflow
       */
      overflow: [{
        overflow: getOverflow()
      }],
      /**
       * Overflow X
       * @see https://tailwindcss.com/docs/overflow
       */
      'overflow-x': [{
        'overflow-x': getOverflow()
      }],
      /**
       * Overflow Y
       * @see https://tailwindcss.com/docs/overflow
       */
      'overflow-y': [{
        'overflow-y': getOverflow()
      }],
      /**
       * Overscroll Behavior
       * @see https://tailwindcss.com/docs/overscroll-behavior
       */
      overscroll: [{
        overscroll: getOverscroll()
      }],
      /**
       * Overscroll Behavior X
       * @see https://tailwindcss.com/docs/overscroll-behavior
       */
      'overscroll-x': [{
        'overscroll-x': getOverscroll()
      }],
      /**
       * Overscroll Behavior Y
       * @see https://tailwindcss.com/docs/overscroll-behavior
       */
      'overscroll-y': [{
        'overscroll-y': getOverscroll()
      }],
      /**
       * Position
       * @see https://tailwindcss.com/docs/position
       */
      position: ['static', 'fixed', 'absolute', 'relative', 'sticky'],
      /**
       * Top / Right / Bottom / Left
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      inset: [{
        inset: [inset]
      }],
      /**
       * Right / Left
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      'inset-x': [{
        'inset-x': [inset]
      }],
      /**
       * Top / Bottom
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      'inset-y': [{
        'inset-y': [inset]
      }],
      /**
       * Start
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      start: [{
        start: [inset]
      }],
      /**
       * End
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      end: [{
        end: [inset]
      }],
      /**
       * Top
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      top: [{
        top: [inset]
      }],
      /**
       * Right
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      right: [{
        right: [inset]
      }],
      /**
       * Bottom
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      bottom: [{
        bottom: [inset]
      }],
      /**
       * Left
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      left: [{
        left: [inset]
      }],
      /**
       * Visibility
       * @see https://tailwindcss.com/docs/visibility
       */
      visibility: ['visible', 'invisible', 'collapse'],
      /**
       * Z-Index
       * @see https://tailwindcss.com/docs/z-index
       */
      z: [{
        z: ['auto', isInteger, isArbitraryValue]
      }],
      // Flexbox and Grid
      /**
       * Flex Basis
       * @see https://tailwindcss.com/docs/flex-basis
       */
      basis: [{
        basis: getSpacingWithAutoAndArbitrary()
      }],
      /**
       * Flex Direction
       * @see https://tailwindcss.com/docs/flex-direction
       */
      'flex-direction': [{
        flex: ['row', 'row-reverse', 'col', 'col-reverse']
      }],
      /**
       * Flex Wrap
       * @see https://tailwindcss.com/docs/flex-wrap
       */
      'flex-wrap': [{
        flex: ['wrap', 'wrap-reverse', 'nowrap']
      }],
      /**
       * Flex
       * @see https://tailwindcss.com/docs/flex
       */
      flex: [{
        flex: ['1', 'auto', 'initial', 'none', isArbitraryValue]
      }],
      /**
       * Flex Grow
       * @see https://tailwindcss.com/docs/flex-grow
       */
      grow: [{
        grow: getZeroAndEmpty()
      }],
      /**
       * Flex Shrink
       * @see https://tailwindcss.com/docs/flex-shrink
       */
      shrink: [{
        shrink: getZeroAndEmpty()
      }],
      /**
       * Order
       * @see https://tailwindcss.com/docs/order
       */
      order: [{
        order: ['first', 'last', 'none', isInteger, isArbitraryValue]
      }],
      /**
       * Grid Template Columns
       * @see https://tailwindcss.com/docs/grid-template-columns
       */
      'grid-cols': [{
        'grid-cols': [isAny]
      }],
      /**
       * Grid Column Start / End
       * @see https://tailwindcss.com/docs/grid-column
       */
      'col-start-end': [{
        col: ['auto', {
          span: ['full', isInteger, isArbitraryValue]
        }, isArbitraryValue]
      }],
      /**
       * Grid Column Start
       * @see https://tailwindcss.com/docs/grid-column
       */
      'col-start': [{
        'col-start': getNumberWithAutoAndArbitrary()
      }],
      /**
       * Grid Column End
       * @see https://tailwindcss.com/docs/grid-column
       */
      'col-end': [{
        'col-end': getNumberWithAutoAndArbitrary()
      }],
      /**
       * Grid Template Rows
       * @see https://tailwindcss.com/docs/grid-template-rows
       */
      'grid-rows': [{
        'grid-rows': [isAny]
      }],
      /**
       * Grid Row Start / End
       * @see https://tailwindcss.com/docs/grid-row
       */
      'row-start-end': [{
        row: ['auto', {
          span: [isInteger, isArbitraryValue]
        }, isArbitraryValue]
      }],
      /**
       * Grid Row Start
       * @see https://tailwindcss.com/docs/grid-row
       */
      'row-start': [{
        'row-start': getNumberWithAutoAndArbitrary()
      }],
      /**
       * Grid Row End
       * @see https://tailwindcss.com/docs/grid-row
       */
      'row-end': [{
        'row-end': getNumberWithAutoAndArbitrary()
      }],
      /**
       * Grid Auto Flow
       * @see https://tailwindcss.com/docs/grid-auto-flow
       */
      'grid-flow': [{
        'grid-flow': ['row', 'col', 'dense', 'row-dense', 'col-dense']
      }],
      /**
       * Grid Auto Columns
       * @see https://tailwindcss.com/docs/grid-auto-columns
       */
      'auto-cols': [{
        'auto-cols': ['auto', 'min', 'max', 'fr', isArbitraryValue]
      }],
      /**
       * Grid Auto Rows
       * @see https://tailwindcss.com/docs/grid-auto-rows
       */
      'auto-rows': [{
        'auto-rows': ['auto', 'min', 'max', 'fr', isArbitraryValue]
      }],
      /**
       * Gap
       * @see https://tailwindcss.com/docs/gap
       */
      gap: [{
        gap: [gap]
      }],
      /**
       * Gap X
       * @see https://tailwindcss.com/docs/gap
       */
      'gap-x': [{
        'gap-x': [gap]
      }],
      /**
       * Gap Y
       * @see https://tailwindcss.com/docs/gap
       */
      'gap-y': [{
        'gap-y': [gap]
      }],
      /**
       * Justify Content
       * @see https://tailwindcss.com/docs/justify-content
       */
      'justify-content': [{
        justify: ['normal', ...getAlign()]
      }],
      /**
       * Justify Items
       * @see https://tailwindcss.com/docs/justify-items
       */
      'justify-items': [{
        'justify-items': ['start', 'end', 'center', 'stretch']
      }],
      /**
       * Justify Self
       * @see https://tailwindcss.com/docs/justify-self
       */
      'justify-self': [{
        'justify-self': ['auto', 'start', 'end', 'center', 'stretch']
      }],
      /**
       * Align Content
       * @see https://tailwindcss.com/docs/align-content
       */
      'align-content': [{
        content: ['normal', ...getAlign(), 'baseline']
      }],
      /**
       * Align Items
       * @see https://tailwindcss.com/docs/align-items
       */
      'align-items': [{
        items: ['start', 'end', 'center', 'baseline', 'stretch']
      }],
      /**
       * Align Self
       * @see https://tailwindcss.com/docs/align-self
       */
      'align-self': [{
        self: ['auto', 'start', 'end', 'center', 'stretch', 'baseline']
      }],
      /**
       * Place Content
       * @see https://tailwindcss.com/docs/place-content
       */
      'place-content': [{
        'place-content': [...getAlign(), 'baseline']
      }],
      /**
       * Place Items
       * @see https://tailwindcss.com/docs/place-items
       */
      'place-items': [{
        'place-items': ['start', 'end', 'center', 'baseline', 'stretch']
      }],
      /**
       * Place Self
       * @see https://tailwindcss.com/docs/place-self
       */
      'place-self': [{
        'place-self': ['auto', 'start', 'end', 'center', 'stretch']
      }],
      // Spacing
      /**
       * Padding
       * @see https://tailwindcss.com/docs/padding
       */
      p: [{
        p: [padding]
      }],
      /**
       * Padding X
       * @see https://tailwindcss.com/docs/padding
       */
      px: [{
        px: [padding]
      }],
      /**
       * Padding Y
       * @see https://tailwindcss.com/docs/padding
       */
      py: [{
        py: [padding]
      }],
      /**
       * Padding Start
       * @see https://tailwindcss.com/docs/padding
       */
      ps: [{
        ps: [padding]
      }],
      /**
       * Padding End
       * @see https://tailwindcss.com/docs/padding
       */
      pe: [{
        pe: [padding]
      }],
      /**
       * Padding Top
       * @see https://tailwindcss.com/docs/padding
       */
      pt: [{
        pt: [padding]
      }],
      /**
       * Padding Right
       * @see https://tailwindcss.com/docs/padding
       */
      pr: [{
        pr: [padding]
      }],
      /**
       * Padding Bottom
       * @see https://tailwindcss.com/docs/padding
       */
      pb: [{
        pb: [padding]
      }],
      /**
       * Padding Left
       * @see https://tailwindcss.com/docs/padding
       */
      pl: [{
        pl: [padding]
      }],
      /**
       * Margin
       * @see https://tailwindcss.com/docs/margin
       */
      m: [{
        m: [margin]
      }],
      /**
       * Margin X
       * @see https://tailwindcss.com/docs/margin
       */
      mx: [{
        mx: [margin]
      }],
      /**
       * Margin Y
       * @see https://tailwindcss.com/docs/margin
       */
      my: [{
        my: [margin]
      }],
      /**
       * Margin Start
       * @see https://tailwindcss.com/docs/margin
       */
      ms: [{
        ms: [margin]
      }],
      /**
       * Margin End
       * @see https://tailwindcss.com/docs/margin
       */
      me: [{
        me: [margin]
      }],
      /**
       * Margin Top
       * @see https://tailwindcss.com/docs/margin
       */
      mt: [{
        mt: [margin]
      }],
      /**
       * Margin Right
       * @see https://tailwindcss.com/docs/margin
       */
      mr: [{
        mr: [margin]
      }],
      /**
       * Margin Bottom
       * @see https://tailwindcss.com/docs/margin
       */
      mb: [{
        mb: [margin]
      }],
      /**
       * Margin Left
       * @see https://tailwindcss.com/docs/margin
       */
      ml: [{
        ml: [margin]
      }],
      /**
       * Space Between X
       * @see https://tailwindcss.com/docs/space
       */
      'space-x': [{
        'space-x': [space]
      }],
      /**
       * Space Between X Reverse
       * @see https://tailwindcss.com/docs/space
       */
      'space-x-reverse': ['space-x-reverse'],
      /**
       * Space Between Y
       * @see https://tailwindcss.com/docs/space
       */
      'space-y': [{
        'space-y': [space]
      }],
      /**
       * Space Between Y Reverse
       * @see https://tailwindcss.com/docs/space
       */
      'space-y-reverse': ['space-y-reverse'],
      // Sizing
      /**
       * Width
       * @see https://tailwindcss.com/docs/width
       */
      w: [{
        w: ['auto', 'min', 'max', 'fit', 'svw', 'lvw', 'dvw', isArbitraryValue, spacing]
      }],
      /**
       * Min-Width
       * @see https://tailwindcss.com/docs/min-width
       */
      'min-w': [{
        'min-w': [isArbitraryValue, spacing, 'min', 'max', 'fit']
      }],
      /**
       * Max-Width
       * @see https://tailwindcss.com/docs/max-width
       */
      'max-w': [{
        'max-w': [isArbitraryValue, spacing, 'none', 'full', 'min', 'max', 'fit', 'prose', {
          screen: [isTshirtSize]
        }, isTshirtSize]
      }],
      /**
       * Height
       * @see https://tailwindcss.com/docs/height
       */
      h: [{
        h: [isArbitraryValue, spacing, 'auto', 'min', 'max', 'fit', 'svh', 'lvh', 'dvh']
      }],
      /**
       * Min-Height
       * @see https://tailwindcss.com/docs/min-height
       */
      'min-h': [{
        'min-h': [isArbitraryValue, spacing, 'min', 'max', 'fit', 'svh', 'lvh', 'dvh']
      }],
      /**
       * Max-Height
       * @see https://tailwindcss.com/docs/max-height
       */
      'max-h': [{
        'max-h': [isArbitraryValue, spacing, 'min', 'max', 'fit', 'svh', 'lvh', 'dvh']
      }],
      /**
       * Size
       * @see https://tailwindcss.com/docs/size
       */
      size: [{
        size: [isArbitraryValue, spacing, 'auto', 'min', 'max', 'fit']
      }],
      // Typography
      /**
       * Font Size
       * @see https://tailwindcss.com/docs/font-size
       */
      'font-size': [{
        text: ['base', isTshirtSize, isArbitraryLength]
      }],
      /**
       * Font Smoothing
       * @see https://tailwindcss.com/docs/font-smoothing
       */
      'font-smoothing': ['antialiased', 'subpixel-antialiased'],
      /**
       * Font Style
       * @see https://tailwindcss.com/docs/font-style
       */
      'font-style': ['italic', 'not-italic'],
      /**
       * Font Weight
       * @see https://tailwindcss.com/docs/font-weight
       */
      'font-weight': [{
        font: ['thin', 'extralight', 'light', 'normal', 'medium', 'semibold', 'bold', 'extrabold', 'black', isArbitraryNumber]
      }],
      /**
       * Font Family
       * @see https://tailwindcss.com/docs/font-family
       */
      'font-family': [{
        font: [isAny]
      }],
      /**
       * Font Variant Numeric
       * @see https://tailwindcss.com/docs/font-variant-numeric
       */
      'fvn-normal': ['normal-nums'],
      /**
       * Font Variant Numeric
       * @see https://tailwindcss.com/docs/font-variant-numeric
       */
      'fvn-ordinal': ['ordinal'],
      /**
       * Font Variant Numeric
       * @see https://tailwindcss.com/docs/font-variant-numeric
       */
      'fvn-slashed-zero': ['slashed-zero'],
      /**
       * Font Variant Numeric
       * @see https://tailwindcss.com/docs/font-variant-numeric
       */
      'fvn-figure': ['lining-nums', 'oldstyle-nums'],
      /**
       * Font Variant Numeric
       * @see https://tailwindcss.com/docs/font-variant-numeric
       */
      'fvn-spacing': ['proportional-nums', 'tabular-nums'],
      /**
       * Font Variant Numeric
       * @see https://tailwindcss.com/docs/font-variant-numeric
       */
      'fvn-fraction': ['diagonal-fractions', 'stacked-fractions'],
      /**
       * Letter Spacing
       * @see https://tailwindcss.com/docs/letter-spacing
       */
      tracking: [{
        tracking: ['tighter', 'tight', 'normal', 'wide', 'wider', 'widest', isArbitraryValue]
      }],
      /**
       * Line Clamp
       * @see https://tailwindcss.com/docs/line-clamp
       */
      'line-clamp': [{
        'line-clamp': ['none', isNumber, isArbitraryNumber]
      }],
      /**
       * Line Height
       * @see https://tailwindcss.com/docs/line-height
       */
      leading: [{
        leading: ['none', 'tight', 'snug', 'normal', 'relaxed', 'loose', isLength, isArbitraryValue]
      }],
      /**
       * List Style Image
       * @see https://tailwindcss.com/docs/list-style-image
       */
      'list-image': [{
        'list-image': ['none', isArbitraryValue]
      }],
      /**
       * List Style Type
       * @see https://tailwindcss.com/docs/list-style-type
       */
      'list-style-type': [{
        list: ['none', 'disc', 'decimal', isArbitraryValue]
      }],
      /**
       * List Style Position
       * @see https://tailwindcss.com/docs/list-style-position
       */
      'list-style-position': [{
        list: ['inside', 'outside']
      }],
      /**
       * Placeholder Color
       * @deprecated since Tailwind CSS v3.0.0
       * @see https://tailwindcss.com/docs/placeholder-color
       */
      'placeholder-color': [{
        placeholder: [colors]
      }],
      /**
       * Placeholder Opacity
       * @see https://tailwindcss.com/docs/placeholder-opacity
       */
      'placeholder-opacity': [{
        'placeholder-opacity': [opacity]
      }],
      /**
       * Text Alignment
       * @see https://tailwindcss.com/docs/text-align
       */
      'text-alignment': [{
        text: ['left', 'center', 'right', 'justify', 'start', 'end']
      }],
      /**
       * Text Color
       * @see https://tailwindcss.com/docs/text-color
       */
      'text-color': [{
        text: [colors]
      }],
      /**
       * Text Opacity
       * @see https://tailwindcss.com/docs/text-opacity
       */
      'text-opacity': [{
        'text-opacity': [opacity]
      }],
      /**
       * Text Decoration
       * @see https://tailwindcss.com/docs/text-decoration
       */
      'text-decoration': ['underline', 'overline', 'line-through', 'no-underline'],
      /**
       * Text Decoration Style
       * @see https://tailwindcss.com/docs/text-decoration-style
       */
      'text-decoration-style': [{
        decoration: [...getLineStyles(), 'wavy']
      }],
      /**
       * Text Decoration Thickness
       * @see https://tailwindcss.com/docs/text-decoration-thickness
       */
      'text-decoration-thickness': [{
        decoration: ['auto', 'from-font', isLength, isArbitraryLength]
      }],
      /**
       * Text Underline Offset
       * @see https://tailwindcss.com/docs/text-underline-offset
       */
      'underline-offset': [{
        'underline-offset': ['auto', isLength, isArbitraryValue]
      }],
      /**
       * Text Decoration Color
       * @see https://tailwindcss.com/docs/text-decoration-color
       */
      'text-decoration-color': [{
        decoration: [colors]
      }],
      /**
       * Text Transform
       * @see https://tailwindcss.com/docs/text-transform
       */
      'text-transform': ['uppercase', 'lowercase', 'capitalize', 'normal-case'],
      /**
       * Text Overflow
       * @see https://tailwindcss.com/docs/text-overflow
       */
      'text-overflow': ['truncate', 'text-ellipsis', 'text-clip'],
      /**
       * Text Wrap
       * @see https://tailwindcss.com/docs/text-wrap
       */
      'text-wrap': [{
        text: ['wrap', 'nowrap', 'balance', 'pretty']
      }],
      /**
       * Text Indent
       * @see https://tailwindcss.com/docs/text-indent
       */
      indent: [{
        indent: getSpacingWithArbitrary()
      }],
      /**
       * Vertical Alignment
       * @see https://tailwindcss.com/docs/vertical-align
       */
      'vertical-align': [{
        align: ['baseline', 'top', 'middle', 'bottom', 'text-top', 'text-bottom', 'sub', 'super', isArbitraryValue]
      }],
      /**
       * Whitespace
       * @see https://tailwindcss.com/docs/whitespace
       */
      whitespace: [{
        whitespace: ['normal', 'nowrap', 'pre', 'pre-line', 'pre-wrap', 'break-spaces']
      }],
      /**
       * Word Break
       * @see https://tailwindcss.com/docs/word-break
       */
      break: [{
        break: ['normal', 'words', 'all', 'keep']
      }],
      /**
       * Hyphens
       * @see https://tailwindcss.com/docs/hyphens
       */
      hyphens: [{
        hyphens: ['none', 'manual', 'auto']
      }],
      /**
       * Content
       * @see https://tailwindcss.com/docs/content
       */
      content: [{
        content: ['none', isArbitraryValue]
      }],
      // Backgrounds
      /**
       * Background Attachment
       * @see https://tailwindcss.com/docs/background-attachment
       */
      'bg-attachment': [{
        bg: ['fixed', 'local', 'scroll']
      }],
      /**
       * Background Clip
       * @see https://tailwindcss.com/docs/background-clip
       */
      'bg-clip': [{
        'bg-clip': ['border', 'padding', 'content', 'text']
      }],
      /**
       * Background Opacity
       * @deprecated since Tailwind CSS v3.0.0
       * @see https://tailwindcss.com/docs/background-opacity
       */
      'bg-opacity': [{
        'bg-opacity': [opacity]
      }],
      /**
       * Background Origin
       * @see https://tailwindcss.com/docs/background-origin
       */
      'bg-origin': [{
        'bg-origin': ['border', 'padding', 'content']
      }],
      /**
       * Background Position
       * @see https://tailwindcss.com/docs/background-position
       */
      'bg-position': [{
        bg: [...getPositions(), isArbitraryPosition]
      }],
      /**
       * Background Repeat
       * @see https://tailwindcss.com/docs/background-repeat
       */
      'bg-repeat': [{
        bg: ['no-repeat', {
          repeat: ['', 'x', 'y', 'round', 'space']
        }]
      }],
      /**
       * Background Size
       * @see https://tailwindcss.com/docs/background-size
       */
      'bg-size': [{
        bg: ['auto', 'cover', 'contain', isArbitrarySize]
      }],
      /**
       * Background Image
       * @see https://tailwindcss.com/docs/background-image
       */
      'bg-image': [{
        bg: ['none', {
          'gradient-to': ['t', 'tr', 'r', 'br', 'b', 'bl', 'l', 'tl']
        }, isArbitraryImage]
      }],
      /**
       * Background Color
       * @see https://tailwindcss.com/docs/background-color
       */
      'bg-color': [{
        bg: [colors]
      }],
      /**
       * Gradient Color Stops From Position
       * @see https://tailwindcss.com/docs/gradient-color-stops
       */
      'gradient-from-pos': [{
        from: [gradientColorStopPositions]
      }],
      /**
       * Gradient Color Stops Via Position
       * @see https://tailwindcss.com/docs/gradient-color-stops
       */
      'gradient-via-pos': [{
        via: [gradientColorStopPositions]
      }],
      /**
       * Gradient Color Stops To Position
       * @see https://tailwindcss.com/docs/gradient-color-stops
       */
      'gradient-to-pos': [{
        to: [gradientColorStopPositions]
      }],
      /**
       * Gradient Color Stops From
       * @see https://tailwindcss.com/docs/gradient-color-stops
       */
      'gradient-from': [{
        from: [gradientColorStops]
      }],
      /**
       * Gradient Color Stops Via
       * @see https://tailwindcss.com/docs/gradient-color-stops
       */
      'gradient-via': [{
        via: [gradientColorStops]
      }],
      /**
       * Gradient Color Stops To
       * @see https://tailwindcss.com/docs/gradient-color-stops
       */
      'gradient-to': [{
        to: [gradientColorStops]
      }],
      // Borders
      /**
       * Border Radius
       * @see https://tailwindcss.com/docs/border-radius
       */
      rounded: [{
        rounded: [borderRadius]
      }],
      /**
       * Border Radius Start
       * @see https://tailwindcss.com/docs/border-radius
       */
      'rounded-s': [{
        'rounded-s': [borderRadius]
      }],
      /**
       * Border Radius End
       * @see https://tailwindcss.com/docs/border-radius
       */
      'rounded-e': [{
        'rounded-e': [borderRadius]
      }],
      /**
       * Border Radius Top
       * @see https://tailwindcss.com/docs/border-radius
       */
      'rounded-t': [{
        'rounded-t': [borderRadius]
      }],
      /**
       * Border Radius Right
       * @see https://tailwindcss.com/docs/border-radius
       */
      'rounded-r': [{
        'rounded-r': [borderRadius]
      }],
      /**
       * Border Radius Bottom
       * @see https://tailwindcss.com/docs/border-radius
       */
      'rounded-b': [{
        'rounded-b': [borderRadius]
      }],
      /**
       * Border Radius Left
       * @see https://tailwindcss.com/docs/border-radius
       */
      'rounded-l': [{
        'rounded-l': [borderRadius]
      }],
      /**
       * Border Radius Start Start
       * @see https://tailwindcss.com/docs/border-radius
       */
      'rounded-ss': [{
        'rounded-ss': [borderRadius]
      }],
      /**
       * Border Radius Start End
       * @see https://tailwindcss.com/docs/border-radius
       */
      'rounded-se': [{
        'rounded-se': [borderRadius]
      }],
      /**
       * Border Radius End End
       * @see https://tailwindcss.com/docs/border-radius
       */
      'rounded-ee': [{
        'rounded-ee': [borderRadius]
      }],
      /**
       * Border Radius End Start
       * @see https://tailwindcss.com/docs/border-radius
       */
      'rounded-es': [{
        'rounded-es': [borderRadius]
      }],
      /**
       * Border Radius Top Left
       * @see https://tailwindcss.com/docs/border-radius
       */
      'rounded-tl': [{
        'rounded-tl': [borderRadius]
      }],
      /**
       * Border Radius Top Right
       * @see https://tailwindcss.com/docs/border-radius
       */
      'rounded-tr': [{
        'rounded-tr': [borderRadius]
      }],
      /**
       * Border Radius Bottom Right
       * @see https://tailwindcss.com/docs/border-radius
       */
      'rounded-br': [{
        'rounded-br': [borderRadius]
      }],
      /**
       * Border Radius Bottom Left
       * @see https://tailwindcss.com/docs/border-radius
       */
      'rounded-bl': [{
        'rounded-bl': [borderRadius]
      }],
      /**
       * Border Width
       * @see https://tailwindcss.com/docs/border-width
       */
      'border-w': [{
        border: [borderWidth]
      }],
      /**
       * Border Width X
       * @see https://tailwindcss.com/docs/border-width
       */
      'border-w-x': [{
        'border-x': [borderWidth]
      }],
      /**
       * Border Width Y
       * @see https://tailwindcss.com/docs/border-width
       */
      'border-w-y': [{
        'border-y': [borderWidth]
      }],
      /**
       * Border Width Start
       * @see https://tailwindcss.com/docs/border-width
       */
      'border-w-s': [{
        'border-s': [borderWidth]
      }],
      /**
       * Border Width End
       * @see https://tailwindcss.com/docs/border-width
       */
      'border-w-e': [{
        'border-e': [borderWidth]
      }],
      /**
       * Border Width Top
       * @see https://tailwindcss.com/docs/border-width
       */
      'border-w-t': [{
        'border-t': [borderWidth]
      }],
      /**
       * Border Width Right
       * @see https://tailwindcss.com/docs/border-width
       */
      'border-w-r': [{
        'border-r': [borderWidth]
      }],
      /**
       * Border Width Bottom
       * @see https://tailwindcss.com/docs/border-width
       */
      'border-w-b': [{
        'border-b': [borderWidth]
      }],
      /**
       * Border Width Left
       * @see https://tailwindcss.com/docs/border-width
       */
      'border-w-l': [{
        'border-l': [borderWidth]
      }],
      /**
       * Border Opacity
       * @see https://tailwindcss.com/docs/border-opacity
       */
      'border-opacity': [{
        'border-opacity': [opacity]
      }],
      /**
       * Border Style
       * @see https://tailwindcss.com/docs/border-style
       */
      'border-style': [{
        border: [...getLineStyles(), 'hidden']
      }],
      /**
       * Divide Width X
       * @see https://tailwindcss.com/docs/divide-width
       */
      'divide-x': [{
        'divide-x': [borderWidth]
      }],
      /**
       * Divide Width X Reverse
       * @see https://tailwindcss.com/docs/divide-width
       */
      'divide-x-reverse': ['divide-x-reverse'],
      /**
       * Divide Width Y
       * @see https://tailwindcss.com/docs/divide-width
       */
      'divide-y': [{
        'divide-y': [borderWidth]
      }],
      /**
       * Divide Width Y Reverse
       * @see https://tailwindcss.com/docs/divide-width
       */
      'divide-y-reverse': ['divide-y-reverse'],
      /**
       * Divide Opacity
       * @see https://tailwindcss.com/docs/divide-opacity
       */
      'divide-opacity': [{
        'divide-opacity': [opacity]
      }],
      /**
       * Divide Style
       * @see https://tailwindcss.com/docs/divide-style
       */
      'divide-style': [{
        divide: getLineStyles()
      }],
      /**
       * Border Color
       * @see https://tailwindcss.com/docs/border-color
       */
      'border-color': [{
        border: [borderColor]
      }],
      /**
       * Border Color X
       * @see https://tailwindcss.com/docs/border-color
       */
      'border-color-x': [{
        'border-x': [borderColor]
      }],
      /**
       * Border Color Y
       * @see https://tailwindcss.com/docs/border-color
       */
      'border-color-y': [{
        'border-y': [borderColor]
      }],
      /**
       * Border Color S
       * @see https://tailwindcss.com/docs/border-color
       */
      'border-color-s': [{
        'border-s': [borderColor]
      }],
      /**
       * Border Color E
       * @see https://tailwindcss.com/docs/border-color
       */
      'border-color-e': [{
        'border-e': [borderColor]
      }],
      /**
       * Border Color Top
       * @see https://tailwindcss.com/docs/border-color
       */
      'border-color-t': [{
        'border-t': [borderColor]
      }],
      /**
       * Border Color Right
       * @see https://tailwindcss.com/docs/border-color
       */
      'border-color-r': [{
        'border-r': [borderColor]
      }],
      /**
       * Border Color Bottom
       * @see https://tailwindcss.com/docs/border-color
       */
      'border-color-b': [{
        'border-b': [borderColor]
      }],
      /**
       * Border Color Left
       * @see https://tailwindcss.com/docs/border-color
       */
      'border-color-l': [{
        'border-l': [borderColor]
      }],
      /**
       * Divide Color
       * @see https://tailwindcss.com/docs/divide-color
       */
      'divide-color': [{
        divide: [borderColor]
      }],
      /**
       * Outline Style
       * @see https://tailwindcss.com/docs/outline-style
       */
      'outline-style': [{
        outline: ['', ...getLineStyles()]
      }],
      /**
       * Outline Offset
       * @see https://tailwindcss.com/docs/outline-offset
       */
      'outline-offset': [{
        'outline-offset': [isLength, isArbitraryValue]
      }],
      /**
       * Outline Width
       * @see https://tailwindcss.com/docs/outline-width
       */
      'outline-w': [{
        outline: [isLength, isArbitraryLength]
      }],
      /**
       * Outline Color
       * @see https://tailwindcss.com/docs/outline-color
       */
      'outline-color': [{
        outline: [colors]
      }],
      /**
       * Ring Width
       * @see https://tailwindcss.com/docs/ring-width
       */
      'ring-w': [{
        ring: getLengthWithEmptyAndArbitrary()
      }],
      /**
       * Ring Width Inset
       * @see https://tailwindcss.com/docs/ring-width
       */
      'ring-w-inset': ['ring-inset'],
      /**
       * Ring Color
       * @see https://tailwindcss.com/docs/ring-color
       */
      'ring-color': [{
        ring: [colors]
      }],
      /**
       * Ring Opacity
       * @see https://tailwindcss.com/docs/ring-opacity
       */
      'ring-opacity': [{
        'ring-opacity': [opacity]
      }],
      /**
       * Ring Offset Width
       * @see https://tailwindcss.com/docs/ring-offset-width
       */
      'ring-offset-w': [{
        'ring-offset': [isLength, isArbitraryLength]
      }],
      /**
       * Ring Offset Color
       * @see https://tailwindcss.com/docs/ring-offset-color
       */
      'ring-offset-color': [{
        'ring-offset': [colors]
      }],
      // Effects
      /**
       * Box Shadow
       * @see https://tailwindcss.com/docs/box-shadow
       */
      shadow: [{
        shadow: ['', 'inner', 'none', isTshirtSize, isArbitraryShadow]
      }],
      /**
       * Box Shadow Color
       * @see https://tailwindcss.com/docs/box-shadow-color
       */
      'shadow-color': [{
        shadow: [isAny]
      }],
      /**
       * Opacity
       * @see https://tailwindcss.com/docs/opacity
       */
      opacity: [{
        opacity: [opacity]
      }],
      /**
       * Mix Blend Mode
       * @see https://tailwindcss.com/docs/mix-blend-mode
       */
      'mix-blend': [{
        'mix-blend': [...getBlendModes(), 'plus-lighter', 'plus-darker']
      }],
      /**
       * Background Blend Mode
       * @see https://tailwindcss.com/docs/background-blend-mode
       */
      'bg-blend': [{
        'bg-blend': getBlendModes()
      }],
      // Filters
      /**
       * Filter
       * @deprecated since Tailwind CSS v3.0.0
       * @see https://tailwindcss.com/docs/filter
       */
      filter: [{
        filter: ['', 'none']
      }],
      /**
       * Blur
       * @see https://tailwindcss.com/docs/blur
       */
      blur: [{
        blur: [blur]
      }],
      /**
       * Brightness
       * @see https://tailwindcss.com/docs/brightness
       */
      brightness: [{
        brightness: [brightness]
      }],
      /**
       * Contrast
       * @see https://tailwindcss.com/docs/contrast
       */
      contrast: [{
        contrast: [contrast]
      }],
      /**
       * Drop Shadow
       * @see https://tailwindcss.com/docs/drop-shadow
       */
      'drop-shadow': [{
        'drop-shadow': ['', 'none', isTshirtSize, isArbitraryValue]
      }],
      /**
       * Grayscale
       * @see https://tailwindcss.com/docs/grayscale
       */
      grayscale: [{
        grayscale: [grayscale]
      }],
      /**
       * Hue Rotate
       * @see https://tailwindcss.com/docs/hue-rotate
       */
      'hue-rotate': [{
        'hue-rotate': [hueRotate]
      }],
      /**
       * Invert
       * @see https://tailwindcss.com/docs/invert
       */
      invert: [{
        invert: [invert]
      }],
      /**
       * Saturate
       * @see https://tailwindcss.com/docs/saturate
       */
      saturate: [{
        saturate: [saturate]
      }],
      /**
       * Sepia
       * @see https://tailwindcss.com/docs/sepia
       */
      sepia: [{
        sepia: [sepia]
      }],
      /**
       * Backdrop Filter
       * @deprecated since Tailwind CSS v3.0.0
       * @see https://tailwindcss.com/docs/backdrop-filter
       */
      'backdrop-filter': [{
        'backdrop-filter': ['', 'none']
      }],
      /**
       * Backdrop Blur
       * @see https://tailwindcss.com/docs/backdrop-blur
       */
      'backdrop-blur': [{
        'backdrop-blur': [blur]
      }],
      /**
       * Backdrop Brightness
       * @see https://tailwindcss.com/docs/backdrop-brightness
       */
      'backdrop-brightness': [{
        'backdrop-brightness': [brightness]
      }],
      /**
       * Backdrop Contrast
       * @see https://tailwindcss.com/docs/backdrop-contrast
       */
      'backdrop-contrast': [{
        'backdrop-contrast': [contrast]
      }],
      /**
       * Backdrop Grayscale
       * @see https://tailwindcss.com/docs/backdrop-grayscale
       */
      'backdrop-grayscale': [{
        'backdrop-grayscale': [grayscale]
      }],
      /**
       * Backdrop Hue Rotate
       * @see https://tailwindcss.com/docs/backdrop-hue-rotate
       */
      'backdrop-hue-rotate': [{
        'backdrop-hue-rotate': [hueRotate]
      }],
      /**
       * Backdrop Invert
       * @see https://tailwindcss.com/docs/backdrop-invert
       */
      'backdrop-invert': [{
        'backdrop-invert': [invert]
      }],
      /**
       * Backdrop Opacity
       * @see https://tailwindcss.com/docs/backdrop-opacity
       */
      'backdrop-opacity': [{
        'backdrop-opacity': [opacity]
      }],
      /**
       * Backdrop Saturate
       * @see https://tailwindcss.com/docs/backdrop-saturate
       */
      'backdrop-saturate': [{
        'backdrop-saturate': [saturate]
      }],
      /**
       * Backdrop Sepia
       * @see https://tailwindcss.com/docs/backdrop-sepia
       */
      'backdrop-sepia': [{
        'backdrop-sepia': [sepia]
      }],
      // Tables
      /**
       * Border Collapse
       * @see https://tailwindcss.com/docs/border-collapse
       */
      'border-collapse': [{
        border: ['collapse', 'separate']
      }],
      /**
       * Border Spacing
       * @see https://tailwindcss.com/docs/border-spacing
       */
      'border-spacing': [{
        'border-spacing': [borderSpacing]
      }],
      /**
       * Border Spacing X
       * @see https://tailwindcss.com/docs/border-spacing
       */
      'border-spacing-x': [{
        'border-spacing-x': [borderSpacing]
      }],
      /**
       * Border Spacing Y
       * @see https://tailwindcss.com/docs/border-spacing
       */
      'border-spacing-y': [{
        'border-spacing-y': [borderSpacing]
      }],
      /**
       * Table Layout
       * @see https://tailwindcss.com/docs/table-layout
       */
      'table-layout': [{
        table: ['auto', 'fixed']
      }],
      /**
       * Caption Side
       * @see https://tailwindcss.com/docs/caption-side
       */
      caption: [{
        caption: ['top', 'bottom']
      }],
      // Transitions and Animation
      /**
       * Tranisition Property
       * @see https://tailwindcss.com/docs/transition-property
       */
      transition: [{
        transition: ['none', 'all', '', 'colors', 'opacity', 'shadow', 'transform', isArbitraryValue]
      }],
      /**
       * Transition Duration
       * @see https://tailwindcss.com/docs/transition-duration
       */
      duration: [{
        duration: getNumberAndArbitrary()
      }],
      /**
       * Transition Timing Function
       * @see https://tailwindcss.com/docs/transition-timing-function
       */
      ease: [{
        ease: ['linear', 'in', 'out', 'in-out', isArbitraryValue]
      }],
      /**
       * Transition Delay
       * @see https://tailwindcss.com/docs/transition-delay
       */
      delay: [{
        delay: getNumberAndArbitrary()
      }],
      /**
       * Animation
       * @see https://tailwindcss.com/docs/animation
       */
      animate: [{
        animate: ['none', 'spin', 'ping', 'pulse', 'bounce', isArbitraryValue]
      }],
      // Transforms
      /**
       * Transform
       * @see https://tailwindcss.com/docs/transform
       */
      transform: [{
        transform: ['', 'gpu', 'none']
      }],
      /**
       * Scale
       * @see https://tailwindcss.com/docs/scale
       */
      scale: [{
        scale: [scale]
      }],
      /**
       * Scale X
       * @see https://tailwindcss.com/docs/scale
       */
      'scale-x': [{
        'scale-x': [scale]
      }],
      /**
       * Scale Y
       * @see https://tailwindcss.com/docs/scale
       */
      'scale-y': [{
        'scale-y': [scale]
      }],
      /**
       * Rotate
       * @see https://tailwindcss.com/docs/rotate
       */
      rotate: [{
        rotate: [isInteger, isArbitraryValue]
      }],
      /**
       * Translate X
       * @see https://tailwindcss.com/docs/translate
       */
      'translate-x': [{
        'translate-x': [translate]
      }],
      /**
       * Translate Y
       * @see https://tailwindcss.com/docs/translate
       */
      'translate-y': [{
        'translate-y': [translate]
      }],
      /**
       * Skew X
       * @see https://tailwindcss.com/docs/skew
       */
      'skew-x': [{
        'skew-x': [skew]
      }],
      /**
       * Skew Y
       * @see https://tailwindcss.com/docs/skew
       */
      'skew-y': [{
        'skew-y': [skew]
      }],
      /**
       * Transform Origin
       * @see https://tailwindcss.com/docs/transform-origin
       */
      'transform-origin': [{
        origin: ['center', 'top', 'top-right', 'right', 'bottom-right', 'bottom', 'bottom-left', 'left', 'top-left', isArbitraryValue]
      }],
      // Interactivity
      /**
       * Accent Color
       * @see https://tailwindcss.com/docs/accent-color
       */
      accent: [{
        accent: ['auto', colors]
      }],
      /**
       * Appearance
       * @see https://tailwindcss.com/docs/appearance
       */
      appearance: [{
        appearance: ['none', 'auto']
      }],
      /**
       * Cursor
       * @see https://tailwindcss.com/docs/cursor
       */
      cursor: [{
        cursor: ['auto', 'default', 'pointer', 'wait', 'text', 'move', 'help', 'not-allowed', 'none', 'context-menu', 'progress', 'cell', 'crosshair', 'vertical-text', 'alias', 'copy', 'no-drop', 'grab', 'grabbing', 'all-scroll', 'col-resize', 'row-resize', 'n-resize', 'e-resize', 's-resize', 'w-resize', 'ne-resize', 'nw-resize', 'se-resize', 'sw-resize', 'ew-resize', 'ns-resize', 'nesw-resize', 'nwse-resize', 'zoom-in', 'zoom-out', isArbitraryValue]
      }],
      /**
       * Caret Color
       * @see https://tailwindcss.com/docs/just-in-time-mode#caret-color-utilities
       */
      'caret-color': [{
        caret: [colors]
      }],
      /**
       * Pointer Events
       * @see https://tailwindcss.com/docs/pointer-events
       */
      'pointer-events': [{
        'pointer-events': ['none', 'auto']
      }],
      /**
       * Resize
       * @see https://tailwindcss.com/docs/resize
       */
      resize: [{
        resize: ['none', 'y', 'x', '']
      }],
      /**
       * Scroll Behavior
       * @see https://tailwindcss.com/docs/scroll-behavior
       */
      'scroll-behavior': [{
        scroll: ['auto', 'smooth']
      }],
      /**
       * Scroll Margin
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      'scroll-m': [{
        'scroll-m': getSpacingWithArbitrary()
      }],
      /**
       * Scroll Margin X
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      'scroll-mx': [{
        'scroll-mx': getSpacingWithArbitrary()
      }],
      /**
       * Scroll Margin Y
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      'scroll-my': [{
        'scroll-my': getSpacingWithArbitrary()
      }],
      /**
       * Scroll Margin Start
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      'scroll-ms': [{
        'scroll-ms': getSpacingWithArbitrary()
      }],
      /**
       * Scroll Margin End
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      'scroll-me': [{
        'scroll-me': getSpacingWithArbitrary()
      }],
      /**
       * Scroll Margin Top
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      'scroll-mt': [{
        'scroll-mt': getSpacingWithArbitrary()
      }],
      /**
       * Scroll Margin Right
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      'scroll-mr': [{
        'scroll-mr': getSpacingWithArbitrary()
      }],
      /**
       * Scroll Margin Bottom
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      'scroll-mb': [{
        'scroll-mb': getSpacingWithArbitrary()
      }],
      /**
       * Scroll Margin Left
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      'scroll-ml': [{
        'scroll-ml': getSpacingWithArbitrary()
      }],
      /**
       * Scroll Padding
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      'scroll-p': [{
        'scroll-p': getSpacingWithArbitrary()
      }],
      /**
       * Scroll Padding X
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      'scroll-px': [{
        'scroll-px': getSpacingWithArbitrary()
      }],
      /**
       * Scroll Padding Y
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      'scroll-py': [{
        'scroll-py': getSpacingWithArbitrary()
      }],
      /**
       * Scroll Padding Start
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      'scroll-ps': [{
        'scroll-ps': getSpacingWithArbitrary()
      }],
      /**
       * Scroll Padding End
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      'scroll-pe': [{
        'scroll-pe': getSpacingWithArbitrary()
      }],
      /**
       * Scroll Padding Top
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      'scroll-pt': [{
        'scroll-pt': getSpacingWithArbitrary()
      }],
      /**
       * Scroll Padding Right
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      'scroll-pr': [{
        'scroll-pr': getSpacingWithArbitrary()
      }],
      /**
       * Scroll Padding Bottom
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      'scroll-pb': [{
        'scroll-pb': getSpacingWithArbitrary()
      }],
      /**
       * Scroll Padding Left
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      'scroll-pl': [{
        'scroll-pl': getSpacingWithArbitrary()
      }],
      /**
       * Scroll Snap Align
       * @see https://tailwindcss.com/docs/scroll-snap-align
       */
      'snap-align': [{
        snap: ['start', 'end', 'center', 'align-none']
      }],
      /**
       * Scroll Snap Stop
       * @see https://tailwindcss.com/docs/scroll-snap-stop
       */
      'snap-stop': [{
        snap: ['normal', 'always']
      }],
      /**
       * Scroll Snap Type
       * @see https://tailwindcss.com/docs/scroll-snap-type
       */
      'snap-type': [{
        snap: ['none', 'x', 'y', 'both']
      }],
      /**
       * Scroll Snap Type Strictness
       * @see https://tailwindcss.com/docs/scroll-snap-type
       */
      'snap-strictness': [{
        snap: ['mandatory', 'proximity']
      }],
      /**
       * Touch Action
       * @see https://tailwindcss.com/docs/touch-action
       */
      touch: [{
        touch: ['auto', 'none', 'manipulation']
      }],
      /**
       * Touch Action X
       * @see https://tailwindcss.com/docs/touch-action
       */
      'touch-x': [{
        'touch-pan': ['x', 'left', 'right']
      }],
      /**
       * Touch Action Y
       * @see https://tailwindcss.com/docs/touch-action
       */
      'touch-y': [{
        'touch-pan': ['y', 'up', 'down']
      }],
      /**
       * Touch Action Pinch Zoom
       * @see https://tailwindcss.com/docs/touch-action
       */
      'touch-pz': ['touch-pinch-zoom'],
      /**
       * User Select
       * @see https://tailwindcss.com/docs/user-select
       */
      select: [{
        select: ['none', 'text', 'all', 'auto']
      }],
      /**
       * Will Change
       * @see https://tailwindcss.com/docs/will-change
       */
      'will-change': [{
        'will-change': ['auto', 'scroll', 'contents', 'transform', isArbitraryValue]
      }],
      // SVG
      /**
       * Fill
       * @see https://tailwindcss.com/docs/fill
       */
      fill: [{
        fill: [colors, 'none']
      }],
      /**
       * Stroke Width
       * @see https://tailwindcss.com/docs/stroke-width
       */
      'stroke-w': [{
        stroke: [isLength, isArbitraryLength, isArbitraryNumber]
      }],
      /**
       * Stroke
       * @see https://tailwindcss.com/docs/stroke
       */
      stroke: [{
        stroke: [colors, 'none']
      }],
      // Accessibility
      /**
       * Screen Readers
       * @see https://tailwindcss.com/docs/screen-readers
       */
      sr: ['sr-only', 'not-sr-only'],
      /**
       * Forced Color Adjust
       * @see https://tailwindcss.com/docs/forced-color-adjust
       */
      'forced-color-adjust': [{
        'forced-color-adjust': ['auto', 'none']
      }]
    },
    conflictingClassGroups: {
      overflow: ['overflow-x', 'overflow-y'],
      overscroll: ['overscroll-x', 'overscroll-y'],
      inset: ['inset-x', 'inset-y', 'start', 'end', 'top', 'right', 'bottom', 'left'],
      'inset-x': ['right', 'left'],
      'inset-y': ['top', 'bottom'],
      flex: ['basis', 'grow', 'shrink'],
      gap: ['gap-x', 'gap-y'],
      p: ['px', 'py', 'ps', 'pe', 'pt', 'pr', 'pb', 'pl'],
      px: ['pr', 'pl'],
      py: ['pt', 'pb'],
      m: ['mx', 'my', 'ms', 'me', 'mt', 'mr', 'mb', 'ml'],
      mx: ['mr', 'ml'],
      my: ['mt', 'mb'],
      size: ['w', 'h'],
      'font-size': ['leading'],
      'fvn-normal': ['fvn-ordinal', 'fvn-slashed-zero', 'fvn-figure', 'fvn-spacing', 'fvn-fraction'],
      'fvn-ordinal': ['fvn-normal'],
      'fvn-slashed-zero': ['fvn-normal'],
      'fvn-figure': ['fvn-normal'],
      'fvn-spacing': ['fvn-normal'],
      'fvn-fraction': ['fvn-normal'],
      'line-clamp': ['display', 'overflow'],
      rounded: ['rounded-s', 'rounded-e', 'rounded-t', 'rounded-r', 'rounded-b', 'rounded-l', 'rounded-ss', 'rounded-se', 'rounded-ee', 'rounded-es', 'rounded-tl', 'rounded-tr', 'rounded-br', 'rounded-bl'],
      'rounded-s': ['rounded-ss', 'rounded-es'],
      'rounded-e': ['rounded-se', 'rounded-ee'],
      'rounded-t': ['rounded-tl', 'rounded-tr'],
      'rounded-r': ['rounded-tr', 'rounded-br'],
      'rounded-b': ['rounded-br', 'rounded-bl'],
      'rounded-l': ['rounded-tl', 'rounded-bl'],
      'border-spacing': ['border-spacing-x', 'border-spacing-y'],
      'border-w': ['border-w-s', 'border-w-e', 'border-w-t', 'border-w-r', 'border-w-b', 'border-w-l'],
      'border-w-x': ['border-w-r', 'border-w-l'],
      'border-w-y': ['border-w-t', 'border-w-b'],
      'border-color': ['border-color-s', 'border-color-e', 'border-color-t', 'border-color-r', 'border-color-b', 'border-color-l'],
      'border-color-x': ['border-color-r', 'border-color-l'],
      'border-color-y': ['border-color-t', 'border-color-b'],
      'scroll-m': ['scroll-mx', 'scroll-my', 'scroll-ms', 'scroll-me', 'scroll-mt', 'scroll-mr', 'scroll-mb', 'scroll-ml'],
      'scroll-mx': ['scroll-mr', 'scroll-ml'],
      'scroll-my': ['scroll-mt', 'scroll-mb'],
      'scroll-p': ['scroll-px', 'scroll-py', 'scroll-ps', 'scroll-pe', 'scroll-pt', 'scroll-pr', 'scroll-pb', 'scroll-pl'],
      'scroll-px': ['scroll-pr', 'scroll-pl'],
      'scroll-py': ['scroll-pt', 'scroll-pb'],
      touch: ['touch-x', 'touch-y', 'touch-pz'],
      'touch-x': ['touch'],
      'touch-y': ['touch'],
      'touch-pz': ['touch']
    },
    conflictingClassGroupModifiers: {
      'font-size': ['leading']
    }
  };
};
const twMerge = /*#__PURE__*/createTailwindMerge(getDefaultConfig);

function cn() {
    var inputs = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        inputs[_i] = arguments[_i];
    }
    return twMerge(clsx(inputs));
}

function _extends() {
  return _extends = Object.assign ? Object.assign.bind() : function (n) {
    for (var e = 1; e < arguments.length; e++) {
      var t = arguments[e];
      for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]);
    }
    return n;
  }, _extends.apply(null, arguments);
}

var commonjsGlobal = typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

function getDefaultExportFromCjs (x) {
	return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, 'default') ? x['default'] : x;
}

var index_umd$1 = {exports: {}};

var index_umd = {exports: {}};

/*!
 *  @module      auto-console-group v1.2.9
 *
 *  @description Automagically group console logs in the browser console.
 *
 *  @author      David J. Bradshaw <info@iframe-resizer.com>
 *  @see         {@link https://github.com/davidjbradshaw/auto-console-group#readme}
 *  @license     MIT
 *
 *  @copyright  (c) 2025, David J. Bradshaw. All rights reserved.
 */

var hasRequiredIndex_umd;

function requireIndex_umd () {
	if (hasRequiredIndex_umd) return index_umd.exports;
	hasRequiredIndex_umd = 1;
	(function (module, exports) {
		(function(s,i){i(exports);})(commonjsGlobal,function(s){const i="font-weight: normal;",T="font-weight: bold;",L="font-style: italic;",$=i+L,I="color: #135CD2;",M="color: #A9C7FB;",D="color: #1F1F1F;",R="color: #E3E3E3;",l="default",y="error",C="log",H=Object.freeze({assert:true,error:true,warn:true}),O={expand:true,defaultEvent:void 0,event:void 0,label:"AutoConsoleGroup",showTime:true},S={profile:0,profileEnd:0,timeStamp:0,trace:0},B=o=>{const t=o.event||o.defaultEvent;return t?`${t}`:""},f=Object.assign(console);function F(){const o=new Date,t=(p,m)=>o[p]().toString().padStart(m,"0"),c=t("getHours",2),u=t("getMinutes",2),r=t("getSeconds",2),a=t("getMilliseconds",3);return `@ ${c}:${u}:${r}.${a}`}const{fromEntries:N,keys:U}=Object,j=o=>[o,f[o]],_=o=>t=>[t,function(c){o[t]=c;}],h=(o,t)=>N(U(o).map(t));function b(o={}){const t={},c={},u=[],r={...O,expand:!o.collapsed||O.expanded,...o};let a="";function p(){u.length=0,a="";}function m(){delete r.event,p();}const Q=()=>u.some(([e])=>e in H),q=()=>Q()?true:!!r.expand,x=()=>r.showTime?a:"";function v(){if(u.length===0){m();return}f[q()?"group":"groupCollapsed"](`%c${r.label}%c ${B(r)} %c${x()}`,i,T,$);for(const[e,...n]of u)f.assert(e in f,`Unknown console method: ${e}`),e in f&&f[e](...n);f.groupEnd(),m();}function g(){a===""&&(a=F());}function V(e){g(),r.event=e;}function W(){g(),queueMicrotask(()=>queueMicrotask(v));}function d(e,...n){u.length===0&&W(),u.push([e,...n]);}const z=e=>(...n)=>{let E;try{E=e(...n);}catch(w){if(Error.prototype.isPrototypeOf(w))d(y,w);else throw w}return E};function K(e,...n){e||d("assert",e,...n);}function X(e=l){c[e]?c[e]+=1:c[e]=1,d(C,`${e}: ${c[e]}`);}function J(e=l){delete c[e];}function Y(e=l){g(),t[e]=performance.now();}function A(e=l,...n){if(!t[e]){d("timeLog",e,...n);return}const E=performance.now()-t[e];d(C,`${e}: ${E} ms`,...n);}function Z(e=l){A(e),delete t[e];}const ee=e=>[e,(...n)=>d(e,...n)];return {...h(r,_(r)),...h(console,ee),...h(S,j),assert:K,count:X,countReset:J,endAutoGroup:v,errorBoundary:z,event:V,purge:p,time:Y,timeEnd:Z,timeLog:A,touch:g}}const G=typeof window>"u"||typeof window.matchMedia!="function"?false:window.matchMedia("(prefers-color-scheme: dark)").matches,k=G?M:I,P=G?R:D;s.BOLD=T,s.FOREGROUND=P,s.HIGHLIGHT=k,s.ITALIC=L,s.NORMAL=i,s.default=b,Object.defineProperties(s,{__esModule:{value:true},[Symbol.toStringTag]:{value:"Module"}});}); 
	} (index_umd, index_umd.exports));
	return index_umd.exports;
}

/*!
 *  @preserve
 *  
 *  @module      iframe-resizer/core 5.4.6 (umd) - 2025-04-24
 *
 *  @license     GPL-3.0 for non-commercial use only.
 *               For commercial use, you must purchase a license from
 *               https://iframe-resizer.com/pricing
 * 
 *  @description Keep same and cross domain iFrames sized to their content 
 *
 *  @author      David J. Bradshaw <info@iframe-resizer.com>
 * 
 *  @see         {@link https://iframe-resizer.com}
 * 
 *  @copyright  (c) 2013 - 2025, David J. Bradshaw. All rights reserved.
 */

(function (module, exports) {
	!function(e,t){module.exports=t(requireIndex_umd());}(commonjsGlobal,(function(e){const t="5.4.6",i="[iFrameSizer]",o=Object.freeze({max:1,scroll:1,bodyScroll:1,documentElementScroll:1}),n="onload",r="init",a=Object.freeze({[n]:1,[r]:1}),s="expanded",l="collapsed",c=Object.freeze({[s]:1,[l]:1}),u=(e,t,i,o)=>e.addEventListener(t,i,o||false),d=(e,t,i)=>e.removeEventListener(t,i,false),f=e=>{if(!e)return "";let t=-559038744,i=1103547984;for(let o,n=0;n<e.length;n++)o=e.codePointAt(n),t=Math.imul(t^o,2246822519),i=Math.imul(i^o,3266489917);return t^=Math.imul(t^i>>>15,1935289751),i^=Math.imul(i^t>>>15,3405138345),t^=i>>>16,i^=t>>>16,(2097152*(i>>>0)+(t>>>11)).toString(36)},p=e=>e.replace(/[A-Za-z]/g,(e=>String.fromCodePoint((e<="Z"?90:122)>=(e=e.codePointAt(0)+19)?e:e-26))),h=["<iy><yi>Puchspk Spjluzl Rlf</><iy><iy>","<iy><yi>Tpzzpun Spjluzl Rlf</><iy><iy>","Aopz spiyhyf pz hchpshisl dpao ivao Jvttlyjphs huk Vwlu-Zvbyjl spjluzlz.<iy><iy><i>Jvttlyjphs Spjluzl</><iy>Mvy jvttlyjphs bzl, <p>pmyhtl-ylzpgly</> ylxbpylz h svd jvza vul aptl spjluzl mll. Mvy tvyl pumvythapvu cpzpa <b>oaawz://pmyhtl-ylzpgly.jvt/wypjpun</>.<iy><iy><i>Vwlu Zvbyjl Spjluzl</><iy>Pm fvb hyl bzpun aopz spiyhyf pu h uvu-jvttlyjphs vwlu zvbyjl wyvqlja aolu fvb jhu bzl pa mvy myll bukly aol alytz vm aol NWS C3 Spjluzl. Av jvumpyt fvb hjjlwa aolzl alytz, wslhzl zla aol <i>spjluzl</> rlf pu <p>pmyhtl-ylzpgly</> vwapvuz av <i>NWSc3</>.<iy><iy>Mvy tvyl pumvythapvu wslhzl zll: <b>oaawz://pmyhtl-ylzpgly.jvt/nws</>","<i>NWSc3 Spjluzl Clyzpvu</><iy><iy>Aopz clyzpvu vm <p>pmyhtl-ylzpgly</> pz ilpun bzlk bukly aol alytz vm aol <i>NWS C3</> spjluzl. Aopz spjluzl hssvdz fvb av bzl <p>pmyhtl-ylzpgly</> pu Vwlu Zvbyjl wyvqljaz, iba pa ylxbpylz fvby wyvqlja av il wbispj, wyvcpkl haaypibapvu huk il spjluzlk bukly clyzpvu 3 vy shaly vm aol NUB Nlulyhs Wbispj Spjluzl.<iy><iy>Pm fvb hyl bzpun aopz spiyhyf pu h uvu-vwlu zvbyjl wyvqlja vy dlizpal, fvb dpss ullk av wbyjohzl h svd jvza vul aptl jvttlyjphs spjluzl.<iy><iy>Mvy tvyl pumvythapvu cpzpa <b>oaawz://pmyhtl-ylzpgly.jvt/wypjpun</>.","<iy><yi>Zvsv spjluzl kvlz uva zbwwvya jyvzz-kvthpu</><iy><iy>Av bzl <p>pmyhtl-ylzpgly</> dpao jyvzz kvthpu pmyhtlz fvb ullk lpaoly aol Wyvmlzzpvuhs vy Ibzpulzz spjluzlz. Mvy klahpsz vu bwnyhkl wypjpun wslhzl jvuahja pumv@pmyhtl-ylzpgly.jvt."],m=["NWSc3","zvsv","wyv","ibzpulzz","vlt"],g=Object.fromEntries(["2cgs7fdf4xb","1c9ctcccr4z","1q2pc4eebgb","ueokt0969w","w2zxchhgqz","1umuxblj2e5"].map(((e,t)=>[e,Math.max(0,t-1)]))),y=e=>p(h[e]),b=e=>{const t=e[p("spjluzl")];if(!t)return  -1;const i=t.split("-");let o=function(e=""){let t=-2;const i=f(p(e));return i in g&&(t=g[i]),t}(i[0]);return 0===o||(e=>e[2]===f(e[0]+e[1]))(i)||(o=-2),o},v=e=>e,w=e=>t=>window.chrome?e(t.replaceAll("<br>","\n").replaceAll("<rb>","[31;1m").replaceAll("</>","[m").replaceAll("<b>","[1m").replaceAll("<i>","[3m").replaceAll("<u>","[4m")):e((e=>e.replaceAll("<br>","\n").replaceAll(/<[/a-z]+>/gi,""))(t)),z=(j=e,j?.__esModule?j.default:j);var j;let T={},$=false;const I=e=>window.top===window.self?`parent(${e})`:`nested parent(${e})`;const k=e=>(t,...i)=>T[t]?.console[e](...i);var H;const x=(H="log",(e,...t)=>true===(e=>T[e]?T[e].log:$)(e)?k(H)(e,...t):null),O=k("warn"),R=k("error"),M=k("event"),L=k("purge"),S=k("errorBoundary");const E=(e,...t)=>T[e]?T[e].console.warn(w(v)(...t)):queueMicrotask((()=>console?.warn(w((e=>(...t)=>[`iframeResizer(${e})`,...t].join(" "))(e))(...t)))),W=(e=>(t,i="renamed to")=>(o,n,r="",a="")=>e(a,`<rb>Deprecated ${t}(${o.replace("()","")})</>\n\nThe <b>${o}</> ${t.toLowerCase()} has been ${i} <b>${n}</>. ${r}Use of the old ${t.toLowerCase()} will be removed in a future version of <i>iframe-resizer</>.`))(E),N=W("Option"),G={},A=Object.freeze({autoResize:true,bodyBackground:null,bodyMargin:null,bodyPadding:null,checkOrigin:true,direction:"vertical",inPageLinks:false,heightCalculationMethod:"auto",id:"iFrameResizer",log:false,logExpand:false,license:void 0,mouseEvents:true,offsetHeight:null,offsetWidth:null,postMessageTarget:null,sameDomain:false,scrolling:false,sizeHeight:true,sizeWidth:false,tolerance:0,waitForLoad:false,warningTimeout:5e3,widthCalculationMethod:"auto",onClose:()=>true,onClosed(){},onInit:false,onMessage:null,onMouseEnter(){},onMouseLeave(){},onReady:e=>{"function"==typeof G[e.id].onInit&&(N("init()","onReady()","",e.id),G[e.id].onInit(e));},onResized(){},onScroll:()=>true}),C={position:null,version:t};function F(o){function n(){V(k),J(H),T("onResized",k);}function r(e){if("border-box"!==e.boxSizing)return 0;return (e.paddingTop?parseInt(e.paddingTop,10):0)+(e.paddingBottom?parseInt(e.paddingBottom,10):0)}function a(e){if("border-box"!==e.boxSizing)return 0;return (e.borderTopWidth?parseInt(e.borderTopWidth,10):0)+(e.borderBottomWidth?parseInt(e.borderBottomWidth,10):0)}const s=e=>I.slice(I.indexOf(":")+7+e);const l=(e,t)=>(i,o)=>{const n={};var r,a;r=function(){Y(`${i} (${e})`,`${e}:${t()}`,o);},n[a=o]||(r(),n[a]=requestAnimationFrame((()=>{n[a]=null;})));},c=(e,t)=>()=>{let i=false;const o=t=>()=>{G[l]?i&&i!==t||(e(t,l),i=t,requestAnimationFrame((()=>{i=false;}))):s();},n=o("scroll"),r=o("resize window");function a(e,t){t(window,"scroll",n),t(window,"resize",r);}function s(){M(l,`stop${t}`),a(0,d),c.disconnect(),f.disconnect(),d(G[l].iframe,"load",s);}const l=H,c=new ResizeObserver(o("pageObserver")),f=new ResizeObserver(o("iframeObserver"));G[l]&&(G[l][`stop${t}`]=s,u(G[l].iframe,"load",s),a(0,u),c.observe(document.body,{attributes:true,childList:true,subtree:true}),f.observe(G[l].iframe,{attributes:true,childList:false,subtree:false}));},f=e=>()=>{e in G[H]&&(G[H][e](),delete G[H][e]);},p=l("pageInfo",(function(){const e=document.body.getBoundingClientRect(),t=k.iframe.getBoundingClientRect(),{scrollY:i,scrollX:o,innerHeight:n,innerWidth:r}=window,{clientHeight:a,clientWidth:s}=document.documentElement;return JSON.stringify({iframeHeight:t.height,iframeWidth:t.width,clientHeight:Math.max(a,n||0),clientWidth:Math.max(s,r||0),offsetTop:parseInt(t.top-e.top,10),offsetLeft:parseInt(t.left-e.left,10),scrollTop:i,scrollLeft:o,documentHeight:a,documentWidth:s,windowHeight:n,windowWidth:r})})),h=l("parentInfo",(function(){const{iframe:e}=k,{scrollWidth:t,scrollHeight:i}=document.documentElement,{width:o,height:n,offsetLeft:r,offsetTop:a,pageLeft:s,pageTop:l,scale:c}=window.visualViewport;return JSON.stringify({iframe:e.getBoundingClientRect(),document:{scrollWidth:t,scrollHeight:i},viewport:{width:o,height:n,offsetLeft:r,offsetTop:a,pageLeft:s,pageTop:l,scale:c}})})),m=c(p,"PageInfo"),g=c(h,"ParentInfo"),y=f("stopPageInfo"),b=f("stopParentInfo");function v(e){const t=e.getBoundingClientRect();return q(),{x:Number(t.left)+Number(C.position.x),y:Number(t.top)+Number(C.position.y)}}function w(t){const i=t?v(k.iframe):{x:0,y:0};x(H,`Reposition requested (offset x:%c${i.x}%c y:%c${i.y})`,e.HIGHLIGHT,e.FOREGROUND,e.HIGHLIGHT);const o=((e,t)=>({x:e.width+t.x,y:e.height+t.y}))(k,i),n=window.parentIframe||window.parentIFrame;n?function(e,i){e["scrollTo"+(t?"Offset":"")](i.x,i.y);}(n,o):function(e){C.position=e,z(H);}(o);}function z(e){const{x:t,y:i}=C.position,o=G[e]?.iframe;false!==T("onScroll",{iframe:o,top:i,left:t,x:t,y:i})?J(e):U();}function j(e){let t={};if(0===k.width&&0===k.height){const e=s(9).split(":");t={x:e[1],y:e[0]};}else t={x:k.width,y:k.height};T(e,{iframe:k.iframe,screenX:Number(t.x),screenY:Number(t.y),type:k.type});}const T=(e,t)=>B(H,e,t);function $(){const{height:i,iframe:o,msg:r,type:a,width:l}=k;switch(G[H]?.firstRun&&G[H]&&(G[H].firstRun=false),a){case "close":D(o);break;case "message":u=s(6),T("onMessage",{iframe:k.iframe,message:JSON.parse(u)});break;case "mouseenter":j("onMouseEnter");break;case "mouseleave":j("onMouseLeave");break;case "autoResize":G[H].autoResize=JSON.parse(s(9));break;case "scrollBy":!function(){const t=k.width,i=k.height,o=window.parentIframe||window.parentIFrame||window;x(H,`scrollBy: x: %c${t}%c y: %c${i}`,e.HIGHLIGHT,e.FOREGROUND,e.HIGHLIGHT),o.scrollBy(t,i);}();break;case "scrollTo":w(false);break;case "scrollToOffset":w(true);break;case "pageInfo":m();break;case "parentInfo":g();break;case "pageInfoStop":y();break;case "parentInfoStop":b();break;case "inPageLink":!function(t){const i=t.split("#")[1]||"",o=decodeURIComponent(i);let n=document.getElementById(o)||document.getElementsByName(o)[0];n?function(){const t=v(n);x(H,`Moving to in page link: %c#${i}`,e.HIGHLIGHT),C.position={x:t.x,y:t.y},z(H),window.location.hash=i;}():window.top!==window.self&&function(){const e=window.parentIframe||window.parentIFrame;e&&e.moveToAnchor(i);}();}(s(9));break;case "title":!function(t,i){G[i]?.syncTitle&&(G[i].iframe.title=t,x(i,`Set iframe title attribute: %c${t}`,e.HIGHLIGHT));}(r,H);break;case "reset":Z(k);break;case "init":n(),function(e){try{G[e].sameOrigin=!!G[e]?.iframe?.contentWindow?.iframeChildListener;}catch(t){G[e].sameOrigin=false;}}(H),(c=r)!==t&&(void 0!==c||E(H,"<rb>Legacy version detected in iframe</>\n\nDetected legacy version of child page script. It is recommended to update the page in the iframe to use <b>@iframe-resizer/child</>.\n\nSee <u>https://iframe-resizer.com/setup/#child-page-setup</> for more details.\n")),Q=true,T("onReady",o);break;default:if(0===l&&0===i)return void O(H,`Unsupported message received (${a}), this is likely due to the iframe containing a later version of iframe-resizer than the parent page`);if(0===l||0===i)return;if(document.hidden)return;n();}var c,u;}let I=o.data,k={},H=null;"[iFrameResizerChild]Ready"!==I?i===`${I}`.slice(0,13)&&I.slice(13).split(":")[0]in G&&(k=function(){const e=I.slice(13).split(":"),t=e[1]?Number(e[1]):0,i=G[e[0]]?.iframe,o=getComputedStyle(i);return {iframe:i,id:e[0],height:t+r(o)+a(o),width:Number(e[2]),type:e[3],msg:e[4]}}(),H=k.id,H?(M(H,k.type),S(H,(function(){!function(e){if(!G[e])throw new Error(`${k.type} No settings for ${e}. Message was: ${I}`)}(H),k.type in{true:1,false:1,undefined:1}||(G[H].loaded=true,(null!==k.iframe||(O(H,`The iframe (${k.id}) was not found.`),0))&&function(){const{origin:e,sameOrigin:t}=o;if(t)return  true;let i=G[H]?.checkOrigin;if(i&&"null"!=`${e}`&&!(i.constructor===Array?function(){let t=0,o=false;for(;t<i.length;t++)if(i[t]===e){o=true;break}return o}():function(){const t=G[H]?.remoteHost;return e===t}()))throw new Error(`Unexpected message received from: ${e} for ${k.iframe.id}. Message was: ${o.data}. This error can be disabled by setting the checkOrigin: false option or by providing of array of trusted domains.`);return  true}()&&$());}))()):O("","iframeResizer received messageData without id, message was: ",I)):Object.keys(G).forEach((e=>{G[e].mode>=0&&Y("iFrame requested init",_(e),e);}));}function B(e,t,i){let o=null,n=null;if(G[e]){if(o=G[e][t],"function"!=typeof o)throw new TypeError(`${t} on iFrame[${e}] is not a function`);if("onClose"===t||"onScroll"===t)try{n=o(i);}catch(i){console.error(i),O(e,`Error in ${t} callback`);}else setTimeout((()=>o(i)));}return n}function P(e){const{id:t}=e;delete G[t],delete e.iframeResizer;}function D(e){const{id:t}=e;if(false!==B(t,"onClose",t)){try{e.parentNode&&e.remove();}catch(e){O(t,e);}B(t,"onClosed",t),P(e);}}function q(e){null===C.position&&(C.position={x:window.scrollX,y:window.scrollY});}function U(){C.position=null;}function J(t){null!==C.position&&(window.scrollTo(C.position.x,C.position.y),x(t,`Set page position: %c${C.position.x}%c, %c${C.position.y}`,e.HIGHLIGHT,e.FOREGROUND,e.HIGHLIGHT),U());}function Z(e){q(e.id),V(e),Y("reset","reset",e.id);}function V(t){function i(i){const n=`${t[i]}px`;t.iframe.style[i]=n,x(o,`Set ${i}: %c${n}`,e.HIGHLIGHT);}const{id:o}=t,{sizeHeight:n,sizeWidth:r}=G[o];n&&i("height"),r&&i("width");}T=G;const X=e=>e.split(":").filter(((e,t)=>19!==t)).join(":");function Y(t,o,n,r){function s(i){const r=t in a?X(o):o;x(n,i,e.HIGHLIGHT,e.FOREGROUND,e.HIGHLIGHT),x(n,`Message data: %c${r}`,e.HIGHLIGHT);}M(n,t),G[n]&&(G[n]?.postMessageTarget?function(){const{iframe:e,postMessageTarget:t,sameOrigin:r,targetOrigin:a}=G[n];if(r)try{return e.contentWindow.iframeChildListener(i+o),void s(`Sending message to iframe %c${n}%c via sameOrigin`)}catch(e){}s(`Sending message to iframe: %c${n}%c targetOrigin: %c${a}`),t.postMessage(i+o,a);}():O(n,`Iframe(${n}) not found`),r&&G[n]?.warningTimeout&&(G[n].msgTimeout=setTimeout((function(){if(void 0===G[n])return;const{iframe:e,loaded:t,loadErrorShown:i,waitForLoad:o}=G[n],{sandbox:r}=e,a="object"==typeof r&&r.length>0;t||i||(G[n].loadErrorShown=true,E(n,`<rb>No response from iFrame</>\n            \nThe iframe (<i>${n}</>) has not responded within ${G[n].warningTimeout/1e3} seconds. Check <b>@iframe-resizer/child</> package has been loaded in the iframe.\n${o?"\nThe <b>waitForLoad</> option is currently set to <i>'true'</>. If the iframe loads before the JavaScript runs, this option will prevent <i>iframe-resizer</> from initialising. To disable this, set the <b>waitForLoad</> option to <i>'false'</>.  \n":""}${!a||r.contains("allow-scripts")&&r.contains("allow-same-origin")?"":"\nThe iframe has the <b>sandbox</> attribute, please ensure it contains both the <i>'allow-same-origin'</> and <i>'allow-scripts'</> values.\n"} \n${!a||r.contains("allow-scripts")&&r.contains("allow-same-origin")?"":"The iframe has the <b>sandbox</> attribute, please ensure it contains both the <i>'allow-same-origin'</> and <i>'allow-scripts'</> values.\n"}This message can be ignored if everything is working, or you can set the <b>warningTimeout</> option to a higher value or zero to suppress this warning.\n`));}),G[n].warningTimeout)));}function _(e){const t=G[e];return [e,"8",t.sizeWidth,t.log,"32",true,t.autoResize,t.bodyMargin,t.heightCalculationMethod,t.bodyBackground,t.bodyPadding,t.tolerance,t.inPageLinks,"child",t.widthCalculationMethod,t.mouseEvents,t.offsetHeight,t.offsetWidth,t.sizeHeight,t.license,C.version,t.mode,"",t.logExpand].join(":")}let K=0,Q=false,ee=false;function te(){ false===document.hidden&&function(e,t){const i=e=>G[e]?.autoResize&&!G[e]?.firstRun;Object.keys(G).forEach((function(o){i(o)&&Y(e,t,o);}));}("Tab Visible","resize");}const ie=(e=>{let t=false;return function(){return t?void 0:(t=true,Reflect.apply(e,this,arguments))}})((()=>{u(window,"message",F),u(document,"visibilitychange",te),window.iframeParentListener=e=>setTimeout((()=>F({data:e,sameOrigin:true})));}));return i=>a=>{function l(){if(G[k]){const{iframe:e}=G[k],t={close:D.bind(null,e),disconnect:P.bind(null,e),removeListeners(){E(k,"<rb>Deprecated Method Name</>\n\nThe [removeListeners()</> method has been renamed to [disconnect()</>.\n"),this.disconnect();},resize(){E(k,"<rb>Deprecated Method</>\n        \nUse of the <b>resize()</> method from the parent page is deprecated and will be removed in a future version of <i>iframe-resizer</>. As their are no longer any edge cases that require triggering a resize from the parent page, it is recommended to remove this method from your code."),Y.bind(null,"Window resize","resize",k);},moveToAnchor(e){((e,t,i)=>{if(typeof e!==t)throw new TypeError(`${i} is not a ${o=t,o.charAt(0).toUpperCase()+o.slice(1)}`);var o;})(e,"string","moveToAnchor(anchor) anchor"),Y("Move to anchor",`moveToAnchor:${e}`,k);},sendMessage(e){Y("message",`message:${e=JSON.stringify(e)}`,k);}};e.iframeResizer=t,e.iFrameResizer=t;}}function d(e){const{id:t}=a,{mode:i,waitForLoad:s}=G[t];-1!==i&&-2!==i&&(u(a,"load",(function(){Y(n,`${e}:${Q}`,t,true),function(){const e=G[k]?.firstRun,t=G[k]?.heightCalculationMethod in o;!e&&t&&Z({iframe:a,height:0,width:0,type:"init"});}();})),false===s&&Y(r,`${e}:${Q}`,t,true));}function f(e){return e?(("sizeWidth"in e||"sizeHeight"in e||"autoResize"in e)&&E(k,'<rb>Deprecated Option</>\n\nThe <b>sizeWidth</>, <b>sizeHeight</> and <b>autoResize</> options have been replaced with new <b>direction</> option which expects values of <i>"vertical"</>, <i>"horizontal"</> or <i>"horizontal"</>.\n'),e):{}}function h(){const{mode:o}=G[k];if(o<0)throw E("Parent",`${y(o+2)}${y(2)}`),L(k),y(o+2).replace(/<\/?[a-z][^>]*>|<\/>/gi,"");ee||o>0&&i.vInfoDisable||function(t,i){queueMicrotask((()=>console.info(`%ciframe-resizer ${t}`,$||i<1?"font-weight: bold;":e.NORMAL)));}(`v${t} (${(e=>p(m[e]))(o)})`,o),!ee&&o<1&&E("Parent",y(3)),ee=true;}function g(e){const t=G[e]?.iframe?.title;return ""===t||void 0===t}const v=e=>Object.hasOwn(e,"onMouseEnter")||Object.hasOwn(e,"onMouseLeave");function w(e){var t,i;G[k]={...G[k],iframe:a,firstRun:true,remoteHost:a?.src.split("/").slice(0,3).join("/"),...A,...f(e),mouseEvents:v(e),mode:b(e),syncTitle:g(k)},M(k,"setup"),function(){const{direction:e}=G[k];if("horizontal"===e)return G[k].sizeWidth=true,void(G[k].sizeHeight=false);if("none"===e)return G[k].sizeWidth=false,G[k].sizeHeight=false,void(G[k].autoResize=false);if("vertical"!==e)throw new TypeError(k,`Direction value of "${e}" is not valid`)}(),(t=e?.offsetSize||e?.offset)&&("vertical"===G[k].direction?G[k].offsetHeight=t:G[k].offsetWidth=t),e?.offset&&E(k,"<rb>Deprecated option</>\n\n The <b>offset</> option has been renamed to <b>offsetSize</>. Use of the old name will be removed in a future version of <i>iframe-resizer</>."),null===G[k].postMessageTarget&&(G[k].postMessageTarget=a.contentWindow),G[k].targetOrigin=true===G[k].checkOrigin?""===(i=G[k].remoteHost)||null!==i.match(/^(about:blank|javascript:|file:\/\/)/)?"*":i:"*";}const j=()=>"iframeResizer"in a,k=function(e){if(e&&"string"!=typeof e)throw new TypeError("Invalid id for iFrame. Expected String");return ""!==e&&e||(e=function(){let e=i?.id||A.id+K++;return null!==document.getElementById(e)&&(e+=K++),e}(),a.id=e),e}(a.id);if("object"!=typeof i)throw new TypeError("Options is not an object");return function(e){const{search:t}=window.location;t.includes("ifrlog")&&(e.log=s,e.logExpand=!t.includes("ifrlog=collapsed"));}(i),function(e,t){const i=Object.hasOwn(t,"log"),o="string"==typeof t.log,n=i?!!o||t.log:A.log;Object.hasOwn(t,"logExpand")||(t.logExpand=i&&o?t.log===s:A.logExpand),function(e){ -1===e?.log&&(e.log=false,e.vInfoDisable=true);}(t),function({enabled:e,expand:t,iframeId:i}){const o=z({expand:t,label:I(i)});$=e,T[i]||(T[i]={console:o});}({enabled:n,expand:t.logExpand,iframeId:e}),o&&!(t.log in c)&&R(e,'Invalid value for options.log: Accepted values are "expanded" and "collapsed"'),t.log=n;}(k,i),S(k,(function(e){j()?O(k,`Ignored iframe (${k}), already setup.`):(w(e),h(),ie(),function(){switch(a.style.overflow=false===G[k]?.scrolling?"hidden":"auto",G[k]?.scrolling){case "omit":break;case  true:a.scrolling="yes";break;case  false:a.scrolling="no";break;default:a.scrolling=G[k]?G[k].scrolling:"no";}}(),function(){const{bodyMargin:e}=G[k];"number"!=typeof e&&"0"!==e||(G[k].bodyMargin=`${e}px`);}(),d(_(k)),l());}))(i),a?.iFrameResizer}})); 
} (index_umd$1));

var index_umdExports = index_umd$1.exports;
var connectResizer = /*@__PURE__*/getDefaultExportFromCjs(index_umdExports);

/*!
 *  @module      auto-console-group v1.2.9
 *
 *  @description Automagically group console logs in the browser console.
 *
 *  @author      David J. Bradshaw <info@iframe-resizer.com>
 *  @see         {@link https://github.com/davidjbradshaw/auto-console-group#readme}
 *  @license     MIT
 *
 *  @copyright  (c) 2025, David J. Bradshaw. All rights reserved.
 */

const T = "font-weight: normal;", H = "font-weight: bold;", S = "font-style: italic;", U = T + S, f = "default", _ = "error", C = "log", q = Object.freeze({
  assert: true,
  error: true,
  warn: true
}), L = {
  expand: true,
  defaultEvent: void 0,
  event: void 0,
  label: "AutoConsoleGroup",
  showTime: true
}, P = {
  profile: 0,
  profileEnd: 0,
  timeStamp: 0,
  trace: 0
}, V = (o) => {
  const t = o.event || o.defaultEvent;
  return t ? `${t}` : "";
}, u = Object.assign(console);
function W() {
  const o = /* @__PURE__ */ new Date(), t = (l, d) => o[l]().toString().padStart(d, "0"), r = t("getHours", 2), c = t("getMinutes", 2), s = t("getSeconds", 2), i = t("getMilliseconds", 3);
  return `@ ${r}:${c}:${s}.${i}`;
}
const { fromEntries: b, keys: z } = Object, K = (o) => [
  o,
  u[o]
], X = (o) => (t) => [
  t,
  function(r) {
    o[t] = r;
  }
], E = (o, t) => b(z(o).map(t));
function J(o = {}) {
  const t = {}, r = {}, c = [], s = {
    ...L,
    // @ts-expect-error: backwards compatibility
    expand: !o.collapsed || L.expanded,
    ...o
  };
  let i = "";
  function l() {
    c.length = 0, i = "";
  }
  function d() {
    delete s.event, l();
  }
  const v = () => c.some(([e]) => e in q), O = () => v() ? true : !!s.expand, A = () => s.showTime ? i : "";
  function h() {
    if (c.length === 0) {
      d();
      return;
    }
    u[O() ? "group" : "groupCollapsed"](
      `%c${s.label}%c ${V(s)} %c${A()}`,
      T,
      H,
      U
    );
    for (const [e, ...n] of c)
      u.assert(
        e in u,
        `Unknown console method: ${e}`
      ), e in u && u[e](...n);
    u.groupEnd(), d();
  }
  function p() {
    i === "" && (i = W());
  }
  function G(e) {
    p(), s.event = e;
  }
  function D() {
    p(), queueMicrotask(() => queueMicrotask(h));
  }
  function a(e, ...n) {
    c.length === 0 && D(), c.push([e, ...n]);
  }
  const M = (e) => (...n) => {
    let m;
    try {
      m = e(...n);
    } catch (g) {
      if (Error.prototype.isPrototypeOf(g)) a(_, g);
      else throw g;
    }
    return m;
  };
  function I(e, ...n) {
    e || a("assert", e, ...n);
  }
  function R(e = f) {
    r[e] ? r[e] += 1 : r[e] = 1, a(C, `${e}: ${r[e]}`);
  }
  function x(e = f) {
    delete r[e];
  }
  function y(e = f) {
    p(), t[e] = performance.now();
  }
  function w(e = f, ...n) {
    if (!t[e]) {
      a("timeLog", e, ...n);
      return;
    }
    const m = performance.now() - t[e];
    a(C, `${e}: ${m} ms`, ...n);
  }
  function B(e = f) {
    w(e), delete t[e];
  }
  const F = (e) => [
    e,
    (...n) => a(e, ...n)
  ];
  return {
    ...E(s, X(s)),
    ...E(console, F),
    ...E(P, K),
    assert: I,
    count: R,
    countReset: x,
    endAutoGroup: h,
    errorBoundary: M,
    event: G,
    purge: l,
    time: y,
    timeEnd: B,
    timeLog: w,
    touch: p
  };
}
typeof window > "u" || typeof window.matchMedia != "function" ? false : window.matchMedia("(prefers-color-scheme: dark)").matches;

/*!
 *  @preserve
 *  
 *  @module      iframe-resizer/react 5.4.6 (esm) - 2025-04-24
 *
 *  @license     GPL-3.0 for non-commercial use only.
 *               For commercial use, you must purchase a license from
 *               https://iframe-resizer.com/pricing
 * 
 *  @description Keep same and cross domain iFrames sized to their content 
 *
 *  @author      David J. Bradshaw <info@iframe-resizer.com>
 * 
 *  @see         {@link https://iframe-resizer.com}
 * 
 *  @copyright  (c) 2013 - 2025, David J. Bradshaw. All rights reserved.
 */


const filterIframeAttribs = props => {
  const {
    license,
    bodyBackground,
    bodyMargin,
    bodyPadding,
    checkOrigin,
    direction,
    inPageLinks,
    log,
    offset,
    offsetHeight,
    offsetWidth,
    scrolling,
    tolerance,
    warningTimeout,
    waitForLoad,
    onClosed,
    onReady,
    onMessage,
    onResized,
    ...iframeProps
  } = props;
  return iframeProps;
};

const esModuleInterop = mod =>
// eslint-disable-next-line no-underscore-dangle
mod?.__esModule ? mod.default : mod;

// Deal with UMD not converting default exports to named exports
const createAutoConsoleGroup = esModuleInterop(J);

// TODO: Add support for React.forwardRef() in next major version (Breaking change)
function IframeResizer(props) {
  // eslint-disable-next-line react/prop-types
  const {
    forwardRef,
    ...rest
  } = props;
  const filteredProps = filterIframeAttribs(rest);
  const iframeRef = React.useRef(null);
  const consoleGroup = createAutoConsoleGroup();
  const onClose = () => {
    consoleGroup.event('onClose');
    consoleGroup.warn(`Close event ignored, to remove the iframe update your React component.`);
    return false;
  };

  // This hook is only run once, as once iframe-resizer is bound, it will
  // deal with changes to the element and does not need recalling
  React.useEffect(() => {
    const iframe = iframeRef.current;
    const resizerOptions = {
      ...rest,
      onClose
    };
    consoleGroup.label(`react(${iframe.id})`);
    consoleGroup.event('setup');
    const resizer = connectResizer(resizerOptions)(iframe);
    consoleGroup.expand(resizerOptions.logExpand);
    if (rest.log) consoleGroup.log('Created React component');
    return () => {
      consoleGroup.endAutoGroup();
      resizer?.disconnect();
    };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  React.useImperativeHandle(forwardRef, () => ({
    getRef: () => iframeRef,
    getElement: () => iframeRef.current,
    resize: () => iframeRef.current.iframeResizer.resize(),
    moveToAnchor: anchor => iframeRef.current.iframeResizer.moveToAnchor(anchor),
    sendMessage: (message, targetOrigin) => {
      iframeRef.current.iframeResizer.sendMessage(message, targetOrigin);
    }
  }));

  // eslint-disable-next-line jsx-a11y/iframe-has-title
  return /*#__PURE__*/React.createElement("iframe", _extends({}, filteredProps, {
    ref: iframeRef
  }));
}

function GenerativeComponent(_a) {
    var _b;
    var prompt = _a.prompt, variants = _a.variants, initialState = _a.initialState, _c = _a.model, model = _c === void 0 ? 'claude-sonnet-4-20250514' : _c, className = _a.className, schema = _a.schema, serverAction = _a.serverAction;
    var ref = React.useRef(null);
    var _d = React.useState('LOADING'), status = _d[0], setStatus = _d[1];
    var id = React.useId();
    var _e = useGenerativeBlock({
        serverAction: serverAction,
        prompt: prompt,
        model: model,
        schema: schema,
        variants: variants,
    }), data = _e.data, loading = _e.loading;
    var onMessageHandler = React.useCallback(function (e) {
        console.log('Received message from iframe:', e.data);
        var top = window.top;
        if (top && top.onmessage) {
            top.onmessage = function (e) {
                console.log('Received TOP message:', e.data);
            };
        }
        window.onmessage = function (e) {
            // TOOD:
            // if (e.origin !== "https://cdn.r2") return;
            var _a = e.data, type = _a.type, status = _a.status;
            if (type === 'STATUS' && status === 'INIT') {
                console.log('Iframe initialized');
                setStatus('INIT');
            }
            if (type === 'STATUS' && status === 'LOADED') {
                console.log('Iframe loaded');
                setStatus('LOADED');
            }
            if (type === 'PARAMS_RECEIVED') {
                console.log('Iframe params received');
            }
        };
        console.log('Received message from iframe:', e.data);
        var _a = e.data, type = _a.type, status = _a.status;
        if (type === 'STATUS' && status === 'INIT') {
            console.log('Iframe initialized');
            setStatus('INIT');
        }
        if (type === 'STATUS' && status === 'LOADED') {
            console.log('Iframe loaded');
            setStatus('LOADED');
        }
        if (type === 'PARAMS_RECEIVED') {
            console.log('Iframe params received');
        }
    }, []);
    React.useEffect(function () {
        if (ref.current && ref.current.contentWindow) {
            ref.current.contentWindow.onmessage = function (e) {
                console.log('EV: ', e);
            };
        }
    }, [ref.current]);
    React.useEffect(function () {
        var top = window.top;
        if (top) {
            top.onmessage = function (e) {
                var _a, _b, _c;
                console.log('TOP: ', e);
                (_a = ref.current) === null || _a === void 0 ? void 0 : _a.sendMessage({
                    type: 'INITIAL_STATE',
                    payload: initialState,
                });
                (_c = (_b = ref.current) === null || _b === void 0 ? void 0 : _b.contentWindow) === null || _c === void 0 ? void 0 : _c.postMessage({
                    type: 'INITIAL_STATE',
                    payload: initialState,
                }, '*');
            };
        }
    }, []);
    React.useEffect(function () {
        var _a, _b;
        if (status === 'LOADED') {
            console.log('Sending initial state to iframe');
            (_b = (_a = ref.current) === null || _a === void 0 ? void 0 : _a.contentWindow) === null || _b === void 0 ? void 0 : _b.postMessage({
                type: 'INITIAL_STATE',
                payload: initialState,
            }, '*');
        }
    }, [(_b = ref.current) === null || _b === void 0 ? void 0 : _b.contentWindow, initialState, status]);
    if (loading) {
        return (jsxRuntime.jsx("div", { className: cn('border-border/50 mx-auto flex h-full min-h-96 w-full max-w-sm animate-pulse rounded-md border bg-gray-50/5', className) }));
    }
    return (jsxRuntime.jsx(IframeResizer, { license: "GPLv3", log: true, forwardRef: ref, inPageLinks: true, onMessage: onMessageHandler, src: data === null || data === void 0 ? void 0 : data.url, className: cn(className, 'h-full w-full'), checkOrigin: ['https://pub-d6adf32ab3b94607ba3b3402d7fd4d20.r2.dev'], id: id }, id + '_' + 'iframe'));
}

exports.GenerativeComponent = GenerativeComponent;
exports.generate = generate;
exports.useGenerativeComponent = useGenerativeBlock;
//# sourceMappingURL=index.js.map
