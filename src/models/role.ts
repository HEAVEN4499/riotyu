import { InsanityLevel, Stats } from '../attrs/Characteristics';

export default class {

  namespace = 'role';

  state: Partial<Stats> = {
    name: '',
    player: '',
    occupation: '',
    sex: '',
    residence: '',
    birthplace: '',
    era: '',
    age: 0,
    luck: 0,
    hp: 0,
    mp: 0,
    san: 0,
    armor: 0,
    dead: false,
    dying: false,
    majorWound: false,
    insanityLevel: InsanityLevel.Normal,
  }

  subscriptions = {
    // setup({ dispatch, history }) {  // eslint-disable-line
    // },
  };

  effects = {
    *fetch({ payload }, { call, put }) {  // eslint-disable-line
      yield put({ type: 'save' });
    },
  };

  reducers = {
    save(state, action) {
      return { ...state, ...action.payload };
    },
  };
}
