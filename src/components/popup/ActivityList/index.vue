<template>
  <div class="divide-y">
    <transition-group-list>
      <div
        v-for="activity in data"
        :key="activity.id"
        class="py-1 list-transition"
      >
        <div class="activity p-3 rounded-lg transition hover:bg-gray-100">
          <activity-header v-bind="{ activity, isCustom }"></activity-header>
          <transition-expand>
            <div class="flex items-center mt-3" v-if="!activity.disabled">
              <activity-slider v-bind="{ activity, isCustom }"></activity-slider>
              <v-mdi
                @click="$emit('delete', activity.id)"
                v-if="isCustom"
                name="mdi-delete"
                class="mr-1 cursor-pointer text-red-500"
              ></v-mdi>
              <v-mdi
                name="mdiCog"
                v-tooltip:bottom="'Settings'"
                class="cursor-pointer"
                @click="$emit('edit', activity)"
              ></v-mdi>
            </div>
          </transition-expand>
        </div>
      </div>
    </transition-group-list>
  </div>
</template>
<script>
import ActivityHeader from './ActivityHeader.vue';
import ActivitySlider from './ActivitySlider.vue';

export default {
  components: { ActivitySlider, ActivityHeader },
  props: {
    data: {
      type: Array,
      default: () => [],
    },
    isCustom: Boolean,
  },
  emits: ['edit', 'delete'],
};
</script>
