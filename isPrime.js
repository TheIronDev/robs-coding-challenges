var testNumber = process.argv[2];

/**
 * @param test - an integer between 1 and
 * @returns {boolean}
 */
function isPrime (test) {

	var max = ~~(test/2);
	while (max>1) {
		if (test%max === 0) return false;
		max--;
	}
	return true;
}


console.log(isPrime(testNumber));