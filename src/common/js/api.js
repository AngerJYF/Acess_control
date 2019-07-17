/**
 * api接口统一管理
 * by fengyang
 */
import {
  post, get, postFormData, header, postValidateFormData, postUserInfo, postValidate, getMemory
} from './http';

export const rootPath = '/lensAiPlat';

console.log('rootPath', header.rootPath);
console.log('NlpPath', header.NlpPath);
console.log('OAuthManger', header.OAuthManger);
console.log('OAuthUser', header.OAuthUser);
console.log('OAuthLoginOut', header.OAuthLoginOut);
console.log('downLoadUrl', header.downLoadUrl);


//发布
export const apiDeployModelForNlp = params => post(header.rootPath + '/lensAiModelDeploy/deployModelForNlp', params);


//oauth2
export const apiGetCode = params => window.location.href = header.OAuthManger + '/OAuthServer/getCode?redirectUrl=' + params;
//用户信息
export const apiGetUserInfo = params => postUserInfo(header.OAuthUser + '/user/getUserInfo', params);
//登陆
export const apiLogin = params => window.location.href = header.OAuthManger + '/authMgr/?redirectUrl=' + params + '?type=login';
//退出
export const apiLoginOut = params => {
  window.location.href = header.OAuthLoginOut + '/logout?redirect_uri=' + window.location.origin + window.location.pathname + '&access_token=' + window.localStorage.getItem('token');
}






