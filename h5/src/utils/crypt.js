/*
 * @Author: your name
 * @Date: 2021-07-28 17:19:02
 * @LastEditTime: 2021-08-06 16:31:59
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \phone-ui\src\utils\crypt.js
 */
// let JSEncrypt = require('./jsencrypt_1.js').JSEncrypt;
import JSEncrypt from 'jsencrypt/bin/jsencrypt'

const publicKey = 'MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQCGkhl7/ENFDm/rbRWZVlpWVCCGXPtrNflPj0q+n1QqFBLmFPcoCOcVId1rLfPBUc7O1VCjUJLRs8y9PbMHIN1im+rYG6zNTDflmGDmCxTuWX6lfPY1YPjsIgRNySv1JGyMBVoBCIOOXYCxVopkUMCn1o2Ym785BVFQ0XnwBnq38QIDAQAB'
/* export function encryptLong(word) {
    console.log('word',word)
    let encryptor = new JSEncrypt();
    encryptor.setPublicKey(publicKey) // 设置公钥
    return encryptor.encryptLong(word) // 对需要加密的数据进行加密
} */
export function encrypt(txt) {
    console.log(typeof (txt + ''))
    const encryptor = new JSEncrypt()
    encryptor.setPublicKey(publicKey) // 设置公钥
    console.log(encryptor.encrypt(txt + ''))
    return encryptor.encrypt(txt) // 对需要加密的数据进行加密
}