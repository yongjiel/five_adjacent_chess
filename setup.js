require("@babel/register")();
/*
var jsdom = require("jsdom").jsdom;
global.document = jsdom("");*/
var jsdom = require("jsdom");
const { JSDOM } = jsdom;
const { document } = new JSDOM("<!doctype html><html><body></body></html>", {
  url: "http://localhost",
}).window;
global.document = document;
global.window = document.defaultView;
var exposedProperties = ["window", "navigator", "document"];

Object.keys(document.defaultView).forEach((property) => {
  if (typeof global[property] === "undefined") {
    exposedProperties.push(property);
    global[property] = document.defaultView[property];
  }
});

global.navigator = {
  userAgent: "node.js",
};
