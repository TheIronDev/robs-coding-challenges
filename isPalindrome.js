/**
 * To Execute, run: node isPalindrome "Anne, I vote more cars race Rome-to-Vienna"
 * 
 */

var testString = process.argv[2];

/**
 * @param testString - A string (in quotes please)
 * @returns {boolean}
 */
function isPalindrome (testString) {

	var parsedStringArray = testString.toLowerCase().match(/\w/g);
	return parsedStringArray.join('') === parsedStringArray.reverse().join('');
}


console.log(isPalindrome(testString));
