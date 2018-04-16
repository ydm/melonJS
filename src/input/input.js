/*
 * MelonJS Game Engine
 * Copyright (C) 2011 - 2018 Olivier Biot
 * http://www.melonjs.org/
 *
 */

/**
 * @namespace me.input
 * @memberOf me
 */


/**
 * prevent event propagation
 * @ignore
 */
export function _preventDefaultFn(e) {
    // stop event propagation
    if (e.stopPropagation) {
        e.stopPropagation();
    }
    else {
        e.cancelBubble = true;
    }
    // stop event default processing
    if (e.preventDefault)  {
        e.preventDefault();
    }
    else  {
        e.returnValue = false;
    }

    return false;
};

/*
 * PUBLIC STUFF
 */

/**
 * Global flag to specify if melonJS should prevent all default browser action on registered events.
 * default : true
 * @public
 * @type Boolean
 * @name preventDefault
 * @memberOf me.input
 */
export let preventDefault = true;
