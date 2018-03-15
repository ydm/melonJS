/**
 * MelonJS Game Engine
 * Copyright (C) 2011 - 2018 Olivier Biot
 * http://www.melonjs.org
 */


 var melonJS = {
     // renderables
     ColorLayer: require("./renderable/colorlayer"),
     Container: require("./renderable/container"),
     GUI_Object: require("./renderable/GUI"),
     ImageLayer: require("./renderable/imagelayer"),
     Renderable: require("./renderable/renderable"),
     Sprite: require("./renderable/sprite"),
     Viewport: require("./renderable/viewport"),
     // shapes
     Polygon: require("./shapes/poly"),
     Ellipse: require("./shapes/ellipse"),
     Line: require("./shapes/line"),
     Rect: require("./shapes/rectangle")
 };


 // Always export me globally.
 module.exports = melonJS;

 // Always export me globally.
 global.me = melonJS;
