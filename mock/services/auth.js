import Mock from 'mockjs'
import {builder} from '../util/builder'
import data from "../data/auth"

Mock.mock(/\/auth\/login/, builder((() => {
    return data.login
})()));

// Mock.mock(/\/auth\/profile\/resource/, builder((() => {
//     return data.profileResource
// })()));

// Mock.mock(/\/auth\/role/, builder((() => {
//     return data.role
// })()));



