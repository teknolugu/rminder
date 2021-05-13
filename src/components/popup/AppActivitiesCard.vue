<template>
	<swiper
		class="activities"
		:slides-per-view="1.1"
		mousewheel
	>
		<swiper-slide
			v-for="activity in activities"
			:key="activity.name"
			:class="[
				activity.disabled
					? 'bg-gray-100 text-gray-600'
					: `text-white bg-gradient-to-br ${activity.color}`
			]"
			class="h-32 p-4 card-activity mr-2 rounded-xl select-none"
		>
			<div class="flex items-center mb-4">
				<span class="inline-block p-2 rounded-lg bg-white bg-opacity-25 mr-2">
					<v-mdi size="26" :name="activity.icon"></v-mdi>
				</span>
				<div class="title">
					<p class="capitalize font-semibold">{{ activity.name }}</p>
					<p class="leading-4" :class="{ 'text-gray-100': !activity.disabled }">
						{{ activity.disabled ? 'Disabled' : `${activity.todayActivity} times today` }}
					</p>
				</div>
			</div>
			<div class="mt-5">
				<p class="leading-tight">Next notification: </p>
				<p class="leading-tight">{{ notificationsSchedule[activity.name] || '-' }}</p>
			</div>
		</swiper-slide>
	</swiper>
</template>
<script>
import { ref, computed, watch } from 'vue';
import { useStore } from 'vuex';
import dayjs from 'dayjs';
import debounce from 'lodash.debounce';
import SwiperCore, { Mousewheel } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/vue';
import 'swiper/swiper-bundle.min.css';

SwiperCore.use([Mousewheel]);

export default {
  components: { Swiper, SwiperSlide },
  setup() {
  	const store = useStore();

  	const slider = ref(null);
  	const notificationsSchedule = ref({
  		water: '00:00 P.M',
  		blinking: '00:00 P.M',
  		posture: '00:00 P.M',
  		stretch: '00:00 P.M',
  	});

  	const activities = computed(() => store.getters.activities);

  	watch(() => activities, debounce(async () => {
  		const alarms = await browser.alarms.getAll();

  		notificationsSchedule.value = alarms.reduce((times, { name, scheduledTime }) => {
  			/* eslint-disable-next-line */
  			times[name] = dayjs(scheduledTime).format('h:mm A');

  			return times;
  		}, {});
  	}), { deep: true, immediate: true });

  	return {
  		slider,
  		activities,
  		notificationsSchedule,
  	};
  },
};
</script>
