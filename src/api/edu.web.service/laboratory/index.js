import axios from '../../axiosApi'
import url from '../urls'

const header = {}
export default {
    getLaboratory(data) {
        return axios.get(url.laboratory, header, data)
    },
    addLaboratory(data) {
        return axios.post(url.laboratory, header, data);
    },
    editLaboratory(data) {
        return axios.put(url.laboratory, header, data);
    },
    deleteLaboratory(data) {
        return axios.delete(url.laboratory, header, data);
    },
    getSubscribeRecordCalendar(data) {
        return axios.get(url.laboratory + "/subscribe/record/calendar", header, data)
    },
    getSubscribeRecordAccount(data) {
        return axios.get(url.laboratory + "/subscribe/record/account", header, data)
    },
    getSubscribeRecordAll(data) {
        return axios.get(url.laboratory + "/subscribe/record/all", header, data)
    },
    addSubscribeRecord(data) {
        return axios.post(url.laboratory + "/subscribe/record", header, data)
    },
    editSubscribeRecord(data) {
        return axios.put(url.laboratory + "/subscribe/record", header, data)
    },
    editSubscribeRecordApproval(data) {
        return axios.put(url.laboratory + "/subscribe/record/approval", header, data)
    },
    getCaptureDevice(data) {
        return axios.get(url.laboratory + "/captureDevice", header, data)
    },
    getCaptureDeviceLiveStream(data) {
        return axios.get(url.laboratory + "/captureDevice/live/stream", header, data, {noToast: {all: true}})
    },
    addCaptureDevice(data) {
        return axios.post(url.laboratory + "/captureDevice", header, data);
    },
    captureDevicePsmReAdd(data) {
        return axios.post(url.laboratory + "/captureDevice/psm/re/add", header, data);
    },
    editCaptureDevice(data) {
        return axios.put(url.laboratory + "/captureDevice", header, data);
    },
    deleteCaptureDevice(data) {
        return axios.delete(url.laboratory + "/captureDevice", header, data);
    },
    getVideo(data) {
        return axios.get(url.laboratory + "/video", header, data)
    },
    getVideoStar(data) {
        return axios.get(url.laboratory + "/video/star", header, data)
    },
    addVideoViews(data) {
        return axios.post(url.laboratory + "/video/views", header, data,{noToast: {all: true}});
    },
    addVideo(data) {
        return axios.post(url.laboratory + "/video", header, data);
    },
    addVideoStar(data) {
        return axios.post(url.laboratory + "/video/star", header, data)
    },
    editVideo(data) {
        return axios.put(url.laboratory + "/video", header, data);
    },
    deleteVideo(data) {
        return axios.delete(url.laboratory + "/video", header, data);
    },
    getRegulations(data) {
        return axios.get(url.laboratory + "/regulations", header, data)
    },
    getRegulation(data) {
        return axios.get(url.laboratory + "/regulation", header, data)
    },
    addRegulation(data) {
        return axios.post(url.laboratory + "/regulation", header, data);
    },
    addRegulationViews(data) {
        return axios.post(url.laboratory + "/regulation/views", header, data,{noToast: {all: true}});
    },
    editRegulation(data) {
        return axios.put(url.laboratory + "/regulation", header, data);
    },
    deleteRegulation(data) {
        return axios.delete(url.laboratory + "/regulation", header, data);
    },
    getSubjects(data) {
        return axios.get(url.laboratory + "/subjects", header, data)
    },
    getSubject(data) {
        return axios.get(url.laboratory + "/subject", header, data)
    },
    addSubject(data) {
        return axios.post(url.laboratory + "/subject", header, data);
    },
    editSubject(data) {
        return axios.put(url.laboratory + "/subject", header, data);
    },
    deleteSubject(data) {
        return axios.delete(url.laboratory + "/subject", header, data);
    },
    getCourse(data) {
        return axios.get(url.laboratory + "/courses", header, data)
    },
    addCourse(data) {
        return axios.post(url.laboratory + "/course", header, data);
    },
    editCourse(data) {
        return axios.put(url.laboratory + "/course", header, data);
    },
    deleteCourse(data) {
        return axios.delete(url.laboratory + "/course", header, data);
    },
    getStudentList(data) {
        return axios.get(url.laboratory + "/getStudentList", header, data)
    },
    getReportScore(data) {
        return axios.get(url.laboratory + "/score", header, data)
    },
    addReportScore(data) {
        return axios.post(url.laboratory + "/score", header, data)
    },
    editReportScore(data) {
        return axios.put(url.laboratory + "/score", header, data)
    },
    getLaboratoryRecord(data) {
        return axios.get(url.laboratory + "/record", header, data)
    },
    editLaboratoryRecord(data) {
        return axios.put(url.laboratory + "/record", header, data)
    }
}
