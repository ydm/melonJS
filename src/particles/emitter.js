/*
* MelonJS Game Engine
* Copyright (C) 2011 - 2018 Olivier Biot
* http://www.melonjs.org
*
*/

import Rect from "../shapes/rectangle";

// generate a default image for the particles
let pixel = (function () {
    var canvas = me.video.createCanvas(1, 1);
    var context = canvas.getContext("2d");
    context.fillStyle = "#fff";
    context.fillRect(0, 0, 1, 1);
    return canvas;
})();

/**
 * me.ParticleEmitterSettings contains the default settings for me.ParticleEmitter.<br>
 *
 * @protected
 * @class
 * @memberOf me
 * @see me.ParticleEmitter
 */
let defaultSettings = {
    width : 0,
    height : 0,
    image : pixel,
    totalParticles : 50,
    angle : Math.PI / 2,
    angleVariation : 0,
    minLife : 1000,
    maxLife : 3000,
    speed : 2,
    speedVariation : 1,
    minRotation : 0,
    maxRotation : 0,
    minStartScale : 1,
    maxStartScale : 1,
    minEndScale : 0,
    maxEndScale : 0,
    gravity : 0,
    wind : 0,
    followTrajectory : false,
    textureAdditive : false,
    onlyInViewport : true,
    floating : false,
    maxParticles : 10,
    frequency : 100,
    duration : Infinity,
    framesToSkip : 0
};

/**
 * Particle Emitter Object.
 * @class
 * @extends Rect
 * @memberOf me
 * @constructor
 * @param {Number} x x-position of the particle emitter
 * @param {Number} y y-position of the particle emitter
 * @param {object} [settings] the settings for the particle emitter.
 * @param {Number} [settings.width=0] Width of the particle spawn area
 * @param {Number} [settings.height=0] Height of the particle spawn area
 * @param {HTMLImageElement} [settings.image] Image used for particles (default is a white pixel)
 * @param {Number} [settings.totalParticles=50] Total number of particles in the emitter
 * @param {Number} [settings.angle=Math.PI / 2] Start angle for particle launch in Radians
 * @param {Number} [settings.angleVariation=0] Variation in the start angle for particle launch in Radians
 * @param {Number} [settings.minLife=1000] Minimum time each particle lives once it is emitted in ms
 * @param {Number} [settings.maxLife=3000] Maximum time each particle lives once it is emitted in ms
 * @param {Number} [settings.speed=2] Start speed of particles
 * @param {Number} [settings.speedVariation=1] Variation in the start speed of particles
 * @param {Number} [settings.minRotation=0] Minimum start rotation for particles sprites in Radians
 * @param {Number} [settings.maxRotation=0] Maximum start rotation for particles sprites in Radians
 * @param {Number} [settings.minStartScale=1] Minimum start scale ratio for particles (1 = no scaling)
 * @param {Number} [settings.maxStartScale=1] Maximum start scale ratio for particles (1 = no scaling)
 * @param {Number} [settings.minEndScale=0] Minimum end scale ratio for particles
 * @param {Number} [settings.maxEndScale=0] Maximum end scale ratio for particles
 * @param {Number} [settings.gravity=0] Vertical force (Gravity) for each particle
 * @param {Number} [settings.wind=0] Horizontal force (like a Wind) for each particle
 * @param {Boolean} [settings.followTrajectory=false] Update the rotation of particle in accordance the particle trajectory
 * @param {Boolean} [settings.textureAdditive=false] Enable the Texture Additive by canvas composite operation (lighter)
 * @param {Boolean} [settings.onlyInViewport=true] Update particles only in the viewport, remove it when out of viewport
 * @param {Boolean} [settings.floating=false] Render particles in screen space
 * @param {Number} [settings.maxParticles=10] HMaximum number of particles launched each time in this emitter (used only if emitter is Stream)
 * @param {Number} [settings.frequency=100] How often a particle is emitted in ms (used only if emitter is Stream)
 * @param {Number} [settings.duration=Infinity] Duration that the emitter releases particles in ms (used only if emitter is Stream)
 * @param {Number} [settings.framesToSkip=0] Skip n frames after updating the particle system once
 * @example
 *
 * // Create a basic emitter at position 100, 100
 * var emitter = new me.ParticleEmitter(100, 100);
 *
 * // Adjust the emitter properties
 * emitter.totalParticles = 200;
 * emitter.minLife = 1000;
 * emitter.maxLife = 3000;
 * emitter.z = 10;
 *
 * // Add the emitter to the game world
 * me.game.world.addChild(emitter);
 *
 * // Launch all particles one time and stop, like a explosion
 * emitter.burstParticles();
 *
 * // Launch constantly the particles, like a fountain
 * emitter.streamParticles();
 *
 * // At the end, remove emitter from the game world
 * // call this in onDestroyEvent function
 * me.game.world.removeChild(emitter);
 *
 */
export default class ParticleEmitter extends Rect {
/** @scope me.ParticleEmitter.prototype */
    /**
     * @ignore
     */
    constructor (x, y, settings) {

        // call the super constructor
        super(x, y, Infinity, Infinity);

        // Emitter is Stream, launch particles constantly
        /** @ignore */
        this._stream = false;

        // Frequency timer (in ms) for emitter launch new particles
        // used only in stream emitter
        /** @ignore */
        this._frequencyTimer = 0;

        // Time of live (in ms) for emitter launch new particles
        // used only in stream emitter
        /** @ignore */
        this._durationTimer = 0;

        // Emitter is emitting particles
        /** @ignore */
        this._enabled = false;
        // Emitter will always update
        this.isRenderable = false;


        // don't sort the particles by z-index
        this.autoSort = false;

        this.container = new me.ParticleContainer(this);

        /**
         * @ignore
         */
        Object.defineProperty(this.pos, "z", {
            /**
             * @ignore
             */
            get : (function () { return this.container.pos.z; }).bind(this),
            /**
             * @ignore
             */
            set : (function (value) { this.container.pos.z = value; }).bind(this),
            enumerable : true,
            configurable : true
        });

        // Reset the emitter to defaults
        this.reset(settings);
    }


    /**
     * Floating property for particles, value is forwarded to the particle container <br>
     * @type Boolean
     * @name floating
     * @memberOf me.ParticleEmitter
     */

    /**
     * @ignore
     */
    get floating() {
        return this.container.floating;
    }
    /**
     * @ignore
     */
    set floating(value) {
        this.container.floating = value;
    }


    /**
     * @ignore
     */
    onActivateEvent() {
        this.ancestor.addChild(this.container);
        this.container.pos.z = this.pos.z;
        if (!this.ancestor.autoSort) {
            this.ancestor.sort();
        }
    }

    /**
     * @ignore
     */
    onDeactivateEvent() {
        if (this.ancestor.hasChild(this.container)) {
            this.ancestor.removeChildNow(this.container);
        }
    }

    /**
     * @ignore
     */
    destroy() {
        this.reset();
    }

    /**
     * returns a random point inside the bounds x axis of this emitter
     * @name getRandomPointX
     * @memberOf me.ParticleEmitter
     * @function
     * @return {Number}
     */
    getRandomPointX() {
        return this.pos.x + (0).randomFloat(this.width);
    }

    /**
     * returns a random point inside the bounds y axis of this emitter
     * @name getRandomPointY
     * @memberOf me.ParticleEmitter
     * @function
     * @return {Number}
     */
    getRandomPointY() {
        return this.pos.y + (0).randomFloat(this.height);
    }

    /**
     * Reset the emitter with default values.<br>
     * @function
     * @param {Object} settings [optional] object with emitter settings (See constructor)
     * @name reset
     * @memberOf me.ParticleEmitter
     */
    reset(settings) {
        // check if settings exists and create a dummy object if necessary
        settings = settings || {};
        var defaults = defaultSettings;

        var width = (typeof settings.width === "number") ? settings.width : defaults.width;
        var height = (typeof settings.height === "number") ? settings.height : defaults.height;
        this.resize(width, height);

        Object.assign(this, defaults, settings);

        // reset particle container values
        this.container.destroy();
    }

    // Add count particles in the game world
    /** @ignore */
    addParticles(count) {
        for (var i = 0; i < ~~count; i++) {
            // Add particle to the container
            var particle = me.pool.pull("me.Particle", this);
            this.container.addChild(particle);
        }
    }

    /**
     * Emitter is of type stream and is launching particles <br>
     * @function
     * @returns {Boolean} Emitter is Stream and is launching particles
     * @name isRunning
     * @memberOf me.ParticleEmitter
     */
    isRunning() {
        return this._enabled && this._stream;
    }

    /**
     * Launch particles from emitter constantly <br>
     * Particles example: Fountains
     * @param {Number} duration [optional] time that the emitter releases particles in ms
     * @function
     * @name streamParticles
     * @memberOf me.ParticleEmitter
     */
    streamParticles(duration) {
        this._enabled = true;
        this._stream = true;
        this.frequency = Math.max(this.frequency, 1);
        this._durationTimer = (typeof duration === "number") ? duration : this.duration;
    }

    /**
     * Stop the emitter from generating new particles (used only if emitter is Stream) <br>
     * @function
     * @name stopStream
     * @memberOf me.ParticleEmitter
     */
    stopStream() {
        this._enabled = false;
    }

    /**
     * Launch all particles from emitter and stop <br>
     * Particles example: Explosions <br>
     * @param {Number} total [optional] number of particles to launch
     * @function
     * @name burstParticles
     * @memberOf me.ParticleEmitter
     */
    burstParticles(total) {
        this._enabled = true;
        this._stream = false;
        this.addParticles((typeof total === "number") ? total : this.totalParticles);
        this._enabled = false;
    }

    /**
     * @ignore
     */
    update(dt) {
        // Launch new particles, if emitter is Stream
        if ((this._enabled) && (this._stream)) {
            // Check if the emitter has duration set
            if (this._durationTimer !== Infinity) {
                this._durationTimer -= dt;

                if (this._durationTimer <= 0) {
                    this.stopStream();
                    return false;
                }
            }

            // Increase the emitter launcher timer
            this._frequencyTimer += dt;

            // Check for new particles launch
            var particlesCount = this.container.children.length;
            if ((particlesCount < this.totalParticles) && (this._frequencyTimer >= this.frequency)) {
                if ((particlesCount + this.maxParticles) <= this.totalParticles) {
                    this.addParticles(this.maxParticles);
                }
                else {
                    this.addParticles(this.totalParticles - particlesCount);
                }

                this._frequencyTimer = 0;
            }
        }
        return true;
    }
};
