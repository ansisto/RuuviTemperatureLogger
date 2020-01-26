// Log temperatures directly in RuuviTag with Espruino and use functions to read logged data remotely with Web Bluetooth
NRF.setAdvertising({}, {name: "DeviceXXX"}); // set ruuviTag preliminary advertising name
const length = 3000; // set max amount of stored records. RuuviTag seems to not accept much more than 3000 when application stored in RAM
const interval = 600; // set interval in seconds

var ruuvi = require("Ruuvitag");
var temperature = 0;
var records = new Float32Array(length);
var recordsIndex = 0;

// set new ruuviTag advertising name
function setRuuviAdvertisingName(name) {
  NRF.setAdvertising({}, {name:name});
}

// get stored data
function getData() {
  for (i = 0; i < recordsIndex-1; i++) {
    console.log(i+1 + ","+ records[i]);
  }
}

function getRecordsCount() {
  console.log("Amount of records: " + recordsIndex);
}

// get battery voltage
function getBatteryVoltage(){
  console.log(NRF.getBattery()); 
}

// get interval between logged records
function getInterval(){
  console.log("Logging interval in seconds: " + interval);
}

function storeData(data) {
  records[recordsIndex] = data;
  if (recordsIndex>=records.length) clearInterval();
  recordsIndex++;
}


//function onInit() { // comment row out in case saving code to RAM memory  
  setInterval(function() {
    ruuvi.setEnvOn(true);
    temperature = ruuvi.getEnvData().temp;
    storeData(temperature);
  }, interval*1000);
// } // END OnInit // comment row out in case saving code to RAM memory
