precision mediump float;

uniform float amount;
uniform float resX;
uniform float resY;

void main( void )
{
	float x = (gl_FragCoord.x/resX)/4.0;
	float y = (gl_FragCoord.y/resY)/4.0;

	float color = 0.0;
	color += sin( x * cos( time / 15.0 ) * 80.0 ) + cos( y * cos( time / 15.0 ) * 10.0 );
	color += sin( y * sin( time / 10.0 ) * 40.0 ) + cos( x * sin( time / 25.0 ) * 40.0 );
	color += sin( x * sin( time / 5.0  ) * 10.0 ) + sin( y * sin( time / 35.0 ) * 80.0 );
	color *= sin( time / 10.0 ) * 0.5;

   float r  = color;
   float g  = color * 0.5;
   float b  = sin( color + amount / 3.0 ) * 0.75;
   float a  = 0.5;
   
   css_ColorMatrix = mat4(
      vec4(r, 0.0, 0.0, 0.0),
      vec4(0.0, g, 0.0, 0.0),
      vec4(0.0, 0.0, b, 0.0),
      vec4(0.0, 0.0, 0.0, a)
   );

}