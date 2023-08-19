/*
 * @Author: your name
 * @Date: 2021-08-06 11:45:49
 * @LastEditTime: 2021-08-07 21:11:54
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \dzzhkh-ui\src\api\index.js
 */
import request from '@/utils/request'
// 获取用户数据： url: /jwjd/phone / user / getUserInfo
//params:
//code :0000,1111,2222,3333
/* /wx/getWxToken	获取当前登录用户		 post 方法
参数	 code	 测试穿 1	必须
	state		非必须
	yqzOpenid	邀请人openid	非必须 */
export function getUserInfo(data) {
    return request({
        method: "get",
        url: "/wx/getWxToken",
        params: data
    })
}

//抽纸条放纸条
/* openid					
 type	0-单抽，1-5 抽，2-10 抽，3-放纸条	  必须
 sex	    性别				            必须
 xx	        学校				            必须
 phone	    联系方式				        放纸条必须
 img	    图片地址				        放纸条必须
 content	内容				           放纸条必须 */
export function prePay(data) {
    return request({
        method: "post",
        url: "/wx/jsapi/prepay",
        data: data
    })
}

// 上传文件 
/* 参数	 file	 文件
返回	 文件 url 地址	 */
export function uploadImg(data) {
    return request({
        method: "post",
        url: "/wx/upload",
        data: data,
    })
}

//放纸条列表
/* 参数	 oepnid	测试传 openid */
export function getCrList(data) {
    return request({
        method: "get",
        url: "/wx/crlist",
        params: data
    })
}

//取纸条列表
/* 参数	openid	测试传 openid */
export function getCqList(data) {
    return request({
        method: "get",
        url: "/wx/cqlist",
        params: data
    })
}

/* 接口路径		
/wx/getXX	获取学校列表	
参数	name	非必须，模糊查询 */
export function getXX(data) {
    return request({
        method: "get",
        url: "/wx/getXX",
        params: data
    })
}
