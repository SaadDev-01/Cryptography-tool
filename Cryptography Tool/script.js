// Process the selected algorithm and perform encryption or decryption
function processText() {
  const action = document.getElementById("action").value; // Encrypt or Decrypt
  const text = document.getElementById("text").value.trim();
  const algorithm = document.getElementById("algorithm").value;
  const key = document.getElementById("key").value.trim();
  let output = "";

  try {
      if (text === "") throw new Error("Please enter the text to process.");
      if (key === "" && algorithm !== "monoalphabetic") throw new Error("Please enter a key.");

      switch (algorithm) {
          case "caesar":
              const shift = parseInt(key);
              if (isNaN(shift) || shift < -25 || shift > 25) {
                  throw new Error("Caesar cipher key must be a number between -25 and 25.");
              }
              output = action === "encrypt" ? caesarEncrypt(text, shift) : caesarDecrypt(text, shift);
              break;

          case "monoalphabetic":
              output = action === "encrypt" ? monoalphabeticEncrypt(text) : monoalphabeticDecrypt(text);
              break;

          case "vigenere":
              if (!/^[A-Za-z]+$/.test(key)) throw new Error("Vigenère cipher key must contain only letters.");
              output = action === "encrypt" ? vigenereEncrypt(text, key) : vigenereDecrypt(text, key);
              break;

          case "playfair":
              if (!/^[A-Za-z]+$/.test(key)) throw new Error("Playfair cipher key must contain only letters.");
              output = action === "encrypt" ? playfairEncrypt(text, key) : playfairDecrypt(text, key);
              break;

          case "rail":
              const rails = parseInt(key);
              if (isNaN(rails) || rails < 2) throw new Error("Rail fence cipher key must be a number greater than 1.");
              output = action === "encrypt" ? railEncrypt(text, rails) : railDecrypt(text, rails);
              break;

          case "transposition":
              const numColumns = parseInt(key);
              if (isNaN(numColumns) || numColumns < 2) {
                  throw new Error("Transposition cipher key must be a number greater than 1.");
              }
              output = action === "encrypt" ? transpositionEncrypt(text, numColumns) : transpositionDecrypt(text, numColumns);
              break;

          case "affine":
              if (!/^\d+,\d+$/.test(key)) throw new Error("Affine cipher key must be in format 'a,b' (e.g., '5,8').");
              output = action === "encrypt" ? affineEncrypt(text, key) : affineDecrypt(text, key);
              break;

          case "substitution":
              if (key.length !== 26 || !/^[A-Za-z]+$/.test(key) || new Set(key.toLowerCase()).size !== 26) {
                  throw new Error("Substitution cipher key must be 26 unique letters.");
              }
              output = action === "encrypt" ? substitutionEncrypt(text, key) : substitutionDecrypt(text, key);
              break;

          default:
              throw new Error("Please select a valid algorithm.");
      }
  } catch (error) {
      output = `Error: ${error.message}`;
  }

  document.getElementById("output").value = output;
}

// Caesar Cipher
function caesarEncrypt(text, shift) {
  return text.split("").map((char) => {
      if (char.match(/[a-z]/i)) {
          const base = char < "a" ? 65 : 97; // Uppercase or lowercase base
          return String.fromCharCode(((char.charCodeAt(0) - base + shift + 26) % 26) + base);  // Add 26 to ensure positive results
      }
      return char;
  }).join("");
}

function caesarDecrypt(text, shift) {
  return text.split("").map((char) => {
      if (char.match(/[a-z]/i)) {
          const base = char < "a" ? 65 : 97;
          return String.fromCharCode(((char.charCodeAt(0) - base - shift + 26) % 26) + base);  // Add 26 to ensure positive results
      }
      return char;
  }).join("");
}

// Monoalphabetic Cipher - Encryption
function monoalphabeticEncrypt(text) {
  const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  let key = document.getElementById("key").value.trim().toUpperCase();
  if (key === "") {
      key = "QWERTYUIOPLKJHGFDSAZXCVBNM"; // Default key if not provided
  }

  // Ensure the key is valid: must have 26 unique characters
  if (new Set(key.split("")).size !== 26 || key.length !== 26) {
      throw new Error("The substitution key must be exactly 26 unique letters.");
  }

  return text.split("").map((char) => {
      if (char.match(/[a-zA-Z]/)) {
          const isUpper = char === char.toUpperCase();
          const charIndex = alphabet.indexOf(char.toUpperCase());
          const encryptedChar = key[charIndex];
          return isUpper ? encryptedChar : encryptedChar.toLowerCase();
      }
      return char;
  }).join("");
}

// Monoalphabetic Cipher - Decryption
function monoalphabeticDecrypt(text) {
  const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  let key = document.getElementById("key").value.trim().toUpperCase();
  if (key === "") {
      key = "QWERTYUIOPLKJHGFDSAZXCVBNM"; // Default key if not provided
  }

  // Ensure the key is valid: must have 26 unique characters
  if (new Set(key.split("")).size !== 26 || key.length !== 26) {
      throw new Error("The substitution key must be exactly 26 unique letters.");
  }

  // Create reverse key mapping
  const reverseKey = alphabet.split("").reduce((obj, letter, index) => {
      obj[key[index]] = letter;
      return obj;
  }, {});

  return text.split("").map((char) => {
      if (char.match(/[a-zA-Z]/)) {
          const isUpper = char === char.toUpperCase();
          const decryptedChar = reverseKey[char.toUpperCase()];
          return isUpper ? decryptedChar : decryptedChar.toLowerCase();
      }
      return char;
  }).join("");
}


// Vigenère Cipher
function vigenereEncrypt(text, key) {
  let result = "";
  key = key.toUpperCase(); // Key should be in uppercase
  for (let i = 0, j = 0; i < text.length; i++) {
      const char = text[i];
      if (char.match(/[a-zA-Z]/)) {  // Only process alphabetic characters
          const base = char === char.toUpperCase() ? 65 : 97;
          const keyChar = key[j % key.length];
          const keyShift = keyChar.charCodeAt(0) - 65;
          result += String.fromCharCode(((char.charCodeAt(0) - base + keyShift) % 26) + base);
          j++;  // Move to the next character in the key
      } else {
          result += char;  // Keep non-alphabetic characters unchanged
      }
  }
  return result;
}

function vigenereDecrypt(text, key) {
  let result = "";
  key = key.toUpperCase();
  for (let i = 0, j = 0; i < text.length; i++) {
      const char = text[i];
      if (char.match(/[a-zA-Z]/)) {
          const base = char === char.toUpperCase() ? 65 : 97;
          const keyChar = key[j % key.length];
          const keyShift = keyChar.charCodeAt(0) - 65;
          result += String.fromCharCode(((char.charCodeAt(0) - base - keyShift + 26) % 26) + base);
          j++;
      } else {
          result += char;
      }
  }
  return result;
}

// Playfair Cipher
function generatePlayfairKeyMatrix(key) {
  const alphabet = "ABCDEFGHIKLMNOPQRSTUVWXYZ"; // J is omitted
  key = key.toUpperCase().replace(/J/g, "I");
  const uniqueKey = Array.from(new Set(key + alphabet)).join("");

  const matrix = [];
  for (let i = 0; i < 25; i += 5) {
      matrix.push(uniqueKey.slice(i, i + 5).split(""));
  }
  return matrix;
}

function findPosition(matrix, char) {
  for (let row = 0; row < 5; row++) {
      for (let col = 0; col < 5; col++) {
          if (matrix[row][col] === char) return { row, col };
      }
  }
}

function playfairEncrypt(text, key) {
  const matrix = generatePlayfairKeyMatrix(key);
  text = text.toUpperCase().replace(/J/g, "I").replace(/[^A-Z]/g, "");

  const pairs = [];
  for (let i = 0; i < text.length; i += 2) {
      const char1 = text[i];
      let char2 = text[i + 1] || "X";
      if (char1 === char2) char2 = "X";
      pairs.push([char1, char2]);
  }

  let result = "";
  pairs.forEach(([char1, char2]) => {
      const pos1 = findPosition(matrix, char1);
      const pos2 = findPosition(matrix, char2);

      if (pos1.row === pos2.row) {
          result += matrix[pos1.row][(pos1.col + 1) % 5];
          result += matrix[pos2.row][(pos2.col + 1) % 5];
      } else if (pos1.col === pos2.col) {
          result += matrix[(pos1.row + 1) % 5][pos1.col];
          result += matrix[(pos2.row + 1) % 5][pos2.col];
      } else {
          result += matrix[pos1.row][pos2.col];
          result += matrix[pos2.row][pos1.col];
      }
  });

  return result;
}

function playfairDecrypt(text, key) {
  const matrix = generatePlayfairKeyMatrix(key);
  const pairs = [];
  for (let i = 0; i < text.length; i += 2) {
      pairs.push([text[i], text[i + 1]]);
  }

  let result = "";
  pairs.forEach(([char1, char2]) => {
      const pos1 = findPosition(matrix, char1);
      const pos2 = findPosition(matrix, char2);

      if (pos1.row === pos2.row) {
          result += matrix[pos1.row][(pos1.col + 4) % 5];
          result += matrix[pos2.row][(pos2.col + 4) % 5];
      } else if (pos1.col === pos2.col) {
          result += matrix[(pos1.row + 4) % 5][pos1.col];
          result += matrix[(pos2.row + 4) % 5][pos2.col];
      } else {
          result += matrix[pos1.row][pos2.col];
          result += matrix[pos2.row][pos1.col];
      }
  });

  return result;
}

// Rail Fence Cipher
function railEncrypt(text, rails) {
    const fence = Array.from({ length: rails }, () => []);
    let directionDown = true, row = 0;

    // Fill the fence by placing each character in the appropriate rail
    text.split("").forEach((char) => {
        fence[row].push(char);
        if (row === 0) directionDown = true;
        else if (row === rails - 1) directionDown = false;
        row += directionDown ? 1 : -1;
    });

    // Join the characters from all rails to get the ciphertext
    return fence.flat().join("");
}

function railDecrypt(text, rails) {
    const fence = Array.from({ length: rails }, () => []);
    let directionDown = true, row = 0, index = 0;

    // Step 1: Create the fence with placeholders to mark the positions
    // We just create an empty structure first to determine the positions of characters
    text.split("").forEach(() => {
        fence[row].push("*");
        if (row === 0) directionDown = true;
        else if (row === rails - 1) directionDown = false;
        row += directionDown ? 1 : -1;
    });

    // Step 2: Now fill the fence with the actual characters from the ciphertext
    // We use a character index to assign them
    for (let r = 0; r < rails; r++) {
        for (let i = 0; i < fence[r].length; i++) {
            if (fence[r][i] === "*") {
                fence[r][i] = text[index++];
            }
        }
    }

    // Step 3: Reconstruct the plaintext by reading the fence in zigzag order
    let result = "";
    row = 0;
    directionDown = true;
    for (let i = 0; i < text.length; i++) {
        result += fence[row].shift(); 
        if (row === 0) directionDown = true;
        else if (row === rails - 1) directionDown = false;
        row += directionDown ? 1 : -1;
    }

    return result;
}


// Transposition Cipher
function transpositionEncrypt(text, columns) {
  text = text.replace(/\s+/g, "").toUpperCase();
  const rows = Math.ceil(text.length / columns);
  const matrix = Array.from({ length: rows }, (_, i) =>
      text.slice(i * columns, i * columns + columns).split("")
  );

  let result = "";
  for (let col = 0; col < columns; col++) {
      for (let row = 0; row < rows; row++) {
          result += matrix[row][col] || "";
      }
  }

  return result;
}

function transpositionDecrypt(text, columns) {
  text = text.replace(/\s+/g, "").toUpperCase();
  const rows = Math.ceil(text.length / columns);
  const filledCells = text.length % columns || columns;

  const matrix = Array.from({ length: rows }, () => []);
  let index = 0;

  for (let col = 0; col < columns; col++) {
      for (let row = 0; row < rows; row++) {
          if (row === rows - 1 && col >= filledCells) continue;
          matrix[row][col] = text[index++];
      }
  }

  return matrix.flat().join("");
}

// Affine Cipher
function affineEncrypt(text, key) {
  const [a, b] = key.split(",").map(Number);
  if (![1, 3, 5, 7, 9, 11, 15, 17, 19, 21, 23, 25].includes(a)) {
      throw new Error("The 'a' value must be coprime with 26.");
  }

  return text.split("").map((char) => {
      if (char.match(/[a-z]/i)) {
          const base = char === char.toUpperCase() ? 65 : 97;
          const x = char.charCodeAt(0) - base;
          return String.fromCharCode(((a * x + b) % 26) + base);
      }
      return char;
  }).join("");
}

function affineDecrypt(text, key) {
  const [a, b] = key.split(",").map(Number);
  if (![1, 3, 5, 7, 9, 11, 15, 17, 19, 21, 23, 25].includes(a)) {
      throw new Error("The 'a' value must be coprime with 26.");
  }

  let aInverse = 1;
  for (let i = 1; i < 26; i++) {
      if ((a * i) % 26 === 1) {
          aInverse = i;
          break;
      }
  }

  return text.split("").map((char) => {
      if (char.match(/[a-z]/i)) {
          const base = char === char.toUpperCase() ? 65 : 97;
          const y = char.charCodeAt(0) - base;
          return String.fromCharCode(((aInverse * (y - b)) % 26 + 26) % 26 + base);
      }
      return char;
  }).join("");
}

// Substitution Cipher
function substitutionEncrypt(text, key) {
  const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  key = key.toUpperCase();

  return text.split("").map((char) => {
      if (char.match(/[a-z]/i)) {
          const isUpper = char === char.toUpperCase();
          const index = alphabet.indexOf(char.toUpperCase());
          const encrypted = key[index];
          return isUpper ? encrypted : encrypted.toLowerCase();
      }
      return char;
  }).join("");
}

function substitutionDecrypt(text, key) {
  const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  key = key.toUpperCase();

  return text.split("").map((char) => {
      if (char.match(/[a-z]/i)) {
          const isUpper = char === char.toUpperCase();
          const index = key.indexOf(char.toUpperCase());
          const decrypted = alphabet[index];
          return isUpper ? decrypted : decrypted.toLowerCase();
      }
      return char;
  }).join("");
}
