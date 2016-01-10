precision mediump float;

// This uniform value is passed in using CSS.
uniform float amount;

void main()
{
 float oneMinusAmount = 1.0 - amount;
 css_ColorMatrix = mat4(
     (0.2126 + 0.7874 * oneMinusAmount),
     (0.7152 - 0.7152 * oneMinusAmount),
     (0.0722 - 0.0722 * oneMinusAmount),
     0.0,

     (0.2126 - 0.2126 * oneMinusAmount),
     (0.7152 + 0.2848 * oneMinusAmount),
     (0.0722 - 0.0722 * oneMinusAmount),
     0.0,

     (0.2126 - 0.2126 * oneMinusAmount),
     (0.7152 - 0.7152 * oneMinusAmount),
     (0.0722 + 0.9278 * oneMinusAmount),
     0.0,

     0.0, 0.0, 0.0, 1.0);
}
