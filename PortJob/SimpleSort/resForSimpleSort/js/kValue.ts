/**
 * Created by knutandersstokke on 05.09.2016.
 */

declare var $;

class kValue {

    left:number = 0;
    right:number = 0;

    setLeftAndRight(left:number, right:number, animationTime:number) {
        left = left*70 + 10;
        right = right*70 + 10;
        this.left = left;
        this.right = right;

        var $leftLine = $("svg#k-svg #leftVert");
        var $rightLine = $("svg#k-svg #rightVert");
        var $horizontal = $("svg#k-svg #horizontal");
        var $text = $("svg#k-svg text")
        var textWidth = $text.width();

        $({x1:$horizontal.attr('x1')}).animate({x1: left - 3}, {duration:animationTime, step:function(now) { $horizontal.attr('x1', now); }});
        $({x2:$horizontal.attr('x2')}).animate({x2: right + 3}, {duration:animationTime, step:function(now) { $horizontal.attr('x2', now); }});
        $({x1:$leftLine.attr('x1')}).animate({x1: left}, {duration:animationTime, step:function(now) { $leftLine.attr('x1', now); }});
        $({x2:$leftLine.attr('x2')}).animate({x2: left}, {duration:animationTime, step:function(now) { $leftLine.attr('x2', now); }});
        $({x1:$rightLine.attr('x1')}).animate({x1: right}, {duration:animationTime, step:function(now) { $rightLine.attr('x1', now); }});
        $({x2:$rightLine.attr('x2')}).animate({x2: right}, {duration:animationTime, step:function(now) { $rightLine.attr('x2', now); }});

        $({x:$text.attr('x')}).animate({x: (right - left)/2 + left - textWidth/2}, {duration:animationTime, step:function(now) { $text.attr('x', now); }});
    }

    setValue(k:number) {
        $("svg#k-svg text").text("K = " + k);
    }

    hide() {
        $("svg#k-svg").addClass("hidden");
    }

    unhide() {
        $("svg#k-svg").removeClass("hidden");
    }

}

var k:kValue = new kValue();
