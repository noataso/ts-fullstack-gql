//trimで空白スペースを全部消して文字がなければ、alertを出す
//空白スペースだけでも文字がなければならない
export const isEmptyString=(value:string)=> !value.trim()