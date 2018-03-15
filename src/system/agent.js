/*
* MelonJS Game Engine
* Copyright (C) 2011 - 2018 Olivier Biot
* http://www.melonjs.org/
*
*/

/**
 * Convert first character of a string to uppercase, if it's a letter.
 * @ignore
 * @function
 * @name capitalize
 * @param  {String} str Input string.
 * @return {String} String with first letter made uppercase.
 */
let capitalize = function (str) {
    return str.substring(0, 1).toUpperCase() + str.substring(1, str.length);
};


/**
 * Known agent vendors
 * @ignore
 */
let vendors = [ "ms", "MS", "moz", "webkit", "o" ];

/**
 * A collection of utilities to ease porting between different user agents.
 * @namespace me.agent
 * @memberOf me
 */


/**
 * Get a vendor-prefixed property
 * @public
 * @name prefixed
 * @function
 * @param {String} name Property name
 * @param {Object} [obj=window] Object or element reference to access
 * @return {Mixed} Value of property
 * @memberOf me.agent
 */
export function prefixed(name, obj) {
    obj = obj || window;
    if (name in obj) {
        return obj[name];
    }

    var uc_name = capitalize(name);

    var result;
    vendors.some(function (vendor) {
        var name = vendor + uc_name;
        return (result = (name in obj) ? obj[name] : undefined);
    });
    return result;
};

/**
 * Set a vendor-prefixed property
 * @public
 * @name setPrefixed
 * @function
 * @param {String} name Property name
 * @param {Mixed} value Property value
 * @param {Object} [obj=window] Object or element reference to access
 * @memberOf me.agent
 */
export function setPrefixed(name, value, obj) {
    obj = obj || window;
    if (name in obj) {
        obj[name] = value;
        return;
    }

    var uc_name = capitalize(name);

    vendors.some(function (vendor) {
        var name = vendor + uc_name;
        if (name in obj) {
            obj[name] = value;
            return true;
        }
        return false;
    });
};
