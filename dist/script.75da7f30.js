// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"api/index.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getProjectById = void 0;

const getProjectById = async id => {
  // return await getData();
  return fetch(`${"http://localhost:9000/.netlify/functions"}/projects/data/${id}`).then(data => data.json()).then(data => {
    return data;
  });
};

exports.getProjectById = getProjectById;

async function getData(url) {
  const cacheVersion = 1;
  const cacheName = `embedtables-${cacheVersion}`;

  try {
    const cacheStorage = await caches.open(cacheName);
    await cacheStorage.add(url);
    const data = await getCachedData(cacheName, url);
    return data;
  } catch (err) {
    console.log(err);
    const cachedData = await getCachedData(cacheName, url);

    if (cachedData) {
      return cachedData;
    }
  }
} // Get data from the cache.


async function getCachedData(cacheName, url) {
  const cacheStorage = await caches.open(cacheName);
  const cachedResponse = await cacheStorage.match(url);

  if (!cachedResponse || !cachedResponse.ok) {
    return false;
  }

  return await cachedResponse.json();
} // Delete any old caches to respect user's disk space.


async function deleteOldCaches(currentCache) {
  const keys = await caches.keys();

  for (const key of keys) {
    const isOurCache = "embedtables-" === key.substr(0, 6);

    if (currentCache === key || !isOurCache) {
      continue;
    }

    caches.delete(key);
  }
}
},{}],"et-templates-style.css":[function(require,module,exports) {
module.exports = ":root {\n  --primary-color: #000;\n  --secondary-color: #fff;\n}\n\n/* .items {\n    display: grid;\n    grid-template-columns: repeat(4, 1fr);\n    gap: 20px;\n    font-family: Arial, Helvetica, sans-serif;\n    padding: 20px;\n  }\n  .item {\n    flex: 1;\n    min-width: 200px;\n    display: grid;\n    grid-template-rows: repeat(4, auto);\n    border-radius: 3px;\n    padding: 30px 20px;\n    box-shadow: 0 3px 4px rgba(0, 0, 0, 0.2);\n    flex-direction: column;\n    text-align: center;\n    font-size: 0.8rem;\n  }\n  \n  \n  .item .Name {\n    font-size: 1.2rem;\n    font-weight: 600;\n  }\n  .item .Role {\n    font-size: 1rem;\n    font-weight: 500;\n    margin-bottom: 20px;\n  }\n  .item .Bio {\n    margin-bottom: 10px;\n  }\n  .item .Button_text {\n    margin-top: 20px;\n  } */\n.braning-wrapper {\n  margin-top: 10px;\n  display: flex;\n  align-items: center;\n}\n.branding {\n  display: block;\n  font-size: 0.8rem;\n  opacity: 0.8;\n  margin-right: 7px;\n}\n.item a {\n  text-decoration: none;\n  font-size: 1rem !important;\n  background: rgb(var(--primary-color));\n  padding: 15px 20px;\n  color: rgb(var(--secondary-color));\n  border-radius: 2px;\n  display: inline-block;\n  font-weight: 600;\n  transition: color 0.3s, background-color 0.3s;\n}\n.item a:hover {\n  background: #000;\n  color: #fff;\n}\n\n/* list-1*/\n\n.list-basic,\n.list-basic * {\n  box-sizing: border-box;\n  font-family: Arial, Helvetica, sans-serif;\n}\n\n.list-basic {\n  display: grid;\n  grid-template-columns: repeat(auto-fit, minmax(330px, 1fr));\n  place-items: center;\n  align-items: flex-start;\n  gap: 3px;\n  padding: 20px;\n}\n.list-basic .item {\n  border-radius: 4px;\n  min-height: 400px;\n  width: 100%;\n  display: flex;\n  flex-direction: column;\n  justify-content: flex-end;\n  padding: 20px;\n  position: relative;\n  color: #fff;\n}\n.list-basic .item .item__content div:first-child span {\n  display: block;\n  font-size: 1.5rem;\n  font-weight: 600;\n  color: rgb(var(--primary-color));\n}\n.list-basic .item .item__content div:first-child {\n  margin-bottom: 0;\n}\n.list-basic .item .item__content div:nth-child(2) span {\n  display: block;\n  font-weight: 600;\n  margin-bottom: 20px;\n}\n.list-basic .item .item__content div {\n  margin-bottom: 15px;\n}\n.list-basic .item .item__image {\n  position: absolute;\n  top: 0;\n  left: 0;\n  width: 100%;\n  height: 100%;\n  z-index: -999;\n}\n.list-basic .item .item__image .Image_url {\n  width: 100%;\n  height: 100%;\n}\n.list-basic .item .item__image .Image_url img {\n  width: 100%;\n  height: 100%;\n  object-fit: cover;\n}\n.list-basic .item .item__image::after {\n  content: \"\";\n  height: 100%;\n  width: 100%;\n  position: absolute;\n  top: 0;\n  left: 0;\n  z-index: 9;\n  background: linear-gradient(\n    rgba(var(--secondary-color), 0),\n    rgba(var(--secondary-color), 1) 80%\n  );\n}\n\n/* calendar-1 */\n\n.calendar-basic,\n.calendar-basic * {\n  box-sizing: border-box;\n  font-family: Arial, Helvetica, sans-serif;\n}\n.calendar-basic {\n  display: grid;\n  grid-template-columns: repeat(auto-fit, minmax(330px, 1fr));\n  place-items: center;\n  align-items: flex-start;\n  gap: 30px;\n  padding: 20px;\n}\n\n.calendar-basic .item {\n  width: 100%;\n  margin: 0 1rem 1rem 0;\n  box-shadow: 0 4px 4px rgba(0, 0, 0, 0.2);\n  border-radius: 4px;\n  word-break: break-word;\n  display: grid;\n  grid-template-rows: auto auto;\n  align-items: center;\n  row-gap: 20px;\n  position: relative;\n}\n.calendar-basic .item .item__image {\n  grid-row: 1;\n  position: relative;\n}\n.calendar-basic .item .item__image::after {\n  display: block;\n  content: \"\";\n  /* 16:9 aspect ratio */\n  padding-bottom: 56.25%;\n}\n.calendar-basic .item .item__image .Image_url img {\n  position: absolute;\n  left: 0;\n  top: 0;\n  width: 100%;\n  height: 100%;\n  object-fit: cover;\n  object-position: center;\n}\n\n.calendar-basic .item .item__content {\n  grid-row: 2;\n  padding: 30px;\n  display: flex;\n  flex-direction: column;\n}\n.calendar-basic .item .item__content div {\n  margin-bottom: 15px;\n}\n.calendar-basic .item .item__content div:first-child span {\n  font-weight: 600;\n  font-size: 1.2rem;\n}\n.calendar-basic .item .item__content .Date,\n.calendar-basic .item .item__content .Time,\n.calendar-basic .item .item__content .Location {\n  text-align: center;\n  justify-self: flex-start;\n  position: relative;\n  align-items: center;\n  display: flex;\n  margin-bottom: 5px;\n  font-size: 0.9rem;\n}\n\n.calendar-basic .item .item__content .Date::before,\n.calendar-basic .item .item__content .Time::before,\n.calendar-basic .item .item__content .Location::before {\n  display: inline-block;\n  margin-right: 5px;\n  content: \" \";\n  background-size: contain;\n  background-position: center;\n  height: 16px;\n  width: 16px;\n}\n\n.calendar-basic .item .item__content .Date::before {\n  background-image: url('data:image/svg+xml;charset=UTF-8,<svg version=\"1.1\" xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\" x=\"0px\" y=\"0px\" viewBox=\"0 0 64 64\" style=\"enable-background:new 0 0 64 64;\" xml:space=\"preserve\"> <g> <path d=\"M60,13.3H34.7V9.9c1.6-0.8,2.7-2.7,2.7-4.5C37.3,2.4,34.9,0,32,0s-5.3,2.4-5.3,5.3c0,1.9,1.1,3.7,2.7,4.5v3.5H4 c-2.1,0-4,1.6-4,4V60c0,2.1,1.9,4,4,4h56c2.1,0,4-1.9,4-4V32v-5.3v-9.3C64,15.2,62.1,13.3,60,13.3z M58.7,58.7H5.3V32h53.3V58.7z M5.3,26.7v-8h53.3v8H5.3z\"/> <path d=\"M14.7,42.7h2.7c0.8,0,1.3-0.5,1.3-1.3v-2.7c0-0.8-0.5-1.3-1.3-1.3h-2.7c-0.8,0-1.3,0.5-1.3,1.3v2.7 C13.3,42.1,13.9,42.7,14.7,42.7z\"/> <path d=\"M25.3,42.7H28c0.8,0,1.3-0.5,1.3-1.3v-2.7c0-0.8-0.5-1.3-1.3-1.3h-2.7c-0.8,0-1.3,0.5-1.3,1.3v2.7 C24,42.1,24.5,42.7,25.3,42.7z\"/> <path d=\"M36,42.7h2.7c0.8,0,1.3-0.5,1.3-1.3v-2.7c0-0.8-0.5-1.3-1.3-1.3H36c-0.8,0-1.3,0.5-1.3,1.3v2.7 C34.7,42.1,35.2,42.7,36,42.7z\"/> <path d=\"M46.7,42.7h2.7c0.8,0,1.3-0.5,1.3-1.3v-2.7c0-0.8-0.5-1.3-1.3-1.3h-2.7c-0.8,0-1.3,0.5-1.3,1.3v2.7 C45.3,42.1,45.9,42.7,46.7,42.7z\"/> <path d=\"M14.7,53.3h2.7c0.8,0,1.3-0.5,1.3-1.3v-2.7c0-0.8-0.5-1.3-1.3-1.3h-2.7c-0.8,0-1.3,0.5-1.3,1.3V52 C13.3,52.8,13.9,53.3,14.7,53.3z\"/> <path d=\"M25.3,53.3H28c0.8,0,1.3-0.5,1.3-1.3v-2.7c0-0.8-0.5-1.3-1.3-1.3h-2.7c-0.8,0-1.3,0.5-1.3,1.3V52 C24,52.8,24.5,53.3,25.3,53.3z\"/> <path d=\"M36,53.3h2.7c0.8,0,1.3-0.5,1.3-1.3v-2.7c0-0.8-0.5-1.3-1.3-1.3H36c-0.8,0-1.3,0.5-1.3,1.3V52C34.7,52.8,35.2,53.3,36,53.3 z\"/> <path d=\"M46.7,53.3h2.7c0.8,0,1.3-0.5,1.3-1.3v-2.7c0-0.8-0.5-1.3-1.3-1.3h-2.7c-0.8,0-1.3,0.5-1.3,1.3V52 C45.3,52.8,45.9,53.3,46.7,53.3z\"/> </g> </svg>');\n}\n\n.calendar-basic .item .item__content .Time::before {\n  background-image: url('data:image/svg+xml;charset=UTF-8,<svg version=\"1.1\" id=\"Layer_1\" xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\" x=\"0px\" y=\"0px\" viewBox=\"0 0 64 64\" style=\"enable-background:new 0 0 64 64;\" xml:space=\"preserve\"> <g> <path d=\"M56.3,22.7c1.6-1.9,2.4-4.3,2.4-6.7c0-5.9-4.8-10.7-10.7-10.7c-3.2,0-6.4,1.6-8.3,4c-1.6-0.5-3.2-0.8-5.1-1.1V5.3h2.7 c1.6,0,2.7-1.1,2.7-2.7S38.9,0,37.3,0H26.7C25.1,0,24,1.1,24,2.7s1.1,2.7,2.7,2.7h2.7v2.9c-1.6,0.3-3.5,0.5-5.1,1.1 c-1.9-2.4-5.1-4-8.3-4C10.1,5.3,5.3,10.1,5.3,16c0,2.4,0.8,4.8,2.4,6.7c-2.4,4-3.5,8.5-3.5,13.3c0,15.5,12.3,28,27.7,28 s27.7-12.5,27.7-28C59.7,31.2,58.7,26.7,56.3,22.7z M48,10.7c2.9,0,5.3,2.4,5.3,5.3c0,0.5-0.3,1.3-0.3,1.9 c-2.1-2.7-4.8-4.8-7.7-6.4C45.9,10.9,46.9,10.7,48,10.7z M10.7,16c0-2.9,2.4-5.3,5.3-5.3c1.1,0,2.1,0.3,2.9,0.8 c-2.9,1.6-5.6,3.7-8,6.4C10.9,17.3,10.7,16.5,10.7,16z M32,58.7C19.5,58.7,9.6,48.5,9.6,36S19.7,13.3,32,13.3 c12.5,0,22.4,10.1,22.4,22.7S44.5,58.7,32,58.7z\"/> <path d=\"M42.7,34.7h-8V24c0-1.6-1.1-2.7-2.7-2.7c-1.6,0-2.7,1.1-2.7,2.7v10.7c-1.6,0-2.7,1.1-2.7,2.7c0,1.6,1.1,2.7,2.7,2.7 c0,1.6,1.1,2.7,2.7,2.7c1.6,0,2.7-1.1,2.7-2.7h8c1.6,0,2.7-1.1,2.7-2.7C45.3,35.7,44.3,34.7,42.7,34.7z\"/> </g> </svg>');\n}\n\n.calendar-basic .item .item__content .Location::before {\n  background-image: url('data:image/svg+xml;charset=UTF-8,<svg version=\"1.1\" id=\"Layer_2_1_\" xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\" x=\"0px\" y=\"0px\" viewBox=\"0 0 64 64\" style=\"enable-background:new 0 0 64 64;\" xml:space=\"preserve\"> <g> <ellipse cx=\"30.8\" cy=\"11.9\" rx=\"2.1\" ry=\"1.9\"/> <path d=\"M60.7,16.7l-20.5-4.8c0-5.1-4.3-9.1-9.3-9.1s-9.3,4.3-9.3,9.3c0,1.1,0.3,2.4,1.1,4l-0.8-0.3L5.5,11.6 c-1.3-0.3-2.7,0-3.7,0.8c-1.3,0.5-1.9,1.9-1.9,3.2v33.9c0,1.9,1.3,3.5,2.9,4l17.3,7.5h0.3c0.5,0,1.1,0.3,1.3,0.3 c0.5,0,1.1,0,1.6-0.3L42,53.2l16.5,6.4h0.3c0.3,0,0.5,0,1.1,0c0.8,0,1.9-0.3,2.7-0.8c1.1-0.8,1.6-2.1,1.6-3.5V20.7 C63.9,18.8,62.5,16.9,60.7,16.7z M30.8,7.9c2.1,0,4,1.6,4,4c0,1.1-1.3,4-4,8c-2.7-4-4-7.2-4-8C26.8,9.5,28.7,7.9,30.8,7.9z M27.9,25.2c0.5,0.8,1.6,1.3,2.7,1.3l0,0c1.1,0,2.1-0.5,2.7-1.3c2.1-2.9,3.7-5.6,4.8-8l1.6-0.3v31.2l-16,6.7V20.9l1.1-0.3 C25.7,22,26.8,23.6,27.9,25.2z M5.2,16.9l13.3,3.7v33.9L5.2,48.9V16.9z M58.5,54l-13.3-5.3V18.3l13.3,3.2V54z\"/> </g> </svg>');\n}\n\n/* book store */\n.store-book-store,\n.store-book-store * {\n  box-sizing: border-box;\n  font-family: Arial, Helvetica, sans-serif;\n}\n\n.store-book-store {\n  display: grid;\n  grid-template-columns: repeat(auto-fit, minmax(500px, 1fr));\n  padding: 30px;\n  align-items: flex-start;\n  justify-content: center;\n}\n.store-book-store .item {\n  margin: 7%;\n  /* display: grid;\n  grid-template-columns: 1fr 2fr; */\n  display: flex;\n  flex-wrap: wrap;\n  position: relative;\n  min-height: 300px;\n}\n.store-book-store .item .item__content {\n  flex: 2;\n  margin-top: 15px;\n}\n.store-book-store .item .item__content div span {\n  word-break: break-word;\n}\n.store-book-store .item .item__image {\n  flex: 1;\n  min-width: 150px;\n  margin-right: 5%;\n}\n.store-book-store .item .item__content div:first-child span {\n  font-size: 2rem;\n  font-weight: 600;\n}\n.store-book-store .item .item__content div {\n  margin-bottom: 15px;\n}\n.store-book-store .item .item__image .Image_url {\n  position: relative;\n  border-radius: 5px;\n}\n.store-book-store .item .item__image .Image_url::before {\n  display: block;\n  content: \"\";\n  width: 100%;\n  padding-top: calc((1.6 / 1) * 100%);\n}\n.store-book-store .item .item__image .Image_url img {\n  border-radius: inherit;\n  width: 100%;\n  height: 100%;\n  object-fit: cover;\n  position: absolute;\n  top: 0;\n  right: 0;\n  bottom: 0;\n  left: 0;\n  box-shadow: -2px 5px 10px 2px rgba(0, 0, 0, 0.2);\n}\n\n/* list-basic-2 */\n\n.list-basic-2,\n.list-basic-2 * {\n  box-sizing: border-box;\n  font-family: Arial, Helvetica, sans-serif;\n}\n\n.list-basic-2 {\n  display: grid;\n  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));\n  place-items: center;\n  align-items: flex-start;\n  gap: 10px;\n}\n.list-basic-2 .item {\n  border-radius: 20px;\n  display: flex;\n  flex-direction: column;\n  justify-content: flex-start;\n  position: relative;\n  color: #222;\n  height: 100%;\n  border: 1px solid #ccc;\n}\n.list-basic-2 .item .item__content {\n  padding: 10px;\n}\n.list-basic-2 .item .item__image {\n  width: 100%;\n  object-fit: cover;\n}\n.list-basic-2 .item .item__image img {\n  width: 100%;\n  border-radius: 20px 20px 0 0;\n}\n.list-basic-2 .item .item__content div:first-child span {\n  font-weight: 600;\n  font-size: 1.2rem;\n  display: block;\n  margin-bottom: 15px;\n}\n"
},{}],"script.js":[function(require,module,exports) {
"use strict";

var _api = require("./api");

var _etTemplatesStyle = _interopRequireDefault(require("./et-templates-style.css"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const roots = document.querySelectorAll("div[data-embedtableid]");

function renderWidget(root, template, integrationName, showBranding, fields) {
  const wrapper = document.createElement("div");
  wrapper.classList.add(template);
  fields.map(row => {
    if (integrationName === "airtable") {
      row.map(r => {
        if (r.name.indexOf("*") > -1) {
          r["order"] = Number(r.name.split("*")[0]) || 99;
          r["name"] = r.name.substring(2);
        }
      });
      row = row.sort((el, el2) => el.order - el2.order);
      console.log(row);
    }

    const rowDOM = document.createElement("div");
    const rowImageWrapper = document.createElement("div");
    const rowContentWrapper = document.createElement("div");
    rowDOM.classList.add("item");
    rowImageWrapper.classList.add("item__image");
    rowContentWrapper.classList.add("item__content");
    let buttonText = row.find(el => el.name == "Button_text");
    let buttonUrl = row.find(el => el.name == "Button_url");

    for (let i = 0; i < row.length; i++) {
      let itemDOM = null;
      itemDOM = document.createElement("div");
      itemDOM.classList.add(row[i].name.replace(" ", "-"));

      if (row[i].name == "Button_text" && row[i].value) {
        const link = row.find(el => el.name == "Button_url");
        let linkValue = null;

        if (link) {
          linkValue = link.value || "/";
        }

        itemDOM.innerHTML = `<a href='${linkValue}'>${row[i].value}</a>`;
        rowContentWrapper.append(itemDOM);
      } else if (row[i].name == "Button_url") {
        continue;
      } else if (row[i].name == "Image_url") {
        itemDOM.innerHTML = `<img loading="lazy" src='${row[i].value || "https://picsum.photos/300"}'/>`;
        rowImageWrapper.append(itemDOM);
      } else {
        if (row[i].value === "TRUE") {
          itemDOM.innerHTML = `<span style="color:green">&#10003;</span>`;
        } else if (row[i].value === "FALSE") {
          itemDOM.innerHTML = `<span style="color:red">&#10007;</span>`;
        } else {
          itemDOM.innerHTML = `<span style='font-style: ${row[i].styles.textFormat.italic && "italic"};font-weight:${row[i].styles.textFormat.bold && "800"};text-decoration: ${row[i].styles.textFormat.underline && "underline"}'>${row[i].formattedValue}</span>`;
        }

        rowContentWrapper.append(itemDOM);
      }

      rowDOM.append(rowImageWrapper);
      rowDOM.append(rowContentWrapper);
    }

    wrapper.append(rowDOM);
  });
  root.append(wrapper);

  if (showBranding) {
    const brandingDOM = document.createElement("div");
    brandingDOM.innerHTML = `<div class="braning-wrapper"><span class="branding">Made with </span><a href="https://embedtables.com"><img src="https://app.embedtables.com/static/media/logo.8fd74efc.svg" width="20px" alt="embedtables"/></a></div>`;
    root.append(brandingDOM);
  }
}

(async function () {
  roots.forEach(async function (root) {
    root.innerHTML += `
      <style>${_etTemplatesStyle.default}</style> 
      `;
    const data = await (0, _api.getProjectById)(root.dataset["embedtableid"]);
    root.style.setProperty("--primary-color", data.primaryColor);
    root.style.setProperty("--secondary-color", data.secondaryColor);
    renderWidget(root, data.templateSlug, data.integrationName, data.showBranding, data.fields);
  });
})();
},{"./api":"api/index.js","./et-templates-style.css":"et-templates-style.css"}],"../../../../../../usr/local/lib/node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "52105" + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);

          if (didAccept) {
            handled = true;
          }
        }
      }); // Enable HMR for CSS by default.

      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });

      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
      }
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }
}
},{}]},{},["../../../../../../usr/local/lib/node_modules/parcel-bundler/src/builtins/hmr-runtime.js","script.js"], null)
//# sourceMappingURL=/script.75da7f30.js.map