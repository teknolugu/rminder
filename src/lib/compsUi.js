import CompsUi from 'comps-ui';
import {
  mdiWater,
  mdiEye,
  mdiChairRolling,
  mdiYoga,
  mdiCog,
} from '@mdi/js';
import 'comps-ui/dist/style.css';

function generateIcons(icons) {
  const iconNames = Object.keys(icons);
  const generatedIcons = iconNames.reduce((iconsObj, name) => {
  	/* eslint-disable-next-line */
  	iconsObj[name] = {
  		paths: [icons[name]],
  	};

  	return iconsObj;
  }, {});

  return generatedIcons;
}

export default {
  install(app) {
    app.use(CompsUi, {
	  	icons: generateIcons({
	  		mdiWater,
	  		mdiYoga,
	  		mdiChairRolling,
	  		mdiEye,
        mdiCog,
	  	}),
	  });
  },
};
