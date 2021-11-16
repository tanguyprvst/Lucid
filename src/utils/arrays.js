module.exports = {
    indexOf: (arr, item, strict = false) => {
        for(const i in arr) {
            if(
                (strict && arr[i] === item) || 
                (!strict && arr[i] == item)
            ) return i;
        }
        return -1;
    },
    remove: (arr, item, strict = false) => {
        const output = [];
        arr.forEach(e => {
            if(!(strict && e === item) && !(!strict && e == item)) {
                output.push(e);
            }
        });
        return output;
    },
    forEach: (arr, callback) => {
        for(index in arr) {
            if(callback(arr[index], index) !== undefined) return;
        }
    },
    getByFieldValue: (arr, fieldName, value) => {
        for(const obj of arr) {
            if(obj[fieldName] == value) return obj;
        }
        return undefined;
    },
    cloneObject: (obj, n = false) => {
        const func = (obj, n) => {
            const output = {};
            for(let [key, value] of Object.entries(obj)) {
                if(n && typeof value === 'object') {
                    output[key] = func(value, true);
                    continue;
                }
                output[key] = value;
            }
            return output;
        };
        return func(obj, n);
    },
    containsKey: (obj, key, strict = true) => {
        for(let [k, value] of Object.entries(obj)) {
            if((strict && key === k) || (!strict && key == k))
                return true;
        }
        return false;
    },
    containsValue: (obj, value, strict = true) => {
        for(let [key, val] of Object.entries(obj)) {
            if((strict && value === val) || (!strict && value == val))
                return true;
        }
        return false;
    }
};