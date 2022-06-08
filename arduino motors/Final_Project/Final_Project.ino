
"ik"
//begining of define for joystick
#define joyX A0
#define joyY A1

 int xValue = 0;
 int yValue = 0;
 //end of define for joystick

//steppermotor
#define A 2
#define B 3
#define C 4
#define D 5
 
#define NUMBER_OF_STEPS_PER_REV 512
//steppermotor end

//motor
int enA = 6;
int in1 = 7;
int in2 = 8;
//motor end
 
void setup() {
  Serial.begin(9600);
  //stepper motor
pinMode(A,OUTPUT);
pinMode(B,OUTPUT);
pinMode(C,OUTPUT);
pinMode(D,OUTPUT);
//stepper motor end

//motor
pinMode(enA, OUTPUT);
pinMode(in1, OUTPUT);
pinMode(in2, OUTPUT);
       // Turn off motors - Initial state
digitalWrite(in1, LOW);
digitalWrite(in2, LOW);
//motor end
}
 //stepper motor stuff
 void write(int a,int b,int c,int d){
digitalWrite(A,a);
digitalWrite(B,b);
digitalWrite(C,c);
digitalWrite(D,d);
}

void onestep(){
write(1,0,0,0);
delay(1);
write(1,1,0,0);
delay(1);
write(0,1,0,0);
delay(1);
write(0,1,1,0);
delay(1);
write(0,0,1,0);
delay(1);
write(0,0,1,1);
delay(1);
write(0,0,0,1);
delay(1);
write(1,0,0,1);
delay(1);
}


void onestep1(){
write(0,0,0,1);
delay(1);
write(0,0,1,1);
delay(1);
write(0,0,1,0);
delay(1);
write(0,1,1,0);
delay(1);
write(0,1,0,0);
delay(1);
write(1,1,0,0);
delay(1);
write(1,0,0,0);
delay(1);
write(1,0,0,1);
delay(1);
}
 
 //stepper motor stuff end
 
 //motor stuff
 void directionControl() {
analogWrite(enA, 255);
digitalWrite(in1, HIGH);
digitalWrite(in2, LOW);
}

void directionControl1() {
analogWrite(enA, 155);
digitalWrite(in1, LOW);
digitalWrite(in2, HIGH);
}

void directionControlOff() {
  analogWrite(enA, 155);
digitalWrite(in1, LOW);
digitalWrite(in2, LOW);
}
 //end of motor stuff
 
void loop() {
  //joystick begin
  xValue = analogRead(joyX);
  yValue = analogRead(joyY);
 
  Serial.print(xValue);
  Serial.print("\t");
  Serial.println(yValue);
  //joystick end
 
  if (yValue > 691) {
  onestep1();
  }

if (xValue > 700) {
  directionControl();
  } else if (xValue < 700 && xValue > 200) {
  directionControlOff();
}

if (xValue < 200) {
  directionControl1();
}

 

  if (yValue < 250 ) {
    onestep();
  //   directionControl1();
  // } else {
  //     directionControlOff();
}
   
}
