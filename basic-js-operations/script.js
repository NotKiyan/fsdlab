// 1. Type Conversion
  let num = "123";
  let converted = Number(num);
  document.getElementById("out1").innerText = `"${num}" → Number = ${converted}`;

  // 2. Operators (Logical)
  let a = true, b = false;
  let result = a && b;
  document.getElementById("out2").innerText = `true && false = ${result}`;

  // 3. if Statement
  let age = 20;
  let msg = "";
  if (age >= 18) {
    msg = "Adult";
  } else {
    msg = "Minor";
  }
  document.getElementById("out3").innerText = `Age ${age}: ${msg}`;

  // 4. while Loop
  let i = 0, whileOutput = "";
  while (i < 3) {
    whileOutput += i + " ";
    i++;
  }
  document.getElementById("out4").innerText = `while loop result: ${whileOutput}`;

  // 5. for Loop
  let forOutput = "";
  for (let j = 0; j < 3; j++) {
    forOutput += j + " ";
  }
  document.getElementById("out5").innerText = `for loop result: ${forOutput}`;

  // 6. for...in Loop
  let obj = {a: 1, b: 2, c: 3};
  let inOutput = "";
  for (let key in obj) {
    inOutput += key + ":" + obj[key] + " ";
  }
  document.getElementById("out6").innerText = `for...in result: ${inOutput}`;

  // 7. for...of Loop
  let arr = [10, 20, 30];
  let ofOutput = "";
  for (let val of arr) {
    ofOutput += val + " ";
  }
  document.getElementById("out7").innerText = `for...of result: ${ofOutput}`;

  // 8. switch case
  let day = 2;
  let dayName;
  switch (day) {
    case 1: dayName = "Monday"; break;
    case 2: dayName = "Tuesday"; break;
    case 3: dayName = "Wednesday"; break;
    default: dayName = "Other";
  }
  document.getElementById("out8").innerText = `Day 2 = ${dayName}`;

  // 9. Functions
  function greet(name) {
    return "Hello " + name;
  }
  document.getElementById("out9").innerText = greet("World");