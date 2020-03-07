<template>
  <div id="app">
    
    <div class="left">
      <!-- 股票展示-->
      <a-table :columns="columns" :dataSource="data" >
        <a slot="name" slot-scope="text" href="javascript:;">{{text}}</a>
        <span slot="customTitle"> 股票名称</span>
        <span slot="action" >
          <a href="javascript:;" class="ant-dropdown-link" @click='showModal'>
            操作 
          </a> 
          <a href="javascript:;" class="ant-dropdown-link" >
            展开 <a-icon type="down" />
          </a>
        </span>
      </a-table>
    </div>
    
    <a-modal
      title="Basic Modal"
      v-model="visible"
      @ok="handleOk"
    >
      <p>Some contents...</p>
      <p>Some contents...</p>
      <p>Some contents...</p>
    </a-modal>

    <!-- 操作记录 -->
    <div class="right">
      <a-list
        bordered
        :dataSource="data"
      >
        <a-list-item slot="renderItem" slot-scope="item, index">{{item}}</a-list-item>
        <div slot="header">操作记录</div>
        
      </a-list>
    </div>
    
    
  </div>
</template>

<script type="text/ecmascript-6">
  import {List} from 'ant-design-vue';
  import {requestStockList} from './api/index';
  const columns = [
    {
      dataIndex: 'stock_name',
      key: 'stock_name',
      slots: { title: 'customTitle' },
      scopedSlots: { customRender: 'stock_name' },
    }, 
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
    },
    {
      title: '当日涨跌幅',
      dataIndex: 'change',
      key: 'change',
    }, 
    {
      title: '操作',
      key: 'action',
      scopedSlots: { customRender: 'action' },
    }
  ];



export default {
  
  data() {
    return {
      data:[],
      columns,
      visible: false,
    }
  },
  async mounted() {
    let date = '2019-09-12';
    let fieldId = '27';
    let result = await requestStockList(date,fieldId);
    console.log(result.data);
    this.data = result.data;


  },
  methods: {
   
    showModal() {
      this.visible = true
    },
    handleOk(e) {
      console.log(e);
      this.visible = false
    },
    
    
    
  },
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">

#app
  display flex
  justify-content space-between
  width 90vw
  margin 50px auto
  .left
    width 60%
  .right
    width 30%
 
</style>
