import Mock from 'mockjs'
import {builder} from '../util/builder'
import data from "../data/auth"

Mock.mock(/\/auth\/login/, (res) => {
    return builder(data.login)
});

Mock.mock(/\/auth\/logout/, (res) => {
    return builder()
});

Mock.mock(/\/auth\/profile\/resource/, (res) => {
    return builder(data.profileResource)
});

Mock.mock(/\/auth\/role/, (res) => {
    return builder(data.role)
});




