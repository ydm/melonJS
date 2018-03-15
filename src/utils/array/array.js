/*
 * MelonJS Game Engine
 * Copyright (C) 2011 - 2018 Olivier Biot
 * http://www.melonjs.org
 *
 */

var random = require('../../math/math');
var weightedRandom= require('../../math/math');

/**
 * Remove the specified object from the given Array
 * @public
 * @function
 * @memberOf me.utils.array
 * @name remove
 * @param {Array} arr array from which to remove an object
 * @param {Object} object to be removed
 * @return {Array} the modified Array
 */
export function remove (arr, obj) {
    var i = Array.prototype.indexOf.call(arr, obj);
    if (i !== -1) {
        Array.prototype.splice.call(arr, i, 1);
    }
    return arr;
};


/**
 * return a random array element
 * @public
 * @function
 * @memberOf me.utils.array
 * @name random
 * @param {Array} arr array to pick a element
 * @return {any} random member of array
 * @example
 * // Select a random array element
 * var arr = [ "foo", "bar", "baz" ];
 * console.log(me.utils.array.random(arr));
 */
export function random (arr) {
    return arr[random(0, arr.length)];
};

/**
 * return a weighted random array element, favoring the earlier entries
 * @public
 * @function
 * @memberOf me.utils.array
 * @name weightedRandom
 * @param {Array} arr array to pick a element
 * @return {any} random member of array
 */
export function weightedRandom (arr) {
    return arr[weightedRandom(0, arr.length)];
};
