#include <Adafruit_CircuitPlayground.h>
#include "math.h"

float a = CircuitPlayground.motionX();
float b = CircuitPlayground.motionY();
float c = CircuitPlayground.motionZ();
float h;
float frequency = 0;

void setup() {
  //Serial.begin(9600);
  //Serial.println("Circuit Playground test!");

  CircuitPlayground.begin();

}


void loop() {
  h = sqrt( a * a + b * b + c * c);
  a = CircuitPlayground.motionX();
  b = CircuitPlayground.motionY();
  c = CircuitPlayground.motionZ();



  for (int pixel = 0; pixel < 10; pixel++) {

    CircuitPlayground.setPixelColor(pixel, 89, 158, 92);
  }
  //Serial.println(h);
  // delay(10);

  if (h > 8)  {
    //int frequency = analogRead(9);
    h = map(h, 9, 30, 20, 500);
    frequency = frequency * 0.98 + (0.02 * h);


    CircuitPlayground.playTone(frequency, 100);

  }
}

