/**
 * Created by knutandersstokke on 05.09.2016.
 */
var kValue = /** @class */ (function () {
    function kValue() {
        this.left = 0;
        this.right = 0;
    }
    kValue.prototype.setLeftAndRight = function (left, right, animationTime) {
        left = left * 70 + 10;
        right = right * 70 + 10;
        this.left = left;
        this.right = right;
        var $leftLine = $("svg#k-svg #leftVert");
        var $rightLine = $("svg#k-svg #rightVert");
        var $horizontal = $("svg#k-svg #horizontal");
        var $text = $("svg#k-svg text");
        var textWidth = $text.width();
        $({ x1: $horizontal.attr('x1') }).animate({ x1: left - 3 }, {
            duration: animationTime, step: function (now) {
                $horizontal.attr('x1', now);
            }
        });
        $({ x2: $horizontal.attr('x2') }).animate({ x2: right + 3 }, {
            duration: animationTime, step: function (now) {
                $horizontal.attr('x2', now);
            }
        });
        $({ x1: $leftLine.attr('x1') }).animate({ x1: left }, {
            duration: animationTime, step: function (now) {
                $leftLine.attr('x1', now);
            }
        });
        $({ x2: $leftLine.attr('x2') }).animate({ x2: left }, {
            duration: animationTime, step: function (now) {
                $leftLine.attr('x2', now);
            }
        });
        $({ x1: $rightLine.attr('x1') }).animate({ x1: right }, {
            duration: animationTime, step: function (now) {
                $rightLine.attr('x1', now);
            }
        });
        $({ x2: $rightLine.attr('x2') }).animate({ x2: right }, {
            duration: animationTime, step: function (now) {
                $rightLine.attr('x2', now);
            }
        });
        $({ x: $text.attr('x') }).animate({ x: (right - left) / 2 + left - textWidth / 2 }, {
            duration: animationTime,
            step: function (now) {
                $text.attr('x', now);
            }
        });
    };
    kValue.prototype.setValue = function (k) {
        $("svg#k-svg text").text("K = " + k);
    };
    kValue.prototype.hide = function () {
        $("svg#k-svg").addClass("hidden");
    };
    kValue.prototype.unhide = function () {
        $("svg#k-svg").removeClass("hidden");
    };
    return kValue;
}());
var k = new kValue();
