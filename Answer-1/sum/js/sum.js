let twoSum = function (nums, target) {
  const hashMap = {};

  for (let i = 0; i < nums.length; i++) {
    let equip = target - nums[i];

    if (hashMap.hasOwnProperty(equip)) {
      return [hashMap[equip], i];
    }

    hashMap[nums[i]] = i;
  }

  //  In case there is no solution, but the problem guarantess that is exactly one solution
  throw new Error('No two sum solution');
};

// Example usage:

console.log(twoSum([2, -1, 9, 8, 3], 12)); //Output [2, 4]
console.log(twoSum([2, 1, 6], 8)); // Output: [0, 2]
console.log(twoSum([2, 4], 6)); // Output: [0, 1]
console.log(twoSum([3, 7, 1, 5], 12)); // Output: [1, 3]
