import { createStore } from 'vuex';
import { nanoid } from 'nanoid';
import merge from 'deepmerge';
import { getCurrentDate } from '../utils/helper';
import { defaultStats } from '../utils/shared';

function convertToArray(obj, state) {
  const result = Object.entries(obj).map(([id, data]) => ({
    id,
    name: data.name || id,
    ...data,
    todayActivity: state.stats[getCurrentDate()][id] ?? 0,
  }));

  return result;
}

const store = createStore({
  state: {
  	activeTab: 'drinking',
    stats: {},
  	activities: {},
    activeActivity: '',
    customActivities: {},
  },
  getters: {
    activities: (state) => (
      convertToArray(state.activities, state).reverse()
    ),
    customActivities: (state) => (
      convertToArray(state.customActivities, state).sort((a, b) => a.createdAt - b.createdAt)
    ),
    activeActivity: (state) => ({
      ...state.customActivities[state.activeActivity],
      todayActivity: state.stats[getCurrentDate()][state.activeActivity] ?? 0,
      id: state.activeActivity,
    }),
  },
  mutations: {
  	addCustomActivity(state, { id, data }) {
      state.customActivities[id] = data;
    },
    deleteCustomActivity(state, id) {
      delete state.customActivities[id];
    },
    updateActivity(state, { id, data, isCustom }) {
      const key = isCustom ? 'customActivities' : 'activities';
      const newData = merge(state[key][id], data);

  		state[key][id] = newData;

      browser.storage.sync.set({
        [key]: state[key],
      });
  	},
  	updateState(state, { key, value }) {
  		state[key] = value;
  	},
  },
  actions: {
    async addActivity({ state, commit }) {
      const id = nanoid();
      const data = {
        name: 'My reminder',
        disabled: false,
        playSound: false,
        interval: 20,
        createdAt: Date.now(),
        message: {
          title: 'My reminder',
          description: '',
        },
      };

      commit('addCustomActivity', { id, data });

      await browser.storage.sync.set({
        customActivities: state.customActivities,
      });
      await browser.alarms.create(id, {
        periodInMinutes: data.interval,
      });
    },
    async deleteActivity({ commit, state }, id) {
      if (!id) return console.error('Id is required');

      commit('deleteCustomActivity', id);

      if (state.activeActivity === id) {
        const activeId = Object.keys(state.customActivities)[0] || '';

        localStorage.setItem('active-activity', activeId);
        commit('updateState', {
          key: 'active-activity',
          value: activeId,
        });
      }

      await browser.alarms.clear(id);
      await browser.storage.sync.set({
        customActivities: state.customActivities,
      });

      return true;
    },
  	async retrieve({ commit }) {
  		const {
        activities,
        customActivities,
      } = await browser.storage.sync.get(['activities', 'customActivities']);
      const { stats } = await browser.storage.local.get('stats');
      const currentDate = getCurrentDate();
      const activeActivity = localStorage.getItem('active-activity') || Object.keys(customActivities)[0] || '';

      const statsData = {
        ...stats,
        [currentDate]: stats[currentDate] ?? defaultStats,
      };

  		commit('updateState', { key: 'activeActivity', value: activeActivity });
      commit('updateState', { key: 'activities', value: activities });
      commit('updateState', { key: 'customActivities', value: customActivities });
      commit('updateState', { key: 'stats', value: statsData });
  	},
  },
});

export default store;
