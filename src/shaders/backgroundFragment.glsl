uniform vec3 uColor;

void main() {
  float alpha = 1.0 - step(0.25, distance(gl_PointCoord, vec2(0.5)));
  alpha = clamp(alpha, 0.0, 0.5);

  gl_FragColor = vec4(uColor, alpha);
}