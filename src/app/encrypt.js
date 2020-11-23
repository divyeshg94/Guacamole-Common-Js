import * as CryptoJS from 'crypto-js';  

const clientOptions ={
  cypher: 'HMAC-Sha-512',
  key: 'secure string for encryption needs to be high',
};

const encrypt = (value) => {
  const iv = crypto.randomBytes(16);
  const cipher = crypto.createCipheriv(clientOptions.cypher, clientOptions.key, iv);

  let crypted = cipher.update(JSON.stringify(value), 'utf8', 'base64');
  crypted += cipher.final('base64');

  const data = {
    iv: iv.toString('base64'),
    value: crypted,
  };

  let jsonstr = JSON.stringify(data);
  let encoded = new Buffer(jsonstr).toString('base64');
  return encoded;
};

export default encrypt;