function supportsWebGl() {
    var support = true;

    try {

        var $canvas = $('<canvas />');
        $('body').append($canvas);
        var canvas = $canvas[0];

        if (canvas.addEventListener) {
            canvas.addEventListener("webglcontextcreationerror", function(event) {
                console.log('webglcontextcreationerror');
                support = false;
            }, false);
        }

        var context = create3DContext(canvas);
        if (!context) {

            console.log('No webgl context');

            if (!window.WebGLRenderingContext) {
                console.log('No WebGLRenderingContext');
            }

            support = false;
        }
    }
    catch (e) {
        console.log(e);
    } finally {
        $canvas.remove();
    }

    return support;
}

function create3DContext(canvas) {
    var names = ["webgl", "experimental-webgl", "webkit-3d", "moz-webgl"];
    var context = null;
    for (var ii = 0; ii < names.length; ++ii) {
        try {
            context = canvas.getContext(names[ii]);
        } catch (e) {}
        if (context) {
            break;
        }
    }
    return context;
}

console.log('Client supports WebGL: ' + supportsWebGl());
