<template>
  <div class="m-menu">
    <dl
      class="nav"
      @mouseleave="mouseleave">
      <dt>全部分类</dt>
      <dd
        v-for="(item, index) in menu"
        :key="index"
        @mouseenter="mouseenter(item.type)">
        <i :class="item.type" />{{ item.name }}<span class="arrow" />
      </dd>
    </dl>
    <div
      class="detail"
      v-if="kind"
      @mouseenter="sover"
      @mouseleave="sout">
      <template v-for="(item, index) in curdetail">
        <h4 :key="index">{{ item.title }}</h4>
        <span
          v-for="(v, j) in item.child"
          :key="'v-' + j">{{ v }}</span>
      </template>
    </div>
  </div>
</template>

<script>
import { clearTimeout, setTimeout } from 'timers'

export default {
  data() {
    return {
      kind: 'food',
      menu: this.$store.state.home.menu
    }
  },
  computed: {
    curdetail: function() {
      return this.menu.filter(item => item.type === this.kind)[0].child
    }
  },
  methods: {
    sover() {
      clearTimeout(this.timer)
    },
    sout() {
      this.kind = ''
    },
    mouseenter(type) {
      this.kind = type
    },
    mouseleave() {
      this.timer = setTimeout(() => {
        this.kind = ''
      }, 150);
    }
  }
}
</script>

<style>

</style>
