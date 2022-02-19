<template>
  <div id="app">
    <a-input placeholder="请输入任务" :value="inputText" @change="valueChange"/>
    <a-button type="primary" id="add" @click="btnAdd()">添加事项</a-button>

    <a-list class="dt_list" item-layout="horizontal" :data-source="fliterData">
        <a-list-item slot="renderItem" slot-scope="item">
          <!-- 复选框 -->
          <a-checkbox :checked="item.done" @change="(e) => {cbChange(e, item.id)}">{{item.info}}</a-checkbox>
          <!-- 删除链接 -->
          <a slot="actions" @click="btnDelete(item.id)">删除</a>
          </a-list-item>
    </a-list>

    <!-- 底部区域 -->
    <div class="footer">
      <span>{{getLength}}条剩余</span>

      <a-button-group>
        <a-button :type="keyView == 'all' ? 'primary' : 'default'" @click="btnChange('all')">全部</a-button>
        <a-button :type="keyView == 'undone' ? 'primary' : 'default'" @click="btnChange('undone')">未完成</a-button>
        <a-button :type="keyView == 'done' ? 'primary' : 'default'" @click="btnChange('done')">已完成</a-button>
      </a-button-group>
      <a @click="clearItems()">清除已完成</a>
    </div>
  </div>
    
</template>

<script>
import {mapState, mapGetters} from 'vuex'
    export default {
      name: "app",
      data() {
        return {
        }
      },
      created() {
        this.$store.dispatch('getList')
      },
      computed: {
        ...mapGetters(['getLength', 'fliterData']),
        ...mapState(['inputText', 'keyView'])
      },
      methods: {
        valueChange(e) {
          this.$store.commit('setInputvalue', e.target.value)
        },
        btnAdd() {
          if(this.inputText.trim().length <= 0) {
            return this.$message.warning('内容不能为空！')
          }
          this.$store.commit('addItem')
        },
        btnDelete(id) {
          // console.log(id);
          this.$store.commit('deItem', id)
        },
        cbChange(e, id) {
          console.log(e.target.checked, id);
          const param = {
            id: id,
            status: e.target.checked
          }

          this.$store.commit('changeItem', param)
        },
        clearItems() {
          this.$store.commit('clearList')
        },
        btnChange(key) {
          // console.log(key);
          this.$store.commit('changeBtn', key)
        }
      }, 
    }
</script>
<style scoped>
  #app {
    margin: 10px auto;
    width: 50%;
    height: 400px;
    background-color: rgb(252, 252, 252);
  }
  input {
      width: 80%;
  }
  #add {
    margin-left: 5px;
  }
</style>