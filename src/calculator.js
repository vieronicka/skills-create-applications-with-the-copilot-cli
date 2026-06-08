#!/usr/bin/env node
"use strict";

/**
 * Node.js CLI Calculator
 * Supported operations:
 *  - add (addition)
 *  - sub (subtraction)
 *  - mul (multiplication)
 *  - div (division)
 *
 * Usage (examples):
 *   node src/calculator.js add 2 3    -> 5
 *   node src/calculator.js sub 5 2    -> 3
 *   node src/calculator.js mul 4 6    -> 24
 *   node src/calculator.js div 8 2    -> 4
 *
 * The module also exports functions: add, sub, mul, div for programmatic use.
 */

// Exported arithmetic functions
function add(a, b) {
  return a + b;
}

function sub(a, b) {
  return a - b;
}

function mul(a, b) {
  return a * b;
}

function div(a, b) {
  if (b === 0) {
    throw new Error("Division by zero");
  }
  return a / b;
}

module.exports = { add, sub, mul, div };

// CLI handling when executed directly
if (require.main === module) {
  const args = process.argv.slice(2);

  function printHelp() {
    console.log("Node.js CLI Calculator\n");
    console.log("Usage:");
    console.log("  node src/calculator.js <operation> <num1> <num2>\n");
    console.log("Operations:");
    console.log("  add   - addition");
    console.log("  sub   - subtraction");
    console.log("  mul   - multiplication");
    console.log("  div   - division");
    console.log("\nExamples:");
    console.log("  node src/calculator.js add 2 3    -> 5");
    console.log("  node src/calculator.js div 8 2    -> 4");
  }

  if (args.length === 0 || args.includes('--help') || args.includes('-h')) {
    printHelp();
    process.exit(0);
  }

  if (args.length !== 3) {
    console.error('Error: Expected 3 arguments: <operation> <num1> <num2>');
    printHelp();
    process.exit(1);
  }

  const [op, aStr, bStr] = args;
  const a = Number(aStr);
  const b = Number(bStr);

  if (Number.isNaN(a) || Number.isNaN(b)) {
    console.error('Error: Both arguments must be valid numbers.');
    process.exit(1);
  }

  try {
    let result;
    switch (op) {
      case 'add':
        result = add(a, b);
        break;
      case 'sub':
        result = sub(a, b);
        break;
      case 'mul':
        result = mul(a, b);
        break;
      case 'div':
        result = div(a, b);
        break;
      default:
        console.error(`Error: Unknown operation '${op}'.`);
        printHelp();
        process.exit(1);
    }

    // Print result
    // Use console.log so output can be captured in scripts
    console.log(result);
  } catch (err) {
    console.error('Error:', err.message);
    process.exit(1);
  }
}
