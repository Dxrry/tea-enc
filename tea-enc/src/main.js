import validator from 'validator';
import createError from 'http-errors';
import debug from 'debug';
import { randomBytes } from 'crypto';

const log = debug('TeaEncryptor');

/**
 * TeaEncryptor is a class for encrypting and decrypting text using a custom character set and offset key.
 */
class TeaEncryptor {
    /**
     * Creates an instance of TeaEncryptor.
     * @param {string} [defaultBaseKey="abcdefghijklmnopqrstuvwxyz0123456789;`</>- |_=,.:ABCDEFGHIJKLMNOPQRSTUVWXYZ\\/ "] - The default base key for encryption.
     * @param {number} [offsetKey=105] - The offset key used for generating the final base key.
     */
    constructor(defaultBaseKey = "abcdefghijklmnopqrstuvwxyz0123456789;`</>- |_=,.:ABCDEFGHIJKLMNOPQRSTUVWXYZ\\/ ", offsetKey = 105) {
        this.set(defaultBaseKey, offsetKey);
    }

    /**
     * Sets the base key and flipped base key for encryption and decryption.
     * @param {string} defaultBaseKey - The default base key for encryption.
     * @param {number} [offsetKey=105] - The offset key used for generating the final base key.
     * @throws {Error} Throws an error if defaultBaseKey is invalid, offsetKey is invalid, or resulting key length is not within 100 to 999 characters.
     */
    set(defaultBaseKey, offsetKey = 105) {
        log('Setting base key...');

        if (!validator.isAscii(defaultBaseKey) || defaultBaseKey.length === 0) {
            throw createError(400, "Default base key must be a non-empty ASCII string");
        }
        if (typeof offsetKey !== 'number' || offsetKey < 0 || offsetKey % 1 !== 0) {
            throw createError(400, "Offset key must be a non-negative integer");
        }
        const keyLength = defaultBaseKey.length + offsetKey;
        if (keyLength < 100) {
            throw createError(400, "Default base key is too small; resulting key length must be at least 100");
        }
        if (keyLength > 999) {
            throw createError(400, "Default base key is too big; resulting key length must be at most 999");
        }

        this.baseKey = {};
        for (let i = 0; i < defaultBaseKey.length; i++) {
            this.baseKey[i + offsetKey] = defaultBaseKey.charAt(i);
        }
        this.flippedBaseKey = Object.fromEntries(
            Object.entries(this.baseKey).map(([key, value]) => [value, key])
        );

        log('Base key successfully set');
    }

    /**
     * Encrypts the input text using the base key.
     * @param {string} textInput - The text to be encrypted.
     * @returns {string} Returns the encrypted text.
     * @throws {Error} Throws an error if any character in textInput is not present in the base key.
     */
    enc(textInput) {
        log('Encrypting text...');
        const textSplit = textInput.split("");
        let encryptedText = "";

        textSplit.forEach(iterSplit => {
            if (!this.flippedBaseKey[iterSplit]) {
                throw createError(400, `Character "${iterSplit}" not found in base key`);
            }
            encryptedText += this.flippedBaseKey[iterSplit];
        });

        log('Text successfully encrypted');
        return encryptedText;
    }

    /**
     * Decrypts the input text using the base key.
     * @param {string} textInput - The text to be decrypted.
     * @returns {string} Returns the decrypted text.
     */
    dec(textInput) {
        log('Decrypting text...');
        const textSplit = textInput.match(/.{1,3}/g) || [];
        let decryptedText = "";

        textSplit.forEach(iterSplit => {
            decryptedText += this.baseKey[iterSplit] || "";
        });

        log('Text successfully decrypted');
        return decryptedText;
    }

    /**
     * Generates a random base key of a specified length.
     * @param {number} length - The desired length of the random base key.
     * @returns {string} Returns a randomly generated base key.
     */
    static generateRandomBaseKey(length = 64) {
        if (length < 1 || length > 1000) {
            throw createError(400, "Length must be between 1 and 1000");
        }
        return randomBytes(length).toString('base64').slice(0, length);
    }
}

export default TeaEncryptor;