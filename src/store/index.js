import { createStore } from 'vuex';
import merge from 'deepmerge';
import { getCurrentDate } from '../utils/helper';
import { defaultStats } from '../utils/shared';

const store = createStore({
  state: {
  	activeTab: 'drinking',
    stats: {},
  	activities: {},
  },
  getters: {
    activities: (state) => (
      Object.entries(state.activities).map(([name, data]) => ({
        name,
        ...data,
        todayActivity: state.stats[getCurrentDate()][name] ?? 0,
      })).reverse()
    ),
  },
  mutations: {
  	updateActivity(state, { name, data }) {
  		const newData = merge(state.activities[name], data);
      console.log(newData);
  		state.activities[name] = newData;

      browser.storage.sync.set({
        activities: state.activities,
      });
  	},
  	updateState(state, { key, value }) {
  		state[key] = value;
  	},
  },
  actions: {
  	async retrieve({ commit }) {
  		const { activities } = await browser.storage.sync.get('activities');
      const { stats } = await browser.storage.local.get('stats');
      const currentDate = getCurrentDate();

      const statsData = {
        ...stats,
        [currentDate]: stats[currentDate] ?? defaultStats,
      };

  		commit('updateState', {
        key: 'activities',
        value: activities,
      });
      commit('updateState', {
        key: 'stats',
        value: statsData,
      });
  	},
  },
});

export default store;
