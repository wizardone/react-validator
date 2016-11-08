class Validator {
  constructor(validations){
    this._arrayCheck(validations);
    this.validations = validations;
    this.validationErrors = [];
  }
  /*
   const validations = [
   {
   'login': {
   'present': true,
   'minimum': 3,
   'maximum': 10
   }
   }
   ]
   */

  run(fieldsForValidation = {}){
    this._objectCheck(fieldsForValidation)
    for(let key in this.validations){
      let field = Object.keys(this.validations[key])[0]
      if(fieldsForValidation[field] != null){
        let value = fieldsForValidation[field];
        let errorMessages = [];
        for(let validation in this.validations[key][field]){
          let arg = this.validations[key][field][validation];
          let result = this['_'+validation](value, arg);
          if(result != null){
            errorMessages.push(result);
          }
        }
        this.validationErrors.push({[field]: errorMessages});
      }
    }

    return this.validationErrors;
  }

  _present(field, value){
    if(field){
      return null;
    } else {
      return "Must be present";
    }
  }

  _minimum(value, arg){
    if(value.length >= arg){
      return null;
    } else {
      return `Must be greater or equal to ${arg}`;
    }
  }

  _maximum(value, arg){
    if(value.length < arg){
      return null;
    } else {
      return `Must be less than ${arg}`;
    }
  }

  _email(value, arg){
    if(/\S+@\S+\.\S+/.test(arg)){
      return null
    } else {
      return `Is not a valid email`
    }
  }

  _arrayCheck(obj){
    if(!Array.isArray(obj)){
      throw new ValidatorException('#run expects a validation array');
    }
  }

  _objectCheck(obj){
    if(typeof(obj) != 'object'){
      throw new ValidatorException('#run expects a validation array');
    }
  }
}

class ValidatorException {
  constructor(message){
    this.message = message;
    this.name = 'ValidatorException';
  }
}

export {
  Validator,
  ValidatorException
}
