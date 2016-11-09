# react-validator

The idea about a simple form validator in React came while working on some other React components (mainly the React-ready) components. The idea is simple: you pass a simple object to the validator and receive a simple object in return, listing the errors messages.

### Usage

```javascript
import Validator from 'validator'
const validations = [
{
  'login': {
    'present': true,
      'minimum': 3,
      'maximum': 10
  }
}
]
const fieldsForValidation = {
  'login': 'thisismylogin'
}
let validator = new Validator(validations)

validator.run(fieldsForValidation)
```
