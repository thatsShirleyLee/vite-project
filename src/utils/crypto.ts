import CryptoJS from 'crypto-js'

const SECRET_KEY = 'your-unique-secret-key' // 设置安全的秘钥

// 加密函数
export function encryptData(data) {
  return CryptoJS.AES.encrypt(JSON.stringify(data), SECRET_KEY).toString()
}

// 解密函数
export function decryptData(cipherText) {
  const bytes = CryptoJS.AES.decrypt(cipherText, SECRET_KEY)
  return JSON.parse(bytes.toString(CryptoJS.enc.Utf8))
}
