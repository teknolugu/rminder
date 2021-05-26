<template>
	<vue-slider
		tooltip-placement="bottom"
		class="flex-1 mr-3 ml-2"
		:tooltip-formatter="sliderFormatter"
		:model-value="activity.interval"
		:max="120"
    :interval="5"
		:min="5"
		@change="updateInterval"
	></vue-slider>
</template>
<script>
import { useStore } from 'vuex';
import VueSlider from 'vue-slider-component';
import { debounce } from '@/utils/helper';
import 'vue-slider-component/theme/default.css';

export default {
  components: { VueSlider },
  props: {
    activity: {
      type: Object,
      default: () => ({}),
    },
    isCustom: Boolean,
  },
  setup(props) {
  	const store = useStore();

    const updateInterval = debounce(async (value) => {
  		store.commit('updateActivity', {
  			id: props.activity.id,
        isCustom: props.isCustom,
  			data: {
  				interval: value,
  			},
  		});

      await browser.alarms.clear(props.activity.id);
      await browser.alarms.create(props.activity.id, {
        periodInMinutes: value,
      });
    }, 1000);

  	return {
  		updateInterval,
  		sliderFormatter: (value) => `${value} minutes`,
  	};
  },
};
</script>
