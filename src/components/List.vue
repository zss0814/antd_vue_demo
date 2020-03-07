<template>
  <div id="listContainer">
    <div class="left">
      <!-- 股票展示-->
      <a-table :columns="columns" :dataSource="stockList" :pagination="{ pageSize: 4 }" >
        <a slot="stock_name" slot-scope="text" href="javascript:;">{{text}}</a>
        <span slot="customTitle"> 股票名称</span>
        <span slot="action" slot-scope="text">
          <a href="javascript:;"  class="ant-dropdown-link" @click='showModal(text)'>
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
      okText='买入/售出'
    >
      <p>股票名称:{{currentStock.stock_name}}</p>
      <p>交易数量：1000股（大于零买入，小于零售出）</p>
      <p>股票单价：{{currentStock.value_close}}</p>
    </a-modal>

    <!-- 操作记录 -->
    <div class="right" >
      <a-list
        bordered
        :dataSource="recordList"
        
      >
        <a-list-item slot="renderItem" v-for="item in recordList" :key="item.stock_name">
          <div >{{item.stock_name}}</div>
          <div >{{item.currentDate}}</div>
          <div >{{item.amount+'股'}}</div>
          <div >{{item.amount*item.value_close+'元'}}</div>
        </a-list-item>
      
        <div slot="header">操作记录</div>
        
      </a-list>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import Vue from 'vue';
  import {requestStockList} from '../api/index';
  


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
        filters: [
            { text: '涨', value: '涨' },
            { text: '跌', value: '跌' },
          ],
        // filteredValue: this.filteredInfo.status || null,
        onFilter: (value, record) => record.status===value,
        
        
      },
      {
        title: '当日涨跌幅',
        dataIndex: 'change',
        key: 'change',
        sorter: (a, b) => b.change.slice(0,-1)*100 - a.change.slice(0,-1)*100,
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
      stockList:[],
      recordList:[],
      currentStock:{},
      columns,
      visible: false,
      currentDate:'2019-09-12',
      amount:1000,
    }
  },
  mounted() {

    //根据行业、日期请求数据
    this.$EventBus.$on('getStockList',async(obj)=> {
      
      this.currentDate = obj.date;
      let result = await requestStockList('2019-09-12','27');
      

      result.data.forEach(item => {
        Vue.set(item,'key',item.stock_name);
        Vue.set(item,'change',Math.floor((item.value_close - item.value_open)*10000)/100 + '%');
        if(item.value_close > item.value_open){
          Vue.set(item,'status','涨');
        }else{
          Vue.set(item,'status','跌');

        }
      })
      
      this.stockList = result.data;
    })
    
    


  },
  methods: {
   
    showModal(text) {
      
      
      this.currentStock = text;
      this.visible = true;
      
    },
    handleOk(e) {
     
      this.visible = false;
      const {stock_name,value_close} = this.currentStock;
      const {currentDate,amount} = this;
      this.recordList.unshift({
        stock_name,
        value_close,
        currentDate,
        amount
      });
    },
    
    
    
  },
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
#listContainer
  display flex
  justify-content space-between
  width 90vw
  margin 50px auto
  .left
    width 60%
    
  .right
    width 30%
    height 277px
    overflow hidden
 
</style>
