uniform float uTime;
uniform float uMovementHeight;
uniform float uMovementSpeed;
uniform float uScaleSpeed;

attribute float aScale;
attribute float aRandom;

void main() {
  // Position
  vec4 modelPosition = modelMatrix * vec4(position, 1.0);

  // Movement
  float movement = sin(uTime * (aRandom + uMovementSpeed)) * uMovementHeight * aRandom;
  modelPosition.y = movement;

  vec4 viewPosition = viewMatrix * modelPosition;
  vec4 projectionPosition = projectionMatrix * viewPosition;
  gl_Position = projectionPosition;

  // Size
  gl_PointSize = aScale * abs(sin(uTime * uScaleSpeed * aRandom + aRandom));
}