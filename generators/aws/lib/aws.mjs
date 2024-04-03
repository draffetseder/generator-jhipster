/**
 * Copyright 2013-2023 the original author or authors from the JHipster project.
 *
 * This file is part of the JHipster project, see https://www.jhipster.tech/
 * for more information.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      https://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
import S3 from './s3.mjs';
import Rds from './rds.mjs';
import Eb from './eb.mjs';
import Iam from './iam.mjs';

let Aws;
let generator;

class AwsFactory {
  constructor(generatorRef, cb) {
    generator = generatorRef;
    // Store the promise of the dynamic import
    this.awsLoaded = import('aws-sdk').then(module => {
      Aws = module.default;
      cb();
    }).catch(e => {
      throw new Error(`Something went wrong while running jhipster:aws:\n${e}`);
    });
  }

  async init(options) {
    await this.awsLoaded; // Ensure Aws is loaded
    Aws.config.region = options.region;
  }

  async getS3() {
    await this.awsLoaded; // Ensure Aws is loaded
    return new S3(Aws, generator);
  }

  async getRds() {
    await this.awsLoaded; // Ensure Aws is loaded
    return new Rds(Aws, generator);
  }

  async getEb() {
    await this.awsLoaded; // Ensure Aws is loaded
    return new Eb(Aws, generator);
  }

  async getIam() {
    await this.awsLoaded; // Ensure Aws is loaded
    return new Iam(Aws, generator);
  }
}


export default AwsFactory;
