/*For jQuery or Zepto*/
/*yuminjustin.cn  2014/10/17  Wuhan China*/
(function ($) {
    var options, Events, Touch;
    Events = ['swipe', 'swipeLeft', 'swipeRight', 'swipeUp', 'swipeDown', 'tap', 'longTap', 'drag'];
    Events.forEach(function (eventName) {
        $.fn[eventName] = function () {
            var touch = new Touch($(this), eventName);
            options = arguments[1] || {
                x: 100,
                y: 100
            };
            touch.start();
            return this.on(eventName, arguments[0]);
        }
    });
    Touch = function () {
        var status, ts, tm, te;
        this.target = arguments[0];
        this.e = arguments[1]
    };
    Touch.prototype.framework = function (e) {
        if (e.changedTouches) return e.changedTouches[0];
        else return e.originalEvent.touches[0];
    };
    Touch.prototype.common = function () {
        arguments[0].preventDefault();
        return {
            t: this.framework(arguments[0]),
            d: new Date()
        }
    };
    Touch.prototype.start = function () {
        var self = this;
        self.target.on("touchstart", function (event) {
            var temp = self.common(event);
            self.ts = {
                x: temp.t.pageX,
                y: temp.t.pageY,
                d: temp.d.getTime()
            }
        });
        self.target.on("touchmove", function (event) {
            var temp = self.common(event);
            self.tm = {
                x: temp.t.pageX,
                y: temp.t.pageY,
                xs: self.ts.x,
                ys: self.ts.y
            };
            if (self.e == "drag") {
                self.target.trigger(self.e, self.tm);
                return;
            }
        });
        self.target.on("touchend", function (event) {
            var temp = self.common(event);
            self.tm = self.tm || self.ts;
            self.te = {
                x: self.tm.x - self.ts.x,
                y: self.tm.y - self.ts.y,
                d: (temp.d.getTime() - self.ts.d)
            };
            self.tm = undefined;
            self.factory();
        })
    };
    Touch.prototype.factory = function () {
        var x = Math.abs(this.te.x);
        var y = Math.abs(this.te.y);
        var t = this.te.d;
        var s = this.status;
        if (x < 5 && y < 5) {
            if (t < 300) s = "tap";
            else s = "longTap";
        } else if (x < options.x && y > options.y) {
            if (t < 250) {
                if (this.te.y > 0) s = "swipeDown";
                else s = "swipeUp";
            } else s = "swipe";
        } else if (y < options.y && x > options.x) {
            if (t < 250) {
                if (this.te.x > 0) s = "swipeRight";
                else s = "swipeLeft";
            } else s = "swipe";
        }
        if (s == this.e) {
            this.target.trigger(this.e);
            return;
        }
    }
})(window.jQuery || window.Zepto);