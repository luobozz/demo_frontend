import httpConfig from '../../config/http.config'

export default {
    system: {
        account: `${httpConfig.url.apiUrl}sys/account`,
        message: `${httpConfig.url.apiUrl}sys/msg`
    },
    resources: `${httpConfig.url.apiUrl}res`,
    classCollective: `${httpConfig.url.apiUrl}class-collective`,
    student: `${httpConfig.url.apiUrl}student`,
    laboratory: `${httpConfig.url.apiUrl}laboratory`,
    labUseBook: `${httpConfig.url.apiUrl}labUseBook`,
    educationRecord: `${httpConfig.url.apiUrl}educationRecord`,
    teacher: `${httpConfig.url.apiUrl}teacher`,
    psm: `${httpConfig.url.apiUrl}psm`,
}