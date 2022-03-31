/***
 * 生成模板代码
 * 1. view的js\css\vue文件
 * 2. model文件(空的)
 * 3. api的代码(手动粘贴)(包含mock部分
 */
const fs = require("fs")
const path = require("path")
const lodash = require("lodash")
const generatorConfig = require("./generator.config")
generatorConfig.generatorList.forEach(fo => {
    initComponent(fo)
})

function initComponent(component) {
    processComponent(component)
    initViewFiles(component)
    initModelFiles(component)
    initApiFiles(component)
}

//生成1
function initViewFiles(component) {
    let vueTpl = fs.readFileSync('./generator/template/view/tpl@vue', 'utf8');
    let jsTpl = fs.readFileSync('./generator/template/view/tpl@js', 'utf8');
    vueTpl = replacement(vueTpl, component)
    jsTpl = replacement(jsTpl, component)
    // console.log(jsTps)
    const viewPath = `${realPath(component.viewParentPath)}${component.name}`
    touchFile(`${viewPath}/${component.name}.vue`, vueTpl)
    touchFile(`${viewPath}/${component.name}.js`, jsTpl)
    touchFile(`${viewPath}/${component.name}.less`, "")
}

//生成2
function initModelFiles(component) {
    touchFile(`${realPath("/model")}/${component.name}.js`,"export default {}")
}

//生成3
function initApiFiles(component) {
    let apiTpl = fs.readFileSync('./generator/template/api/api@js', 'utf8');
    apiTpl = replacement(apiTpl, component)
    console.log(apiTpl)
}

function replacement(str, component) {
    for (const replaceKey in component) {
        str = replaceAll("$@{" + replaceKey + "}", component[replaceKey], str)
    }
    return str
}

function processComponent(component) {
    let apiName = (component.restUrl || "") + ""

    //生成带转义符的restUrl
    component.restUrlEscapes=replaceAll("/","\\/",component.restUrl)
    //过滤掉apiRoot部分生成apiName
    for (let i = 0; i < generatorConfig.apiRoots.length; i++) {
        const fo = generatorConfig.apiRoots[i]
        if (apiName.indexOf(fo) > -1) {
            component.apiNameLowerCase=lodash.camelCase(apiName.slice(fo.length, apiName.length))
            component.apiName = lodash.upperFirst(component.apiNameLowerCase)
            component.apiParentPath = `/api/main${fo}`
            break;
        }
    }

}

function replaceAll(fd, replace, str) {
    const find = fd.replace(/[-/\\^$*+?.()|[\]{}]/g, '\\$&');
    return str.replace(new RegExp(find, 'g'), replace);
}

function realPath(path) {
    return `./src${path}`
}

function touchFile(to, content) {
    if(fs.existsSync(to)){
        console.warn(`${to} 已经存在了`)
        return
    }
    const makeDirs = pt => {
        if (fs.existsSync(pt)) {
            return true;
        }
        if (makeDirs(path.dirname(pt))) {
            fs.mkdirSync(pt);
            return true;
        }
    };
    makeDirs(path.dirname(to) + '/')
    fs.writeFileSync(to,content,"utf8")
}



