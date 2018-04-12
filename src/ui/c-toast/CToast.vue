<!--
  -- --------------------------------------------------------
  -- @file CToast.vue
  -- @author WenKang Lin <wenkanglin0910@gmail.com>
  -- @date 2018-04-12 15:00:16
  -- @last_modified_by WenKang Lin <wenkanglin0910@gmail.com>
  -- @last_modified_date 2018-04-12 15:00:27
  -- @copyright (c) 2018-present, WenKang Lin
  -- --------------------------------------------------------
 -->

<template>
  <transition
    name="fade-up"
    appear
    @after-leave="afterLeave">
    <div
      v-if="visible"
      :style="{ bottom: posBottom }"
      class="toast-wrap bottom-float-block">
      <div class="toast-container">
        <div class="toast-body" v-html="msg"></div>
      </div>
    </div>
  </transition>
</template>

<script>
  export default {
    name: 'CToast',
    props: {
      msg: {
        type: String,
        required: true
      },
      duration: {
        type: Number,
        default: 0
      },
      posBottom: {
        type: String,
        default: '51%'
      }
    },
    data() {
      return {
        visible: false,
        closed: false,
        timer: null,
        minDuration: 1500
      };
    },
    computed: {
      cpDuration() {
        //  根据信息长度设置信息显示时间
        if (this.duration) {
          return this.duration;
        }
        return Math.max(this.msg.length * 160, this.minDuration);
      }
    },
    watch: {
      closed(newVal) {
        newVal && (this.visible = false);
      },
      visible(newVal) {
        if (newVal) {
          this.timer = setTimeout(() => {
            this.close();
            clearTimeout(this.timer);
          }, this.cpDuration);
        }
      }
    },
    methods: {
      destroyElement() {
        this.$destroy();
        this.$el.parentNode.removeChild(this.$el);
      },
      close() {
        this.closed = true;
      },
      afterLeave() {
        this.destroyElement();
      }
    }
  };
</script>

<style scoped>
  .toast-wrap {
    text-align: center;
    transition: bottom 0.2s;
  }

  .toast-container {
    position: relative;
    display: inline-block;
    padding: 14px 40px;
    border-radius: 4px;
    font-size: 14px;
    line-height: 1;
    color: #fff;
    background-color: #333;
    pointer-events: auto;
    box-shadow: 6px 5px 20px 0 rgba(0, 0, 0, 0.5);
    z-index: 9;
  }

  .bottom-float-block {
    position: fixed;
    bottom: 30%;
    width: 100%;
    pointer-events: none;
  }
</style>
