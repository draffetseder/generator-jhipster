import { exec } from 'node:child_process';
import { GRADLE } from '../../gradle/constants.js';

/**
 * build a generated application.
 *
 * @param {String} buildTool - maven | gradle
 * @param {String} profile - dev | prod
 * @param {Boolean} buildWar - build a war instead of a jar
 * @param {Function} cb - callback when build is complete
 * @returns {object} the command line and its result
 */
export function buildApplication(buildTool, profile, buildWar, cb) {
  let buildCmd = 'mvnw -ntp verify -B';

  if (buildTool === GRADLE) {
    buildCmd = 'gradlew';
    if (buildWar) {
      buildCmd += ' bootWar';
    } else {
      buildCmd += ' bootJar';
    }
  }
  if (buildWar) {
    buildCmd += ' -Pwar';
  }

  buildCmd += ` -P${profile}`;
  return {
    stdout: exec(buildCmd, { maxBuffer: 1024 * 10000 }, cb).stdout,
    buildCmd,
  };
}
