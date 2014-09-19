(function ($) {
    var options, Events, Touch;
    options = {
        x: 100,
        y: 100
    };
    Events = ['swipe', 'swipeLeft', 'swipeRight', 'swipeUp', 'swipeDown', 'tap', 'longTap', 'drag'];
    Events.forEach(function (eventName) {
        $.fn[eventName] = function () {
            var touch = new Touch($(this), eventName);
            touch.start();
            if (arguments[1]) {
                options = arguments[1]
            }
            return this.on(eventName, arguments[0])
        }
    });
    Touch = function () {
        var status, ts, tm, te;
        this.target = arguments[0];
        this.e = arguments[1]
    };
    Touch.prototype.framework = function (e) {
        e.preventDefault();
        var events;
        if (e.changedTouches) events = e.changedTouches[0];
        else events = e.originalEvent.touches[0];
        return events
    };
    Touch.prototype.start = function () {
        var self = this;
        self.target.on("touchstart", function (event) {
            event.preventDefault();
            var temp = self.framework(event);
            var d = new Date();
            self.ts = {
                x: temp.pageX,
                y: temp.pageY,
                d: d.getTime()
            }
        });
        self.target.on("touchmove", function (event) {
            event.preventDefault();
            var temp = self.framework(event);
            var d = new Date();
            self.tm = {
                x: temp.pageX,
                y: temp.pageY
            };
            if (self.e == "drag") {
                self.target.trigger(self.e, self.tm);
                return
            }
        });
        self.target.on("touchend", function (event) {
            event.preventDefault();
            var d = new Date();
            if (!self.tm) {
                self.tm = self.ts
            }
            self.te = {
                x: self.tm.x - self.ts.x,
                y: self.tm.y - self.ts.y,
                d: (d - self.ts.d)
            };
            self.tm = undefined;
            self.factory()
        })
    };
    Touch.prototype.factory = function () {
        var x = Math.abs(this.te.x);
        var y = Math.abs(this.te.y);
        var t = this.te.d;
        var s = this.status;
        if (x < 5 && y < 5) {
            if (t < 300) {
                s = "tap"
            } else {
                s = "longTap"
            }
        } else if (x < options.x && y > options.y) {
            if (t < 250) {
                if (this.te.y > 0) {
                    s = "swipeDown"
                } else {
                    s = "swipeUp"
                }
            } else {
                s = "swipe"
            }
        } else if (y < options.y && x > options.x) {
            if (t < 250) {
                if (this.te.x > 0) {
                    s = "swipeLeft"
                } else {
                    s = "swipeRight"
                }
            } else {
                s = "swipe"
            }
        }
        if (s == this.e) {
            this.target.trigger(this.e);
            return
        }
    }
})(window.jQuery || window.Zepto);