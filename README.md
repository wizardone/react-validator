# react-validator

The idea about a simple form validator in React came while working on some other React components (mainly the React-ready) components.
The idea is simple: you pass a simple object to the validator and receive a simple object in return, listing the errors messages. It works well with React, especially when you save values in the state, which allows you to easily interact and validate data, before you send it to the server (just remember to always validate on the server as well :D)

### Usage

```javascript
import Validator from 'validator';
const validations = [
{
  'login': {
    'present': true,
      'minimum': 3,
      'maximum': 10
  },
  'email': {
    'email': true
  }
}
]
const fieldsForValidation = {
  'login': 'thisismylonglogin',
  'email': 'aaaaaa'
}
let validator = new Validator(validations);

validator.run(fieldsForValidation);
=>[
{
  'login': ['Must be less than 10']
},
{
  'email': ['Is not a valid email']
}
]

```
