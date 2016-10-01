require=(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({"circleModule":[function(require,module,exports){
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


},{}]},{},[])
//# sourceMappingURL=data:application/json;charset:utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCIvVXNlcnMva3l1aG9sZWUvRG93bmxvYWRzL0NvdW50ZG93bi5mcmFtZXIvbW9kdWxlcy9jaXJjbGVNb2R1bGUuY29mZmVlIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FDQUEsSUFBQTs7O0FBQU0sT0FBTyxDQUFDOzs7bUJBQ2IsWUFBQSxHQUFjOztFQUVELGdCQUFDLE9BQUQ7QUFFWixRQUFBO0lBRmEsSUFBQyxDQUFBLDRCQUFELFVBQVM7O1VBRWQsQ0FBQyxhQUFjOzs7V0FDZixDQUFDLGNBQWU7OztXQUVoQixDQUFDLGNBQWU7OztXQUNoQixDQUFDLFdBQVk7OztXQUNiLENBQUMsY0FBZTs7O1dBRWhCLENBQUMsYUFBYzs7O1dBQ2YsQ0FBQyxlQUFnQjs7O1dBQ2pCLENBQUMsa0JBQW1COzs7V0FDcEIsQ0FBQyxrQkFBbUI7O0lBRTVCLElBQUMsQ0FBQSxPQUFPLENBQUMsS0FBVCxHQUFpQjtJQUVqQixJQUFDLENBQUEsT0FBTyxDQUFDLE9BQVQsR0FBb0IsSUFBQyxDQUFBLE9BQU8sQ0FBQyxVQUFWLEdBQXdCLElBQUMsQ0FBQSxPQUFPLENBQUM7SUFFcEQsd0NBQU0sSUFBQyxDQUFBLE9BQVA7SUFFQSxJQUFDLENBQUMsZUFBRixHQUFvQjtJQUNwQixJQUFDLENBQUMsTUFBRixHQUFXLElBQUMsQ0FBQSxPQUFPLENBQUM7SUFDcEIsSUFBQyxDQUFDLEtBQUYsR0FBVSxJQUFDLENBQUEsT0FBTyxDQUFDO0lBQ25CLElBQUMsQ0FBQyxRQUFGLEdBQWEsQ0FBQztJQUdkLElBQUMsQ0FBQyxVQUFGLEdBQWUsSUFBSSxDQUFDLEVBQUwsR0FBVSxJQUFDLENBQUEsT0FBTyxDQUFDO0lBRWxDLElBQUMsQ0FBQyxRQUFGLEdBQWEsUUFBQSxHQUFXLElBQUksQ0FBQyxLQUFMLENBQVcsSUFBSSxDQUFDLE1BQUwsQ0FBQSxDQUFBLEdB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RyxHQUFBLEdBQU0sQ0FBQyxLQUFBLEdBQVEsR0FBVCxDQUFUO09BREQ7TUFFQSxJQUFBLEVBQU0sSUFGTjtNQUdBLEtBQUEsRUFBTyxXQUhQO0tBREQ7V0FRQSxJQUFDLENBQUEsWUFBRCxHQUFnQjtFQWpCUDs7bUJBbUJWLE9BQUEsR0FBUyxTQUFDLEtBQUQ7SUFDUixJQUFDLENBQUEsS0FBSyxDQUFDLE9BQVAsQ0FDQztNQUFBLFVBQUEsRUFDQztRQUFBLENBQUEsRUFBRyxHQUFBLEdBQU0sQ0FBQyxLQUFBLEdBQVEsR0FBVCxDQUFUO09BREQ7TUFFQSxJQUFBLEVBQU0sS0FGTjtLQUREO1dBS0EsSUFBQyxDQUFBLFlBQUQsR0FBZ0I7RUFOUjs7bUJBVVQsSUFBQSxHQUFNLFNBQUE7V0FDTCxJQUFDLENBQUMsT0FBRixHQUFZO0VBRFA7O21CQUdOLElBQUEsR0FBTSxTQUFBO1dBQ0wsSUFBQyxDQUFDLE9BQUYsR0FBWTtFQURQOzttQkFHTixVQUFBLEdBQVksU0FBQSxHQUFBOzs7O0dBcEpnQiIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCJjbGFzcyBleHBvcnRzLkNpcmNsZSBleHRlbmRzIExheWVyXG5cdGN1cnJlbnRWYWx1ZTogbnVsbFxuXG5cdGNvbnN0cnVjdG9yOiAoQG9wdGlvbnM9e30pIC0+XG5cblx0XHRAb3B0aW9ucy5jaXJjbGVTaXplID89IDMwMFxuXHRcdEBvcHRpb25zLnN0cm9rZVdpZHRoID89IDI0XG5cblx0XHRAb3B0aW9ucy5zdHJva2VDb2xvciA/PSBcIiNmYzI0NWNcIlxuXHRcdEBvcHRpb25zLnRvcENvbG9yID89IG51bGxcblx0XHRAb3B0aW9ucy5ib3R0b21Db2xvciA/PSBudWxsXG5cblx0XHRAb3B0aW9ucy5oYXNDb3VudGVyID89IG51bGxcblx0XHRAb3B0aW9ucy5jb3VudGVyQ29sb3IgPz0gXCIjZmZmXCJcblx0XHRAb3B0aW9ucy5jb3VudGVyRm9udFNpemUgPz0gNjBcblx0XHRAb3B0aW9ucy5oYXNMaW5lYXJFYXNpbmcgPz0gbnVsbFxuXG5cdFx0QG9wdGlvbnMudmFsdWUgPSAyXG5cblx0XHRAb3B0aW9ucy52aWV3Qm94ID0gKEBvcHRpb25zLmNpcmNsZVNpemUpICsgQG9wdGlvbnMuc3Ryb2tlV2lkdGhcblxuXHRcdHN1cGVyIEBvcHRpb25zXG5cblx0XHRALmJhY2tncm91bmRDb2xvciA9IFwiXCJcblx0XHRALmhlaWdodCA9IEBvcHRpb25zLnZpZXdCb3hcblx0XHRALndpZHRoID0gQG9wdGlvbnMudmlld0JveFxuXHRcdEAucm90YXRpb24gPSAtOTBcblxuXG5cdFx0QC5wYXRoTGVuZ3RoID0gTWF0aC5QSSAqIEBvcHRpb25zLmNpcmNsZVNpemVcblxuXHRcdEAuY2lyY2xlSUQgPSBcImNpcmNsZVwiICsgTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpKjEwMDApXG5cdFx0QC5ncmFkaWVudElEID0gXCJjaXJjbGVcIiArIE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSoxMDAwKVxuXG5cdFx0IyBQdXQgdGhpcyBpbnNpZGUgbGluZWFyZ3JhZGllbnRcblx0XHQjIGdyYWRpZW50VW5pdHM9XCJ1c2VyU3BhY2VPblVzZVwiXG5cdFx0IyAgICB4MT1cIjAlXCIgeTE9XCIwJVwiIHgyPVwiNTAlXCIgeTI9XCIwJVwiIGdyYWRpZW50VHJhbnNmb3JtPVwicm90YXRlKDEyMClcIlxuXG5cblx0XHRpZiBAb3B0aW9ucy5oYXNDb3VudGVyIGlzbnQgbnVsbFxuXHRcdFx0Y291bnRlciA9IG5ldyBMYXllclxuXHRcdFx0XHRwYXJlbnQ6IEBcblx0XHRcdFx0aHRtbDogXCJcIlxuXHRcdFx0XHR3aWR0aDogQC53aWR0aFxuXHRcdFx0XHRoZWlnaHQ6IEAuaGVpZ2h0XG5cdFx0XHRcdGJhY2tncm91bmRDb2xvcjogXCJcIlxuXHRcdFx0XHRyb3RhdGlvbjogOTBcblx0XHRcdFx0Y29sb3I6IEBvcHRpb25zLmNvdW50ZXJDb2xvclxuXG5cdFx0XHRzdHlsZSA9IHtcblx0XHRcdFx0dGV4dEFsaWduOiBcImNlbnRlclwiXG5cdFx0XHRcdGZvbnRTaXplOiBcIiN7QG9wdGlvbnMuY291bnRlckZvbnRTaXplfXB4XCJcblx0XHRcdFx0bGluZUhlaWdodDogXCIje0AuaGVpZ2h0fXB4XCJcblx0XHRcdFx0Zm9udFdlaWdodDogXCI2MDBcIlxuXHRcdFx0XHRmb250RmFtaWx5OiBcIi1hcHBsZS1zeXN0ZW0sIEhlbHZldGljYSwgQXJpYWwsIHNhbnMtc2VyaWZcIlxuXHRcdFx0XHRib3hTaXppbmc6IFwiYm9yZGVyLWJveFwiXG5cdFx0XHRcdGhlaWdodDogQC5oZWlnaHRcblx0XHRcdH1cblxuXHRcdFx0Y291bnRlci5zdHlsZSA9IHN0eWxlXG5cblx0XHRcdG51bWJlclN0YXJ0ID0gMFxuXHRcdFx0bnVtYmVyRW5kID0gMTAwXG5cdFx0XHRudW1iZXJEdXJhdGlvbiA9IDJcblxuXHRcdFx0bnVtYmVyTm93ID0gbnVtYmVyU3RhcnRcblx0XHRcdG51bWJlckludGVydmFsID0gbnVtYmVyRW5kIC0gbnVtYmVyU3RhcnRcblxuXG5cdFx0QC5odG1sID0gXCJcIlwiXG5cdFx0XHQ8c3ZnIHZpZXdCb3g9Jy0je0BvcHRpb25zLnN0cm9rZVdpZHRoLzJ9IC0je0BvcHRpb25zLnN0cm9rZVdpZHRoLzJ9ICN7QG9wdGlvbnMudmlld0JveH0gI3tAb3B0aW9ucy52aWV3Qm94fScgPlxuXHRcdFx0XHQ8ZGVmcz5cblx0XHRcdFx0ICAgIDxsaW5lYXJHcmFkaWVudCBpZD0nI3tAZ3JhZGllbnRJRH0nID5cblx0XHRcdFx0ICAgICAgICA8c3RvcCBvZmZzZXQ9XCIwJVwiIHN0b3AtY29sb3I9JyN7aWYgQG9wdGlvbnMudG9wQ29sb3IgaXNudCBudWxsIHRoZW4gQG9wdGlvbnMuYm90dG9tQ29sb3IgZWxzZSBAb3B0aW9ucy5zdHJva2VDb2xvcn0nLz5cblx0XHRcdFx0ICAgICAgICA8c3RvcCBvZmZzZXQ9XCIxMDAlXCIgc3RvcC1jb2xvcj0nI3tpZiBAb3B0aW9ucy50b3BDb2xvciBpc250IG51bGwgdGhlbiBAb3B0aW9ucy50b3BDb2xvciBlbHNlIEBvcHRpb25zLnN0cm9rZUNvbG9yfScgc3RvcC1vcGFjaXR5PVwiMVwiIC8+XG5cdFx0XHRcdCAgICA8L2xpbmVhckdyYWRpZW50PlxuXHRcdFx0XHQ8L2RlZnM+XG5cdFx0XHRcdDxjaXJjbGUgaWQ9JyN7QGNpcmNsZUlEfSdcblx0XHRcdFx0XHRcdGZpbGw9J25vbmUnXG5cdFx0XHRcdFx0XHRzdHJva2UtbGluZWNhcD0ncm91bmQnXG5cdFx0XHRcdFx0XHRzdHJva2Utd2lkdGggICAgICA9ICcje0BvcHRpb25zLnN0cm9rZVdpZHRofSdcblx0XHRcdFx0XHRcdHN0cm9rZS1kYXNoYXJyYXkgID0gJyN7QC5wYXRoTGVuZ3RofSdcblx0XHRcdFx0XHRcdHN0cm9rZS1kYXNob2Zmc2V0ID0gJzAnXG5cdFx0XHRcdFx0XHRzdHJva2U9XCJ1cmwoIyN7QGdyYWRpZW50SUR9KVwiXG5cdFx0XHRcdFx0XHRzdHJva2Utd2lkdGg9XCIxMFwiXG5cdFx0XHRcdFx0XHRjeCA9ICcje0BvcHRpb25zLmNpcmNsZVNpemUvMn0nXG5cdFx0XHRcdFx0XHRjeSA9ICcje0BvcHRpb25zLmNpcmNsZVNpemUvMn0nXG5cdFx0XHRcdFx0XHRyICA9ICcje0BvcHRpb25zLmNpcmNsZVNpemUvMn0nPlxuXHRcdFx0PC9zdmc+XCJcIlwiXG5cblx0XHRzZWxmID0gQFxuXHRcdFV0aWxzLmRvbUNvbXBsZXRlIC0+XG5cdFx0XHRzZWxmLnBhdGggPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiIyN7c2VsZi5jaXJjbGVJRH1cIilcblxuXHRcdEBwcm94eSA9IG5ldyBMYXllclxuXHRcdFx0b3BhY2l0eTogMFxuXG5cdFx0QHByb3h5Lm9uIEV2ZW50cy5BbmltYXRpb25FbmQsIChhbmltYXRpb24sIGxheWVyKSAtPlxuXHRcdFx0c2VsZi5vbkZpbmlzaGVkKClcblxuXHRcdEBwcm94eS5vbiAnY2hhbmdlOngnLCAtPlxuXG5cdFx0XHRvZmZzZXQgPSBVdGlscy5tb2R1bGF0ZShALngsIFswLCA1MDBdLCBbc2VsZi5wYXRoTGVuZ3RoLCAwXSlcblxuXHRcdFx0c2VsZi5wYXRoLnNldEF0dHJpYnV0ZSAnc3Ryb2tlLWRhc2hvZmZzZXQnLCBvZmZzZXRcblxuXHRcdFx0aWYgc2VsZi5vcHRpb25zLmhhc0NvdW50ZXIgaXNudCBudWxsXG5cdFx0XHRcdG51bWJlck5vdyA9IFV0aWxzLnJvdW5kKHNlbGYucHJveHkueCAvIDUpXG5cdFx0XHRcdGNvdW50ZXIuaHRtbCA9IG51bWJlck5vd1xuXG5cdFx0VXRpbHMuZG9tQ29tcGxldGUgLT5cblx0XHRcdHNlbGYucHJveHkueCA9IDAuMVxuXG5cdGNoYW5nZVRvOiAodmFsdWUsIHRpbWUpIC0+XG5cdFx0aWYgdGltZSBpcyB1bmRlZmluZWRcblx0XHRcdHRpbWUgPSAyXG5cblx0XHRpZiBAb3B0aW9ucy5oYXNDb3VudGVyIGlzIHRydWUgYW5kIEBvcHRpb25zLmhhc0xpbmVhckVhc2luZyBpcyBudWxsICMgb3ZlcnJpZGUgZGVmYXVsdCBcImVhc2UtaW4tb3V0XCIgd2hlbiBjb3VudGVyIGlzIHVzZWRcblx0XHRcdGN1c3RvbUN1cnZlID0gXCJsaW5lYXJcIlxuXHRcdGVsc2Vcblx0XHRcdGN1c3RvbUN1cnZlID0gXCJlYXNlLWluLW91dFwiXG5cblx0XHRAcHJveHkuYW5pbWF0ZVxuXHRcdFx0cHJvcGVydGllczpcblx0XHRcdFx0eDogNTAwICogKHZhbHVlIC8gMTAwKVxuXHRcdFx0dGltZTogdGltZVxuXHRcdFx0Y3VydmU6IGN1c3RvbUN1cnZlXG5cblxuXG5cdFx0QGN1cnJlbnRWYWx1ZSA9IHZhbHVlXG5cblx0c3RhcnRBdDogKHZhbHVlKSAtPlxuXHRcdEBwcm94eS5hbmltYXRlXG5cdFx0XHRwcm9wZXJ0aWVzOlxuXHRcdFx0XHR4OiA1MDAgKiAodmFsdWUgLyAxMDApXG5cdFx0XHR0aW1lOiAwLjAwMVxuXG5cdFx0QGN1cnJlbnRWYWx1ZSA9IHZhbHVlXG5cblxuXG5cdGhpZGU6IC0+XG5cdFx0QC5vcGFjaXR5ID0gMFxuXG5cdHNob3c6IC0+XG5cdFx0QC5vcGFjaXR5ID0gMVxuXG5cdG9uRmluaXNoZWQ6IC0+XG5cbiJdfQ==
