/**
 * Copyright 2013-2018 the original author or authors from the JHipster project.
 *
 * This file is part of the JHipster project, see http://www.jhipster.tech/
 * for more information.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/* eslint-disable no-new, no-unused-expressions */
const expect = require('chai').expect;

const fail = expect.fail;
const JDLField = require('../../../lib/core/jdl_field');
const JDLValidation = require('../../../lib/core/jdl_validation');
const VALIDATIONS = require('../../../lib/core/jhipster/validations').VALIDATIONS;

describe('JDLField', () => {
  describe('::new', () => {
    context('when not passing any argument', () => {
      it('fails', () => {
        try {
          new JDLField();
          fail();
        } catch (error) {
          expect(error.name).to.eq('NullPointerException');
        }
      });
    });
    context('when not passing the name or the type', () => {
      it('fails', () => {
        try {
          new JDLField({ name: null, type: 'String' });
          fail();
        } catch (error) {
          expect(error.name).to.eq('NullPointerException');
        }
        try {
          new JDLField({ name: 'abc', type: null });
          fail();
        } catch (error) {
          expect(error.name).to.eq('NullPointerException');
        }
      });
    });
    context('when passing arguments', () => {
      let args = {};
      let field = null;

      before(() => {
        args = {
          name: 'abc',
          type: 'String',
          comment: 'comment',
          validations: [new JDLValidation()]
        };
        field = new JDLField(args);
      });

      it('creates a new instance', () => {
        expect(field.name).to.eq(args.name);
        expect(field.type).to.eq(args.type);
        expect(field.comment).to.eq(args.comment);
        expect(field.validations).to.deep.eq(args.validations);
      });
    });
    context('when passing a reserved keyword as name', () => {
      it('fails', () => {
        try {
          new JDLField({ name: 'class', type: 'String' });
          fail();
        } catch (error) {
          expect(error.name).to.eq('IllegalNameException');
        }
      });
    });
  });
  describe('::isValid', () => {
    context('when checking the validity of an invalid object', () => {
      context('because it is nil or undefined', () => {
        it('returns false', () => {
          expect(JDLField.isValid(null)).to.be.false;
          expect(JDLField.isValid(undefined)).to.be.false;
        });
      });
      context('without a name attribute', () => {
        it('returns false', () => {
          expect(JDLField.isValid({ type: 'String' })).to.be.false;
        });
      });
      context('without a type attribute', () => {
        it('returns false', () => {
          expect(JDLField.isValid({ name: 'myField' })).to.be.false;
        });
      });
      context('with a reserved keyword as name', () => {
        it('returns false', () => {
          expect(
            JDLField.isValid({ name: 'class', type: 'String' })
          ).to.be.false;
        });
      });
      context('because its validations are invalid', () => {
        it('returns false', () => {
          expect(
            JDLField.isValid({
              name: 'myField',
              type: 'String',
              validations: [{
                value: 42
              }]
            })
          ).to.be.false;
        });
      });
    });
    context('when checking the validity of a valid object', () => {
      it('returns true', () => {
        expect(JDLField.isValid({ name: 'myField', type: 'String' })).to.be.true;
      });
    });
  });
  describe('#addValidation', () => {
    let field = null;

    before(() => {
      field = new JDLField({
        name: 'abc',
        type: 'String',
        comment: 'comment'
      });
    });

    context('when adding an invalid validation', () => {
      it('fails', () => {
        try {
          field.addValidation(null);
          fail();
        } catch (error) {
          expect(error.name).to.eq('InvalidObjectException');
          expect(error.message).to.eq('The passed validation must be valid.\nErrors: No validation');
        }
        try {
          field.addValidation({ name: VALIDATIONS.MIN });
          fail();
        } catch (error) {
          expect(error.name).to.eq('InvalidObjectException');
          expect(error.message).to.eq('The passed validation must be valid.\nErrors: No value');
        }
      });
    });
    context('when adding a valid validation', () => {
      let validation = null;

      before(() => {
        validation = { name: VALIDATIONS.MIN, value: 42 };
        field.addValidation(validation);
      });

      it('works', () => {
        expect(field.validations).to.deep.eq({ min: validation });
      });
    });
  });
  describe('#toString', () => {
    context('without comment', () => {
      let args = {};
      let field = null;

      before(() => {
        args = {
          name: 'abc',
          type: 'String'
        };
        field = new JDLField(args);
      });

      it('stringifies the fields', () => {
        expect(field.toString()).to.eq(`${args.name} ${args.type}`);
      });
    });
    context('without any validation', () => {
      let args = {};
      let field = null;

      before(() => {
        args = {
          name: 'abc',
          type: 'String',
          comment: 'comment'
        };
        field = new JDLField(args);
      });

      it('stringifies the fields', () => {
        expect(field.toString()).to.eq(`/**\n * ${args.comment}\n */\n`
          + `${args.name} ${args.type}`);
      });
    });
    context('with everything', () => {
      let args = {};
      let field = null;

      before(() => {
        args = {
          name: 'abc',
          type: 'String',
          comment: 'comment',
          validations: [new JDLValidation(), new JDLValidation({
            name: 'minlength',
            value: 42
          })]
        };
        field = new JDLField(args);
      });

      it('stringifies the field', () => {
        expect(field.toString()).to.eq(`/**\n * ${args.comment}\n */\n`
          + `${args.name} ${args.type} ${args.validations[0].name} `
          + `${args.validations[1].name}(${args.validations[1].value})`);
      });
    });
  });
});
