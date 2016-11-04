import { Validator, ValidatorException } from '../validator.js';
import chai from 'chai';

const expect = chai.expect;

describe('Validator', function(){
  describe('#constructor', function(){
    it('assigns the proper validations', function(){
      let validations = [
        {
          'login': {
            'present': true
          },
        }
      ]
      let validator = new Validator(validations);

      expect(validator.validations).to.eq(validations);
    });

    it('returns an error if an object is not passed', function(){
      expect(function(){
        new Validator('some malformed validation')
      }).to.throw(ValidatorException)
    });
  });

  describe('#run', function(){
    let validations;
    beforeEach(function(){
      validations = [
        {
          'login': {
            'present': true,
            'minimum': 3,
            'maximum': 10
          }
        }
      ];
    });

    it('expects an object as argument', function(){
      expect(function(){
        new Validator(validations).run('bollocks')
      }).to.throw(ValidatorException)
    });

    it('validates maximum length of single attribute', function(){
      let validator = new Validator(validations);

      expect(validator.run({
        'login': 'my long login'
      })).to.eql([
        {
          login: ['Must be less than 10']
        }
      ])
    });

    it('validates minimum length of single attribute', function(){
      let validator = new Validator(validations);

      expect(validator.run({
        'login': 'wa'
      })).to.eql([
        {
          login: ['Must be greater or equal to 3']
        }
      ])
    });

    it('validates presence of single attribute', function(){
      let validator = new Validator(validations);

      expect(validator.run({
        'login': ''
      })).to.eql([
        {
          login: ['Must be present', 'Must be greater or equal to 3']
        }
      ])
    });

  });
})
