/* eslint-disable import/no-dynamic-require */
import throttle from 'lodash.throttle';
import { activities as defaultActivities, defaultStats } from './utils/shared';
import { getCurrentDate } from './utils/helper';

function setAllAlarms(activities) {
  Object.entries(activities).forEach(([name, activity]) => {
    if (activity.disabled) return;

    browser.alarms.create(name, {
      periodInMinutes: activity.interval,
    });
  });
}

browser.runtime.onInstalled.addListener(async ({ reason }) => {
  if (reason === 'install') {
    browser.storage.sync.set({
      activities: defaultActivities,
      stats: {
        [getCurrentDate()]: defaultStats,
      },
    });
    browser.storage.local.set({
      stats: {},
    });

    setAllAlarms(defaultActivities);
  }

  if (reason === 'update') {
    const { activities } = await browser.storage.sync.get('activities');

    browser.alarms.clearAll();

    setAllAlarms(activities);
  }
});

async function incStats(name) {
  try {
    const { stats } = await browser.storage.local.get('stats');
	  const todayStats = stats[getCurrentDate()] || defaultStats;

	  await browser.storage.local.set({
	  	stats: {
		  	[getCurrentDate()]: {
		  		...todayStats,
		  		[name]: todayStats[name] + 1,
		  	},
		  },
	  });
  } catch (error) {
    console.error(error);
  }
}

browser.alarms.onAlarm.addListener(async ({ name, scheduledTime }) => {
  if ((Date.now() - 15000) > scheduledTime) return;

  await incStats(name);

  const { activities } = await browser.storage.sync.get('activities');
  const { title, description } = activities[name].message;

  activities[name].lastShow = scheduledTime;

  browser.storage.sync.set({
    activities,
  });

  browser.notifications.create({
  	type: 'basic',
  	title,
  	message: description,
  	iconUrl: require(`./assets/icons/${name}.png`),
  });
});
browser.alarms.onAlarm.addListener(throttle(async ({ name, scheduledTime }) => {
  if ((Date.now() - 15000) > scheduledTime) return;

  const { activities } = await browser.storage.sync.get('activities');

  if (activities[name].playSound) {
    const audio = new Audio(require('./assets/audio/notification.wav'));
    audio.play();
  }
}, 30000));
