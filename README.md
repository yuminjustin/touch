touch
=====

基于 JQuery 或者 Zepto

内含demo 可以查看效果

版本:1.1     修复了拖拽事件。

提供了常用的几个事件: tap,longTap, swipeUp,swipeDown,swipeLeft,swipeRight,swipe,drag

你可以这样来使用:

      $(document).ready(function () { /*写在头部时必须*/
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

拖拽事件:

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

##详细：https://yuminjustin.github.io/?/arc/arcid:01/channel:arc


     
