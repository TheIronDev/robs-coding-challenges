
// For simplicity, I defined the characterSet here. Feel free to swap out with other languages
var characterSet = 'abcdefghijklmnopqrstuvwxyz',
	characterArray = characterSet.split(''),
	characterUppercaseArray = characterSet.toUpperCase().split('');

/**
 *
 * @param cipherString - A full string that we will encrypt
 * @param positions - The number of rotations we will be doing on our character set.
 */
function CaesarCipher(cipherString, positions) {
	var cipherArrays = CreateCipherTables(positions),
		characterMap = CreateCharacterMap(cipherArrays.lowercase, cipherArrays.uppercase),

		cipherStringArray = cipherString.split(''),
		cipherStringArrayLength = cipherStringArray.length,
		characterIndex;

	// Walk down each cipherString character and replace it.
	while(cipherStringArrayLength--) {
		characterIndex = cipherStringArray[cipherStringArrayLength];

		if (characterMap[characterIndex]) {
			cipherStringArray[cipherStringArrayLength] = characterMap[characterIndex];
		}
	}

	return cipherStringArray.join('');
}

// Build out a Cipher Table
function CreateCipherTables(positions) {
	var cipherCharacterArray = characterArray.slice(0),
		cipherUppercaseCharacterArray = characterUppercaseArray.slice(0);

	// Cut down the number of rotations needed
	positions = positions%cipherCharacterArray.length;

	while (positions--) {
		cipherCharacterArray.push(cipherCharacterArray.shift());
		cipherUppercaseCharacterArray.push(cipherUppercaseCharacterArray.shift());
	}
	return {
		'lowercase': cipherCharacterArray,
		'uppercase': cipherUppercaseCharacterArray
	}
}

// Turn the caesar tables to a map (for faster lookups.)
function CreateCharacterMap(lowercaseArray, uppercaseArray) {
	var characterLength = lowercaseArray.length,
		characterMap = {};
	while (characterLength--) {
		characterMap[characterArray[characterLength]] = lowercaseArray[characterLength];
		characterMap[characterUppercaseArray[characterLength]] = uppercaseArray[characterLength];
	}
	return characterMap;
}

/**
 * Test: run by calling: node CaesarCipher 'Caesar Cipher' 2
 */
var testString = process.argv[2] || 'Caesar Cipher',
	testRotations = process.argv[3] || 2;

console.log( CaesarCipher(testString, testRotations) );
console.log( CaesarCipher(testString, testRotations + 26) );
console.log( CaesarCipher(testString, 0) );
