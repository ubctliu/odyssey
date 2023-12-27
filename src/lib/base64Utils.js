const Buffer = require('buffer').Buffer;

export const base64ToString = (data) => Buffer.from(data, 'base64').toString('ascii');

export const stringToBase64 = (str) => Buffer.from(str).toString('base64');

