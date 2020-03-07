<template>
  <div id="selectContainer">
    <div class="date">
      <a-date-picker @change="handleChange"></a-date-picker>
    </div>

    <div class="field">
       <a-select
        style="width: 200px"
        @change="handleChange"
      >
        <a-select-option v-for="item in fieldList" :key="item.fieldId">
          {{item.fieldName}}
        </a-select-option>
      </a-select>
    </div>
    
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    data() {
      return {
        date:'',
        fieldId:'',
        fieldList:[
          {
            fieldId:'66',
            fieldName:'金融业'
          },
          {
            fieldId:'70',
            fieldName:'房地产业'
          },
          {
            fieldId:'27',
            fieldName:'制造业'
          },
          {
            fieldId:'77',
            fieldName:'设施管理业'
          },
          {
            fieldId:'37',
            fieldName:'制造业'
          },
          {
            fieldId:'90',
            fieldName:'综合'
          },
          {
            fieldId:'48',
            fieldName:'建筑业'
          },
          {
            fieldId:'09',
            fieldName:'采矿业'
          },
        ]
      }
    },
    
    methods: {
      
      handleChange(value,date) {
        if(typeof(value)==='string'){
          //console.log(value);
          this.field = value;
        }
        if(typeof(date)==='string'){
          //console.log(date);
          this.date = date;
        }
        if(this.date&&this.field){
          console.log('12345678');
          this.$EventBus.$emit('getStockList',{
            field:this.field,
            date:this.date
          });
        }
      },
    },
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
#selectContainer
  height 300px
  width 86vw
  margin 50px auto
  padding 0 2vw
  display flex
  justify-content space-between
  
  
    
 
</style>
