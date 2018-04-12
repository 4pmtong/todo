<!--
  -- --------------------------------------------------------
  -- @file CLoading.vue
  -- @author WenKang Lin <wenkanglin0910@gmail.com>
  -- @date 2018-04-12 14:59:29
  -- @last_modified_by WenKang Lin <wenkanglin0910@gmail.com>
  -- @last_modified_date 2018-04-12 14:59:42
  -- @copyright (c) 2018-present, WenKang Lin
  -- --------------------------------------------------------
 -->

<template>
  <transition name="fade" mode="out-in">
    <div
      v-if="visible"
      :class="{ 'loading__locked': lock }"
      class="loading">
      <div :style="{ color, background }" class="loading-box">
        <svg
          :style="{ fill: color }"
          class="loading-icon"
          viewBox="0 0 1024 1024">
          <!-- eslint-disable-next-line max-len -->
          <path d="M874.666667 533.333333l-192 0c-12.8 0-21.333333-8.533333-21.333333-21.333333 0-12.8 8.533333-21.333333 21.333333-21.333333l192 0c12.8 0 21.333333 8.533333 21.333333 21.333333C896 524.8 887.466667 533.333333 874.666667 533.333333zM648.533333 407.466667c-8.533333 8.533333-21.333333 8.533333-29.866667 0-8.533333-8.533333-8.533333-21.333333 0-29.866667l136.533333-136.533333c8.533333-8.533333 21.333333-8.533333 29.866667 0 8.533333 8.533333 8.533333 21.333333 0 29.866667L648.533333 407.466667zM512 896c-12.8 0-21.333333-8.533333-21.333333-21.333333l0-192c0-12.8 8.533333-21.333333 21.333333-21.333333s21.333333 8.533333 21.333333 21.333333l0 192C533.333333 887.466667 524.8 896 512 896zM512 362.666667c-12.8 0-21.333333-8.533333-21.333333-21.333333L490.666667 149.333333c0-12.8 8.533333-21.333333 21.333333-21.333333s21.333333 8.533333 21.333333 21.333333l0 192C533.333333 354.133333 524.8 362.666667 512 362.666667zM270.933333 782.933333c-8.533333 8.533333-21.333333 8.533333-29.866667 0s-8.533333-21.333333 0-29.866667l136.533333-136.533333c8.533333-8.533333 21.333333-8.533333 29.866667 0 8.533333 8.533333 8.533333 21.333333 0 29.866667L270.933333 782.933333zM375.466667 407.466667l-136.533333-136.533333c-8.533333-8.533333-8.533333-21.333333 0-29.866667s21.333333-8.533333 29.866667 0l136.533333 136.533333c8.533333 8.533333 8.533333 21.333333 0 29.866667C398.933333 413.866667 384 413.866667 375.466667 407.466667zM362.666667 512c0 12.8-8.533333 21.333333-21.333333 21.333333L149.333333 533.333333c-12.8 0-21.333333-8.533333-21.333333-21.333333 0-12.8 8.533333-21.333333 21.333333-21.333333l192 0C354.133333 490.666667 362.666667 499.2 362.666667 512zM648.533333 616.533333l136.533333 136.533333c8.533333 8.533333 8.533333 21.333333 0 29.866667-8.533333 8.533333-21.333333 8.533333-29.866667 0l-136.533333-136.533333c-8.533333-8.533333-8.533333-21.333333 0-29.866667C625.066667 610.133333 640 610.133333 648.533333 616.533333z">
          </path>
        </svg>
        <transition name="fade-down" mode="out-in">
          <span
            v-if="loadingTip"
            :key="loadingTip"
            class="loading-text">
            {{ loadingTip }}
          </span>
        </transition>
      </div>
    </div>
  </transition>
</template>

<script>
  export default {
    name: 'CLoading',
    props: {
      text: {
        type: String,
        default: ''
      },
      color: {
        type: String,
        default: '#409eff'
      },
      background: {
        type: String,
        default: '#333'
      },
      lock: {
        type: Boolean,
        default: true
      }
    },
    data() {
      return {
        visible: false,
        loadingTip: this.text,
        textList: [this.text]
      };
    },
    watch: {
      text(val) {
        this.textList.push(val);
      },
      textList(val) {
        val.forEach((item, index) => {
          setTimeout(() => {
            this.loadingTip = item;
            index === val.length - 1 && (this.textList = []);
          }, index * 600);
        });
      }
    },
    methods: {
      show(text) {
        this.visible = true;
        text && this.textList.push(text);
      },
      hide() {
        this.visible = false;
        this.$destroy();
        this.$el.parentNode.removeChild(this.$el);
      }
    }
  };
</script>

<style scoped>
  .loading {
    display: flex;
    align-items: center;
    justify-content: center;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 99;
    user-select: none;
  }

  .loading:not(.loading__locked) {
    pointer-events: none;
  }

  .loading-box {
    display: flex;
    align-items: center;
    padding: 10px 20px;
    border-radius: 4px;
    background: #333;
    box-shadow: 6px 5px 20px 0 rgba(0, 0, 0, 0.5);
    color: #409eff;
    pointer-events: initial;
  }

  .loading-icon {
    width: 20px;
    height: 20px;
    fill: #409eff;
    animation: loading-rotate 2s linear infinite;
  }

  .loading-text {
    max-width: 254px;
    margin-left: 6px;
    font-size: 14px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  @keyframes loading-rotate {
    100% {
      transform: rotate(360deg);
    }
  }
</style>
