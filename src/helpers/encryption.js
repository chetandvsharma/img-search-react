import { Types, isValidObjectId } from 'mongoose';
import AES from 'crypto-js/aes.js';
import Utf8 from 'crypto-js/enc-utf8.js';

function checkValidMongoID(id) {
  let output;
  if (isValidObjectId(id)) {
    output = { string: id.toString(), id: Types.ObjectId(id) };
  } else {
    output = false;
  }
  return output;
}

function createMongoID(id = '') {
  let newID;
  if (!id) {
    newID = new Types.ObjectId();
  } else if (id && checkValidMongoID(id)) {
    newID = new Types.ObjectId(id);
  } else {
    newID = false;
  }
  return newID;
}

export const MongoID = {
  checkValidMongoID,
  createMongoID,
};

export function createRandomKeyFromId(string) {
  let output = '';

  for (let i = 0; i <= 31; i += 1) {
    const randomNess = Math.floor(Math.random() * string.length);
    output += string[randomNess];
  }

  return output;
}

export function createInductionVector(string) {
  const output = [];
  for (let i = 0; i <= 15; i += 1) {
    if (i % 2 === 0) {
      output.push(string[i]);
    } else {
      output.unshift(string[i]);
    }
  }

  const jumbled = output.join('');
  let reversed = '';
  for (let i = jumbled.length - 1; i >= 0; i -= 1) {
    reversed += jumbled[i];
  }

  return reversed;
}

/* 
// const cipher = AES.encrypt(new Types.ObjectId().toString(), 'TEST', {
//   iv: '748596ad51236547',
// });

// console.log(cipher.toString());

// const decipher = AES.decrypt(cipher, 'TEST', {
//   iv: '748596ad51236547',
// });

// console.log(decipher.toString(UTF8));

import SearchBar from './SearchBar';
import { Types } from 'mongoose';
import AES from 'crypto-js/aes';
import UTF8 from 'crypto-js/enc-utf8';
*/
