export const activities = {
  water: {
    color: 'from-light-blue-400 to-indigo-500',
    icon: 'mdiWater',
    disabled: false,
    expand: false,
    playSound: false,
    interval: 20,
    lastShow: Date.now(),
    message: {
      title: 'Take a drink',
      description: 'It\' time to drink some water and stay hydrated!',
    },
  },
  blinking: {
    color: 'from-green-400 to-cyan-500',
    icon: 'mdiEye',
    disabled: false,
    expand: false,
    playSound: false,
    interval: 30,
    lastShow: Date.now(),
    message: {
      title: 'Blink your eyes',
      description: 'It\'s time blink and give your eyes a break',
    },
  },
  stretch: {
  	color: 'from-fuchsia-500 to-purple-600',
  	icon: 'mdiYoga',
    disabled: false,
    expand: false,
    playSound: false,
    interval: 45,
    lastShow: Date.now(),
    message: {
      title: 'Time to stretch',
      description: 'It\'s time to get up and stretch!',
    },
  },
  posture: {
  	color: 'from-yellow-400 to-orange-500',
  	icon: 'mdiChairRolling',
    disabled: false,
    expand: false,
    playSound: false,
    interval: 20,
    lastShow: Date.now(),
    message: {
      title: 'Are you sitting correctly?',
      description: 'It\'s time to correct your posture',
    },
  },
};

export const defaultStats = {
  water: 0,
  blinking: 0,
  stretch: 0,
  posture: 0,
};
