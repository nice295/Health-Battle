require=(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({"TextLayer":[function(require,module,exports){
var TextLayer, convertTextLayers, convertToTextLayer,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

TextLayer = (function(superClass) {
  extend(TextLayer, superClass);

  function TextLayer(options) {
    if (options == null) {
      options = {};
    }
    this.doAutoSize = false;
    this.doAutoSizeHeight = false;
    if (options.backgroundColor == null) {
      options.backgroundColor = options.setup ? "hsla(60, 90%, 47%, .4)" : "transparent";
    }
    if (options.color == null) {
      options.color = "red";
    }
    if (options.lineHeight == null) {
      options.lineHeight = 1.25;
    }
    if (options.fontFamily == null) {
      options.fontFamily = "Helvetica";
    }
    if (options.fontSize == null) {
      options.fontSize = 20;
    }
    if (options.text == null) {
      options.text = "Use layer.text to add text";
    }
    TextLayer.__super__.constructor.call(this, options);
    this.style.whiteSpace = "pre-line";
    this.style.outline = "none";
  }

  TextLayer.prototype.setStyle = function(property, value, pxSuffix) {
    if (pxSuffix == null) {
      pxSuffix = false;
    }
    this.style[property] = pxSuffix ? value + "px" : value;
    this.emit("change:" + property, value);
    if (this.doAutoSize) {
      return this.calcSize();
    }
  };

  TextLayer.prototype.calcSize = function() {
    var constraints, size, sizeAffectingStyles;
    sizeAffectingStyles = {
      lineHeight: this.style["line-height"],
      fontSize: this.style["font-size"],
      fontWeight: this.style["font-weight"],
      paddingTop: this.style["padding-top"],
      paddingRight: this.style["padding-right"],
      paddingBottom: this.style["padding-bottom"],
      paddingLeft: this.style["padding-left"],
      textTransform: this.style["text-transform"],
      borderWidth: this.style["border-width"],
      letterSpacing: this.style["letter-spacing"],
      fontFamily: this.style["font-family"],
      fontStyle: this.style["font-style"],
      fontVariant: this.style["font-variant"]
    };
    constraints = {};
    if (this.doAutoSizeHeight) {
      constraints.width = this.width;
    }
    size = Utils.textSize(this.text, sizeAffectingStyles, constraints);
    if (this.style.textAlign === "right") {
      this.width = size.width;
      this.x = this.x - this.width;
    } else {
      this.width = size.width;
    }
    return this.height = size.height;
  };

  TextLayer.define("autoSize", {
    get: function() {
      return this.doAutoSize;
    },
    set: function(value) {
      this.doAutoSize = value;
      if (this.doAutoSize) {
        return this.calcSize();
      }
    }
  });

  TextLayer.define("autoSizeHeight", {
    set: function(value) {
      this.doAutoSize = value;
      this.doAutoSizeHeight = value;
      if (this.doAutoSize) {
        return this.calcSize();
      }
    }
  });

  TextLayer.define("contentEditable", {
    set: function(boolean) {
      this._element.contentEditable = boolean;
      this.ignoreEvents = !boolean;
      return this.on("input", function() {
        if (this.doAutoSize) {
          return this.calcSize();
        }
      });
    }
  });

  TextLayer.define("text", {
    get: function() {
      return this._element.textContent;
    },
    set: function(value) {
      this._element.textContent = value;
      this.emit("change:text", value);
      if (this.doAutoSize) {
        return this.calcSize();
      }
    }
  });

  TextLayer.define("fontFamily", {
    get: function() {
      return this.style.fontFamily;
    },
    set: function(value) {
      return this.setStyle("fontFamily", value);
    }
  });

  TextLayer.define("fontSize", {
    get: function() {
      return this.style.fontSize.replace("px", "");
    },
    set: function(value) {
      return this.setStyle("fontSize", value, true);
    }
  });

  TextLayer.define("lineHeight", {
    get: function() {
      return this.style.lineHeight;
    },
    set: function(value) {
      return this.setStyle("lineHeight", value);
    }
  });

  TextLayer.define("fontWeight", {
    get: function() {
      return this.style.fontWeight;
    },
    set: function(value) {
      return this.setStyle("fontWeight", value);
    }
  });

  TextLayer.define("fontStyle", {
    get: function() {
      return this.style.fontStyle;
    },
    set: function(value) {
      return this.setStyle("fontStyle", value);
    }
  });

  TextLayer.define("fontVariant", {
    get: function() {
      return this.style.fontVariant;
    },
    set: function(value) {
      return this.setStyle("fontVariant", value);
    }
  });

  TextLayer.define("padding", {
    set: function(value) {
      this.setStyle("paddingTop", value, true);
      this.setStyle("paddingRight", value, true);
      this.setStyle("paddingBottom", value, true);
      return this.setStyle("paddingLeft", value, true);
    }
  });

  TextLayer.define("paddingTop", {
    get: function() {
      return this.style.paddingTop.replace("px", "");
    },
    set: function(value) {
      return this.setStyle("paddingTop", value, true);
    }
  });

  TextLayer.define("paddingRight", {
    get: function() {
      return this.style.paddingRight.replace("px", "");
    },
    set: function(value) {
      return this.setStyle("paddingRight", value, true);
    }
  });

  TextLayer.define("paddingBottom", {
    get: function() {
      return this.style.paddingBottom.replace("px", "");
    },
    set: function(value) {
      return this.setStyle("paddingBottom", value, true);
    }
  });

  TextLayer.define("paddingLeft", {
    get: function() {
      return this.style.paddingLeft.replace("px", "");
    },
    set: function(value) {
      return this.setStyle("paddingLeft", value, true);
    }
  });

  TextLayer.define("textAlign", {
    set: function(value) {
      return this.setStyle("textAlign", value);
    }
  });

  TextLayer.define("textTransform", {
    get: function() {
      return this.style.textTransform;
    },
    set: function(value) {
      return this.setStyle("textTransform", value);
    }
  });

  TextLayer.define("letterSpacing", {
    get: function() {
      return this.style.letterSpacing.replace("px", "");
    },
    set: function(value) {
      return this.setStyle("letterSpacing", value, true);
    }
  });

  TextLayer.define("length", {
    get: function() {
      return this.text.length;
    }
  });

  return TextLayer;

})(Layer);

convertToTextLayer = function(layer) {
  var css, cssObj, importPath, t;
  t = new TextLayer({
    name: layer.name,
    frame: layer.frame,
    parent: layer.parent
  });
  cssObj = {};
  css = layer._info.metadata.css;
  css.forEach(function(rule) {
    var arr;
    if (_.includes(rule, '/*')) {
      return;
    }
    arr = rule.split(': ');
    return cssObj[arr[0]] = arr[1].replace(';', '');
  });
  t.style = cssObj;
  importPath = layer.__framerImportedFromPath;
  if (_.includes(importPath, '@2x')) {
    t.fontSize *= 2;
    t.lineHeight = (parseInt(t.lineHeight) * 2) + 'px';
    t.letterSpacing *= 2;
  }
  t.y -= (parseInt(t.lineHeight) - t.fontSize) / 2;
  t.y -= t.fontSize * 0.1;
  t.x -= t.fontSize * 0.08;
  t.width += t.fontSize * 0.5;
  t.text = layer._info.metadata.string;
  layer.destroy();
  return t;
};

Layer.prototype.convertToTextLayer = function() {
  return convertToTextLayer(this);
};

convertTextLayers = function(obj) {
  var layer, prop, results;
  results = [];
  for (prop in obj) {
    layer = obj[prop];
    if (layer._info.kind === "text") {
      results.push(obj[prop] = convertToTextLayer(layer));
    } else {
      results.push(void 0);
    }
  }
  return results;
};

Layer.prototype.frameAsTextLayer = function(properties) {
  var t;
  t = new TextLayer;
  t.frame = this.frame;
  t.superLayer = this.superLayer;
  _.extend(t, properties);
  this.destroy();
  return t;
};

exports.TextLayer = TextLayer;

exports.convertTextLayers = convertTextLayers;


},{}],"circleModule":[function(require,module,exports){
var extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

exports.Circle = (function(superClass) {
  extend(Circle, superClass);

  Circle.prototype.currentValue = null;

  function Circle(options) {
    var base, base1, base2, base3, base4, base5, base6, base7, base8, counter, numberDuration, numberEnd, numberInterval, numberNow, numberStart, self, style;
    this.options = options != null ? options : {};
    if ((base = this.options).circleSize == null) {
      base.circleSize = 300;
    }
    if ((base1 = this.options).strokeWidth == null) {
      base1.strokeWidth = 24;
    }
    if ((base2 = this.options).strokeColor == null) {
      base2.strokeColor = "#fc245c";
    }
    if ((base3 = this.options).topColor == null) {
      base3.topColor = null;
    }
    if ((base4 = this.options).bottomColor == null) {
      base4.bottomColor = null;
    }
    if ((base5 = this.options).hasCounter == null) {
      base5.hasCounter = null;
    }
    if ((base6 = this.options).counterColor == null) {
      base6.counterColor = "#fff";
    }
    if ((base7 = this.options).counterFontSize == null) {
      base7.counterFontSize = 60;
    }
    if ((base8 = this.options).hasLinearEasing == null) {
      base8.hasLinearEasing = null;
    }
    this.options.value = 2;
    this.options.viewBox = this.options.circleSize + this.options.strokeWidth;
    Circle.__super__.constructor.call(this, this.options);
    this.backgroundColor = "";
    this.height = this.options.viewBox;
    this.width = this.options.viewBox;
    this.rotation = -90;
    this.pathLength = Math.PI * this.options.circleSize;
    this.circleID = "circle" + Math.floor(Math.random() * 1000);
    this.gradientID = "circle" + Math.floor(Math.random() * 1000);
    if (this.options.hasCounter !== null) {
      counter = new Layer({
        parent: this,
        html: "",
        width: this.width,
        height: this.height,
        backgroundColor: "",
        rotation: 90,
        color: this.options.counterColor
      });
      style = {
        textAlign: "center",
        fontSize: this.options.counterFontSize + "px",
        lineHeight: this.height + "px",
        fontWeight: "600",
        fontFamily: "-apple-system, Helvetica, Arial, sans-serif",
        boxSizing: "border-box",
        height: this.height
      };
      counter.style = style;
      numberStart = 0;
      numberEnd = 100;
      numberDuration = 2;
      numberNow = numberStart;
      numberInterval = numberEnd - numberStart;
    }
    this.html = "<svg viewBox='-" + (this.options.strokeWidth / 2) + " -" + (this.options.strokeWidth / 2) + " " + this.options.viewBox + " " + this.options.viewBox + "' >\n	<defs>\n	    <linearGradient id='" + this.gradientID + "' >\n	        <stop offset=\"0%\" stop-color='" + (this.options.topColor !== null ? this.options.bottomColor : this.options.strokeColor) + "'/>\n	        <stop offset=\"100%\" stop-color='" + (this.options.topColor !== null ? this.options.topColor : this.options.strokeColor) + "' stop-opacity=\"1\" />\n	    </linearGradient>\n	</defs>\n	<circle id='" + this.circleID + "'\n			fill='none'\n			stroke-linecap='round'\n			stroke-width      = '" + this.options.strokeWidth + "'\n			stroke-dasharray  = '" + this.pathLength + "'\n			stroke-dashoffset = '0'\n			stroke=\"url(#" + this.gradientID + ")\"\n			stroke-width=\"10\"\n			cx = '" + (this.options.circleSize / 2) + "'\n			cy = '" + (this.options.circleSize / 2) + "'\n			r  = '" + (this.options.circleSize / 2) + "'>\n</svg>";
    self = this;
    Utils.domComplete(function() {
      return self.path = document.querySelector("#" + self.circleID);
    });
    this.proxy = new Layer({
      opacity: 0
    });
    this.proxy.on(Events.AnimationEnd, function(animation, layer) {
      return self.onFinished();
    });
    this.proxy.on('change:x', function() {
      var offset;
      offset = Utils.modulate(this.x, [0, 500], [self.pathLength, 0]);
      self.path.setAttribute('stroke-dashoffset', offset);
      if (self.options.hasCounter !== null) {
        numberNow = Utils.round(self.proxy.x / 5);
        return counter.html = numberNow;
      }
    });
    Utils.domComplete(function() {
      return self.proxy.x = 0.1;
    });
  }

  Circle.prototype.changeTo = function(value, time) {
    var customCurve;
    if (time === void 0) {
      time = 2;
    }
    if (this.options.hasCounter === true && this.options.hasLinearEasing === null) {
      customCurve = "linear";
    } else {
      customCurve = "ease-in-out";
    }
    this.proxy.animate({
      properties: {
        x: 500 * (value / 100)
      },
      time: time,
      curve: customCurve
    });
    return this.currentValue = value;
  };

  Circle.prototype.startAt = function(value) {
    this.proxy.animate({
      properties: {
        x: 500 * (value / 100)
      },
      time: 0.001
    });
    return this.currentValue = value;
  };

  Circle.prototype.hide = function() {
    return this.opacity = 0;
  };

  Circle.prototype.show = function() {
    return this.opacity = 1;
  };

  Circle.prototype.onFinished = function() {};

  return Circle;

})(Layer);


},{}],"firebase":[function(require,module,exports){
var extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

exports.Firebase = (function(superClass) {
  var getCORSurl, request;

  extend(Firebase, superClass);

  getCORSurl = function(server, path, secret, project) {
    var url;
    switch (Utils.isWebKit()) {
      case true:
        url = "https://" + server + path + ".json?auth=" + secret + "&ns=" + project + "&sse=true";
        break;
      default:
        url = "https://" + project + ".firebaseio.com" + path + ".json?auth=" + secret;
    }
    return url;
  };

  Firebase.define("status", {
    get: function() {
      return this._status;
    }
  });

  function Firebase(options) {
    var base, base1, base2, base3;
    this.options = options != null ? options : {};
    this.projectID = (base = this.options).projectID != null ? base.projectID : base.projectID = null;
    this.secret = (base1 = this.options).secret != null ? base1.secret : base1.secret = null;
    this.server = (base2 = this.options).server != null ? base2.server : base2.server = void 0;
    this.debug = (base3 = this.options).debug != null ? base3.debug : base3.debug = false;
    if (this._status == null) {
      this._status = "disconnected";
    }
    Firebase.__super__.constructor.apply(this, arguments);
    if (this.server === void 0) {
      Utils.domLoadJSON("https://" + this.projectID + ".firebaseio.com/.settings/owner.json", function(a, server) {
        var msg;
        print(msg = "Add ______ server:" + '   "' + server + '"' + " _____ to your instance of Firebase.");
        if (this.debug) {
          return console.log("Firebase: " + msg);
        }
      });
    }
    if (this.debug) {
      console.log("Firebase: Connecting to Firebase Project '" + this.projectID + "' ... \n URL: '" + (getCORSurl(this.server, "/", this.secret, this.projectID)) + "'");
    }
    this.onChange("connection");
  }

  request = function(project, secret, path, callback, method, data, parameters, debug) {
    var url, xhttp;
    url = "https://" + project + ".firebaseio.com" + path + ".json?auth=" + secret;
    if (parameters !== void 0) {
      if (parameters.shallow) {
        url += "&shallow=true";
      }
      if (parameters.format === "export") {
        url += "&format=export";
      }
      switch (parameters.print) {
        case "pretty":
          url += "&print=pretty";
          break;
        case "silent":
          url += "&print=silent";
      }
      if (typeof parameters.download === "string") {
        url += "&download=" + parameters.download;
        window.open(url, "_self");
      }
      if (typeof parameters.orderBy === "string") {
        url += "&orderBy=" + '"' + parameters.orderBy + '"';
      }
      if (typeof parameters.limitToFirst === "number") {
        url += "&limitToFirst=" + parameters.limitToFirst;
      }
      if (typeof parameters.limitToLast === "number") {
        url += "&limitToLast=" + parameters.limitToLast;
      }
      if (typeof parameters.startAt === "number") {
        url += "&startAt=" + parameters.startAt;
      }
      if (typeof parameters.endAt === "number") {
        url += "&endAt=" + parameters.endAt;
      }
      if (typeof parameters.equalTo === "number") {
        url += "&equalTo=" + parameters.equalTo;
      }
    }
    xhttp = new XMLHttpRequest;
    if (debug) {
      console.log("Firebase: New '" + method + "'-request with data: '" + (JSON.stringify(data)) + "' \n URL: '" + url + "'");
    }
    xhttp.onreadystatechange = (function(_this) {
      return function() {
        if (parameters !== void 0) {
          if (parameters.print === "silent" || typeof parameters.download === "string") {
            return;
          }
        }
        switch (xhttp.readyState) {
          case 0:
            if (debug) {
              console.log("Firebase: Request not initialized \n URL: '" + url + "'");
            }
            break;
          case 1:
            if (debug) {
              console.log("Firebase: Server connection established \n URL: '" + url + "'");
            }
            break;
          case 2:
            if (debug) {
              console.log("Firebase: Request received \n URL: '" + url + "'");
            }
            break;
          case 3:
            if (debug) {
              console.log("Firebase: Processing request \n URL: '" + url + "'");
            }
            break;
          case 4:
            if (callback != null) {
              callback(JSON.parse(xhttp.responseText));
            }
            if (debug) {
              console.log("Firebase: Request finished, response: '" + (JSON.parse(xhttp.responseText)) + "' \n URL: '" + url + "'");
            }
        }
        if (xhttp.status === "404") {
          if (debug) {
            return console.warn("Firebase: Invalid request, page not found \n URL: '" + url + "'");
          }
        }
      };
    })(this);
    xhttp.open(method, url, true);
    xhttp.setRequestHeader("Content-type", "application/json; charset=utf-8");
    return xhttp.send(data = "" + (JSON.stringify(data)));
  };

  Firebase.prototype.get = function(path, callback, parameters) {
    return request(this.projectID, this.secret, path, callback, "GET", null, parameters, this.debug);
  };

  Firebase.prototype.put = function(path, data, callback, parameters) {
    return request(this.projectID, this.secret, path, callback, "PUT", data, parameters, this.debug);
  };

  Firebase.prototype.post = function(path, data, callback, parameters) {
    return request(this.projectID, this.secret, path, callback, "POST", data, parameters, this.debug);
  };

  Firebase.prototype.patch = function(path, data, callback, parameters) {
    return request(this.projectID, this.secret, path, callback, "PATCH", data, parameters, this.debug);
  };

  Firebase.prototype["delete"] = function(path, callback, parameters) {
    return request(this.projectID, this.secret, path, callback, "DELETE", null, parameters, this.debug);
  };

  Firebase.prototype.onChange = function(path, callback) {
    var currentStatus, source, url;
    if (path === "connection") {
      url = getCORSurl(this.server, "/", this.secret, this.projectID);
      currentStatus = "disconnected";
      source = new EventSource(url);
      source.addEventListener("open", (function(_this) {
        return function() {
          if (currentStatus === "disconnected") {
            _this._status = "connected";
            if (callback != null) {
              callback("connected");
            }
            if (_this.debug) {
              console.log("Firebase: Connection to Firebase Project '" + _this.projectID + "' established");
            }
          }
          return currentStatus = "connected";
        };
      })(this));
      return source.addEventListener("error", (function(_this) {
        return function() {
          if (currentStatus === "connected") {
            _this._status = "disconnected";
            if (callback != null) {
              callback("disconnected");
            }
            if (_this.debug) {
              console.warn("Firebase: Connection to Firebase Project '" + _this.projectID + "' closed");
            }
          }
          return currentStatus = "disconnected";
        };
      })(this));
    } else {
      url = getCORSurl(this.server, path, this.secret, this.projectID);
      source = new EventSource(url);
      if (this.debug) {
        console.log("Firebase: Listening to changes made to '" + path + "' \n URL: '" + url + "'");
      }
      source.addEventListener("put", (function(_this) {
        return function(ev) {
          if (callback != null) {
            callback(JSON.parse(ev.data).data, "put", JSON.parse(ev.data).path, _.tail(JSON.parse(ev.data).path.split("/"), 1));
          }
          if (_this.debug) {
            return console.log("Firebase: Received changes made to '" + path + "' via 'PUT': " + (JSON.parse(ev.data).data) + " \n URL: '" + url + "'");
          }
        };
      })(this));
      return source.addEventListener("patch", (function(_this) {
        return function(ev) {
          if (callback != null) {
            callback(JSON.parse(ev.data).data, "patch", JSON.parse(ev.data).path, _.tail(JSON.parse(ev.data).path.split("/"), 1));
          }
          if (_this.debug) {
            return console.log("Firebase: Received changes made to '" + path + "' via 'PATCH': " + (JSON.parse(ev.data).data) + " \n URL: '" + url + "'");
          }
        };
      })(this));
    }
  };

  return Firebase;

})(Framer.BaseClass);


},{}],"myModule":[function(require,module,exports){
exports.myVar = "myVariable";

exports.myFunction = function() {
  return print("myFunction is running");
};

exports.myArray = [1, 2, 3];


},{}]},{},[])
//# sourceMappingURL=data:application/json;charset:utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCIvVXNlcnMva3l1aG9sZWUvRG9jdW1lbnRzL0hlYWx0aC1CYXR0bGUvRGVzaWduL3dvcmtvdXQuZnJhbWVyL21vZHVsZXMvVGV4dExheWVyLmNvZmZlZSIsIi9Vc2Vycy9reXVob2xlZS9Eb2N1bWVudHMvSGVhbHRoLUJhdHRsZS9EZXNpZ24vd29ya291dC5mcmFtZXIvbW9kdWxlcy9jaXJjbGVNb2R1bGUuY29mZmVlIiwiL1VzZXJzL2t5dWhvbGVlL0RvY3VtZW50cy9IZWFsdGgtQmF0dGxlL0Rlc2lnbi93b3Jrb3V0LmZyYW1lci9tb2R1bGVzL2ZpcmViYXNlLmNvZmZlZSIsIi9Vc2Vycy9reXVob2xlZS9Eb2N1bWVudHMvSGVhbHRoLUJhdHRsZS9EZXNpZ24vd29ya291dC5mcmFtZXIvbW9kdWxlcy9teU1vZHVsZS5jb2ZmZWUiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUNBQSxJQUFBLGdEQUFBO0VBQUE7OztBQUFNOzs7RUFFUSxtQkFBQyxPQUFEOztNQUFDLFVBQVE7O0lBQ3JCLElBQUMsQ0FBQSxVQUFELEdBQWM7SUFDZCxJQUFDLENBQUEsZ0JBQUQsR0FBb0I7O01BQ3BCLE9BQU8sQ0FBQyxrQkFBc0IsT0FBTyxDQUFDLEtBQVgsR0FBc0Isd0JBQXRCLEdBQW9EOzs7TUFDL0UsT0FBTyxDQUFDLFFBQVM7OztNQUNqQixPQUFPLENBQUMsYUFBYzs7O01BQ3RCLE9BQU8sQ0FBQyxhQUFjOzs7TUFDdEIsT0FBTyxDQUFDLFdBQVk7OztNQUNwQixPQUFPLENBQUMsT0FBUTs7SUFDaEIsMkNBQU0sT0FBTjtJQUNBLElBQUMsQ0FBQSxLQUFLLENBQUMsVUFBUCxHQUFvQjtJQUNwQixJQUFDLENBQUEsS0FBSyxDQUFDLE9BQVAsR0FBaUI7RUFYTDs7c0JBYWIsUUFBQSxHQUFVLFNBQUMsUUFBRCxFQUFXLEtBQVgsRUFBa0IsUUFB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QUFMLENBQVcsRUFBRSxDQUFDLElBQWQsQ0FBbUIsQ0FBQyxJQUE3QixFQUFtQyxPQUFuQyxFQUE0QyxJQUFJLENBQUMsS0FBTCxDQUFXLEVBQUUsQ0FBQyxJQUFkLENBQW1CLENBQUMsSUFBaEUsRUFBc0UsQ0FBQyxDQUFDLElBQUYsQ0FBTyxJQUFJLENBQUMsS0FBTCxDQUFXLEVBQUUsQ0FBQyxJQUFkLENBQW1CLENBQUMsSUFBSSxDQUFDLEtBQXpCLENBQStCLEdBQS9CLENBQVAsRUFBMkMsQ0FBM0MsQ0FBdEUsRUFBQTs7VUFDQSxJQUF3SCxLQUFDLENBQUEsS0FBekg7bUJBQUEsT0FBTyxDQUFDLEdBQVIsQ0FBWSxzQ0FBQSxHQUF1QyxJQUF2QyxHQUE0QyxpQkFBNUMsR0FBNEQsQ0FBQyxJQUFJLENBQUMsS0FBTCxDQUFXLEVBQUUsQ0FBQyxJQUFkLENBQW1CLENBQUMsSUFBckIsQ0FBNUQsR0FBc0YsWUFBdEYsR0FBa0csR0FBbEcsR0FBc0csR0FBbEgsRUFBQTs7UUFGZ0M7TUFBQSxDQUFBLENBQUEsQ0FBQSxJQUFBLENBQWpDLEVBL0JEOztFQUhTOzs7O0dBakdvQixNQUFNLENBQUM7Ozs7QUNidEMsT0FBTyxDQUFDLEtBQVIsR0FBZ0I7O0FBRWhCLE9BQU8sQ0FBQyxVQUFSLEdBQXFCLFNBQUE7U0FDcEIsS0FBQSxDQUFNLHVCQUFOO0FBRG9COztBQUdyQixPQUFPLENBQUMsT0FBUixHQUFrQixDQUFDLENBQUQsRUFBSSxDQUFKLEVBQU8sQ0FBUCIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCJjbGFzcyBUZXh0TGF5ZXIgZXh0ZW5kcyBMYXllclxuXHRcdFxuXHRjb25zdHJ1Y3RvcjogKG9wdGlvbnM9e30pIC0+XG5cdFx0QGRvQXV0b1NpemUgPSBmYWxzZVxuXHRcdEBkb0F1dG9TaXplSGVpZ2h0ID0gZmFsc2Vcblx0XHRvcHRpb25zLmJhY2tncm91bmRDb2xvciA/PSBpZiBvcHRpb25zLnNldHVwIHRoZW4gXCJoc2xhKDYwLCA5MCUsIDQ3JSwgLjQpXCIgZWxzZSBcInRyYW5zcGFyZW50XCJcblx0XHRvcHRpb25zLmNvbG9yID89IFwicmVkXCJcblx0XHRvcHRpb25zLmxpbmVIZWlnaHQgPz0gMS4yNVxuXHRcdG9wdGlvbnMuZm9udEZhbWlseSA/PSBcIkhlbHZldGljYVwiXG5cdFx0b3B0aW9ucy5mb250U2l6ZSA/PSAyMFxuXHRcdG9wdGlvbnMudGV4dCA/PSBcIlVzZSBsYXllci50ZXh0IHRvIGFkZCB0ZXh0XCJcblx0XHRzdXBlciBvcHRpb25zXG5cdFx0QHN0eWxlLndoaXRlU3BhY2UgPSBcInByZS1saW5lXCIgIyBhbGxvdyBcXG4gaW4gLnRleHRcblx0XHRAc3R5bGUub3V0bGluZSA9IFwibm9uZVwiICMgbm8gYm9yZGVyIHdoZW4gc2VsZWN0ZWRcblx0XHRcblx0c2V0U3R5bGU6IChwcm9wZXJ0eSwgdmFsdWUsIHB4U3VmZml4ID0gZmFsc2UpIC0+XG5cdFx0QHN0eWxlW3Byb3BlcnR5XSA9IGlmIHB4U3VmZml4IHRoZW4gdmFsdWUrXCJweFwiIGVsc2UgdmFsdWVcblx0XHRAZW1pdChcImNoYW5nZToje3Byb3BlcnR5fVwiLCB2YWx1ZSlcblx0XHRpZiBAZG9BdXRvU2l6ZSB0aGVuIEBjYWxjU2l6ZSgpXG5cdFx0XG5cdGNhbGNTaXplOiAtPlxuXHRcdHNpemVBZmZlY3RpbmdTdHlsZXMgPVxuXHRcdFx0bGluZUhlaWdodDogQHN0eWxlW1wibGluZS1oZWlnaHRcIl1cblx0XHRcdGZvbnRTaXplOiBAc3R5bGVbXCJmb250LXNpemVcIl1cblx0XHRcdGZvbnRXZWlnaHQ6IEBzdHlsZVtcImZvbnQtd2VpZ2h0XCJdXG5cdFx0XHRwYWRkaW5nVG9wOiBAc3R5bGVbXCJwYWRkaW5nLXRvcFwiXVxuXHRcdFx0cGFkZGluZ1JpZ2h0OiBAc3R5bGVbXCJwYWRkaW5nLXJpZ2h0XCJdXG5cdFx0XHRwYWRkaW5nQm90dG9tOiBAc3R5bGVbXCJwYWRkaW5nLWJvdHRvbVwiXVxuXHRcdFx0cGFkZGluZ0xlZnQ6IEBzdHlsZVtcInBhZGRpbmctbGVmdFwiXVxuXHRcdFx0dGV4dFRyYW5zZm9ybTogQHN0eWxlW1widGV4dC10cmFuc2Zvcm1cIl1cblx0XHRcdGJvcmRlcldpZHRoOiBAc3R5bGVbXCJib3JkZXItd2lkdGhcIl1cblx0XHRcdGxldHRlclNwYWNpbmc6IEBzdHlsZVtcImxldHRlci1zcGFjaW5nXCJdXG5cdFx0XHRmb250RmFtaWx5OiBAc3R5bGVbXCJmb250LWZhbWlseVwiXVxuXHRcdFx0Zm9udFN0eWxlOiBAc3R5bGVbXCJmb250LXN0eWxlXCJdXG5cdFx0XHRmb250VmFyaWFudDogQHN0eWxlW1wiZm9udC12YXJpYW50XCJdXG5cdFx0Y29uc3RyYWludHMgPSB7fVxuXHRcdGlmIEBkb0F1dG9TaXplSGVpZ2h0IHRoZW4gY29uc3RyYWludHMud2lkdGggPSBAd2lkdGhcblx0XHRzaXplID0gVXRpbHMudGV4dFNpemUgQHRleHQsIHNpemVBZmZlY3RpbmdTdHlsZXMsIGNvbnN0cmFpbnRzXG5cdFx0aWYgQHN0eWxlLnRleHRBbGlnbiBpcyBcInJpZ2h0XCJcblx0XHRcdEB3aWR0aCA9IHNpemUud2lkdGhcblx0XHRcdEB4ID0gQHgtQHdpZHRoXG5cdFx0ZWxzZVxuXHRcdFx0QHdpZHRoID0gc2l6ZS53aWR0aFxuXHRcdEBoZWlnaHQgPSBzaXplLmhlaWdodFxuXG5cdEBkZWZpbmUgXCJhdXRvU2l6ZVwiLFxuXHRcdGdldDogLT4gQGRvQXV0b1NpemVcblx0XHRzZXQ6ICh2YWx1ZSkgLT4gXG5cdFx0XHRAZG9BdXRvU2l6ZSA9IHZhbHVlXG5cdFx0XHRpZiBAZG9BdXRvU2l6ZSB0aGVuIEBjYWxjU2l6ZSgpXG5cdEBkZWZpbmUgXCJhdXRvU2l6ZUhlaWdodFwiLFxuXHRcdHNldDogKHZhbHVlKSAtPiBcblx0XHRcdEBkb0F1dG9TaXplID0gdmFsdWVcblx0XHRcdEBkb0F1dG9TaXplSGVpZ2h0ID0gdmFsdWVcblx0XHRcdGlmIEBkb0F1dG9TaXplIHRoZW4gQGNhbGNTaXplKClcblx0QGRlZmluZSBcImNvbnRlbnRFZGl0YWJsZVwiLFxuXHRcdHNldDogKGJvb2xlYW4pIC0+XG5cdFx0XHRAX2VsZW1lbnQuY29udGVudEVkaXRhYmxlID0gYm9vbGVhblxuXHRcdFx0QGlnbm9yZUV2ZW50cyA9ICFib29sZWFuXG5cdFx0XHRAb24gXCJpbnB1dFwiLCAtPiBAY2FsY1NpemUoKSBpZiBAZG9BdXRvU2l6ZVxuXHRAZGVmaW5lIFwidGV4dFwiLFxuXHRcdGdldDogLT4gQF9lbGVtZW50LnRleHRDb250ZW50XG5cdFx0c2V0OiAodmFsdWUpIC0+XG5cdFx0XHRAX2VsZW1lbnQudGV4dENvbnRlbnQgPSB2YWx1ZVxuXHRcdFx0QGVtaXQoXCJjaGFuZ2U6dGV4dFwiLCB2YWx1ZSlcblx0XHRcdGlmIEBkb0F1dG9TaXplIHRoZW4gQGNhbGNTaXplKClcblx0QGRlZmluZSBcImZvbnRGYW1pbHlcIiwgXG5cdFx0Z2V0OiAtPiBAc3R5bGUuZm9udEZhbWlseVxuXHRcdHNldDogKHZhbHVlKSAtPiBAc2V0U3R5bGUoXCJmb250RmFtaWx5XCIsIHZhbHVlKVxuXHRAZGVmaW5lIFwiZm9udFNpemVcIiwgXG5cdFx0Z2V0OiAtPiBAc3R5bGUuZm9udFNpemUucmVwbGFjZShcInB4XCIsXCJcIilcblx0XHRzZXQ6ICh2YWx1ZSkgLT4gQHNldFN0eWxlKFwiZm9udFNpemVcIiwgdmFsdWUsIHRydWUpXG5cdEBkZWZpbmUgXCJsaW5lSGVpZ2h0XCIsIFxuXHRcdGdldDogLT4gQHN0eWxlLmxpbmVIZWlnaHQgXG5cdFx0c2V0OiAodmFsdWUpIC0+IEBzZXRTdHlsZShcImxpbmVIZWlnaHRcIiwgdmFsdWUpXG5cdEBkZWZpbmUgXCJmb250V2VpZ2h0XCIsIFxuXHRcdGdldDogLT4gQHN0eWxlLmZvbnRXZWlnaHQgXG5cdFx0c2V0OiAodmFsdWUpIC0+IEBzZXRTdHlsZShcImZvbnRXZWlnaHRcIiwgdmFsdWUpXG5cdEBkZWZpbmUgXCJmb250U3R5bGVcIiwgXG5cdFx0Z2V0OiAtPiBAc3R5bGUuZm9udFN0eWxlXG5cdFx0c2V0OiAodmFsdWUpIC0+IEBzZXRTdHlsZShcImZvbnRTdHlsZVwiLCB2YWx1ZSlcblx0QGRlZmluZSBcImZvbnRWYXJpYW50XCIsIFxuXHRcdGdldDogLT4gQHN0eWxlLmZvbnRWYXJpYW50XG5cdFx0c2V0OiAodmFsdWUpIC0+IEBzZXRTdHlsZShcImZvbnRWYXJpYW50XCIsIHZhbHVlKVxuXHRAZGVmaW5lIFwicGFkZGluZ1wiLFxuXHRcdHNldDogKHZhbHVlKSAtPiBcblx0XHRcdEBzZXRTdHlsZShcInBhZGRpbmdUb3BcIiwgdmFsdWUsIHRydWUpXG5cdFx0XHRAc2V0U3R5bGUoXCJwYWRkaW5nUmlnaHRcIiwgdmFsdWUsIHRydWUpXG5cdFx0XHRAc2V0U3R5bGUoXCJwYWRkaW5nQm90dG9tXCIsIHZhbHVlLCB0cnVlKVxuXHRcdFx0QHNldFN0eWxlKFwicGFkZGluZ0xlZnRcIiwgdmFsdWUsIHRydWUpXG5cdEBkZWZpbmUgXCJwYWRkaW5nVG9wXCIsIFxuXHRcdGdldDogLT4gQHN0eWxlLnBhZGRpbmdUb3AucmVwbGFjZShcInB4XCIsXCJcIilcblx0XHRzZXQ6ICh2YWx1ZSkgLT4gQHNldFN0eWxlKFwicGFkZGluZ1RvcFwiLCB2YWx1ZSwgdHJ1ZSlcblx0QGRlZmluZSBcInBhZGRpbmdSaWdodFwiLCBcblx0XHRnZXQ6IC0+IEBzdHlsZS5wYWRkaW5nUmlnaHQucmVwbGFjZShcInB4XCIsXCJcIilcblx0XHRzZXQ6ICh2YWx1ZSkgLT4gQHNldFN0eWxlKFwicGFkZGluZ1JpZ2h0XCIsIHZhbHVlLCB0cnVlKVxuXHRAZGVmaW5lIFwicGFkZGluZ0JvdHRvbVwiLCBcblx0XHRnZXQ6IC0+IEBzdHlsZS5wYWRkaW5nQm90dG9tLnJlcGxhY2UoXCJweFwiLFwiXCIpXG5cdFx0c2V0OiAodmFsdWUpIC0+IEBzZXRTdHlsZShcInBhZGRpbmdCb3R0b21cIiwgdmFsdWUsIHRydWUpXG5cdEBkZWZpbmUgXCJwYWRkaW5nTGVmdFwiLFxuXHRcdGdldDogLT4gQHN0eWxlLnBhZGRpbmdMZWZ0LnJlcGxhY2UoXCJweFwiLFwiXCIpXG5cdFx0c2V0OiAodmFsdWUpIC0+IEBzZXRTdHlsZShcInBhZGRpbmdMZWZ0XCIsIHZhbHVlLCB0cnVlKVxuXHRAZGVmaW5lIFwidGV4dEFsaWduXCIsXG5cdFx0c2V0OiAodmFsdWUpIC0+IEBzZXRTdHlsZShcInRleHRBbGlnblwiLCB2YWx1ZSlcblx0QGRlZmluZSBcInRleHRUcmFuc2Zvcm1cIiwgXG5cdFx0Z2V0OiAtPiBAc3R5bGUudGV4dFRyYW5zZm9ybSBcblx0XHRzZXQ6ICh2YWx1ZSkgLT4gQHNldFN0eWxlKFwidGV4dFRyYW5zZm9ybVwiLCB2YWx1ZSlcblx0QGRlZmluZSBcImxldHRlclNwYWNpbmdcIiwgXG5cdFx0Z2V0OiAtPiBAc3R5bGUubGV0dGVyU3BhY2luZy5yZXBsYWNlKFwicHhcIixcIlwiKVxuXHRcdHNldDogKHZhbHVlKSAtPiBAc2V0U3R5bGUoXCJsZXR0ZXJTcGFjaW5nXCIsIHZhbHVlLCB0cnVlKVxuXHRAZGVmaW5lIFwibGVuZ3RoXCIsIFxuXHRcdGdldDogLT4gQHRleHQubGVuZ3RoXG5cbmNvbnZlcnRUb1RleHRMYXllciA9IChsYXllcikgLT5cblx0dCA9IG5ldyBUZXh0TGF5ZXJcblx0XHRuYW1lOiBsYXllci5uYW1lXG5cdFx0ZnJhbWU6IGxheWVyLmZyYW1lXG5cdFx0cGFyZW50OiBsYXllci5wYXJlbnRcblx0XG5cdGNzc09iaiA9IHt9XG5cdGNzcyA9IGxheWVyLl9pbmZvLm1ldGFkYXRhLmNzc1xuXHRjc3MuZm9yRWFjaCAocnVsZSkgLT5cblx0XHRyZXR1cm4gaWYgXy5pbmNsdWRlcyBydWxlLCAnLyonXG5cdFx0YXJyID0gcnVsZS5zcGxpdCgnOiAnKVxuXHRcdGNzc09ialthcnJbMF1dID0gYXJyWzFdLnJlcGxhY2UoJzsnLCcnKVxuXHR0LnN0eWxlID0gY3NzT2JqXG5cdFxuXHRpbXBvcnRQYXRoID0gbGF5ZXIuX19mcmFtZXJJbXBvcnRlZEZyb21QYXRoXG5cdGlmIF8uaW5jbHVkZXMgaW1wb3J0UGF0aCwgJ0AyeCdcblx0XHR0LmZvbnRTaXplICo9IDJcblx0XHR0LmxpbmVIZWlnaHQgPSAocGFyc2VJbnQodC5saW5lSGVpZ2h0KSoyKSsncHgnXG5cdFx0dC5sZXR0ZXJTcGFjaW5nICo9IDJcblx0XHRcdFx0XHRcblx0dC55IC09IChwYXJzZUludCh0LmxpbmVIZWlnaHQpLXQuZm9udFNpemUpLzIgIyBjb21wZW5zYXRlIGZvciBob3cgQ1NTIGhhbmRsZXMgbGluZSBoZWlnaHRcblx0dC55IC09IHQuZm9udFNpemUgKiAwLjEgIyBza2V0Y2ggcGFkZGluZ1xuXHR0LnggLT0gdC5mb250U2l6ZSAqIDAuMDggIyBza2V0Y2ggcGFkZGluZ1xuXHR0LndpZHRoICs9IHQuZm9udFNpemUgKiAwLjUgIyBza2V0Y2ggcGFkZGluZ1xuXG5cdHQudGV4dCA9IGxheWVyLl9pbmZvLm1ldGFkYXRhLnN0cmluZ1xuXHRsYXllci5kZXN0cm95KClcblx0cmV0dXJuIHRcblxuTGF5ZXI6OmNvbnZlcnRUb1RleHRMYXllciA9IC0+IGNvbnZlcnRUb1RleHRMYXllcihAKVxuXG5jb252ZXJ0VGV4dExheWVycyA9IChvYmopIC0+XG5cdGZvciBwcm9wLGxheWVyIG9mIG9ialxuXHRcdGlmIGxheWVyLl9pbmZvLmtpbmQgaXMgXCJ0ZXh0XCJcblx0XHRcdG9ialtwcm9wXSA9IGNvbnZlcnRUb1RleHRMYXllcihsYXllcilcblxuIyBCYWNrd2FyZHMgY29tcGFiaWxpdHkuIFJlcGxhY2VkIGJ5IGNvbnZlcnRUb1RleHRMYXllcigpXG5MYXllcjo6ZnJhbWVBc1RleHRMYXllciA9IChwcm9wZXJ0aWVzKSAtPlxuICAgIHQgPSBuZXcgVGV4dExheWVyXG4gICAgdC5mcmFtZSA9IEBmcmFtZVxuICAgIHQuc3VwZXJMYXllciA9IEBzdXBlckxheWVyXG4gICAgXy5leHRlbmQgdCxwcm9wZXJ0aWVzXG4gICAgQGRlc3Ryb3koKVxuICAgIHRcblxuZXhwb3J0cy5UZXh0TGF5ZXIgPSBUZXh0TGF5ZXJcbmV4cG9ydHMuY29udmVydFRleHRMYXllcnMgPSBjb252ZXJ0VGV4dExheWVyc1xuIiwiY2xhc3MgZXhwb3J0cy5DaXJjbGUgZXh0ZW5kcyBMYXllclxuXHRjdXJyZW50VmFsdWU6IG51bGxcblxuXHRjb25zdHJ1Y3RvcjogKEBvcHRpb25zPXt9KSAtPlxuXG5cdFx0QG9wdGlvbnMuY2lyY2xlU2l6ZSA/PSAzMDBcblx0XHRAb3B0aW9ucy5zdHJva2VXaWR0aCA/PSAyNFxuXG5cdFx0QG9wdGlvbnMuc3Ryb2tlQ29sb3IgPz0gXCIjZmMyNDVjXCJcblx0XHRAb3B0aW9ucy50b3BDb2xvciA/PSBudWxsXG5cdFx0QG9wdGlvbnMuYm90dG9tQ29sb3IgPz0gbnVsbFxuXG5cdFx0QG9wdGlvbnMuaGFzQ291bnRlciA/PSBudWxsXG5cdFx0QG9wdGlvbnMuY291bnRlckNvbG9yID89IFwiI2ZmZlwiXG5cdFx0QG9wdGlvbnMuY291bnRlckZvbnRTaXplID89IDYwXG5cdFx0QG9wdGlvbnMuaGFzTGluZWFyRWFzaW5nID89IG51bGxcblxuXHRcdEBvcHRpb25zLnZhbHVlID0gMlxuXG5cdFx0QG9wdGlvbnMudmlld0JveCA9IChAb3B0aW9ucy5jaXJjbGVTaXplKSArIEBvcHRpb25zLnN0cm9rZVdpZHRoXG5cblx0XHRzdXBlciBAb3B0aW9uc1xuXG5cdFx0QC5iYWNrZ3JvdW5kQ29sb3IgPSBcIlwiXG5cdFx0QC5oZWlnaHQgPSBAb3B0aW9ucy52aWV3Qm94XG5cdFx0QC53aWR0aCA9IEBvcHRpb25zLnZpZXdCb3hcblx0XHRALnJvdGF0aW9uID0gLTkwXG5cblxuXHRcdEAucGF0aExlbmd0aCA9IE1hdGguUEkgKiBAb3B0aW9ucy5jaXJjbGVTaXplXG5cblx0XHRALmNpcmNsZUlEID0gXCJjaXJjbGVcIiArIE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSoxMDAwKVxuXHRcdEAuZ3JhZGllbnRJRCA9IFwiY2lyY2xlXCIgKyBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkqMTAwMClcblxuXHRcdCMgUHV0IHRoaXMgaW5zaWRlIGxpbmVhcmdyYWRpZW50XG5cdFx0IyBncmFkaWVudFVuaXRzPVwidXNlclNwYWNlT25Vc2VcIlxuXHRcdCMgICAgeDE9XCIwJVwiIHkxPVwiMCVcIiB4Mj1cIjUwJVwiIHkyPVwiMCVcIiBncmFkaWVudFRyYW5zZm9ybT1cInJvdGF0ZSgxMjApXCJcblxuXG5cdFx0aWYgQG9wdGlvbnMuaGFzQ291bnRlciBpc250IG51bGxcblx0XHRcdGNvdW50ZXIgPSBuZXcgTGF5ZXJcblx0XHRcdFx0cGFyZW50OiBAXG5cdFx0XHRcdGh0bWw6IFwiXCJcblx0XHRcdFx0d2lkdGg6IEAud2lkdGhcblx0XHRcdFx0aGVpZ2h0OiBALmhlaWdodFxuXHRcdFx0XHRiYWNrZ3JvdW5kQ29sb3I6IFwiXCJcblx0XHRcdFx0cm90YXRpb246IDkwXG5cdFx0XHRcdGNvbG9yOiBAb3B0aW9ucy5jb3VudGVyQ29sb3JcblxuXHRcdFx0c3R5bGUgPSB7XG5cdFx0XHRcdHRleHRBbGlnbjogXCJjZW50ZXJcIlxuXHRcdFx0XHRmb250U2l6ZTogXCIje0BvcHRpb25zLmNvdW50ZXJGb250U2l6ZX1weFwiXG5cdFx0XHRcdGxpbmVIZWlnaHQ6IFwiI3tALmhlaWdodH1weFwiXG5cdFx0XHRcdGZvbnRXZWlnaHQ6IFwiNjAwXCJcblx0XHRcdFx0Zm9udEZhbWlseTogXCItYXBwbGUtc3lzdGVtLCBIZWx2ZXRpY2EsIEFyaWFsLCBzYW5zLXNlcmlmXCJcblx0XHRcdFx0Ym94U2l6aW5nOiBcImJvcmRlci1ib3hcIlxuXHRcdFx0XHRoZWlnaHQ6IEAuaGVpZ2h0XG5cdFx0XHR9XG5cblx0XHRcdGNvdW50ZXIuc3R5bGUgPSBzdHlsZVxuXG5cdFx0XHRudW1iZXJTdGFydCA9IDBcblx0XHRcdG51bWJlckVuZCA9IDEwMFxuXHRcdFx0bnVtYmVyRHVyYXRpb24gPSAyXG5cblx0XHRcdG51bWJlck5vdyA9IG51bWJlclN0YXJ0XG5cdFx0XHRudW1iZXJJbnRlcnZhbCA9IG51bWJlckVuZCAtIG51bWJlclN0YXJ0XG5cblxuXHRcdEAuaHRtbCA9IFwiXCJcIlxuXHRcdFx0PHN2ZyB2aWV3Qm94PSctI3tAb3B0aW9ucy5zdHJva2VXaWR0aC8yfSAtI3tAb3B0aW9ucy5zdHJva2VXaWR0aC8yfSAje0BvcHRpb25zLnZpZXdCb3h9ICN7QG9wdGlvbnMudmlld0JveH0nID5cblx0XHRcdFx0PGRlZnM+XG5cdFx0XHRcdCAgICA8bGluZWFyR3JhZGllbnQgaWQ9JyN7QGdyYWRpZW50SUR9JyA+XG5cdFx0XHRcdCAgICAgICAgPHN0b3Agb2Zmc2V0PVwiMCVcIiBzdG9wLWNvbG9yPScje2lmIEBvcHRpb25zLnRvcENvbG9yIGlzbnQgbnVsbCB0aGVuIEBvcHRpb25zLmJvdHRvbUNvbG9yIGVsc2UgQG9wdGlvbnMuc3Ryb2tlQ29sb3J9Jy8+XG5cdFx0XHRcdCAgICAgICAgPHN0b3Agb2Zmc2V0PVwiMTAwJVwiIHN0b3AtY29sb3I9JyN7aWYgQG9wdGlvbnMudG9wQ29sb3IgaXNudCBudWxsIHRoZW4gQG9wdGlvbnMudG9wQ29sb3IgZWxzZSBAb3B0aW9ucy5zdHJva2VDb2xvcn0nIHN0b3Atb3BhY2l0eT1cIjFcIiAvPlxuXHRcdFx0XHQgICAgPC9saW5lYXJHcmFkaWVudD5cblx0XHRcdFx0PC9kZWZzPlxuXHRcdFx0XHQ8Y2lyY2xlIGlkPScje0BjaXJjbGVJRH0nXG5cdFx0XHRcdFx0XHRmaWxsPSdub25lJ1xuXHRcdFx0XHRcdFx0c3Ryb2tlLWxpbmVjYXA9J3JvdW5kJ1xuXHRcdFx0XHRcdFx0c3Ryb2tlLXdpZHRoICAgICAgPSAnI3tAb3B0aW9ucy5zdHJva2VXaWR0aH0nXG5cdFx0XHRcdFx0XHRzdHJva2UtZGFzaGFycmF5ICA9ICcje0AucGF0aExlbmd0aH0nXG5cdFx0XHRcdFx0XHRzdHJva2UtZGFzaG9mZnNldCA9ICcwJ1xuXHRcdFx0XHRcdFx0c3Ryb2tlPVwidXJsKCMje0BncmFkaWVudElEfSlcIlxuXHRcdFx0XHRcdFx0c3Ryb2tlLXdpZHRoPVwiMTBcIlxuXHRcdFx0XHRcdFx0Y3ggPSAnI3tAb3B0aW9ucy5jaXJjbGVTaXplLzJ9J1xuXHRcdFx0XHRcdFx0Y3kgPSAnI3tAb3B0aW9ucy5jaXJjbGVTaXplLzJ9J1xuXHRcdFx0XHRcdFx0ciAgPSAnI3tAb3B0aW9ucy5jaXJjbGVTaXplLzJ9Jz5cblx0XHRcdDwvc3ZnPlwiXCJcIlxuXG5cdFx0c2VsZiA9IEBcblx0XHRVdGlscy5kb21Db21wbGV0ZSAtPlxuXHRcdFx0c2VsZi5wYXRoID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiMje3NlbGYuY2lyY2xlSUR9XCIpXG5cblx0XHRAcHJveHkgPSBuZXcgTGF5ZXJcblx0XHRcdG9wYWNpdHk6IDBcblxuXHRcdEBwcm94eS5vbiBFdmVudHMuQW5pbWF0aW9uRW5kLCAoYW5pbWF0aW9uLCBsYXllcikgLT5cblx0XHRcdHNlbGYub25GaW5pc2hlZCgpXG5cblx0XHRAcHJveHkub24gJ2NoYW5nZTp4JywgLT5cblxuXHRcdFx0b2Zmc2V0ID0gVXRpbHMubW9kdWxhdGUoQC54LCBbMCwgNTAwXSwgW3NlbGYucGF0aExlbmd0aCwgMF0pXG5cblx0XHRcdHNlbGYucGF0aC5zZXRBdHRyaWJ1dGUgJ3N0cm9rZS1kYXNob2Zmc2V0Jywgb2Zmc2V0XG5cblx0XHRcdGlmIHNlbGYub3B0aW9ucy5oYXNDb3VudGVyIGlzbnQgbnVsbFxuXHRcdFx0XHRudW1iZXJOb3cgPSBVdGlscy5yb3VuZChzZWxmLnByb3h5LnggLyA1KVxuXHRcdFx0XHRjb3VudGVyLmh0bWwgPSBudW1iZXJOb3dcblxuXHRcdFV0aWxzLmRvbUNvbXBsZXRlIC0+XG5cdFx0XHRzZWxmLnByb3h5LnggPSAwLjFcblxuXHRjaGFuZ2VUbzogKHZhbHVlLCB0aW1lKSAtPlxuXHRcdGlmIHRpbWUgaXMgdW5kZWZpbmVkXG5cdFx0XHR0aW1lID0gMlxuXG5cdFx0aWYgQG9wdGlvbnMuaGFzQ291bnRlciBpcyB0cnVlIGFuZCBAb3B0aW9ucy5oYXNMaW5lYXJFYXNpbmcgaXMgbnVsbCAjIG92ZXJyaWRlIGRlZmF1bHQgXCJlYXNlLWluLW91dFwiIHdoZW4gY291bnRlciBpcyB1c2VkXG5cdFx0XHRjdXN0b21DdXJ2ZSA9IFwibGluZWFyXCJcblx0XHRlbHNlXG5cdFx0XHRjdXN0b21DdXJ2ZSA9IFwiZWFzZS1pbi1vdXRcIlxuXG5cdFx0QHByb3h5LmFuaW1hdGVcblx0XHRcdHByb3BlcnRpZXM6XG5cdFx0XHRcdHg6IDUwMCAqICh2YWx1ZSAvIDEwMClcblx0XHRcdHRpbWU6IHRpbWVcblx0XHRcdGN1cnZlOiBjdXN0b21DdXJ2ZVxuXG5cblxuXHRcdEBjdXJyZW50VmFsdWUgPSB2YWx1ZVxuXG5cdHN0YXJ0QXQ6ICh2YWx1ZSkgLT5cblx0XHRAcHJveHkuYW5pbWF0ZVxuXHRcdFx0cHJvcGVydGllczpcblx0XHRcdFx0eDogNTAwICogKHZhbHVlIC8gMTAwKVxuXHRcdFx0dGltZTogMC4wMDFcblxuXHRcdEBjdXJyZW50VmFsdWUgPSB2YWx1ZVxuXG5cblxuXHRoaWRlOiAtPlxuXHRcdEAub3BhY2l0eSA9IDBcblxuXHRzaG93OiAtPlxuXHRcdEAub3BhY2l0eSA9IDFcblxuXHRvbkZpbmlzaGVkOiAtPlxuXG4iLCJcblxuXG4jICdGaXJlYmFzZSBSRVNUIEFQSSBDbGFzcycgbW9kdWxlIHYxLjBcbiMgYnkgTWFyYyBLcmVubiwgSnVuZSAyMm5kLCAyMDE2IHwgbWFyYy5rcmVubkBnbWFpbC5jb20gfCBAbWFyY19rcmVublxuXG4jIERvY3VtZW50YXRpb24gb2YgdGhpcyBNb2R1bGU6IGh0dHBzOi8vZ2l0aHViLmNvbS9tYXJja3Jlbm4vZnJhbWVyLUZpcmViYXNlXG4jIC0tLS0tLSA6IC0tLS0tLS0gRmlyZWJhc2UgUkVTVCBBUEk6IGh0dHBzOi8vZmlyZWJhc2UuZ29vZ2xlLmNvbS9kb2NzL3JlZmVyZW5jZS9yZXN0L2RhdGFiYXNlL1xuXG5cbiMgVG9EbzpcbiMgRml4IG9uQ2hhbmdlIFwiY29ubmVjdGlvblwiLCBgdGhpc8K0IGNvbnRleHRcblxuXG5cbiMgRmlyZWJhc2UgUkVTVCBBUEkgQ2xhc3MgLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXG5jbGFzcyBleHBvcnRzLkZpcmViYXNlIGV4dGVuZHMgRnJhbWVyLkJhc2VDbGFzc1xuXG5cblxuXHRnZXRDT1JTdXJsID0gKHNlcnZlciwgcGF0aCwgc2VjcmV0LCBwcm9qZWN0KSAtPlxuXG5cdFx0c3dpdGNoIFV0aWxzLmlzV2ViS2l0KClcblx0XHRcdHdoZW4gdHJ1ZSB0aGVuIHVybCA9IFwiaHR0cHM6Ly8je3NlcnZlcn0je3BhdGh9Lmpzb24/YXV0aD0je3NlY3JldH0mbnM9I3twcm9qZWN0fSZzc2U9dHJ1ZVwiICMgV2Via2l0IFhTUyB3b3JrYXJvdW5kXG5cdFx0XHRlbHNlICAgICAgICAgICB1cmwgPSBcImh0dHBzOi8vI3twcm9qZWN0fS5maXJlYmFzZWlvLmNvbSN7cGF0aH0uanNvbj9hdXRoPSN7c2VjcmV0fVwiXG5cblx0XHRyZXR1cm4gdXJsXG5cblxuXHRALmRlZmluZSBcInN0YXR1c1wiLFxuXHRcdGdldDogLT4gQF9zdGF0dXMgIyByZWFkT25seVxuXG5cdGNvbnN0cnVjdG9yOiAoQG9wdGlvbnM9e30pIC0+XG5cdFx0QHByb2plY3RJRCA9IEBvcHRpb25zLnByb2plY3RJRCA/PSBudWxsXG5cdFx0QHNlY3JldCAgICA9IEBvcHRpb25zLnNlY3JldCAgICA/PSBudWxsXG5cdFx0QHNlcnZlciAgICA9IEBvcHRpb25zLnNlcnZlciAgICA/PSB1bmRlZmluZWQgIyByZXF1aXJlZCBmb3IgV2ViS2l0IFhTUyB3b3JrYXJvdW5kXG5cdFx0QGRlYnVnICAgICA9IEBvcHRpb25zLmRlYnVnICAgICA/PSBmYWxzZVxuXHRcdEBfc3RhdHVzICAgICAgICAgICAgICAgICAgICAgICAgPz0gXCJkaXNjb25uZWN0ZWRcIlxuXHRcdHN1cGVyXG5cblxuXHRcdGlmIEBzZXJ2ZXIgaXMgdW5kZWZpbmVkXG5cdFx0XHRVdGlscy5kb21Mb2FkSlNPTiBcImh0dHBzOi8vI3tAcHJvamVjdElEfS5maXJlYmFzZWlvLmNvbS8uc2V0dGluZ3Mvb3duZXIuanNvblwiLCAoYSxzZXJ2ZXIpIC0+XG5cdFx0XHRcdHByaW50IG1zZyA9IFwiQWRkIF9fX19fXyBzZXJ2ZXI6XCIgKyAnICAgXCInICsgc2VydmVyICsgJ1wiJyArIFwiIF9fX19fIHRvIHlvdXIgaW5zdGFuY2Ugb2YgRmlyZWJhc2UuXCJcblx0XHRcdFx0Y29uc29sZS5sb2cgXCJGaXJlYmFzZTogI3ttc2d9XCIgaWYgQGRlYnVnXG5cblxuXHRcdGNvbnNvbGUubG9nIFwiRmlyZWJhc2U6IENvbm5lY3RpbmcgdG8gRmlyZWJhc2UgUHJvamVjdCAnI3tAcHJvamVjdElEfScgLi4uIFxcbiBVUkw6ICcje2dldENPUlN1cmwoQHNlcnZlciwgXCIvXCIsIEBzZWNyZXQsIEBwcm9qZWN0SUQpfSdcIiBpZiBAZGVidWdcblx0XHRALm9uQ2hhbmdlIFwiY29ubmVjdGlvblwiXG5cblxuXHRyZXF1ZXN0ID0gKHByb2plY3QsIHNlY3JldCwgcGF0aCwgY2FsbGJhY2ssIG1ldGhvZCwgZGF0YSwgcGFyYW1ldGVycywgZGVidWcpIC0+XG5cblx0XHR1cmwgPSBcImh0dHBzOi8vI3twcm9qZWN0fS5maXJlYmFzZWlvLmNvbSN7cGF0aH0uanNvbj9hdXRoPSN7c2VjcmV0fVwiXG5cblxuXHRcdHVubGVzcyBwYXJhbWV0ZXJzIGlzIHVuZGVmaW5lZFxuXHRcdFx0aWYgcGFyYW1ldGVycy5zaGFsbG93ICAgICAgICAgICAgdGhlbiB1cmwgKz0gXCImc2hhbGxvdz10cnVlXCJcblx0XHRcdGlmIHBhcmFtZXRlcnMuZm9ybWF0IGlzIFwiZXhwb3J0XCIgdGhlbiB1cmwgKz0gXCImZm9ybWF0PWV4cG9ydFwiXG5cblx0XHRcdHN3aXRjaCBwYXJhbWV0ZXJzLnByaW50XG5cdFx0XHRcdHdoZW4gXCJwcmV0dHlcIiB0aGVuIHVybCArPSBcIiZwcmludD1wcmV0dHlcIlxuXHRcdFx0XHR3aGVuIFwic2lsZW50XCIgdGhlbiB1cmwgKz0gXCImcHJpbnQ9c2lsZW50XCJcblxuXHRcdFx0aWYgdHlwZW9mIHBhcmFtZXRlcnMuZG93bmxvYWQgaXMgXCJzdHJpbmdcIlxuXHRcdFx0XHR1cmwgKz0gXCImZG93bmxvYWQ9I3twYXJhbWV0ZXJzLmRvd25sb2FkfVwiXG5cdFx0XHRcdHdpbmRvdy5vcGVuKHVybCxcIl9zZWxmXCIpXG5cblxuXHRcdFx0dXJsICs9IFwiJm9yZGVyQnk9XCIgKyAnXCInICsgcGFyYW1ldGVycy5vcmRlckJ5ICsgJ1wiJyBpZiB0eXBlb2YgcGFyYW1ldGVycy5vcmRlckJ5ICAgICAgaXMgXCJzdHJpbmdcIlxuXHRcdFx0dXJsICs9IFwiJmxpbWl0VG9GaXJzdD0je3BhcmFtZXRlcnMubGltaXRUb0ZpcnN0fVwiICAgaWYgdHlwZW9mIHBhcmFtZXRlcnMubGltaXRUb0ZpcnN0IGlzIFwibnVtYmVyXCJcblx0XHRcdHVybCArPSBcIiZsaW1pdFRvTGFzdD0je3BhcmFtZXRlcnMubGltaXRUb0xhc3R9XCIgICAgIGlmIHR5cGVvZiBwYXJhbWV0ZXJzLmxpbWl0VG9MYXN0ICBpcyBcIm51bWJlclwiXG5cdFx0XHR1cmwgKz0gXCImc3RhcnRBdD0je3BhcmFtZXRlcnMuc3RhcnRBdH1cIiAgICAgICAgICAgICBpZiB0eXBlb2YgcGFyYW1ldGVycy5zdGFydEF0ICAgICAgaXMgXCJudW1iZXJcIlxuXHRcdFx0dXJsICs9IFwiJmVuZEF0PSN7cGFyYW1ldGVycy5lbmRBdH1cIiAgICAgICAgICAgICAgICAgaWYgdHlwZW9mIHBhcmFtZXRlcnMuZW5kQXQgICAgICAgIGlzIFwibnVtYmVyXCJcblx0XHRcdHVybCArPSBcIiZlcXVhbFRvPSN7cGFyYW1ldGVycy5lcXVhbFRvfVwiICAgICAgICAgICAgIGlmIHR5cGVvZiBwYXJhbWV0ZXJzLmVxdWFsVG8gICAgICBpcyBcIm51bWJlclwiXG5cblxuXHRcdHhodHRwID0gbmV3IFhNTEh0dHBSZXF1ZXN0XG5cdFx0Y29uc29sZS5sb2cgXCJGaXJlYmFzZTogTmV3ICcje21ldGhvZH0nLXJlcXVlc3Qgd2l0aCBkYXRhOiAnI3tKU09OLnN0cmluZ2lmeShkYXRhKX0nIFxcbiBVUkw6ICcje3VybH0nXCIgaWYgZGVidWdcblx0XHR4aHR0cC5vbnJlYWR5c3RhdGVjaGFuZ2UgPSA9PlxuXG5cdFx0XHR1bmxlc3MgcGFyYW1ldGVycyBpcyB1bmRlZmluZWRcblx0XHRcdFx0aWYgcGFyYW1ldGVycy5wcmludCBpcyBcInNpbGVudFwiIG9yIHR5cGVvZiBwYXJhbWV0ZXJzLmRvd25sb2FkIGlzIFwic3RyaW5nXCIgdGhlbiByZXR1cm4gIyB1Z2hcblxuXHRcdFx0c3dpdGNoIHhodHRwLnJlYWR5U3RhdGVcblx0XHRcdFx0d2hlbiAwIHRoZW4gY29uc29sZS5sb2cgXCJGaXJlYmFzZTogUmVxdWVzdCBub3QgaW5pdGlhbGl6ZWQgXFxuIFVSTDogJyN7dXJsfSdcIiAgICAgICBpZiBkZWJ1Z1xuXHRcdFx0XHR3aGVuIDEgdGhlbiBjb25zb2xlLmxvZyBcIkZpcmViYXNlOiBTZXJ2ZXIgY29ubmVjdGlvbiBlc3RhYmxpc2hlZCBcXG4gVVJMOiAnI3t1cmx9J1wiIGlmIGRlYnVnXG5cdFx0XHRcdHdoZW4gMiB0aGVuIGNvbnNvbGUubG9nIFwiRmlyZWJhc2U6IFJlcXVlc3QgcmVjZWl2ZWQgXFxuIFVSTDogJyN7dXJsfSdcIiAgICAgICAgICAgICAgaWYgZGVidWdcblx0XHRcdFx0d2hlbiAzIHRoZW4gY29uc29sZS5sb2cgXCJGaXJlYmFzZTogUHJvY2Vzc2luZyByZXF1ZXN0IFxcbiBVUkw6ICcje3VybH0nXCIgICAgICAgICAgICBpZiBkZWJ1Z1xuXHRcdFx0XHR3aGVuIDRcblx0XHRcdFx0XHRjYWxsYmFjayhKU09OLnBhcnNlKHhodHRwLnJlc3BvbnNlVGV4dCkpIGlmIGNhbGxiYWNrP1xuXHRcdFx0XHRcdGNvbnNvbGUubG9nIFwiRmlyZWJhc2U6IFJlcXVlc3QgZmluaXNoZWQsIHJlc3BvbnNlOiAnI3tKU09OLnBhcnNlKHhodHRwLnJlc3BvbnNlVGV4dCl9JyBcXG4gVVJMOiAnI3t1cmx9J1wiIGlmIGRlYnVnXG5cblx0XHRcdGlmIHhodHRwLnN0YXR1cyBpcyBcIjQwNFwiXG5cdFx0XHRcdGNvbnNvbGUud2FybiBcIkZpcmViYXNlOiBJbnZhbGlkIHJlcXVlc3QsIHBhZ2Ugbm90IGZvdW5kIFxcbiBVUkw6ICcje3VybH0nXCIgaWYgZGVidWdcblxuXG5cdFx0eGh0dHAub3BlbihtZXRob2QsIHVybCwgdHJ1ZSlcblx0XHR4aHR0cC5zZXRSZXF1ZXN0SGVhZGVyKFwiQ29udGVudC10eXBlXCIsIFwiYXBwbGljYXRpb24vanNvbjsgY2hhcnNldD11dGYtOFwiKVxuXHRcdHhodHRwLnNlbmQoZGF0YSA9IFwiI3tKU09OLnN0cmluZ2lmeShkYXRhKX1cIilcblxuXG5cblx0IyBBdmFpbGFibGUgbWV0aG9kc1xuXG5cdGdldDogICAgKHBhdGgsIGNhbGxiYWNrLCAgICAgICBwYXJhbWV0ZXJzKSAtPiByZXF1ZXN0KEBwcm9qZWN0SUQsIEBzZWNyZXQsIHBhdGgsIGNhbGxiYWNrLCBcIkdFVFwiLCAgICBudWxsLCBwYXJhbWV0ZXJzLCBAZGVidWcpXG5cdHB1dDogICAgKHBhdGgsIGRhdGEsIGNhbGxiYWNrLCBwYXJhbWV0ZXJzKSAtPiByZXF1ZXN0KEBwcm9qZWN0SUQsIEBzZWNyZXQsIHBhdGgsIGNhbGxiYWNrLCBcIlBVVFwiLCAgICBkYXRhLCBwYXJhbWV0ZXJzLCBAZGVidWcpXG5cdHBvc3Q6ICAgKHBhdGgsIGRhdGEsIGNhbGxiYWNrLCBwYXJhbWV0ZXJzKSAtPiByZXF1ZXN0KEBwcm9qZWN0SUQsIEBzZWNyZXQsIHBhdGgsIGNhbGxiYWNrLCBcIlBPU1RcIiwgICBkYXRhLCBwYXJhbWV0ZXJzLCBAZGVidWcpXG5cdHBhdGNoOiAgKHBhdGgsIGRhdGEsIGNhbGxiYWNrLCBwYXJhbWV0ZXJzKSAtPiByZXF1ZXN0KEBwcm9qZWN0SUQsIEBzZWNyZXQsIHBhdGgsIGNhbGxiYWNrLCBcIlBBVENIXCIsICBkYXRhLCBwYXJhbWV0ZXJzLCBAZGVidWcpXG5cdGRlbGV0ZTogKHBhdGgsIGNhbGxiYWNrLCAgICAgICBwYXJhbWV0ZXJzKSAtPiByZXF1ZXN0KEBwcm9qZWN0SUQsIEBzZWNyZXQsIHBhdGgsIGNhbGxiYWNrLCBcIkRFTEVURVwiLCBudWxsLCBwYXJhbWV0ZXJzLCBAZGVidWcpXG5cblxuXG5cdG9uQ2hhbmdlOiAocGF0aCwgY2FsbGJhY2spIC0+XG5cblxuXHRcdGlmIHBhdGggaXMgXCJjb25uZWN0aW9uXCJcblxuXHRcdFx0dXJsID0gZ2V0Q09SU3VybChAc2VydmVyLCBcIi9cIiwgQHNlY3JldCwgQHByb2plY3RJRClcblx0XHRcdGN1cnJlbnRTdGF0dXMgPSBcImRpc2Nvbm5lY3RlZFwiXG5cdFx0XHRzb3VyY2UgPSBuZXcgRXZlbnRTb3VyY2UodXJsKVxuXG5cdFx0XHRzb3VyY2UuYWRkRXZlbnRMaXN0ZW5lciBcIm9wZW5cIiwgPT5cblx0XHRcdFx0aWYgY3VycmVudFN0YXR1cyBpcyBcImRpc2Nvbm5lY3RlZFwiXG5cdFx0XHRcdFx0QC5fc3RhdHVzID0gXCJjb25uZWN0ZWRcIlxuXHRcdFx0XHRcdGNhbGxiYWNrKFwiY29ubmVjdGVkXCIpIGlmIGNhbGxiYWNrP1xuXHRcdFx0XHRcdGNvbnNvbGUubG9nIFwiRmlyZWJhc2U6IENvbm5lY3Rpb24gdG8gRmlyZWJhc2UgUHJvamVjdCAnI3tAcHJvamVjdElEfScgZXN0YWJsaXNoZWRcIiBpZiBAZGVidWdcblx0XHRcdFx0Y3VycmVudFN0YXR1cyA9IFwiY29ubmVjdGVkXCJcblxuXHRcdFx0c291cmNlLmFkZEV2ZW50TGlzdGVuZXIgXCJlcnJvclwiLCA9PlxuXHRcdFx0XHRpZiBjdXJyZW50U3RhdHVzIGlzIFwiY29ubmVjdGVkXCJcblx0XHRcdFx0XHRALl9zdGF0dXMgPSBcImRpc2Nvbm5lY3RlZFwiXG5cdFx0XHRcdFx0Y2FsbGJhY2soXCJkaXNjb25uZWN0ZWRcIikgaWYgY2FsbGJhY2s/XG5cdFx0XHRcdFx0Y29uc29sZS53YXJuIFwiRmlyZWJhc2U6IENvbm5lY3Rpb24gdG8gRmlyZWJhc2UgUHJvamVjdCAnI3tAcHJvamVjdElEfScgY2xvc2VkXCIgaWYgQGRlYnVnXG5cdFx0XHRcdGN1cnJlbnRTdGF0dXMgPSBcImRpc2Nvbm5lY3RlZFwiXG5cblxuXHRcdGVsc2VcblxuXHRcdFx0dXJsID0gZ2V0Q09SU3VybChAc2VydmVyLCBwYXRoLCBAc2VjcmV0LCBAcHJvamVjdElEKVxuXHRcdFx0c291cmNlID0gbmV3IEV2ZW50U291cmNlKHVybClcblx0XHRcdGNvbnNvbGUubG9nIFwiRmlyZWJhc2U6IExpc3RlbmluZyB0byBjaGFuZ2VzIG1hZGUgdG8gJyN7cGF0aH0nIFxcbiBVUkw6ICcje3VybH0nXCIgaWYgQGRlYnVnXG5cblx0XHRcdHNvdXJjZS5hZGRFdmVudExpc3RlbmVyIFwicHV0XCIsIChldikgPT5cblx0XHRcdFx0Y2FsbGJhY2soSlNPTi5wYXJzZShldi5kYXRhKS5kYXRhLCBcInB1dFwiLCBKU09OLnBhcnNlKGV2LmRhdGEpLnBhdGgsIF8udGFpbChKU09OLnBhcnNlKGV2LmRhdGEpLnBhdGguc3BsaXQoXCIvXCIpLDEpKSBpZiBjYWxsYmFjaz9cblx0XHRcdFx0Y29uc29sZS5sb2cgXCJGaXJlYmFzZTogUmVjZWl2ZWQgY2hhbmdlcyBtYWRlIHRvICcje3BhdGh9JyB2aWEgJ1BVVCc6ICN7SlNPTi5wYXJzZShldi5kYXRhKS5kYXRhfSBcXG4gVVJMOiAnI3t1cmx9J1wiIGlmIEBkZWJ1Z1xuXG5cdFx0XHRzb3VyY2UuYWRkRXZlbnRMaXN0ZW5lciBcInBhdGNoXCIsIChldikgPT5cblx0XHRcdFx0Y2FsbGJhY2soSlNPTi5wYXJzZShldi5kYXRhKS5kYXRhLCBcInBhdGNoXCIsIEpTT04ucGFyc2UoZXYuZGF0YSkucGF0aCwgXy50YWlsKEpTT04ucGFyc2UoZXYuZGF0YSkucGF0aC5zcGxpdChcIi9cIiksMSkpIGlmIGNhbGxiYWNrP1xuXHRcdFx0XHRjb25zb2xlLmxvZyBcIkZpcmViYXNlOiBSZWNlaXZlZCBjaGFuZ2VzIG1hZGUgdG8gJyN7cGF0aH0nIHZpYSAnUEFUQ0gnOiAje0pTT04ucGFyc2UoZXYuZGF0YSkuZGF0YX0gXFxuIFVSTDogJyN7dXJsfSdcIiBpZiBAZGVidWdcbiIsIiMgQWRkIHRoZSBmb2xsb3dpbmcgbGluZSB0byB5b3VyIHByb2plY3QgaW4gRnJhbWVyIFN0dWRpby4gXG4jIG15TW9kdWxlID0gcmVxdWlyZSBcIm15TW9kdWxlXCJcbiMgUmVmZXJlbmNlIHRoZSBjb250ZW50cyBieSBuYW1lLCBsaWtlIG15TW9kdWxlLm15RnVuY3Rpb24oKSBvciBteU1vZHVsZS5teVZhclxuXG5leHBvcnRzLm15VmFyID0gXCJteVZhcmlhYmxlXCJcblxuZXhwb3J0cy5teUZ1bmN0aW9uID0gLT5cblx0cHJpbnQgXCJteUZ1bmN0aW9uIGlzIHJ1bm5pbmdcIlxuXG5leHBvcnRzLm15QXJyYXkgPSBbMSwgMiwgM10iXX0=
