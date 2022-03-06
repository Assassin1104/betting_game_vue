export default {
    data() {
        return {
            validationState: {
                /** sample */
                alias: {
                    state: true,
                    text: 'Ok'
                }
            },
        }
    },
    methods: {
        getValidationText(prop) {
            if(this.validationState[prop]) {
                return this.validationState[prop].text;
            }
            return '';
        },
        getValidationState(prop) {
            if(this.validationState[prop]) {
                return this.validationState[prop].state;
            }
            return '';
        },
        async checkValidation() {
            let isValid = true;
            for(const prop in this.validationRules) {
                isValid = isValid && await this.validateField(prop);
            }
            return isValid;
        },
        async clearValidation(prop) {
            this.validationState[prop] = {
                state: true,
                text: ''
            };
        },
        async validateField(prop) {
            let i, result = true;
            const value = this.model[prop].trim();
            const validation = this.validationRules[prop];
            for(i = 0; i < validation.length; i ++) {
                /** required */
                if(validation[i].required) {
                    if(!value) {
                        result = false;
                        break;
                    } 
                /** min & max length */
                } else if(validation[i].minLength || validation[i].maxLength) {
                    let min = validation[i].minLength;
                    let max = validation[i].maxLength;
                    if(value && (min && value.length < min || max && value.length > max)) {
                        result = false;
                        break;
                    } 
                } else if(validation[i].unique) {
                    let params = {
                        alias: value
                    };
                    const res = await validation[i].func(params);
                    if(res.status === 'success') {
                        result = !res.data.exist;
                    }
                    break;
                }
            }
            if(!result) {
                this.validationState[prop] = {
                    state: false,
                    text: validation[i].message
                };
            } else {
                this.clearValidation(prop);
            }
            return result;
        }
    }
}