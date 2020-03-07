/* 
包含n个接口请求函数的模块
*/
import ajax from './ajax';


export const requestStockList = (date,fieldId) => ajax.post('/stock/api/stockListByDateAndField',{date,fieldId})