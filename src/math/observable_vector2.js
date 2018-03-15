/*
* MelonJS Game Engine
* Copyright (C) 2011 - 2018 Olivier Biot
* http://www.melonjs.org
*
*/

import Vector2d from "./vector2d";

/**
 * A Vector2d object that provide notification by executing the given callback when the vector is changed.
 * @class
 * @extends me.Vector2d
 * @constructor
 * @param {Number} [x=0] x value of the vector
 * @param {Number} [y=0] y value of the vector
 * @param {Object} settings additional required parameters
 * @param {Function} settings.onUpdate the callback to be executed when the vector is changed
 */
export default class ObservableVector2d extends Vector2d {
/** @scope me.ObservableVector2d.prototype */

    /** @ignore */
    constructor (x, y, settings) {
        if (typeof(settings) === "undefined") {
            throw new Error(
                "me.ObservableVector2d: undefined `onUpdate` callback"
            );
        }
        super(x, y);
        this.setCallback(settings.onUpdate);
        this._x = x || 0;
        this._y = y || 0;
    }

    /**
     * @ignore
     */
    get x() {
       return this._x;
    }

    /**
     * @ignore
     */
    set x(value) {
        var ret = this.onUpdate(value, this._y, this._x, this._y);
        if (ret && "x" in ret) {
            this._x = ret.x;
        } else {
            this._x = value
        }
    }

    /**
     * @ignore
     */
    get y() {
       return this._y;
    }

    /**
     * @ignore
     */
    set y(value) {
        var ret = this.onUpdate(this._x, value, this._x, this._y);
        if (ret && "y" in ret) {
            this._y = ret.y;
        } else {
            this._y = value
        }
    }

    /** @ignore */
    _set (x, y) {
        var ret = this.onUpdate(x, y, this._x, this._y);
        if (ret && "x" in ret && "y" in ret) {
            this._x = ret.x;
            this._y = ret.y;
        } else {
          this._x = x;
          this._y = y;
       }
       return this;
    }

    /**
     * set the vector value without triggering the callback
     * @name setMuted
     * @memberOf me.ObservableVector2d
     * @function
     * @param {Number} x x value of the vector
     * @param {Number} y y value of the vector
     * @return {me.ObservableVector2d} Reference to this object for method chaining
     */
    setMuted (x, y) {
        this._x = x;
        this._y = y;
        return this;
    }

    /**
     * set the callback to be executed when the vector is changed
     * @name setCallback
     * @memberOf me.ObservableVector2d
     * @function
     * @param {function} onUpdate callback
     * @return {me.ObservableVector2d} Reference to this object for method chaining
     */
    setCallback (fn) {
        if (typeof(fn) !== "function") {
            throw new Error(
                "me.ObservableVector2d: invalid `onUpdate` callback"
            );
        }
        this.onUpdate = fn;
        return this;
    }

    /**
     * Add the passed vector to this vector
     * @name add
     * @memberOf me.ObservableVector2d
     * @function
     * @param {me.ObservableVector2d} v
     * @return {me.ObservableVector2d} Reference to this object for method chaining
     */
    add (v) {
        return this._set(this._x + v.x, this._y + v.y);
    }

    /**
     * Substract the passed vector to this vector
     * @name sub
     * @memberOf me.ObservableVector2d
     * @function
     * @param {me.ObservableVector2d} v
     * @return {me.ObservableVector2d} Reference to this object for method chaining
     */
    sub (v) {
        return this._set(this._x - v.x, this._y - v.y);
    }

    /**
     * Multiply this vector values by the given scalar
     * @name scale
     * @memberOf me.ObservableVector2d
     * @function
     * @param {Number} x
     * @param {Number} [y=x]
     * @return {me.ObservableVector2d} Reference to this object for method chaining
     */
    scale (x, y) {
        return this._set(this._x * x, this._y * (typeof (y) !== "undefined" ? y : x));
    }

    /**
     * Multiply this vector values by the passed vector
     * @name scaleV
     * @memberOf me.ObservableVector2d
     * @function
     * @param {me.ObservableVector2d} v
     * @return {me.ObservableVector2d} Reference to this object for method chaining
     */
    scaleV (v) {
        return this._set(this._x * v.x, this._y * v.y);
    }

    /**
     * Divide this vector values by the passed value
     * @name div
     * @memberOf me.ObservableVector2d
     * @function
     * @param {Number} value
     * @return {me.ObservableVector2d} Reference to this object for method chaining
     */
    div (n) {
        return this._set(this._x / n, this._y / n);
    }

    /**
     * Update this vector values to absolute values
     * @name abs
     * @memberOf me.ObservableVector2d
     * @function
     * @return {me.ObservableVector2d} Reference to this object for method chaining
     */
    abs () {
        return this._set((this._x < 0) ? -this._x : this._x, (this._y < 0) ? -this._y : this._y);
    }

    /**
     * Clamp the vector value within the specified value range
     * @name clamp
     * @memberOf me.ObservableVector2d
     * @function
     * @param {Number} low
     * @param {Number} high
     * @return {me.ObservableVector2d} new me.ObservableVector2d
     */
    clamp (low, high) {
        return new me.ObservableVector2d(me.Math.clamp(this.x, low, high), me.Math.clamp(this.y, low, high), {onUpdate: this.onUpdate});
    }

    /**
     * Clamp this vector value within the specified value range
     * @name clampSelf
     * @memberOf me.ObservableVector2d
     * @function
     * @param {Number} low
     * @param {Number} high
     * @return {me.ObservableVector2d} Reference to this object for method chaining
     */
    clampSelf (low, high) {
        return this._set(me.Math.clamp(this._x, low, high), me.Math.clamp(this._y, low, high));
    }

    /**
     * Update this vector with the minimum value between this and the passed vector
     * @name minV
     * @memberOf me.ObservableVector2d
     * @function
     * @param {me.ObservableVector2d} v
     * @return {me.ObservableVector2d} Reference to this object for method chaining
     */
    minV (v) {
        return this._set((this._x < v.x) ? this._x : v.x, (this._y < v.y) ? this._y : v.y);
    }

    /**
     * Update this vector with the maximum value between this and the passed vector
     * @name maxV
     * @memberOf me.ObservableVector2d
     * @function
     * @param {me.ObservableVector2d} v
     * @return {me.ObservableVector2d} Reference to this object for method chaining
     */
    maxV (v) {
        return this._set((this._x > v.x) ? this._x : v.x, (this._y > v.y) ? this._y : v.y);
    }

    /**
     * Floor the vector values
     * @name floor
     * @memberOf me.ObservableVector2d
     * @function
     * @return {me.ObservableVector2d} new me.ObservableVector2d
     */
    floor () {
        return new me.ObservableVector2d(Math.floor(this._x), Math.floor(this._y), {onUpdate: this.onUpdate});
    }

    /**
     * Floor this vector values
     * @name floorSelf
     * @memberOf me.ObservableVector2d
     * @function
     * @return {me.ObservableVector2d} Reference to this object for method chaining
     */
    floorSelf () {
        return this._set(Math.floor(this._x), Math.floor(this._y));
    }

    /**
     * Ceil the vector values
     * @name ceil
     * @memberOf me.ObservableVector2d
     * @function
     * @return {me.ObservableVector2d} new me.ObservableVector2d
     */
    ceil () {
        return new me.ObservableVector2d(Math.ceil(this._x), Math.ceil(this._y), {onUpdate: this.onUpdate});
    }

    /**
     * Ceil this vector values
     * @name ceilSelf
     * @memberOf me.ObservableVector2d
     * @function
     * @return {me.ObservableVector2d} Reference to this object for method chaining
     */
    ceilSelf () {
        return this._set(Math.ceil(this._x), Math.ceil(this._y));
    }

    /**
     * Negate the vector values
     * @name negate
     * @memberOf me.ObservableVector2d
     * @function
     * @return {me.ObservableVector2d} new me.ObservableVector2d
     */
    negate () {
        return new me.ObservableVector2d(-this._x, -this._y, {onUpdate: this.onUpdate});
    }

    /**
     * Negate this vector values
     * @name negateSelf
     * @memberOf me.ObservableVector2d
     * @function
     * @return {me.ObservableVector2d} Reference to this object for method chaining
     */
    negateSelf () {
        return this._set(-this._x, -this._y);
    }

    /**
     * Copy the x,y values of the passed vector to this one
     * @name copy
     * @memberOf me.ObservableVector2d
     * @function
     * @param {me.ObservableVector2d} v
     * @return {me.ObservableVector2d} Reference to this object for method chaining
     */
    copy (v) {
        return this._set(v.x, v.y);
    }

    /**
     * return true if the two vectors are the same
     * @name equals
     * @memberOf me.ObservableVector2d
     * @function
     * @param {me.ObservableVector2d} v
     * @return {Boolean}
     */
    equals (v) {
        return ((this._x === v.x) && (this._y === v.y));
    }

    /**
     * normalize this vector (scale the vector so that its magnitude is 1)
     * @name normalize
     * @memberOf me.ObservableVector2d
     * @function
     * @return {me.ObservableVector2d} Reference to this object for method chaining
     */
    normalize () {
        var d = this.length();
        if (d > 0) {
            return this._set(this._x / d, this._y / d);
        }
        return this;
    }

    /**
     * change this vector to be perpendicular to what it was before.<br>
     * (Effectively rotates it 90 degrees in a clockwise direction)
     * @name perp
     * @memberOf me.ObservableVector2d
     * @function
     * @return {me.ObservableVector2d} Reference to this object for method chaining
     */
    perp () {
        return this._set(this._y, -this._x);
    }

    /**
     * Rotate this vector (counter-clockwise) by the specified angle (in radians).
     * @name rotate
     * @memberOf me.ObservableVector2d
     * @function
     * @param {number} angle The angle to rotate (in radians)
     * @return {me.ObservableVector2d} Reference to this object for method chaining
     */
    rotate (angle) {
        var x = this._x;
        var y = this._y;
        return this._set(x * Math.cos(angle) - y * Math.sin(angle), x * Math.sin(angle) + y * Math.cos(angle));
    }

    /**
     * return the dot product of this vector and the passed one
     * @name dotProduct
     * @memberOf me.ObservableVector2d
     * @function
     * @param {me.ObservableVector2d} v
     * @return {Number} The dot product.
     */
    dotProduct (v) {
        return this._x * v.x + this._y * v.y;
    }

    /**
     * return the distance between this vector and the passed one
     * @name distance
     * @memberOf me.ObservableVector2d
     * @function
     * @param {me.ObservableVector2d} v
     * @return {Number}
     */
    distance (v) {
        return Math.sqrt((this._x - v.x) * (this._x - v.x) + (this._y - v.y) * (this._y - v.y));
    }

    /**
     * return a clone copy of this vector
     * @name clone
     * @memberOf me.ObservableVector2d
     * @function
     * @return {me.ObservableVector2d} new me.ObservableVector2d
     */
    clone () {
        // shall we return a cloned me.ObservableVector2d here ?
        return new me.ObservableVector2d(this._x, this._y, {onUpdate: this.onUpdate});
    }

    /**
     * return a `me.Vector2d` copy of this `me.ObservableVector2d` object
     * @name toVector2d
     * @memberOf me.ObservableVector2d
     * @function
     * @return {me.Vector2d} new me.Vector2d
     */
    toVector2d () {
        return new me.Vector2d(this._x, this._y);
    }

    /**
     * convert the object to a string representation
     * @name toString
     * @memberOf me.ObservableVector2d
     * @function
     * @return {String}
     */
    toString () {
        return "x:" + this._x + ",y:" + this._y;
    }
};
