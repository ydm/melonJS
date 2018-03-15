/*
* MelonJS Game Engine
* Copyright (C) 2011 - 2018 Olivier Biot
* http://www.melonjs.org
*
* Separating Axis Theorem implementation, based on the SAT.js library by Jim Riecken <jimr@jimr.ca>
* Available under the MIT License - https://github.com/jriecken/sat-js
*/


/**
 * An object representing the result of an intersection.
 * @property {me.Entity} a The first object participating in the intersection
 * @property {me.Entity} b The second object participating in the intersection
 * @property {Number} overlap Magnitude of the overlap on the shortest colliding axis
 * @property {me.Vector2d} overlapV The overlap vector (i.e. `overlapN.scale(overlap, overlap)`). If this vector is subtracted from the position of a, a and b will no longer be colliding
 * @property {me.Vector2d} overlapN The shortest colliding axis (unit-vector)
 * @property {Boolean} aInB Whether the first object is entirely inside the second
 * @property {Boolean} bInA Whether the second object is entirely inside the first
 * @property {Number} indexShapeA The index of the colliding shape for the object a body
 * @property {Number} indexShapeB The index of the colliding shape for the object b body
 * @name ResponseObject
 * @memberOf me.collision
 * @public
 * @type {Object}
 * @see me.collision.check
 */
export default class ResponseObject  {
    /** @ignore */
    constructor() {
        this.a = null;
        this.b = null;
        this.overlapN = new me.Vector2d();
        this.overlapV = new me.Vector2d();
        this.aInB = true;
        this.bInA = true;
        this.indexShapeA = -1;
        this.indexShapeB = -1;
        this.overlap = Number.MAX_VALUE;
    };

    /**
     * Set some values of the response back to their defaults. <br>
     * Call this between tests if you are going to reuse a single <br>
     * Response object for multiple intersection tests <br>
     * (recommended as it will avoid allocating extra memory) <br>
     * @name clear
     * @memberOf me.collision.ResponseObject
     * @public
     * @function
     */
    clear() {
        this.aInB = true;
        this.bInA = true;
        this.overlap = Number.MAX_VALUE;
        this.indexShapeA = -1;
        this.indexShapeB = -1;
        return this;
    };
};
