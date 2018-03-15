/*
 * MelonJS Game Engine
 * Copyright (C) 2011 - 2018 Olivier Biot
 * http://www.melonjs.org
 *
 */

import Entity from "./entity";

/**
 * @class
 * @extends me.Entity
 * @memberOf me
 * @constructor
 * @param {Number} x the x coordinates of the entity object
 * @param {Number} y the y coordinates of the entity object
 * @param {Object} settings See {@link me.Entity}
 */
export default class CollectableEntity extends Entity {
    /** @scope me.CollectableEntity.prototype */
    constructor(x, y, settings) {
        // call the super constructor
        super(x, y, settings);
        this.body.collisionType = me.collision.types.COLLECTABLE_OBJECT;
    }
};
