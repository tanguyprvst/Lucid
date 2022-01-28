const ArrayHelper = require('../utils/arrays');
const DB = require('../database/database');

class Model {
    constructor(data){
        this.id = 0;

        const fields = this._getFields();
        fields.push('id');
        if(fields) {
            fields.forEach(f => {
                this[f] = (data && data[f]) ? data[f] : null;
            });
        }
    }

    static _getTable() { return null; }
    static _getResponseObj(data) { return null; }
    static _getFields() { return []; }

    static getById(id, c) {
        DB.table(this._getTable()).where('id', '=', id).first(d => {
            if(!d) return c(null);
            c(this._getResponseObj(d));
        });
    }

    static getAll(c) {
        DB.table(this._getTable()).get(d => {
            if(!d) return c(null);
            const entities = [];
            d.forEach(e => entities.push(this._getResponseObj(e)));
            c(entities);
        });
    }

    static create(datas, c = undefined) {
        const params = {};
        this._getFields().forEach(f => {
            if(datas[f]) params[f] = datas[f];
        });
        DB.table(this._getTable()).create(params, id => {
            if(!id) return c(null);
            params.id = id;
            c(this._getResponseObj(params));
        });
    }

    static updateById(id, datas, c = undefined) {
        const params = {};
        this._getFields().forEach(f => {
            if(datas[f]) params[f] = datas[f];
        });
        DB.table(this._getTable()).where('id', '=', id).update(params, c);
    }

    static deleteById(id, c = undefined) {
        DB.table(this._getTable()).where('id', '=', id).delete(c);
    }

    update(c = undefined) {
        this.updateById(this.id, this, c);
    }

    delete(c = undefined) {
        this.deleteById(this.id, c);
    }
}

module.exports = Model