/*
 * @Author: your name
 * @Date: 2021-08-06 11:45:49
 * @LastEditTime: 2021-08-11 17:28:08
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \dzzhkh-ui\src\utils\auth.js
 */
import Cookies from 'js-cookie'

const TokenKey = 'Admin-Token'

export function getToken() {
  return Cookies.get(TokenKey)
}

export function setToken(token) {
  return Cookies.set(TokenKey, token)
}

export function removeToken() {
  return Cookies.remove(TokenKey)
}

// 构造网页授权链接
export function redirectUri(url) {
  let appid = "wxa12e0c48eaa034cb";//企业的CorpID
  let redirect_uri = encodeURIComponent(url) ;//授权后重定向的回调链接地址，请使用urlencode对链接进行处理
  let response_type = "code";//返回类型，此时固定为：code
  let scope = 'snsapi_userinfo';//应用授权作用域。企业自建应用固定填写：snsapi_base
  /*   假定当前企业CorpID：wxCorpId
      访问链接：http://api.3dept.com/cgi-bin/query?action=get
      根据URL规范，将上述参数分别进行UrlEncode，得到拼接的OAuth2链接为： 
      https://open.weixin.qq.com/connect/oauth2/authorize?appid=wxa12e0c48eaa034cb&redirect_uri=https%3A%2F%2Fsyllpt.mynatapp.cc%2Fdzkh-ui%2Fh5%2F%23%2Findex%3Fchannel%3D2222222&response_type=code&scope=snsapi_base&state=#wechat_redirect*/
  
  return `https://open.weixin.qq.com/connect/oauth2/authorize?appid=${appid}&redirect_uri=${redirect_uri}&response_type=${response_type}&scope=${scope}&state=#wechat_redirect`;
}