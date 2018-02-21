(function () {
    "use strict";

    var canvas = document.getElementById("canvasId"),
        ctx = canvas.getContext("2d");

    ctx.lineWidth = 5;

    function square (obj) {
        ctx.strokeStyle = obj.color;
        ctx.strokeRect(obj.x, 10, obj.side, obj.side);
        ctx.stroke();
    }

    square({
        side: 15,
        x: 10,
        color: "red"
    });
    square({
        side: 25,
        x: 50,
        color: "green"
    });
    square({
        side: 35,
        x: 110,
        color: "blue"
    });
}());
