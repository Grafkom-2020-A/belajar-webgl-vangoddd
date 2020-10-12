function main() {
    var canvas = document.getElementById("myCanvas");
    var gl = canvas.getContext("webgl");

    //vertex definition
    /**
     * A (-0.5, 0.5) 
     * B (-0.5, -0.5)
     * C (0.5, -0.5)
     */
    var vertices = [
        -0.5, 0.5,  //A
        -0.5, -0.5, //B
        0.5, -0.5,  //C
        -0.5, 0.5  //A
    ];

    //buffer
    var positionBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);
    gl.bindBuffer(gl.ARRAY_BUFFER, null);

    //getting vertex shader
    var vertexShaderCode = document.getElementById("vertexShaderCode").text;

    var vertexShader = gl.createShader(gl.VERTEX_SHADER);
    gl.shaderSource(vertexShader, vertexShaderCode);
    gl.compileShader(vertexShader);

    //getting fragment shader
    var fragmentShaderCode = document.getElementById("fragmentShaderCode").text;

    var fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);
    gl.shaderSource(fragmentShader, fragmentShaderCode);
    gl.compileShader(fragmentShader);

    var shaderProgram = gl.createProgram();
    gl.attachShader(shaderProgram, vertexShader);
    gl.attachShader(shaderProgram, fragmentShader);
    gl.linkProgram(shaderProgram);
    gl.useProgram(shaderProgram);

    //bind
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    var aPosition = gl.getAttribLocation(shaderProgram, "a_Position");
    gl.vertexAttribPointer(aPosition, 2, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(aPosition);

    gl.clearColor(0.0, 0.0, 0.0, 1.0);
    gl.clear(gl.COLOR_BUFFER_BIT);

    var primitive = gl.LINE_STRIP;
    var offset = 0;
    var count = 4;
    
    gl.drawArrays(primitive, offset, count);
}