var exec = require("cordova/exec");
module.exports = {
  isAvailable: function (callback) {
    var errorHandler = function errorHandler(error) {
      // An error has occurred while trying to access the
      // InAppBrowser native implementation, most likely because
      // we are on an unsupported platform.
      callback(false);
    };
    exec(callback, errorHandler, "InAppBrowser", "isAvailable", []);
  },
  show: function (options, onSuccess, onError) {
    options = options || {};
    if (!options.hasOwnProperty('animated')) {
      options.animated = true;
    }
    exec(onSuccess, onError, "InAppBrowser", "show", [options]);
  },
  // hide: function (onSuccess, onError) {
  //   exec(onSuccess, onError, "InAppBrowser", "hide", []);
  // },
  getViewHandlerPackages: function (onSuccess, onError) {
    exec(onSuccess, onError, "InAppBrowser", "getViewHandlerPackages", []);
  },
  useCustomTabsImplementation: function (packageName, onSuccess, onError) {
    exec(onSuccess, onError, "InAppBrowser", "useCustomTabsImplementation", [packageName]);
  },
  connectToService: function (onSuccess, onError) {
    exec(onSuccess, onError, "InAppBrowser", "connectToService", []);
  },
  warmUp: function (onSuccess, onError) {
    exec(onSuccess, onError, "InAppBrowser", "warmUp", []);
  },
  mayLaunchUrl: function (url, onSuccess, onError) {
    exec(onSuccess, onError, "InAppBrowser", "mayLaunchUrl", [url]);
  }
};
var _open = window.open;
window.open = function (url, windowName, options) {
   if (windowName === 'self') {
     return _open(url, windowName, options);
   }
   return module.exports.show({
     url: url
   });
}
