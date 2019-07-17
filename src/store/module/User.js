/*
 * @Author: fengchaoran 
 * @Date: 2019-02-27 11:17:53 
 * @Last Modified by: fengchaoran
 * @Last Modified time: 2019-02-27 14:46:22
 * 用户数据
 */

export default {
  state: {
    currentMenu: {}
  },
  mutations: {
    setCurrentMenu(state, value) {
      state.currentMenu = value;
    }
  }
}