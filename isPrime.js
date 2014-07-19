/**
 * To Execute, run: node isPrime 13
 * 
 */

var testNumber = process.argv[2];

/**
 * @param test - an integer between 1 and 2^16
 * If the number is negative, we will absolute value it.
 * We are also assuming 1 is not a prime number.
 * @returns {boolean}
 */
function isPrime (test) {
	test = (test^(test>>31))-(test>>31);
	if (!(test-1)) return false;

	var max = ~~(test/2);
	while (max>1) {
		if (test%max === 0) return false;
		max--;
	}
	return true;
}


console.log(isPrime(testNumber));
