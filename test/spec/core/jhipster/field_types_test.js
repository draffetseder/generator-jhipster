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
const FieldTypes = require('../../../../lib/core/jhipster/field_types');
const Validations = require('../../../../lib/core/jhipster/validations').Validations;
const JDLEnum = require('../../../../lib/core/jdl_enum');

describe('FieldTypes', () => {
  describe('::isCommonDBType', () => {
    context('when passing an invalid argument', () => {
      it('fails', () => {
        try {
          FieldTypes.isCommonDBType(null);
          fail();
        } catch (error) {
          expect(error.name).to.eq('NullPointerException');
        }
        try {
          FieldTypes.isCommonDBType(undefined);
          fail();
        } catch (error) {
          expect(error.name).to.eq('NullPointerException');
        }
        try {
          FieldTypes.isCommonDBType('');
          fail();
        } catch (error) {
          expect(error.name).to.eq('NullPointerException');
        }
      });
    });
    context('when passing a false type', () => {
      it('returns false', () => {
        expect(FieldTypes.isCommonDBType(FieldTypes.CassandraTypes.UUID)).to.be.false;
      });
    });
    context('when passing a valid type', () => {
      it('returns true', () => {
        expect(FieldTypes.isCommonDBType(FieldTypes.CommonDBTypes.BIG_DECIMAL)).to.be.true;
      });
    });
    context('when passing an enum', () => {
      it('returns true', () => {
        expect(FieldTypes.isCommonDBType(new JDLEnum({ name: 'MyEnum' }))).to.be.true;
      });
    });
  });
  describe('::isCassandraType', () => {
    context('when passing an invalid argument', () => {
      it('fails', () => {
        try {
          FieldTypes.isCassandraType(null);
          fail();
        } catch (error) {
          expect(error.name).to.eq('NullPointerException');
        }
        try {
          FieldTypes.isCassandraType();
          fail();
        } catch (error) {
          expect(error.name).to.eq('NullPointerException');
        }
        try {
          FieldTypes.isCassandraType('');
          fail();
        } catch (error) {
          expect(error.name).to.eq('NullPointerException');
        }
      });
    });
    context('when passing a false type', () => {
      it('returns false', () => {
        expect(FieldTypes.isCassandraType(FieldTypes.CommonDBTypes.LOCAL_DATE)).to.be.false;
      });
    });
    context('when passing a valid type', () => {
      it('returns true', () => {
        expect(FieldTypes.isCassandraType(FieldTypes.CassandraTypes.BIG_DECIMAL)).to.be.true;
      });
    });
    context('when passing an enum', () => {
      it('returns false', () => {
        expect(FieldTypes.isCassandraType(new JDLEnum({ name: 'MyEnum' }))).to.be.false;
      });
    });
  });
  describe('::getIsType', () => {
    context('when passing an invalid argument', () => {
      it('fails', () => {
        try {
          FieldTypes.getIsType(null);
          fail();
        } catch (error) {
          expect(error.name).to.eq('NullPointerException');
        }
        try {
          FieldTypes.getIsType(null, () => {
            // do nothing
          });
          fail();
        } catch (error) {
          expect(error.name).to.eq('NullPointerException');
        }
      });
    });
    context('when passing a valid argument without callback', () => {
      it('returns isType', () => {
        expect(FieldTypes.getIsType('mysql')).to.eq(FieldTypes.isCommonDBType);
      });
    });
    context('when passing a valid argument and callback', () => {
      it('returns true', () => {
        expect(FieldTypes.getIsType('sql', () => {
          // do nothing
        })).to.eq(FieldTypes.isCommonDBType);
      });
    });
  });
  describe('::hasValidation', () => {
    context('when passing an invalid argument', () => {
      it('fails', () => {
        try {
          FieldTypes.hasValidation(null, null);
          fail();
        } catch (error) {
          expect(error.name).to.eq('NullPointerException');
        }
        try {
          FieldTypes.hasValidation(null, Validations.MAXLENGTH);
          fail();
        } catch (error) {
          expect(error.name).to.eq('NullPointerException');
        }
        try {
          FieldTypes.hasValidation(FieldTypes.CassandraTypes.BIG_DECIMAL, null);
          fail();
        } catch (error) {
          expect(error.name).to.eq('NullPointerException');
        }
      });
    });
    context('when passing a false argument', () => {
      it('returns false', () => {
        expect(FieldTypes.hasValidation(FieldTypes.CassandraTypes.BIG_DECIMAL, Validations.PATTERN)).to.be.false;
      });
    });
    context('when passing a valid argument', () => {
      it('returns true', () => {
        expect(FieldTypes.hasValidation(FieldTypes.CassandraTypes.BIG_DECIMAL, Validations.MIN)).to.be.true;
      });
    });
  });
});
