# Cryptography Tool

This project is a web-based tool that allows users to **encrypt** and **decrypt** text using various classical cipher algorithms. The supported algorithms include Caesar cipher, Monoalphabetic cipher, Vigenère cipher, Playfair cipher, Rail Fence cipher, Transposition cipher, Affine cipher, and Substitution cipher.

You can access the live version of the tool [here](https://encryption-decryption.surge.sh/).

## Features

- **Encryption and Decryption**: Users can choose to either encrypt or decrypt text using a selected cipher algorithm.
- **Multiple Cipher Algorithms**: Supports a wide range of classical ciphers for both encryption and decryption.
- **Error Handling**: The tool provides helpful error messages for invalid input, ensuring a smooth experience for users.

## Supported Algorithms

### 1. **Caesar Cipher**
A substitution cipher where each letter in the plaintext is shifted by a given number.

### 2. **Monoalphabetic Cipher**
A substitution cipher that replaces each letter of the plaintext with another letter from a shuffled alphabet.

### 3. **Vigenère Cipher**
A polyalphabetic cipher that uses a key to determine the shifting of letters.

### 4. **Playfair Cipher**
A digraph cipher that encrypts pairs of letters using a 5x5 matrix.

### 5. **Rail Fence Cipher**
A transposition cipher that arranges the text in a zigzag pattern across multiple rails.

### 6. **Transposition Cipher**
A cipher where the positions of characters in the plaintext are rearranged based on a key.

### 7. **Affine Cipher**
A substitution cipher where each letter is encrypted using a mathematical function involving two keys.

### 8. **Substitution Cipher**
A cipher that replaces each letter in the plaintext with a corresponding letter from a custom alphabet key.

## How to Use

1. **Select the Algorithm**: Choose the cipher algorithm you want to use from the dropdown list.
2. **Enter the Text**: Type the text you want to encrypt or decrypt in the text input box.
3. **Provide the Key**: Enter the key for the selected algorithm (e.g., a number for Caesar cipher or a word for Vigenère cipher).
4. **Choose Action**: Select whether you want to "Encrypt" or "Decrypt" the text.
5. **View the Output**: Click the "Process" button to see the result. The output will be displayed in the output box.

### Example Usage

- **Caesar Cipher**:  
  - Action: Encrypt  
  - Text: `HELLO`  
  - Key: `3`  
  - Output: `KHOOR`

- **Vigenère Cipher**:  
  - Action: Decrypt  
  - Text: `LXFOPVEFRNHR`  
  - Key: `KEY`  
  - Output: `ATTACKATDAWN`

## Error Handling

- If the **text input** is empty, an error message prompts the user to provide text.
- The **key** must meet specific criteria for each algorithm, and the tool will notify the user if the key is invalid. For example:
  - For the **Caesar cipher**, the key must be a number between -25 and 25.
  - For the **Vigenère cipher**, the key must be a string of alphabetic characters.
  - For the **Affine cipher**, the key must be in the format `a,b` (e.g., `5,8`).

## Example of the Key Format

- **Caesar Cipher**: A number between -25 and 25.
- **Vigenère Cipher**: A string of alphabetic characters.
- **Affine Cipher**: A string in the format `'a,b'` (e.g., `5,8`).
- **Monoalphabetic Substitution Cipher**: A string with exactly 26 unique letters.

## Conclusion

This cryptography tool provides an easy-to-use interface for experimenting with classical encryption techniques. Whether you're learning about cryptography or need a quick way to encode or decode messages, this tool covers a wide range of cipher algorithms. The built-in error handling ensures that the process remains smooth, and the tool is lightweight and easy to use in any modern web browser.

You can access the live version of the tool at [encryption-decryption.surge.sh](https://encryption-decryption.surge.sh/).
