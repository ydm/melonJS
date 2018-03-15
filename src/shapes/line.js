/*
 * MelonJS Game Engine
 * Copyright (C) 2011 - 2018 Olivier Biot
 * http://www.melonjs.org
 *
 */

import Polygon from "./poly";

/**
 * a line segment Object.<br>
 * @class
 * @extends me.Polygon
 * @memberOf me
 * @constructor
 * @param {Number} x origin point of the Line
 * @param {Number} y origin point of the Line
 * @param {me.Vector2d[]} points array of vectors defining the Line
 */
export default class Line extends Polygon {

    /**
     * check if this line segment contains the specified point
     * @name containsPointV
     * @memberOf me.Line
     * @function
     * @param  {me.Vector2d} point
     * @return {boolean} true if contains
     */
    containsPointV(v) {
        return this.containsPoint(v.x, v.y);
    }

    /**
     * check if this line segment contains the specified point
     * @name containsPoint
     * @memberOf me.Line
     * @function
     * @param  {Number} x x coordinate
     * @param  {Number} y y coordinate
     * @return {boolean} true if contains
     */
    containsPoint(x, y) {
        // translate the given coordinates,
        // rather than creating temp translated vectors
        x -= this.pos.x; // Cx
        y -= this.pos.y; // Cy
        var start = this.points[0]; // Ax/Ay
        var end = this.points[1]; // Bx/By

        //(Cy - Ay) * (Bx - Ax) = (By - Ay) * (Cx - Ax)
        return (y - start.y) * (end.x - start.x) === (end.y - start.y) * (x - start.x);
    }

    /**
     * Computes the calculated collision edges and normals.
     * This **must** be called if the `points` array, `angle`, or `offset` is modified manually.
     * @name recalc
     * @memberOf me.Line
     * @function
     */
    recalc() {
        // The edges here are the direction of the `n`th edge of the polygon, relative to
        // the `n`th point. If you want to draw a given edge from the edge value, you must
        // first translate to the position of the starting point.
        var edges = this.edges = [];
        // The normals here are the direction of the normal for the `n`th edge of the polygon, relative
        // to the position of the `n`th point. If you want to draw an edge normal, you must first
        // translate to the position of the starting point.
        var normals = this.normals = [];
        // Copy the original points array and apply the offset/angle
        var points = this.points;

        if (points.length !== 2) {
            throw new Error("me.Line: Requires exactly 2 points");
        }

        // Calculate the edges/normals
        var e = new me.Vector2d().copy(points[1]).sub(points[0]);
        edges.push(e);
        normals.push(new me.Vector2d().copy(e).perp().normalize());

        return this;
    }

    /**
     * clone this line segment
     * @name clone
     * @memberOf me.Line
     * @function
     * @return {me.Line} new Line
     */
    clone() {
        var copy = [];
        this.points.forEach(function (point) {
            copy.push(new me.Vector2d(point.x, point.y));
        });
        return new me.Line(this.pos.x, this.pos.y, copy);
    }
};
