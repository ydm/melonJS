/*
* MelonJS Game Engine
* Copyright (C) 2011 - 2018 Olivier Biot
* http://www.melonjs.org
*
*/

import Vector3d from "./vector3d";

/**
 * A Vector3d object that provide notification by executing the given callback when the vector is changed.
 * @class
 * @extends me.Vector3d
 * @constructor
 * @param {Number} [x=0] x value of the vector
 * @param {Number} [y=0] y value of the vector
 * @param {Number} [z=0] z value of the vector
 * @param {Object} settings additional required parameters
 * @param {Function} settings.onUpdate the callback to be executed when the vector is changed
 */
export default class ObservableVector3d extends Vector3d {
/** @scope me.ObservableVector3d.prototype */

    /**
     * @ignore
     */
    constructor (x, y, z, settings) {
        if (typeof(settings) === "undefined") {
            throw new Error(
                "me.ObservableVector3d: undefined `onUpdate` callback"
            );
        }
        super(x, y, z);
        this.setCallback(settings.onUpdate);
        this._x = x || 0;
        this._y = y || 0;
        this._z = z || 0;
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
        var ret = this.onUpdate(value, this._y, this._z, this._x, this._y, this._z);
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
        var ret = this.onUpdate(this._x, value, this._z, this._x, this._y, this._z);
        if (ret && "y" in ret) {
            this._y = ret.y;
        } else {
            this._y = value
        }
    }

    /**
     * @ignore
     */
    get z() {
       return this._z;
    }

    /**
     * @ignore
     */
    set z(value) {
        var ret = this.onUpdate(this._x, this._y, value, this._x, this._y, this._z);
        if (ret && "z" in ret) {
            this._z = ret.z;
        } else {
            this._z = value
        }
    }

    /**
     * @ignore */
    _set (x, y, z) {
        var ret = this.onUpdate(x, y, z, this._x, this._y, this._z);
        if (ret && "x" in ret && "y" in ret && "z" in ret) {
            this._x = ret.x;
            this._y = ret.y;
            this._z = ret.z;
        } else {
          this._x = x;
          this._y = y;
          this._z = z;
        }
        return this;
    }

    /**
     * set the vector value without triggering the callback
     * @name setMuted
     * @memberOf me.ObservableVector3d
     * @function
     * @param {Number} x x value of the vector
     * @param {Number} y y value of the vector
     * @param {Number} z z value of the vector
     * @return {me.ObservableVector3d} Reference to this object for method chaining
     */
    setMuted (x, y, z) {
        this._x = x;
        this._y = y;
        this._z = z;
        return this;
    }

    /**
     * set the callback to be executed when the vector is changed
     * @name setCallback
     * @memberOf me.ObservableVector3d
     * @function
     * @param {function} onUpdate callback
     * @return {me.ObservableVector3d} Reference to this object for method chaining
     */
    setCallback (fn) {
        if (typeof(fn) !== "function") {
            throw new Error(
                "me.ObservableVector3d: invalid `onUpdate` callback"
            );
        }
        this.onUpdate = fn;
        return this;
    }

    /**
     * Add the passed vector to this vector
     * @name add
     * @memberOf me.ObservableVector3d
     * @function
     * @param {me.Vector2d|me.Vector3d|me.ObservableVector2d|me.ObservableVector3d} v
     * @return {me.ObservableVector3d} Reference to this object for method chaining
     */
    add (v) {
        return this._set(this._x + v.x, this._y + v.y, this._z + (v.z || 0));
    }

    /**
     * Substract the passed vector to this vector
     * @name sub
     * @memberOf me.ObservableVector3d
     * @function
     * @param {me.Vector2d|me.Vector3d|me.ObservableVector2d|me.ObservableVector3d} v
     * @return {me.ObservableVector3d} Reference to this object for method chaining
     */
    sub (v) {
        return this._set(this._x - v.x, this._y - v.y, this._z - (v.z || 0));
    }

    /**
     * Multiply this vector values by the given scalar
     * @name scale
     * @memberOf me.ObservableVector3d
     * @function
     * @param {Number} x
     * @param {Number} [y=x]
     * @param {Number} [z=x]
     * @return {me.ObservableVector3d} Reference to this object for method chaining
     */
    scale (x, y, z) {
        y = (typeof (y) !== "undefined" ? y : x);
        z = (typeof (z) !== "undefined" ? z : x);
        return this._set(this._x * x, this._y * y, this._z * z);
    }

    /**
     * Multiply this vector values by the passed vector
     * @name scaleV
     * @memberOf me.ObservableVector3d
     * @function
     * @param {me.Vector2d|me.Vector3d|me.ObservableVector2d|me.ObservableVector3d} v
     * @return {me.ObservableVector3d} Reference to this object for method chaining
     */
    scaleV (v) {
        return this._set(this._x * v.x, this._y * v.y, this._z * (v.z || 1));
    }

    /**
     * Divide this vector values by the passed value
     * @name div
     * @memberOf me.ObservableVector3d
     * @function
     * @param {Number} value
     * @return {me.ObservableVector3d} Reference to this object for method chaining
     */
    div (n) {
        return this._set(this._x / n, this._y / n, this._z / n);
    }

    /**
     * Update this vector values to absolute values
     * @name abs
     * @memberOf me.ObservableVector3d
     * @function
     * @return {me.ObservableVector3d} Reference to this object for method chaining
     */
    abs () {
        return this._set(
            (this._x < 0) ? -this._x : this._x,
            (this._y < 0) ? -this._y : this._y,
            (this._Z < 0) ? -this._z : this._z
        );
    }

    /**
     * Clamp the vector value within the specified value range
     * @name clamp
     * @memberOf me.ObservableVector3d
     * @function
     * @param {Number} low
     * @param {Number} high
     * @return {me.ObservableVector3d} new me.ObservableVector3d
     */
    clamp (low, high) {
        return new me.ObservableVector3d(
            me.Math.clamp(this._x, low, high),
            me.Math.clamp(this._y, low, high),
            me.Math.clamp(this._z, low, high),
            {onUpdate: this.onUpdate}
        );
    }

    /**
     * Clamp this vector value within the specified value range
     * @name clampSelf
     * @memberOf me.ObservableVector3d
     * @function
     * @param {Number} low
     * @param {Number} high
     * @return {me.ObservableVector3d} Reference to this object for method chaining
     */
    clampSelf (low, high) {
        return this._set(
            me.Math.clamp(this._x, low, high),
            me.Math.clamp(this._y, low, high),
            me.Math.clamp(this._z, low, high)
        );
    }

    /**
     * Update this vector with the minimum value between this and the passed vector
     * @name minV
     * @memberOf me.ObservableVector3d
     * @function
     * @param {me.Vector2d|me.Vector3d|me.ObservableVector2d|me.ObservableVector3d} v
     * @return {me.ObservableVector3d} Reference to this object for method chaining
     */
    minV (v) {
        var _vz = v.z || 0;
        return this._set(
            (this._x < v.x) ? this._x : v.x,
            (this._y < v.y) ? this._y : v.y,
            (this._z < _vz) ? this._z : _vz
        );
    }

    /**
     * Update this vector with the maximum value between this and the passed vector
     * @name maxV
     * @memberOf me.ObservableVector3d
     * @function
     * @param {me.Vector2d|me.Vector3d|me.ObservableVector2d|me.ObservableVector3d} v
     * @return {me.ObservableVector3d} Reference to this object for method chaining
     */
    maxV (v) {
        var _vz = v.z || 0;
        return this._set(
            (this._x > v.x) ? this._x : v.x,
            (this._y > v.y) ? this._y : v.y,
            (this._z > _vz) ? this._z : _vz
        );
    }

    /**
     * Floor the vector values
     * @name floor
     * @memberOf me.ObservableVector3d
     * @function
     * @return {me.ObservableVector3d} new me.ObservableVector3d
     */
    floor () {
        return new me.ObservableVector3d(
            Math.floor(this._x),
            Math.floor(this._y),
            Math.floor(this._z),
            {onUpdate: this.onUpdate}
        );
    }

    /**
     * Floor this vector values
     * @name floorSelf
     * @memberOf me.ObservableVector3d
     * @function
     * @return {me.ObservableVector3d} Reference to this object for method chaining
     */
    floorSelf () {
        return this._set(Math.floor(this._x), Math.floor(this._y), Math.floor(this._z));
    }

    /**
     * Ceil the vector values
     * @name ceil
     * @memberOf me.ObservableVector3d
     * @function
     * @return {me.ObservableVector3d} new me.ObservableVector3d
     */
    ceil () {
        return new me.ObservableVector3d(
            Math.ceil(this._x),
            Math.ceil(this._y),
            Math.ceil(this._z),
            {onUpdate: this.onUpdate}
        );
    }

    /**
     * Ceil this vector values
     * @name ceilSelf
     * @memberOf me.ObservableVector3d
     * @function
     * @return {me.ObservableVector3d} Reference to this object for method chaining
     */
    ceilSelf () {
        return this._set(Math.ceil(this._x), Math.ceil(this._y), Math.ceil(this._z));
    }

    /**
     * Negate the vector values
     * @name negate
     * @memberOf me.ObservableVector3d
     * @function
     * @return {me.ObservableVector3d} new me.ObservableVector3d
     */
    negate () {
        return new me.ObservableVector3d(
            -this._x,
            -this._y,
            -this._z,
            {onUpdate: this.onUpdate}
        );
    }

    /**
     * Negate this vector values
     * @name negateSelf
     * @memberOf me.ObservableVector3d
     * @function
     * @return {me.ObservableVector3d} Reference to this object for method chaining
     */
    negateSelf () {
        return this._set(-this._x, -this._y, -this._z);
    }

    /**
     * Copy the x,y,z values of the passed vector to this one
     * @name copy
     * @memberOf me.ObservableVector3d
     * @function
     * @param {me.Vector2d|me.Vector3d|me.ObservableVector2d|me.ObservableVector3d} v
     * @return {me.ObservableVector3d} Reference to this object for method chaining
     */
    copy (v) {
        return this._set(v.x, v.y, typeof (v.z) !== "undefined" ? v.z : this._z);
    }

    /**
     * return true if the two vectors are the same
     * @name equals
     * @memberOf me.ObservableVector3d
     * @function
     * @param {me.Vector2d|me.Vector3d|me.ObservableVector2d|me.ObservableVector3d} v
     * @return {Boolean}
     */
    equals (v) {
        return ((this._x === v.x) && (this._y === v.y) && (this._z === (v.z || this._z)));
    }

    /**
     * normalize this vector (scale the vector so that its magnitude is 1)
     * @name normalize
     * @memberOf me.ObservableVector3d
     * @function
     * @return {me.ObservableVector3d} Reference to this object for method chaining
     */
    normalize () {
        var d = this.length();
        if (d > 0) {
            return this._set(this._x / d, this._y / d, this._z / d);
        }
        return this;
    }

    /**
     * change this vector to be perpendicular to what it was before.<br>
     * (Effectively rotates it 90 degrees in a clockwise direction)
     * @name perp
     * @memberOf me.ObservableVector3d
     * @function
     * @return {me.ObservableVector3d} Reference to this object for method chaining
     */
    perp () {
        return this._set(this._y, -this._x, this._z);
    }

    /**
     * Rotate this vector (counter-clockwise) by the specified angle (in radians).
     * @name rotate
     * @memberOf me.ObservableVector3d
     * @function
     * @param {number} angle The angle to rotate (in radians)
     * @return {me.ObservableVector3d} Reference to this object for method chaining
     */
    rotate (angle) {
        var x = this._x;
        var y = this._y;
        return this._set(
            x * Math.cos(angle) - y * Math.sin(angle),
            x * Math.sin(angle) + y * Math.cos(angle),
            this._z
        );
    }

    /**
     * return the dot product of this vector and the passed one
     * @name dotProduct
     * @memberOf me.ObservableVector3d
     * @function
     * @param {me.Vector2d|me.Vector3d|me.ObservableVector2d|me.ObservableVector3d} v
     * @return {Number} The dot product.
     */
    dotProduct (v) {
        return this._x * v.x + this._y * v.y + this._z * (v.z || 1);
    }

    /**
     * return the distance between this vector and the passed one
     * @name distance
     * @memberOf me.ObservableVector3d
     * @function
     * @param {me.Vector2d|me.Vector3d|me.ObservableVector2d|me.ObservableVector3d} v
     * @return {Number}
     */
    distance (v) {
        var dx = this._x - v.x, dy = this._y - v.y, dz = this._z - (v.z || 0);
        return Math.sqrt(dx * dx + dy * dy + dz * dz);
    }

    /**
     * return a clone copy of this vector
     * @name clone
     * @memberOf me.ObservableVector3d
     * @function
     * @return {me.ObservableVector3d} new me.ObservableVector3d
     */
    clone () {
        // shall we return a cloned me.ObservableVector3d here ?
        return new me.ObservableVector3d(
            this._x,
            this._y,
            this._z,
            {onUpdate: this.onUpdate}
        );
    }

    /**
     * return a `me.Vector3d` copy of this `me.ObservableVector3d` object
     * @name toVector3d
     * @memberOf me.ObservableVector3d
     * @function
     * @return {me.Vector3d} new me.Vector3d
     */
    toVector3d () {
        return new me.Vector3d(this._x, this._y, this._z);
    }

    /**
     * convert the object to a string representation
     * @name toString
     * @memberOf me.ObservableVector3d
     * @function
     * @return {String}
     */
    toString () {
        return "x:" + this._x + ",y:" + this._y + ",z:" + this._z;
    }
};
