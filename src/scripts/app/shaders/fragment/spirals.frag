uniform sampler2D uImage;
uniform float uTime;

varying vec2 vTexCoord;


// Commutative smooth minimum function. Provided by Tomkh and 
// taken from Alex Evans's (aka Statix) talk: 
// http://media.lolrus.mediamolecule.com/AlexEvans_SIGGRAPH-2015.pdf
// Credited to Dave Smith @media molecule.
float smin(float a, float b, float r)
{
   float f = max(0., 1. - abs(b - a)/r);
   return min(a, b) - r*.25*f*f;
}

void main()
{   

    vec2 g = vTexCoord*10., kp = vec2(0), kid = vec2(0);

    g += uTime * .25;
    
    float d = 1e5, kd = d, ld = d;
    
    for(int x=-1;x<=1;x++)
    for(int y=-1;y<=1;y++)
    {   
        vec2 p = vec2(x,y);
        vec2 id = fract(sin((floor(g)+p)*mat2(2,5,5,2)));
        vec2 an = sin( uTime * 0.5 + 10. * id );
        p += .5 + .35 * an - fract(g);
        p *= 10.;
        
        d = smin(d, dot(p,p), 100.);
        if (d < 7.)
        {
            d = dot(p,p);
            float t = uTime * 5.*0.;
            kd = sin(ld * 0.5 - t) * ld;
            kid = id;
        }
        ld = d * 2.;
    }

    gl_FragColor = kd * vec4(1, floor(kid + 1.5) * 0.05, 1);
}