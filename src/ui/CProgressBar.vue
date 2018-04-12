<!--
  -- --------------------------------------------------------
  -- @file CProgressBar.vue
  -- @author WenKang Lin <wenkanglin0910@gmail.com>
  -- @date 2018-04-12 15:01:32
  -- @last_modified_by WenKang Lin <wenkanglin0910@gmail.com>
  -- @last_modified_date 2018-04-12 15:01:55
  -- @copyright (c) 2018-present, WenKang Lin
  -- --------------------------------------------------------
 -->

<template>
  <div
    :style="progressStyle"
    :class="{ show: showProgress }"
    class="c-progress">
  </div>
</template>

<script>
  export default {
    name: 'CProgressBar',
    serverCacheKey: 'CProgressBar',
    data() {
      return {
        percent: 0,
        status: '',
        statusList: ['start', 'finish', 'paused', 'failed'],
        bgEnum: {
          start: '#2486ee',
          finish: '#2486ee',
          paused: '#ffca2b',
          failed: '#ff0000'
        }
      };
    },
    computed: {
      /**
       * @returns {boolean} - if show or hide the progress bar
       */
      showProgress() {
        const { status, statusList } = this;
        return status && status !== statusList[1] && status !== statusList[3];
      },

      /**
       * @returns {number} - the number of format precent
       */
      formatPercent() {
        return Math.min(
          100,
          typeof this.percent === 'number' ? +this.percent.toFixed(2) : 0
        );
      },

      /**
       * @returns {number} - the increment of percent for each frame
       */
      increment() {
        if (this.percent <= 10) {
          return (10 - 0) * (1000 / 60) / 200;
        }
        if (this.percent <= 60) {
          return (60 - 10) * (1000 / 60) / 3000;
        }
        if (this.percent <= 70) {
          return (70 - 60) * (1000 / 60) / 2000;
        }
        if (this.percent <= 80) {
          return (80 - 70) * (1000 / 60) / 2400;
        }
        if (this.percent <= 86) {
          return (86 - 80) * (1000 / 60) / 4000;
        }
        if (this.percent <= 92) {
          return (92 - 86) * (1000 / 60) / 8000;
        }
        return 0;
      },

      /**
       * @returns {Object} - the style object of process bar
       */
      progressStyle() {
        return {
          transform: `translateX(${-(100 - this.formatPercent)}%)`,
          backgroundColor: this.bgEnum[this.status]
        };
      }
    },
    methods: {
      /**
       * progress bar percentage animation
       * @returns {Vue} - current vue instance
       */
      frameAnim() {
        this.percent += this.increment;
        this.requestId = requestAnimationFrame(() => this.frameAnim());
      },

      /**
       * get progress bar's current percentage
       * @returns {Vue} - current vue instance
       */
      get() {
        return this.formatPercent;
      },

      /**
       * set progress bar's current percentage
       * @param {number} number - the number of progress
       * @returns {Vue} - current vue instance
       */
      set(number) {
        this.percent = number;
        return this;
      },

      /**
       * increase the percentage of progress bar
       * @param {number} number - the increase number at the progress
       * @returns {Vue} - current vue instance
       */
      increase(number) {
        this.percent += number;
        this.percent = Math.min(92, this.percent);
        return this;
      },

      /**
       * decrease the percentage of progress bar
       * @param {number} number - the decrease number at the progress
       * @returns {Vue} - current vue instance
       */
      decrease(number) {
        this.percent -= number.toFixed(2);
        return this;
      },

      /**
       * start show progress bar
       * @returns {Vue} - current vue instance
       */
      start() {
        this.status !== this.statusList[2] && (this.percent = 0);
        [this.status] = this.statusList;
        this.$nextTick(() => this.frameAnim());
        return this;
      },

      /**
       * @desc: directly finish the percentage of progress bar, then hide it
       * @returns {Vue} - current vue instance
       */
      finish() {
        [, this.status] = this.statusList;
        cancelAnimationFrame(this.requestId);
        this.percent = 100;
        return this;
      },

      /**
       * @desc: pause the percentage of progress bar
       * @returns {Vue} - current vue instance
       */
      pause() {
        if (this.status !== this.statusList[0]) {
          return this;
        }
        [, , this.status] = this.statusList;
        cancelAnimationFrame(this.requestId);
        return this;
      },

      /**
       * directly finish the percentage of progress bar with fail status,
       * then hide it
       * @returns {Vue} - current vue instance
       */
      fail() {
        [, , , this.status] = this.statusList;
        cancelAnimationFrame(this.requestId);
        this.percent = 100;
        return this;
      }
    }
  };
</script>

<style scoped>
  .c-progress {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 3px;
    transform: translateX(-100%);
    opacity: 0;
    transition: opacity 0.4s, background-color 0.2s;
    background-color: transparent;
    z-index: 9;
    box-shadow: 0 2px 10px #5d5d5d;
    pointer-events: none;
  }

  .c-progress.show {
    opacity: 1;
  }
</style>
