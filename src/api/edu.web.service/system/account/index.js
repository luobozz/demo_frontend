import axios from '../../../axiosApi'
import url from '../../urls'

const header = {}
export default {
    heartbeat(){
        return axios.post(url.system.account+"/heartbeat", header, {},{noToast: {all:true}});
    },
    login(data){
        return axios.post(url.system.account+"/login", header,data,{noToast:{success:true}});
    },
    logout(data){
        return axios.post(url.system.account+"/logout", header,data,{noToast:{all:true}});
    },
    getAccount(data) {
        return axios.get(url.system.account, header, data)
    },
    addAccount(data){
        return axios.post(url.system.account, header,data);
    },
    editAccount(data){
        return axios.put(url.system.account, header, data);
    },
    deleteAccount(data){
        return axios.delete(url.system.account, header, data);
    },
    getRole(data) {
        return axios.get(url.system.account+"/role", header, data)
    },
    getRoleRoute(data) {
        return axios.get(url.system.account+"/role/route", header, data,{noToast: {all:true}})
    },
    getRoleRoutePermission(data) {
        return axios.get(url.system.account+"/role/route/permission", header, data,{noToast: {all:true}})
    },
    addRole(data){
        return axios.post(url.system.account+"/role", header,data);
    },
    editRole(data){
        return axios.put(url.system.account+"/role", header, data);
    },
    editRoleRoutePermission(data) {
        return axios.put(url.system.account+"/role/route/permission", header, data)
    },
    deleteRole(data){
        return axios.delete(url.system.account+"/role", header, data);
    },
    getRoute(data) {
        return axios.get(url.system.account+"/route", header, data)
    },
    getRouteGlobal(data) {
        return axios.get(url.system.account+"/route/global", header, data,{noToast: {all:true}})
    },
    getRoutePermission(data) {
        return axios.get(url.system.account+"/route/permission", header, data,{noToast: {all:true}})
    },
    addRoute(data){
        return axios.post(url.system.account+"/route", header,data);
    },
    editRoute(data){
        return axios.put(url.system.account+"/route", header, data);
    },
    editRoutePermission(data){
        return axios.put(url.system.account+"/route/permission", header, data);
    },
    deleteRoute(data){
        return axios.delete(url.system.account+"/route", header, data);
    },
    getPermission(data) {
        return axios.get(url.system.account+"/permission", header, data)
    },
    getPermissionGlobal(data) {
        return axios.get(url.system.account+"/permission/global", header, data)
    },
    addPermission(data){
        return axios.post(url.system.account+"/permission", header,data);
    },
    editPermission(data){
        return axios.put(url.system.account+"/permission", header, data);
    },
    deletePermission(data){
        return axios.delete(url.system.account+"/permission", header, data);
    },

}
