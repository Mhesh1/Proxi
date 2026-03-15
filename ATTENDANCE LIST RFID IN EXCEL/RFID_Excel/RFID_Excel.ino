#include <Wire.h>
#include <LiquidCrystal_I2C.h>
#include <SPI.h>
#include <MFRC522.h>

// Pins
#define SS_PIN   10
#define RST_PIN  9
#define BUZZER   8

MFRC522 rfid(SS_PIN, RST_PIN);
LiquidCrystal_I2C lcd(0x27, 16, 2);

// Student structure
struct Student {
  byte UID[4];
  const char* name;
  const char* branch;
  int rollNo;
  const char* enrollment;
  bool marked;
};

// Student database
Student students[] = {
  {{0x0D, 0x51, 0xD1, 0x16}, "VISHAL A KOLTE", "COM", 71, "14122006", false},
  {{0x2B, 0x85, 0x96, 0x04}, "MAHESH R DAREKAR", "COM", 56, "01012001", false}
};

int studentCount = sizeof(students) / sizeof(students[0]);

// Find student using UID
Student* getStudent(byte *uid) {

  for (int i = 0; i < studentCount; i++) {

    bool match = true;

    for (byte j = 0; j < 4; j++) {

      if (students[i].UID[j] != uid[j]) {
        match = false;
        break;
      }
    }

    if (match) return &students[i];
  }

  return NULL;
}

void setup() {

  Serial.begin(9600);
  while (!Serial);   // Wait for serial port to connect (needed for native USB)
  
  SPI.begin();
  rfid.PCD_Init();
  delay(50); // delay to let PCD initialize properly
  
  // Show RFID firmware version in Serial Monitor to verify communication works
  Serial.print(F("RFID MFRC522 Version: 0x"));
  byte v = rfid.PCD_ReadRegister(rfid.VersionReg);
  Serial.print(v, HEX);
  if (v == 0x00 || v == 0xFF) {
    Serial.println(F(" -> WARNING: Communication failure! Check TX/RX/SPI wiring."));
  } else {
    Serial.println(F(" -> SUCCESS: RFID module found."));
  }

  lcd.init();
  lcd.backlight();

  pinMode(BUZZER, OUTPUT);

  // Excel setup
  Serial.println("CLEARDATA");
  Serial.println("LABEL,Date,Time,Name,Roll No,Enrollment");

  lcd.setCursor(0,0);
  lcd.print("RFID ATTENDANCE");
  delay(2000);

  lcd.clear();
  lcd.setCursor(0,0);
  lcd.print("Scan Your Card");
}

void loop() {

  if (!rfid.PICC_IsNewCardPresent() || !rfid.PICC_ReadCardSerial())
    return;

  byte *uid = rfid.uid.uidByte;

  Student* stu = getStudent(uid);

  lcd.clear();

  if (stu != NULL) {

    // Valid card beep
    digitalWrite(BUZZER, HIGH);
    delay(100);
    digitalWrite(BUZZER, LOW);

    lcd.setCursor(0,0);
    lcd.print(stu->name);

    lcd.setCursor(0,1);
    lcd.print("Roll:");
    lcd.print(stu->rollNo);
    lcd.print(" ");
    lcd.print(stu->branch);

    // Format UID as string
    String uidStr = String(uid[0], HEX) + String(uid[1], HEX) + String(uid[2], HEX) + String(uid[3], HEX);
    uidStr.toUpperCase();

    Serial.print("DATA,DATE,TIME,");
    Serial.print(stu->name);
    Serial.print(",");
    Serial.print(stu->rollNo);
    Serial.print(",");
    Serial.print(stu->enrollment);
    Serial.print(",");
    Serial.print(uidStr);
    Serial.println(",SUCCESS");

    if (!stu->marked) {
      stu->marked = true;
    }

  }

  else {

    // Invalid card beep
    for(int i=0;i<3;i++){
      digitalWrite(BUZZER,HIGH);
      delay(150);
      digitalWrite(BUZZER,LOW);
      delay(150);
    }

    lcd.setCursor(0,0);
    lcd.print("Access Denied");

    lcd.setCursor(0,1);
    lcd.print("Unknown Card");
    
    // Format UID as string
    String uidStr = String(uid[0], HEX) + String(uid[1], HEX) + String(uid[2], HEX) + String(uid[3], HEX);
    uidStr.toUpperCase();

    // Send warning to Node bridge
    Serial.print("DATA,DATE,TIME,UNKNOWN,N/A,N/A,");
    Serial.print(uidStr);
    Serial.println(",DENIED");
  }

  rfid.PICC_HaltA();
  rfid.PCD_StopCrypto1();

  delay(2000);

  lcd.clear();
  lcd.setCursor(0,0);
  lcd.print("Scan Your Card");
}
