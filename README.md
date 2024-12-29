# TeaEncryptor
A TeaEncryptor for encrypting and decrypting text into numbers using a custom character set and offset key.

## Installation

You can install `TeaEncryptor` via npm:
```bash
npm install @versailles7/coffe

```

## Usage

```javascript
import TeaEncryptor from '@versailles7/coffe';

// Create a new TeaEncryptor instance
const encryptor = new TeaEncryptor();

// Encrypt text
const encryptedText = encryptor.enc('Hello World');

// Decrypt text
const decryptedText = encryptor.dec(encryptedText);

console.log('Encrypted:', encryptedText);
console.log('Decrypted:', decryptedText);
```

## Running Tests

You can run tests using npm:
```bash
npm run test
```
This will run the test script located at tests/test.js, which will encrypt and decrypt a sample text and output the results.


Expected output:

```text
> tea-enc@1.0.0 test
> node tests/test.js

Encrypted Text: 168122113111113118105116182173109128124182132134134138
Decrypted Text: Original Text 1337
```

## API

### `new TeaEncryptor([defaultBaseKey], [offsetKey])`
Creates a new TeaEncryptor instance.
- `defaultBaseKey` (optional): The default base key for encryption.
- `offsetKey` (optional): The offset key used for generating the final base key.


### `TeaEncryptor.set(defaultBaseKey, [offsetKey])`
Sets the base key and flipped base key for encryption and decryption.
- `defaultBaseKey`: The default base key for encryption.
- `offsetKey` (optional): The offset key used for generating the final base key.


### `TeaEncryptor.enc(textInput)`
Encrypts the input text using the base key.
- `textInput`: The text to be encrypted. Returns the encrypted text.


### `TeaEncryptor.dec(textInput)`
Decrypts the input text using the base key.
- `textInput`: The text to be decrypted. Returns the decrypted text.

## License
This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.