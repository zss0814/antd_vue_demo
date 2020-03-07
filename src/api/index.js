/* 
包含n个接口请求函数的模块
*/
import ajax from './ajax';

//请求股票列表
export const requestStockList = (date,fieldId) => ajax.post('/stock/api/stockListByDateAndField',{date,fieldId})

//请求当前股票
// export const requestStockList = (date,fieldId) => ajax.post('/stock/api/stockTrade',{date,fieldId})