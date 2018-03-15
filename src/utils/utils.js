/*
 * MelonJS Game Engine
 * Copyright (C) 2011 - 2018 Olivier Biot
 * http://www.melonjs.org
 *
 */

// guid default value
let GUID_base  = "";
let GUID_index = 0;

/*
 * PUBLIC STUFF
 */

/**
 * Get image pixels
 * @public
 * @function
 * @memberOf me.utils
 * @name getPixels
 * @param {Image|Canvas} image Image to read
 * @return {ImageData} Canvas ImageData object
 */
export function getPixels (arg) {
    if (arg instanceof HTMLImageElement) {
        var _context = me.CanvasRenderer.getContext2d(
            me.video.createCanvas(arg.width, arg.height)
        );
        _context.drawImage(arg, 0, 0);
        return _context.getImageData(0, 0, arg.width, arg.height);
    }
    else {
        // canvas !
        return arg.getContext("2d").getImageData(0, 0, arg.width, arg.height);
    }
};

/**
 * reset the GUID Base Name
 * the idea here being to have a unique ID
 * per level / object
 * @ignore
 */
export function resetGUID (base, index) {
    // also ensure it's only 8bit ASCII characters
    GUID_base  = me.utils.string.toHex(base.toString().toUpperCase());
    GUID_index = index || 0;
};

/**
 * create and return a very simple GUID
 * Game Unique ID
 * @ignore
 */
export function createGUID (index) {
    // to cover the case of undefined id for groups
    GUID_index += index || 1;
    return GUID_base + "-" + (index || GUID_index);
};
