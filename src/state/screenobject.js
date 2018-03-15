/*
* MelonJS Game Engine
* Copyright (C) 2011 - 2018 Olivier Biot
* http://www.melonjs.org
*
*/

/**
 * A class skeleton for "Screen" Object <br>
 * every "screen" object (title screen, credits, ingame, etc...) to be managed <br>
 * through the state manager must inherit from this base class.
 * @class
 * @extends me.Object
 * @memberOf me
 * @constructor
 * @see me.state
 */
export default class ScreenObject {
/** @scope me.ScreenObject.prototype */

    /** @ignore */
    constructor () {
        // ; 
    },

    /**
     * Object reset function
     * @ignore
     */
    reset () {
        // reset the game manager
        me.game.reset();
        // call the onReset Function
        this.onResetEvent.apply(this, arguments);
    },

    /**
     * destroy function
     * @ignore
     */
    destroy () {
        // notify the object
        this.onDestroyEvent.apply(this, arguments);
    },

    /**
     * onResetEvent function<br>
     * called by the state manager when reseting the object<br>
     * this is typically where you will load a level, etc...
     * to be extended
     * @name onResetEvent
     * @memberOf me.ScreenObject
     * @function
     * @param {} [arguments...] optional arguments passed when switching state
     * @see me.state#change
     */
    onResetEvent () {
        // to be extended
    },

    /**
     * onDestroyEvent function<br>
     * called by the state manager before switching to another state<br>
     * @name onDestroyEvent
     * @memberOf me.ScreenObject
     * @function
     */
    onDestroyEvent () {
        // to be extended
    }
};
