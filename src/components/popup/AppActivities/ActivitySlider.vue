<template>
	<vue-slider
		tooltip-placement="bottom"
		class="flex-1 mr-3 ml-2"
		:tooltip-formatter="sliderFormatter"
		:interval="5"
		:model-value="activity.interval"
		:max="120"
		:min="5"
		@change="updateInterval"
	></vue-slider>
</template>
<script>
import { useStore } from 'vuex';
import VueSlider from 'vue-slider-component';
import debounce from 'lodash.debounce';
import 'vue-slider-component/theme/default.css';

export default {
  components: { VueSlider },
  props: {
    activity: {
      type: Object,
      default: () => ({}),
    },
  },
  setup(props) {
  	const store = useStore();

    const updateInterval = debounce(async (value) => {
  		store.commit('updateActivity', {
  			name: props.activity.name,
  			data: {
  				interval: value,
  			},
  		});

      await browser.alarms.clear(props.activity.name);
      await browser.alarms.create(props.activity.name, {
        periodInMinutes: props.activity.interval,
      });
    }, 1000);

  	return {
  		updateInterval,
  		sliderFormatter: (value) => `${value} minutes`,
  	};
  },
};
</script>
