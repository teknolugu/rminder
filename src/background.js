/* eslint-disable import/no-dynamic-require */
import { activities as defaultActivities, defaultStats } from './utils/shared';
import { getCurrentDate } from './utils/helper';

browser.runtime.onInstalled.addListener(() => {
  browser.storage.sync.set({
    activities: defaultActivities,
    stats: {
      [getCurrentDate()]: defaultStats,
    },
  });
  browser.storage.local.set({
    stats: {},
  });

  Object.entries(defaultActivities).forEach(([name, activity]) => {
    if (!activity.disabled) {
      browser.alarms.create(name, {
        periodInMinutes: activity.interval,
      });
    }
  });
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
browser.alarms.onAlarm.addListener(async ({ name }) => {
  await incStats(name);
  const { activities } = await browser.storage.sync.get('activities');
  const timeoutTimes = [1000, 2000, 3000];
  const randomIndex = Math.floor(Math.random() * timeoutTimes.length);
  const timeout = timeoutTimes[randomIndex];

  setTimeout(() => {
    if (activities[name].playSound) {
      const audio = new Audio(require('./assets/audio/notification.mp3'));
      audio.play();
    }
    const { title, description } = activities[name].message;

    browser.notifications.create({
    	type: 'basic',
    	title,
    	message: description,
    	iconUrl: require(`./assets/icons/${name}.png`),
    });
  }, timeout);
});
