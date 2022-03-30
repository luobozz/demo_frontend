/***
 * 生成模板代码
 * 1. view的js\css\vue文件
 * 2. model文件(空的)
 * 3. api的代码(手动粘贴)
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
    let jsTps = fs.readFileSync('./generator/template/view/tpl@js', 'utf8');
    vueTpl = replacement(vueTpl, component)
    jsTps = replacement(jsTps, component)
    // console.log(jsTps)
    const viewPath = `${realPath(component.viewParentPath)}${component.name}`
    touchFile(`${viewPath}/${component.name}.vue`, vueTpl)
    touchFile(`${viewPath}/${component.name}.js`, jsTps)
    touchFile(`${viewPath}/${component.name}.less`, "")
}

//生成2
function initModelFiles(component) {

}

//生成3
function initApiFiles(component) {

}

function replacement(str, component) {
    for (const replaceKey in component) {
        str = replaceAll("$@{" + replaceKey + "}", component[replaceKey], str)
    }
    return str
}

function processComponent(component) {
    let apiName = (component.restUrl || "") + ""
    for (let i = 0; i < generatorConfig.apiRoots.length; i++) {
        const fo = generatorConfig.apiRoots[i]
        if (apiName.indexOf(fo) > -1) {
            component.apiName = lodash.upperFirst(lodash.camelCase(apiName.slice(fo.length, apiName.length)))
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



