/*
 * @Author: your name
 * @Date: 2021-07-28 17:19:02
 * @LastEditTime: 2021-08-07 23:18:57
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \phone-ui\src\utils\jsencrypt.js
 */
import JSEncrypt from 'jsencrypt/bin/jsencrypt'

// 密钥对生成 http://web.chacuo.net/netrsakeypair

const publicKey = 'MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQCpCwL/mbVNIL+SPdMw+Nxj5MNDoY0S4wkqKS3rs/4/ep6vel1aM4D7XgjNN/eS/+svqseWNFkq7zHUNHsMEM36pzZLfc/FGjs4KahuOSiNgRWA0TzwX0lJLm6En1xckLBk07or973igFfMN1QhrT2U3VA9or8oYetuFl4EaDqbJwIDAQAB'

const privateKey = 'MIICWwIBAAKBgQCpCwL/mbVNIL+SPdMw+Nxj5MNDoY0S4wkqKS3rs/4/ep6vel1aM4D7XgjNN/eS/+svqseWNFkq7zHUNHsMEM36pzZLfc/FGjs4KahuOSiNgRWA0TzwX0lJLm6En1xckLBk07or973igFfMN1QhrT2U3VA9or8oYetuFl4EaDqbJwIDAQABAoGAAUYX9/+RcPJsEtPil4VrA7vXuSWDHWaM4PmvFCHEUjzniYVvwvS0tQjRSgH64XVPTtilXySxiIys4K4FymxBElDYI3qvhm5YXbqnAaBMxvEDU9x/P+Uyz1m9BbS4elLQ5+k+kNicTEO5DaT/DmFEI66YTYKlwMa8U98/XoFS0mECQQC6SR3Qtftd3HrmW3rQEoh0eN8xyYT+AFkQrpkQcNTufc44UaW591pXXkNvvaB/qUQMJ017paMUuFXbvj9taYztAkEA6E381xZWkCx1Ms9HWVNXszszf4huBM6ieUUSsI8yBz4YH8lf6M5fUR++bRs217zQ6jWkxi+C+YbqrBqiU+2Z4wJAajVHp3gqEZCkDXQ4qCr425cSgbtIdNzT6tvw7tu1uyfFDH0YhNePDWL0BeBSgpaJ8nfyCD4epbCXWwqz9PiJ3QJAZ1nTBEo+5tOwrJNFVftbSDUtey7Sa7cW18cgQobiphA9IV8xGV0/UNNDoDz8UE0D0T9eeIHIzoT0wO70i0xpKwJAFqe6+dDnEnayy/+6DBTZhH/jgVVvlXh7KoIYFJ/6oaus6CVfFfmkrw62zM3uxFziMz43f0rHVkH3rfQFSJ8f7A=='

// 加密
export function encrypt(txt) {
  const encryptor = new JSEncrypt()
  encryptor.setPublicKey(publicKey) // 设置公钥
  return encryptor.encrypt(txt) // 对需要加密的数据进行加密
}

// 解密
export function decrypt(txt) {
  const encryptor = new JSEncrypt()
  encryptor.setPrivateKey(privateKey)
  return encryptor.decrypt(txt)
}

