/* eslint-disable import/no-dynamic-require */
import throttle from 'lodash.throttle';
import { activities as defaultActivities, defaultStats } from './utils/shared';
import { getCurrentDate } from './utils/helper';

function setAllAlarms(activities) {
  const entries = Object.entries(activities);

  entries.forEach(([name, activity]) => {
    if (activity.disabled) return;

    browser.alarms.create(name, {
      periodInMinutes: activity.interval,
    });
  });
}

browser.runtime.onInstalled.addListener(async ({ reason }) => {
  if (reason === 'install') {
    await browser.storage.sync.set({
      activities: defaultActivities,
      customActivities: {},
      stats: {
        [getCurrentDate()]: defaultStats,
      },
    });
    await browser.storage.local.set({
      stats: {},
    });

    await browser.alarms.clearAll();

    setAllAlarms(defaultActivities);
  }

  if (reason === 'update') {
    const { customActivities } = await browser.storage.sync.get('customActivities');

    if (!customActivities) {
      await browser.storage.sync.set({
        customActivities: {},
      });
    }
  }
});

async function incStats(id) {
  try {
    const { stats } = await browser.storage.local.get('stats');
	  const todayStats = stats[getCurrentDate()] || {};

	  await browser.storage.local.set({
	  	stats: {
		  	[getCurrentDate()]: {
		  		...todayStats,
		  		[id]: (todayStats[id] || 0) + 1,
		  	},
		  },
	  });
  } catch (error) {
    console.error(error);
  }
}
async function validateReminder(id, scheduledTime) {
  if ((Date.now() - 15000) > scheduledTime) {
    return {
      isValid: false,
    };
  }

  const isMainReminder = Object.keys(defaultActivities).includes(id);
  const {
    customActivities,
    activities,
  } = await browser.storage.sync.get(['activities', 'customActivities']);
  const activity = isMainReminder ? activities[id] : customActivities[id];

  if (activity.disabled) {
    await browser.alarms.clear(id);
  }

  return {
    activity,
    isValid: !activity.disabled,
    isCustom: !isMainReminder,
  };
}

browser.alarms.onAlarm.addListener(async ({ name, scheduledTime }) => {
  const { isValid, activity, isCustom } = await validateReminder(name, scheduledTime);

  if (!isValid) return;

  await incStats(name);
  const notifications = await browser.notifications.getAll();

  if (notifications[name]) await browser.notifications.clear(name);

  browser.notifications.create(name, {
  	type: 'basic',
  	title: activity.message.title,
  	message: activity.message.description,
  	iconUrl: require(`./assets/icons/${isCustom ? 'alarm' : name}.png`),
  });
});
browser.alarms.onAlarm.addListener(throttle(async ({ name, scheduledTime }) => {
  const { isValid, activity } = await validateReminder(name, scheduledTime);

  if (!isValid) return;

  if (activity.playSound) {
    const audio = new Audio(require('./assets/audio/notification.wav'));
    audio.play();
  }
}, 30000));
