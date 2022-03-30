module.exports = {
    //api根目录的列表这个目录以外的下级目录就是api方法了
    apiRoots: ["/auth"],
    generatorList: [
        /**
         * {
         *     viewParentPath:"/view/",//vue组件的文件夹路径
         *     name:"demo", //文件名称
         *     chineseName:"模板", //中文名称
         *     restUrl:"/auth/sys/orm/role", //接口逻辑的路径，会自动生成api名称，
         * }
         */
        {
            viewParentPath:"/views/",//vue组件的文件夹路径
            name:"demo", //文件名称
            chineseName:"模板", //中文名称
            restUrl:"/auth/sys/orm/role", //接口逻辑的路径，会自动生成api名称，
        }
    ]
}