/*
* MelonJS Game Engine
* Copyright (C) 2011 - 2018 Olivier Biot
* http://www.melonjs.org
*
*/

/**
* a Timer object to manage time function (FPS, Game Tick, Time...)<p>
* There is no constructor function for me.timer
* @namespace me.timer
* @memberOf me
*/

/*
 * PRIVATE STUFF
 */

//hold element to display fps
let framecount = 0;
let framedelta = 0;

/* fps count stuff */
let last = 0;
let now = 0;
let delta = 0;
let step = Math.ceil(1000 / me.sys.fps); // ROUND IT ?
// define some step with some margin
let minstep = (1000 / me.sys.fps) * 1.25; // IS IT NECESSARY?\

// list of defined timer function
let timers = [];
let timerId = 0;

/**
 * @ignore
 */
let clearTimer = function (timerId) {
    for (let i = 0, len = timers.length; i < len; i++) {
        if (timers[i].timerId === timerId) {
            timers.splice(i, 1);
            break;
        }
    }
};

/**
 * update timers
 * @ignore
 */
let updateTimers = function (dt) {
    for (let i = 0, len = timers.length; i < len; i++) {
        let _timer = timers[i];
        if (!(_timer.pauseable && me.state.isPaused())) {
            _timer.elapsed += dt;
        }
        if (_timer.elapsed >= _timer.delay) {
            _timer.fn.apply(this);
            if (_timer.repeat === true) {
                _timer.elapsed -= _timer.delay;
            } else {
                me.timer.clearTimeout(_timer.timerId);
            }
        }
    }
};

/*
 * PUBLIC STUFF
 */

/**
 * Last game tick value.<br/>
 * Use this value to scale velocities during frame drops due to slow
 * hardware or when setting an FPS limit. (See {@link me.sys.fps})
 * This feature is disabled by default. Enable me.sys.interpolation to
 * use it.
 * @public
 * @see me.sys.interpolation
 * @type Number
 * @name tick
 * @memberOf me.timer
 */
export let tick = 1.0;

/**
 * Last measured fps rate.<br/>
 * This feature is disabled by default. Load and enable the DebugPanel
 * plugin to use it.
 * @public
 * @type Number
 * @name fps
 * @memberOf me.timer
 */
export let fps = 0;

/**
 * Last update time.<br/>
 * Use this value to implement frame prediction in drawing events,
 * for creating smooth motion while running game update logic at
 * a lower fps.
 * @public
 * @type Date
 * @name lastUpdate
 * @memberOf me.timer
 */
export let lastUpdate = window.performance.now();

/**
 * init the timer
 * @ignore
 */
export function init() {
    // reset letiables to initial state
    reset();
    now = last = 0;
};

/**
 * reset time (e.g. usefull in case of pause)
 * @name reset
 * @memberOf me.timer
 * @ignore
 * @function
 */
export function reset() {
    // set to "now"
    last = now = window.performance.now();
    delta = 0;
    // reset delta counting letiables
    framedelta = 0;
    framecount = 0;
};

/**
 * Calls a function once after a specified delay.
 * @name setTimeout
 * @memberOf me.timer
 * @param {Function} fn the function you want to execute after delay milliseconds.
 * @param {Number} delay the number of milliseconds (thousandths of a second) that the function call should be delayed by.
 * @param {Boolean} [pauseable=true] respects the pause state of the engine.
 * @return {Number} The numerical ID of the timeout, which can be used later with me.timer.clearTimeout().
 * @function
 */
export function setTimeout(fn, delay, pauseable) {
    timers.push({
        fn : fn,
        delay : delay,
        elapsed : 0,
        repeat : false,
        timerId : ++timerId,
        pauseable : pauseable === true || true
    });
    return timerId;
};

/**
 * Calls a function at specified interval.
 * @name setInterval
 * @memberOf me.timer
 * @param {Function} fn the function to execute
 * @param {Number} delay the number of milliseconds (thousandths of a second) on how often to execute the function
 * @param {Boolean} [pauseable=true] respects the pause state of the engine.
 * @return {Number} The numerical ID of the timeout, which can be used later with me.timer.clearInterval().
 * @function
 */
export function setInterval(fn, delay, pauseable) {
    timers.push({
        fn : fn,
        delay : delay,
        elapsed : 0,
        repeat : true,
        timerId : ++timerId,
        pauseable : pauseable === true || true
    });
    return timerId;
};

/**
 * Clears the delay set by me.timer.setTimeout().
 * @name clearTimeout
 * @memberOf me.timer
 * @function
 * @param {Number} timeoutID ID of the timeout to be cleared
 */
export function clearTimeout(timeoutID) {
    me.utils.function.defer(clearTimer, this, timeoutID);
};

/**
 * Clears the Interval set by me.timer.setInterval().
 * @name clearInterval
 * @memberOf me.timer
 * @function
 * @param {Number} intervalID ID of the interval to be cleared
 */
export function clearInterval(intervalID) {
    me.utils.function.defer(clearTimer, this, intervalID);
};

/**
 * Return the current timestamp in milliseconds <br>
 * since the game has started or since linux epoch (based on browser support for High Resolution Timer)
 * @name getTime
 * @memberOf me.timer
 * @return {Number}
 * @function
 */
export function getTime() {
    return now;
};

/**
 * Return elapsed time in milliseconds since the last update<br>
 * @name getDelta
 * @memberOf me.timer
 * @return {Number}
 * @function
 */
export function getDelta() {
    return delta;
};

/**
 * compute the actual frame time and fps rate
 * @name computeFPS
 * @ignore
 * @memberOf me.timer
 * @function
 */
export function countFPS() {
    framecount++;
    framedelta += delta;
    if (framecount % 10 === 0) {
        this.fps = me.Math.clamp(~~((1000 * framecount) / framedelta), 0, me.sys.fps);
        framedelta = 0;
        framecount = 0;
    }
};

/**
 * update game tick
 * should be called once a frame
 * @param {Number} time current timestamp as provided by the RAF callback
 * @return {Number} time elapsed since the last update
 * @ignore
 */
export function update(time) {
    last = now;
    now = time;
    delta = (now - last);

    // get the game tick
    tick = (delta > minstep && me.sys.interpolation) ? delta / step : 1;

    // update defined timers
    updateTimers(delta);

    return delta;
};
