let reverse = function (x) {
  // Handle the sign and convert to string
  let sign = Math.sign(x);
  let reversedString = Math.abs(x).toString().split('').reverse().join('');

  //   Convert back to integer
  let reversedNumber = parseInt(reversedString) * sign;

  //   Check for 32-bit integer overflow
  if (reversedNumber < Math.pow(-2, 31) || reversedNumber > Math.pow(2, 31) - 1) {
    return 0;
  }

  return reversedNumber;
};

// Example usage:
console.log(reverse(678)); // Output : 876

console.log(reverse(5419)); // Output : 9145

console.log(reverse(78345)); // Output : 54387

console.log(reverse(378)); // Output : 873
