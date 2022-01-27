import {mapState} from 'vuex'
import lodash from "lodash";
import regular from "../../utils/data/regular";
import moment from "moment"
import gradeEnum from "@/enums/api/classCollective/gradeEnum";
import exception from "@/utils/exception";


const mixin = {
    data() {
        return {
            systemName: process.env.VUE_APP_TITLE,
            crudList: {
                apis: {},
                defaultConditions: {},
                conditions: {},
                dataList: [],
                data: {},
                subParam: {},
                dataSub: () => {
                },
                loading: false,
                scrollWidth: 1300,
                pagination: {
                    current: 1,
                    defaultPageSize: 10,
                    total: 0,
                    pageSizeOptions: [],
                    showQuickJumper: true,
                    showSizeChanger: false,
                    showTotal: (total, range) => {
                        return `${range[0]}-${range[1]} 共${total}条`
                    },
                    onChange: page => {
                        this.curdPaginationHandle().change(page)
                    },
                    showSizeChange: (current, size) => {
                        // console.log(this.crudList.pagination.defaultPageSize)
                    }
                }
            }
        }
    },
    beforeRouteEnter(to, from, next) {
        next(vm => {
            vm.$router.setPathJob(vm, to)
        })
    },
    mounted() {
        // console.log(this.$route)
    },
    created() {
    },
    computed: {
        ...mapState({
            accountState: state => state.loginStore.account,
        }),
        requiredMsg() {
            return (msg) => {
                return `请填写必须项${msg || ''}!`
            }
        },
        dateYearSection() {
            const momentArr = [];
            for (let i = 0; i < 20; i++) {
                const mmt = moment()
                mmt.add(-i, "year")
                momentArr.push(mmt.year() + "")
            }
            return momentArr
        }
    },
    methods: {
        initCurd(apis, defaultConditions, subParam, createNotInit) {
            this.crudList.apis = apis;
            this.crudList.subParam = subParam || {}
            if (!lodash.isEmpty(defaultConditions)) {
                this.crudList.defaultConditions = lodash.cloneDeep(defaultConditions);
                this.crudList.conditions = lodash.cloneDeep(defaultConditions);
            }
            if (!createNotInit) {
                this.crudBatchHandle().list();
            }
        },
        crudConditionsHandle() {
            const {
                crudList,
            } = this;
            return {
                get: () => {
                    this.crudList.conditions.pageNo = crudList.pagination.current;
                    this.crudList.conditions.maxResults = crudList.pagination.defaultPageSize;
                    return crudList.conditions
                },
                resetPage: () => {
                    this.crudList.pagination.current = 1;
                    this.crudBatchHandle().list();
                },
                reset: () => {
                    this.$set(this.crudList, "conditions", lodash.cloneDeep(this.crudList.defaultConditions));

                    this.crudList.pagination.current = 1;
                    this.crudBatchHandle().list();
                }, subParamHandle: (data, subParam) => {
                    let param = lodash.cloneDeep(data)
                    if (subParam && subParam.length > 0) {
                        param = {}
                        subParam.push("pageNo")
                        subParam.push("maxResults")
                        subParam = Array.from(new Set(subParam))
                        for (let p in subParam) {
                            const key = subParam[p]
                            if (data[key]) {
                                param[key] = data[key]
                            }

                        }
                    }
                    return param;
                }
            }
        },
        curdPaginationHandle() {
            return {
                total: (total) => {
                    this.crudList.pagination.total = total;
                    // TODO 修正动态单页量
                    // const n = total / this.crudList.pagination.defaultPageSize;
                    // const tf = n > 1;
                    // this.crudList.pagination.showQuickJumper = tf;
                    // this.crudList.pagination.showSizeChanger = tf;
                    // this.crudList.pagination.pageSizeOptions = [];
                    // if (tf) {
                    //     const counter = n >= 3 ? 3 : total % this.crudList.pagination.defaultPageSize > 0 ? n + 1 : n;
                    //
                    //     for (let i = 1; i <= counter; i++) {
                    //         this.crudList.pagination.pageSizeOptions.push(i * this.crudList.pagination.defaultPageSize+"一页");
                    //     }
                    // }
                },
                change: (page) => {
                    this.crudList.pagination.current = page
                    this.crudBatchHandle().list();
                },
            }
        },
        crudSingleHandle(record) {
            const {
                crudList,
            } = this;
            const dataSub = (modal, data, way) => {
                modal.switch = true;
                return () => {
                    if (modal.loading === false) {
                        modal.loading = true;
                    }
                    const sub = () => {
                        return new Promise((resolve, reject) => {
                            if (way.do) {
                                let param = this.crudConditionsHandle().subParamHandle(data, way.subParam)
                                way.do(param)?.then((res) => {
                                    resolve(res);
                                    this.crudBatchHandle().list();
                                }).catch((error) => {
                                    reject(error)
                                }).finally(() => {
                                    if (modal.loading) {
                                        modal.loading = false;
                                    }
                                    modal.switch = false;
                                })
                            } else {
                                if (modal.loading) {
                                    modal.loading = false;
                                }
                                modal.switch = false;
                                reject(`No ${way.name} api found!`);
                            }
                        })
                    }
                    return new Promise((resolve, reject) => {
                        if (modal?.form?.ref) {
                            this.$refs[modal.form.ref].validate(valid => {
                                if (valid) {
                                    sub().then((res) => {
                                        resolve(res);
                                    }).catch((error) => {
                                        reject(error)
                                    })
                                } else {
                                    if (modal.loading) {
                                        modal.loading = false;
                                    }
                                    reject("参数验证失败")
                                }
                            })
                        } else {
                            sub().then((res) => {
                                resolve(res);
                            }).catch((error) => {
                                reject(error)
                            })
                        }
                    })
                }

            }

            return {
                add: (modal, data, onOpen) => {
                    if (typeof onOpen === "function") {
                        onOpen();
                    }
                    data = lodash.cloneDeep(data)
                    this.crudList.data = data || {}
                    modal.title = `新增${modal.name}`
                    this.crudList.dataSub = dataSub(modal, data, {
                        do: this.crudList.apis.add,
                        name: `add ${modal.name}`,
                        subParam: this.crudList.subParam.add
                    })
                },
                edit: (modal, data, onOpen) => {
                    if (typeof onOpen === "function") {
                        onOpen();
                    }
                    data = lodash.cloneDeep(data)
                    this.crudList.data = data || {}
                    modal.title = `修改${modal.name}`
                    this.crudList.dataSub = dataSub(modal, data, {
                        do: this.crudList.apis.edit,
                        name: `edit ${modal.name}`,
                        subParam: this.crudList.subParam.edit
                    })
                },
                details: (modal, uuid, onOpen) => {
                    if (typeof onOpen === "function") {
                        onOpen();
                    }
                    modal.title = `查看${modal.name}`
                    modal.switch = true;
                    if (modal.loading === false) {
                        modal.loading = true;
                    }
                    this.crudList.data = {}
                    if (!crudList.apis.details || lodash.isEmpty(uuid)) {
                        this.$util.ui.modalDelayClose(modal, () => {
                        }, {});
                        return;
                    }
                    crudList.apis.details({
                        uuid: uuid
                    }).then((res) => {
                        this.crudList.data = res.data[0] || {};
                    }).finally(() => {
                        if (modal.loading) {
                            modal.loading = false;
                        }
                    })
                },
                delete: (uuid, text) => {
                    this.$util.ui.confirm({
                        content: text || "相关资源将会被删除,请确定",
                        okText: "确认",
                        cancelText: "取消",
                        onOk: () => {
                            if (!this.crudList.apis.delete) {
                                return;
                            }
                            this.crudList.loading = true;
                            this.crudList.apis.delete({
                                uuid: uuid
                            }).then((res) => {
                                this.crudBatchHandle().list();
                            }).catch(e => {
                                this.crudList.loading = false;
                            })
                        },
                    })
                }
            }
        },
        crudBatchHandle(records) {
            const {
                crudList,
                crudConditionsHandle,
                curdPaginationHandle
            } = this;
            return {
                list: () => {
                    if (!crudList.apis.list) {
                        return;
                    }
                    this.crudList.loading = true;
                    let param = this.crudConditionsHandle().subParamHandle(crudConditionsHandle().get(), this.crudList.subParam.list)
                    crudList.apis.list(param).then((res) => {
                        curdPaginationHandle().total(res.total);
                        this.crudList.dataList = res.data;
                    }).finally(() => {
                        this.crudList.loading = false;
                    })
                },
                edit: (records) => {

                }
            }
        },
        curdUploadHandle() {
            let typeList = [], minSize = 2;
            const before = (file) => {
                const checkType = lodash.isEmpty(typeList) || lodash.includes(typeList, file.type);
                if (!checkType) {
                    this.$util.exception.toastError("上传格式不对");
                }
                const checkSize = file.size / 1024 / 1024 < minSize;
                if (!checkSize) {
                    this.$util.exception.toastError("不能上传超大文件");
                }
                return checkType && checkSize;
            }

            const change = (info, modal, prop) => {
                if (info.file.response) {
                    if (info.file.status === 'uploading') {
                        modal.uploading = true;
                        return;
                    } else if (info.file.status === 'done') {
                        const response = info.file.response;
                        this.$util.api.resultHandle(response).then(res => {
                            this.$set(this.crudList.data, prop, res.data[0])
                        }).finally(f => {
                            modal.uploading = false;
                        })
                    } else {
                        this.$util.exception.toastError(`${info.file.response.status}:${info.file.response.message}`);
                        modal.uploading = false;
                    }
                }
            }

            return {
                image: () => {
                    return {
                        before: (file) => {
                            typeList = ['image/jpeg', 'image/png']
                            return before(file);
                        },
                        change: (info, modal, prop) => {
                            change(info, modal, prop)
                        }
                    }
                }, file: () => {
                    return {
                        before: (file) => {
                            //https://blog.csdn.net/gp_911014/article/details/108103428  Content-type类型总结
                            typeList = ["application/mswordm", "application/msword", "application/vnd.openxmlformats-officedocument.wordprocessingml.document", "application/vnd.openxmlformats-officedocument.wordprocessingml.template", "application/vnd.ms-word.document.macroEnabled.12", "application/vnd.ms-word.template.macroEnabled.12", "application/vnd.ms-excel", "application/vnd.ms-excel", "application/vnd.ms-excel", "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet", "application/vnd.openxmlformats-officedocument.spreadsheetml.template", "application/vnd.ms-excel.sheet.macroEnabled.12", "application/vnd.ms-excel.template.macroEnabled.12", "application/vnd.ms-excel.addin.macroEnabled.12", "application/vnd.ms-excel.sheet.binary.macroEnabled.12", "application/vnd.ms-powerpoint", "application/vnd.ms-powerpoint", "application/vnd.ms-powerpoint", "application/vnd.ms-powerpoint", "application/vnd.openxmlformats-officedocument.presentationml.presentation", "application/vnd.openxmlformats-officedocument.presentationml.template", "application/vnd.openxmlformats-officedocument.presentationml.slideshow", "application/vnd.ms-powerpoint.addin.macroEnabled.12", "application/vnd.ms-powerpoint.presentation.macroEnabled.12", "application/vnd.ms-powerpoint.presentation.macroEnabled.12", "application/vnd.ms-powerpoint.slideshow.macroEnabled.12", "application/zip", "application/x-tar", "text/plain", 'image/jpeg', 'image/png']
                            minSize = 50;
                            return before(file);
                        },
                        change: (info, modal, prop) => {
                            change(info, modal, prop)
                        },
                    }
                }
            }
        },
        curdDownHandle(path, loadingCtrl, saveName) {
            if (loadingCtrl.loading == false) {
                loadingCtrl.loading = true
            }
            this.$httpApi.ews.resources.getRes(path).then(r => {
                if (r.status === 200 && !r.data.code) {
                    const blob = new Blob([r.data]);
                    if (typeof window.navigator.msSaveBlob !== 'undefined') {
                        window.navigator.msSaveBlob(blob, saveName)
                    } else {
                        let url = window.URL.createObjectURL(blob)
                        let link = document.createElement('a')
                        link.style.display = 'none'
                        link.href = url
                        link.setAttribute('download', saveName)
                        document.body.appendChild(link)
                        link.click()
                        document.body.removeChild(link);
                        window.URL.revokeObjectURL(url);
                    }
                } else if (r.data.code) {
                    this.$util.exception.toastError(`${r.data.code}:${r.data.message}`);
                } else {
                    this.$util.exception.toastError(`网络错误`);
                }
            }).catch(e => {
                this.$util.exception.toastError(`下载失败`);
            }).finally(f => {
                loadingCtrl.loading = false
            })
        },
        modalHandle() {
            return {
                dropdownVisibleChange: (way) => {
                    if (typeof way == "function") {
                        way();
                    }
                },
                select: (v, data, op, labelInValue) => {
                    v = labelInValue ? v.key : v;
                    this.$set(data, op, v);
                },
                selectMultiple: (v, data, op, labelInValue) => {
                    const spV = [];
                    v?.forEach(p => {
                        spV.push(labelInValue ? p.key : p);
                    })
                    this.$set(data, op, spV);
                },
                videoClose: (v, modal, op) => {
                    modal.switch = false;
                    modal.videoRes = "";
                }
            }
        },
        common() {
            return {
                blockPropagation(e) {
                    e.stopPropagation()
                },
                getModalContainer(id) {
                    return () => window.document.getElementById(id || "app")
                },
                assemblyClassName(classCollective) {
                    return `${gradeEnum.getLabelByValue(classCollective?.gradeUuid)}${classCollective?.gradeName}`
                },
                labelCol(roughWords, singleWordWidth) {
                    singleWordWidth = singleWordWidth ? singleWordWidth : "16"
                    return {style: `width: ${singleWordWidth * roughWords}px`}
                },
                validator: {
                    ip: (rule, value, callback) => {
                        if (!regular.ip.test(value)) {
                            callback('请输入正确的IP地址');
                        } else {
                            callback();
                        }
                    },
                    tel: (rule, value, callback) => {
                        if (!regular.tel.test(value)) {
                            callback('请输入正确的电话号码');
                        } else {
                            callback();
                        }
                    },
                    azOrNumber: (rule, value, callback) => {
                        if (!regular.azOrNumber.test(value)) {
                            callback('内容仅支持数字或者英文字母');
                        } else {
                            callback();
                        }
                    },
                    numberGTZero: (rule, value, callback) => {
                        if (!regular.number.GTZero.test(value)) {
                            callback('请输入大于0的数字');
                        } else {
                            callback();
                        }
                    }
                }
            }
        }
    }
}


export default mixin