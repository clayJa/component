import qs from 'qs';
import { axiosGet, axiosPost, axiosDelete, axiosPut } from './httpHelp';
import config from '../utils/config';

const API_ROOT = '/api/hz-navigation';
const serviceNum = 'dfaba2cf-20e8-4736-b64e-e6d608fb5914';

export const roleList = userId => axiosGet(`${config.roleApi}/api/${serviceNum}/getRoles?userId=${userId}`);
/**
 * 获取用户登录信息
 * @param token 登录access_token
 */
export const loginUserInfo = token => axiosGet(`${config.userApi}/hz-auth-center/auth/user/me/getDetailInfo?access_token=${token}`);

/**
 * 登出
 */
export const loginOut = token => axiosGet(`${config.userApi}/hz-auth-center/logout?access_token=${token}`);

/**
 * 获取分类列表
 *
 */
export const getSortList = params => axiosGet(`${API_ROOT}/category/listAll?${qs.stringify(params)}`);
/**
 * 调整分类排序
 *
 */
export const reOrderList = params => axiosPost(`${API_ROOT}/category/setCategoryOrder`, params);
/**
 * 删除分类
 *
 */
export const deleteSort = id => axiosPost(`${API_ROOT}/category/delete?id=${id}`);
/**
 * 新增、修改分类
 *
 */
export const operateSort = params => axiosPost(`${API_ROOT}/category/operate`, params);
/**
 * 校验分类名称
 *
 */
export const validSortName = name => axiosGet(`${API_ROOT}/category/name/valid?name=${name}`);
/**
 * 获取应用列表
 *
 */
export const getAppList = params => axiosPost(`${API_ROOT}/app/list`, params);
/**
 * 新增应用
 *
 */
export const addApp = params => axiosPost(`${API_ROOT}/app`, params);
/**
 * 修改应用
 *
 */
export const editApp = params => axiosPut(`${API_ROOT}/app`, params);
/**
 * 删除应用
 *
 */
export const deleteApp = appIds => axiosDelete(`${API_ROOT}/app?${qs.stringify(appIds)}`);
/**
 * 调整应用排序
 *
 */
export const orderApp = params => axiosPost(`${API_ROOT}/app/order?${qs.stringify(params)}`);
/**
 * 调整应用所属分类
 *
 */
export const classify = params => axiosPost(`${API_ROOT}/app/classify`, params);
/**
 * 用户访问列表
 *
 */
export const visitList = params => axiosPost(`${API_ROOT}/record/listAll`, params);
/**
 * 用户登录列表
 *
 */
export const loginList = params => axiosPost(`${API_ROOT}/loginRecord/listAll`, params);
