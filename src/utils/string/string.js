/*
 * MelonJS Game Engine
 * Copyright (C) 2011 - 2018 Olivier Biot
 * http://www.melonjs.org
 *
 */

/**
 * returns the string stripped of whitespace from the left.
 * @public
 * @function
 * @memberOf me.utils.string
 * @name trimLeft
 * @param {String} string the string to be trimmed
 * @return {string} trimmed string
 */
export function trimLeft (str) {
    return str.replace(/^\s+/, "");
};

/**
 * returns the string stripped of whitespace from the right.
 * @public
 * @function
 * @memberOf me.utils.string
 * @name trimRight
 * @param {String} string the string to be trimmed
 * @return {string} trimmed string
 */
export function trimRight (str) {
    return str.replace(/\s+$/, "");
};

/**
 * returns true if the given string contains a numeric value
 * @public
 * @function
 * @memberOf me.utils.string
 * @name isBoolean
 * @param {String} string the string to be tested
 * @return {Boolean} true if string contains only digits
 */
export function isNumeric (str) {
    return (!isNaN(str) && str.trim() !== "");
};

/**
 * returns true if the given string contains a true or false
 * @public
 * @function
 * @memberOf me.utils.string
 * @name isBoolean
 * @param {String} string the string to be tested
 * @return {Boolean} true if the string is either true or false
 */
export function isBoolean (str) {
    var trimmed = str.trim();
    return (trimmed === "true") || (trimmed === "false");
};

/**
 * convert a string to the corresponding hexadecimal value
 * @public
 * @function
 * @memberOf me.utils.string
 * @name toHex
 * @param {String} string the string to be converted
 * @return {String}
 */
export function toHex (str) {
    var res = "", c = 0;
    while (c < str.length) {
        res += str.charCodeAt(c++).toString(16);
    }
    return res;
};
