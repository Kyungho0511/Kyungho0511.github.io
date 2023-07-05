uniform vec3 uColor;
uniform float uGridSize;
uniform float uLineWeight;
uniform float uOpacity;

varying vec2 vUv;

void main() {
  float vX = mod(vUv.x * (100.0 - uGridSize), 1.0);
  float vY = mod(vUv.y * (100.0 - uGridSize), 1.0);
  float v = step(1.0 - uLineWeight, vX) + step(1.0 - uLineWeight, vY);
  v = clamp(v, 0.0, uOpacity);

  gl_FragColor = vec4(uColor, v);
}