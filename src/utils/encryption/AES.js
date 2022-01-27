import crypto from "crypto-js"
import lodash from "lodash"

const fixpassword=(password)=>{
    password=password.toString()
    if(password.length<16){
        const supplementStr=lodash.fill(Array(16-password.length),0).toString().replaceAll(',','');
        return password+supplementStr;
    }else {
        return password;
    }
}

export default {
    encrypt(content,password) {
        password=fixpassword(password);
        let iv=password;
        if(typeof content == "object"){
            content=JSON.stringify(content)
        }
        let encrypted = crypto.AES.encrypt(crypto.enc.Utf8.parse(content), crypto.enc.Utf8.parse(password), {
            iv: crypto.enc.Utf8.parse(iv),
            mode: crypto.mode.CBC,
            padding: crypto.pad.ZeroPadding
        });
        return crypto.enc.Base64.stringify(encrypted.ciphertext);
    },
    decrypt(encrypted,password) {
        password=fixpassword(password);
        let iv=password;
        let decrypted =crypto.AES.decrypt(encrypted, crypto.enc.Utf8.parse(password),{
            iv: crypto.enc.Utf8.parse(iv),
            mode: crypto.mode.CBC,
            padding: crypto.pad.ZeroPadding
        });
        return decrypted.toString(crypto.enc.Utf8);
    }
}