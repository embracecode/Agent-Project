class Validate {
    check(val, par) {
        if (val === null || val === undefined) {
            throw {
                code: 400,
                msg: `${par}字段必填`,
                validate: null
            }
        }
    }
    // 空值校验
    async nullCheck(val, tips, par) {
        await this.check(val, par);
        if (val.trim() === "") {
            throw {
                code: 422,
                msg: tips,
                validate: null
            }
        }
        if (typeof val !== "string") {
            throw {
                msg: `${par}字段必须是字符串类型`,
                code: 400,
                validate: null
            }
        }
    }
    async isArrayCheck(val, tips, par) {
        await this.check(val, par);
        console.log(JSON.stringify(val));
        if (!Array.isArray(val)) {
            throw {
                msg: `${par}字段必须是数组类型`,
                code: 400,
                validate: null
            }
        }
        if (val.length <=0 ) {
            throw {
                msg: `${par}字段不能为空`,
                code: 422,
                validate: null
            }
        }
    }
}

module.exports = new Validate();