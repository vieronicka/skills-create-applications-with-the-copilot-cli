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

// Additional operations requested in the latest issue:
//  - modulo(a, b)      - returns remainder of a divided by b
//  - power(base, exp)  - returns base raised to exponent
//  - squareRoot(n)     - returns square root of n (error on negative)
function modulo(a, b) {
  if (b === 0) {
    throw new Error("Division by zero");
  }
  return a % b;
}

function power(base, exponent) {
  return Math.pow(base, exponent);
}

function squareRoot(n) {
  if (n < 0) {
    throw new Error("Square root of negative number");
  }
  return Math.sqrt(n);
}

module.exports = { add, sub, mul, div, modulo, power, squareRoot };

// CLI handling when executed directly
if (require.main === module) {
  const args = process.argv.slice(2);

  function printHelp() {
    console.log("Node.js CLI Calculator\n");
    console.log("Usage:");
    console.log("  node src/calculator.js <operation> <num1> <num2>");
    console.log("  node src/calculator.js sqrt <num>\n");
    console.log("Operations:");
    console.log("  add   - addition");
    console.log("  sub   - subtraction");
    console.log("  mul   - multiplication");
    console.log("  div   - division");
    console.log("  mod   - modulo (remainder)");
    console.log("  pow   - exponentiation (power)");
    console.log("  sqrt  - square root (single argument)");
    console.log("\nExamples:");
    console.log("  node src/calculator.js add 2 3    -> 5");
    console.log("  node src/calculator.js div 8 2    -> 4");
    console.log("  node src/calculator.js mod 10 3   -> 1");
    console.log("  node src/calculator.js pow 2 8    -> 256");
    console.log("  node src/calculator.js sqrt 16    -> 4");
  }

  if (args.length === 0 || args.includes('--help') || args.includes('-h')) {
    printHelp();
    process.exit(0);
  }

  const op = args[0];

  // Determine expected argument count for each operation
  const singleArgOps = new Set(['sqrt']);
  const twoArgOps = new Set(['add','sub','mul','div','mod','pow']);

  if (singleArgOps.has(op)) {
    if (args.length !== 2) {
      console.error('Error: Expected 2 arguments: <operation> <num> for sqrt');
      printHelp();
      process.exit(1);
    }
    const n = Number(args[1]);
    if (Number.isNaN(n)) {
      console.error('Error: Argument must be a valid number.');
      process.exit(1);
    }

    try {
      let result;
      switch (op) {
        case 'sqrt':
          result = squareRoot(n);
          break;
        default:
          console.error(`Error: Unknown operation '${op}'.`);
          printHelp();
          process.exit(1);
      }
      console.log(result);
    } catch (err) {
      console.error('Error:', err.message);
      process.exit(1);
    }
  } else if (twoArgOps.has(op)) {
    if (args.length !== 3) {
      console.error('Error: Expected 3 arguments: <operation> <num1> <num2>');
      printHelp();
      process.exit(1);
    }

    const a = Number(args[1]);
    const b = Number(args[2]);

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
        case 'mod':
          result = modulo(a, b);
          break;
        case 'pow':
          result = power(a, b);
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
  } else {
    console.error(`Error: Unknown operation '${op}'.`);
    printHelp();
    process.exit(1);
  }
}
