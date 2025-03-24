'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */

function transformStateWithClones(state, actions) {
  const history = [];
  let obj = { ...state };

  for (const action of actions) {
    switch (action.type) {
      case 'addProperties':
        for (const key in action.extraData) {
          obj[key] = action.extraData[key];
        }

        break;

      case 'removeProperties':
        for (const key of action.keysToRemove) {
          if (!obj[key]) {
            continue;
          }
          delete obj[key];
        }

        break;

      case 'clear':
        obj = {};
        break;
      default:
        return 'error';
    }

    history.push({ ...obj });
  }

  return history;
}

module.exports = transformStateWithClones;
