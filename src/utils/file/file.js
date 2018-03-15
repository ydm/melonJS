/*
 * MelonJS Game Engine
 * Copyright (C) 2011 - 2018 Olivier Biot
 * http://www.melonjs.org
 *
 */


// regexp to deal with file name & path
let REMOVE_PATH = /^.*(\\|\/|\:)/;
let REMOVE_EXT = /\.[^\.]*$/;

/**
 * return the base name of the file without path info
 * @public
 * @function
 * @memberOf me.utils.file
 * @name getBasename
 * @param  {String} path path containing the filename
 * @return {String} the base name without path information.
 */
export function getBasename (path) {
    return path.replace(REMOVE_PATH, "").replace(REMOVE_EXT, "");
};

/**
 * return the extension of the file in the given path
 * @public
 * @function
 * @memberOf me.utils.file
 * @name getExtension
 * @param  {String} path path containing the filename
 * @return {String} filename extension.
 */
export function getExtension (path) {
    return path.substring(path.lastIndexOf(".") + 1, path.length);
};
