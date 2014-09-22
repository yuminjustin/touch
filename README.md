touch
=====

touch plugin for JQuery or Zepto

New version and demos

version:1.1

Fix drag events.

This plugin base on JQuery or Zepto.

It offer generality touch events: tap,longTap, swipeUp,swipeDown,swipeLeft,swipeRight,swipe,drag

You can use it like these:

      $(document).ready(function () { /*must*/
            $(this).tap(function (event) {
                $("#xx").text("tap");
            });
            $(this).longTap(function (event) {
                $("#xx").text("longtap");
            });
            $(this).swipeUp(function (event) {
                $("#xx").text("swipeUp");
            }, {
                x: 50,/*update the minimum swiping distance*/
                y: 50
            });
            $(this).swipe(function (event) {
                $("#xx").text("swipe");
            });
            $(this).swipeDown(function (event) {
                $("#xx").text("swipeDown");
            });
            $(this).swipeLeft(function (event) {
                $("#xx").text("swipeLeft");
            });
            $(this).swipeRight(function (event) {
                $("#xx").text("swipeRight");
            });
        });

Drag events:

       $(".slider").drag(function (event, p) {
                console.log(p.x,p.y,p.xs,p.ys);
                /*
                  p.x,p.y: touch position now
                  p.xs,p.ys: touch position when you start to touch
                */
      });
      
     
版本：1.1
修复拖拽事件
此插件支持 JQuery或者Zepto
提供一般性的触摸事件，（如上）

contact：

Sina weibo ：http://weibo.com/531205012

Tencent QQ ：1447937286


     
