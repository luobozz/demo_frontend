import lodash from "lodash";

export default {
    data: {
        modal: {
            basic: {
                title: "",
                switch: false,
                uploading: false,
                loading: false,
                form: {
                    ref: "crudFrom",
                },
            }
        },
        crudList: {
            name: "",
            apis: {},
            defaultConditions: {},
            conditions: {},
            dataList: [],
            defaultData: {},
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
                // showSizeChange: (current, size) => {
                //     // console.log(this.crudList.pagination.defaultPageSize)
                // }
            }
        },
    },
    computed: {
        crudDelTitle() {
            return `确定删除${this.crudList.name}?`
        }
    },
    method: {
        initCurd(apis, name, defaultData, defaultConditions, basicModal, subParam, createNotInit) {
            this.crudList.apis = apis;
            this.crudList.name = name
            this.crudList.defaultData = defaultData
            Object.assign(this.modal.basic, basicModal);
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
                    this.crudList.conditions.pageSize = crudList.pagination.defaultPageSize;
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
                        subParam.push("pageSize")
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
                    this.crudList.pagination.total = total || 0;
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
                add: (onOpen) => {
                    if (typeof onOpen === "function") {
                        onOpen();
                    }
                    let data = lodash.cloneDeep(this.crudList.defaultData)
                    this.crudList.data = data || {}
                    this.modal.basic.title = `新增${this.crudList.name}`
                    this.crudList.dataSub = dataSub(this.modal.basic, data, {
                        do: this.crudList.apis.add,
                        name: `add ${this.crudList.name}`,
                        subParam: this.crudList.subParam.add
                    })
                },
                edit: (data, onOpen) => {
                    if (typeof onOpen === "function") {
                        onOpen();
                    }
                    data = lodash.cloneDeep(data)
                    this.crudList.data = data || {}
                    this.modal.basic.title = `修改${this.crudList.name}`
                    this.crudList.dataSub = dataSub(this.modal.basic, data, {
                        do: this.crudList.apis.edit,
                        name: `edit ${this.crudList.name}`,
                        subParam: this.crudList.subParam.edit
                    })
                },
                delete: (uuid, text) => {
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
                        curdPaginationHandle().total(res.data.total);
                        this.crudList.dataList = res.data.records || [];
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
            this.$httpApi.lic.resources.getRes(path).then(r => {
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
        tableChangeHandle(pagination, filters, sorter, {currentDataSource}) {
            // console.log(pagination, filters, sorter, { currentDataSource })
            this.curdPaginationHandle().change(pagination.current)
        }
    }
}
