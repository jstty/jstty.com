precision mediump float;

uniform float amount;
uniform float resX;
uniform float resY;

void main( void )
{
    float dx = (resX / 2.0) - gl_FragCoord.x;
    float dy = (resY / 2.0) - gl_FragCoord.y;
    float k  = (sin(amount*0.4)+1.0)*0.5;
    float d  = (dx * dx + dy * dy) * k;
					    
	 float r  = (sin(amount+d*0.029)+1.0)*0.5;
    float g  = (sin(amount*1.4 +d*0.03)+1.0)*0.5;
    float b  = (sin(amount*10.0 +d*0.03)+1.0)*k;
    float a  = (sin(amount*5.0 + d*0.03)+1.0)*0.5;

    css_ColorMatrix = mat4(
        vec4(r, 0.0, 0.0, 0.0),
        vec4(0.0, g, 0.0, 0.0),
        vec4(0.0, 0.0, b, 0.0),
        vec4(0.0, 0.0, 0.0, a)
    );
}
