import CryptoJS from 'crypto-js'

// AES加密和解密
const SECRET_KEY = import.meta.env.VITE_AES_KEY || '' // 16位安全的秘钥

// 加密函数
export function encryptData(data: any) {
  if (!data) return ''
  return CryptoJS.AES.encrypt(JSON.stringify(data), SECRET_KEY).toString()
}

// 解密函数
export function decryptData(cipherText: any) {
  if (!cipherText) return ''
  const bytes = CryptoJS.AES.decrypt(cipherText, SECRET_KEY)
  return JSON.parse(bytes.toString(CryptoJS.enc.Utf8))
}
