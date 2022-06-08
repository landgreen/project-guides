

// A basic everyday NeoPixel strip test program.

// NEOPIXEL BEST PRACTICES for most reliable operation:
// - Add 1000 uF CAPACITOR between NeoPixel strip's + and - connections.
// - MINIMIZE WIRING LENGTH between microcontroller board and first pixel.
// - NeoPixel strip's DATA-IN should pass through a 300-500 OHM RESISTOR.
// - AVOID connecting NeoPixels on a LIVE CIRCUIT. If you must, ALWAYS
//   connect GROUND (-) first, then +, then data.
// - When using a 3.3V microcontroller with a 5V-powered NeoPixel strip,
//   a LOGIC-LEVEL CONVERTER on the data line is STRONGLY RECOMMENDED.
// (Skipping these may work OK on your workbench but can fail in the field)

#include <Adafruit_NeoPixel.h>
#ifdef __AVR__
#include <avr/power.h> // Required for 16 MHz Adafruit Trinket
#endif

// Which pin on the Arduino is connected to the NeoPixels?
// On a Trinket or Gemma we suggest changing this to 1:
#define LED_PIN    7

// How many NeoPixels are attached to the Arduino?
#define LED_COUNT 19

// Declare our NeoPixel strip object:
Adafruit_NeoPixel strip(LED_COUNT, LED_PIN, NEO_GRB + NEO_KHZ800);
// Argument 1 = Number of pixels in NeoPixel strip
// Argument 2 = Arduino pin number (most are valid)
// Argument 3 = Pixel type flags, add together as needed:
//   NEO_KHZ800  800 KHz bitstream (most NeoPixel products w/WS2812 LEDs)
//   NEO_KHZ400  400 KHz (classic 'v1' (not v2) FLORA pixels, WS2811 drivers)
//   NEO_GRB     Pixels are wired for GRB bitstream (most NeoPixel products)
//   NEO_RGB     Pixels are wired for RGB bitstream (v1 FLORA pixels, not v2)
//   NEO_RGBW    Pixels are wired for RGBW bitstream (NeoPixel RGBW products)
//variable for blink amounts
int blinkLength = 10;

/*

*/
float r, g, b, h, s, v;
// cool awesome HSV to RGB color function
void HSVtoRGB( float *r, float *g, float *b, float h, float s, float v )
{
  int i;
  float f, p, q, t;
  if ( s == 0 ) {
    // achromatic (grey)
    *r = *g = *b = v;
    return;
  }
  h /= 60;      // sector 0 to 5
  i = floor( h );
  f = h - i;      // factorial part of h
  p = v * ( 1 - s );
  q = v * ( 1 - s * f );
  t = v * ( 1 - s * ( 1 - f ) );
  switch ( i ) {
    case 0:
      *r = v;
      *g = t;
      *b = p;
      break;
    case 1:
      *r = q;
      *g = v;
      *b = p;
      break;
    case 2:
      *r = p;
      *g = v;
      *b = t;
      break;
    case 3:
      *r = p;
      *g = q;
      *b = v;
      break;
    case 4:
      *r = t;
      *g = p;
      *b = v;
      break;
    default:    // case 5:
      *r = v;
      *g = p;
      *b = q;
      break;
  }
}

void rainbowBreathe () {
  float r, g, b, h, s, v;
  for (int i = 0; i < 360; i++) {
    HSVtoRGB(&r, &g, &b, i, 1, 100);
    delay(10);
    for (int j = 0; j < 19; j++) {
      strip.setPixelColor(j, r, g, b);
    }
    strip.show();
  }
}
void rainbowHighDownHalf () {
  for (int i = 360; i > 180; i-- ) {
    HSVtoRGB(&r, &g, &b, i, 1, 100);
    delay(10);
    for (int j = 0; j < 19; j++) {
      strip.setPixelColor(j, r, g, b);
    }
    strip.show();
  }
}
void rainbowLowDownHalf () {
  for (int i = 180; i > 0; i--) {
    HSVtoRGB(&r, &g, &b, i, 1, 100);
    delay(10);
    for (int j = 0; j < 19; j++) {
      strip.setPixelColor(j, r, g, b);
    }
    strip.show();
  }
}
void randomBlink() {
  uint32_t randomColor = strip.gamma32(strip.ColorHSV(random(0, 65536)));
  for (int j = 0; j < 19; j++) {
    strip.setPixelColor(j, randomColor);
    delay(10);
  }
  strip.show();
}
void sparkles() {
  uint32_t randomLowColor = strip.gamma32(strip.ColorHSV(random(0, 32767)));
  uint32_t randomHighColor = strip.gamma32(strip.ColorHSV(random(32768, 65536)));
  // HSVtoRGB(&r, &g, &b, x, 1, 100);
  for (int i = 0; i < 18; i += 2) {
    strip.setPixelColor(i, randomLowColor);
    delay(50);
  }
  // HSVtoRGB(&r, &g, &b, y, 1, 100);
  for (int j = 1; j < 18; j += 2) {
    strip.setPixelColor(j, randomHighColor);
    delay(50);
  }
  strip.show();
}

void firework () {
  uint32_t randomColor = strip.gamma32(strip.ColorHSV(random(0, 65536)));
  int y = random(19);
  for (int j = 0; j < 19; j++) {
    strip.setPixelColor(j, randomColor);
  }
  strip.show();
  // HSVtoRGB(&r, &g, &b, x, 1, 100);
  strip.setPixelColor(y, 255, 255, 255);
  strip.show();
  delay(1000);
}
void gammaTest () {
  uint32_t randomColor = strip.gamma32(strip.ColorHSV(random(0, 65536)));
  for (int j = 0; j < 19; j++) {
    strip.setPixelColor(j, randomColor);
    strip.show();
    delay(50);
  }
}
void gammaColorTest() {
  uint32_t rgbcolor = strip.gamma32(strip.ColorHSV(360, 255, 255));
  strip.fill(rgbcolor);
  strip.show();
  delay(100);
}

void setup() {
#if defined(__AVR_ATtiny85__) && (F_CPU == 16000000)
  clock_prescale_set(clock_div_1);
#endif
  // END of Trinket-specific code.

  strip.begin();           // INITIALIZE NeoPixel strip object (REQUIRED)
  strip.show();            // Turn OFF all pixels ASAP
  strip.setBrightness(100);
  Serial.begin(9600);
}
int animationNum = 0;
int count = 0;
void loop() {
  // switch (animationNum) {
  //   case 1://code for first animation
  //     gammaColorTest();
  //     break;
  //   case 2:
  //     rainbowBreathe();
  //       break;
  //   case 3:
      sparkles();
  //       break;
  //   case 4:
  //     firework();
  //     break;
  //   case 5:
  //     rainbowLowDownHalf();
  //     rainbowHighDownHalf();
  //     break;
  //   case 6:
  //     randomBlink();
  //     break;
  //   // case 7 :
  //   //   whitePower();
  //     break;
  // }
  // animationNum++;
  // if(animationNum > 6) {
  //   int animationNum = 0;
  // }
}
