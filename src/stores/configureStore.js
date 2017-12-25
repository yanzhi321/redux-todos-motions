	// 创建Store非常简单。createStore 有两个参数，Reducer 和 initialState。  将reducer的数据更新拿过来，然后如果没有更新的话就传一个默认值

//store(reducer, initialState){}

import { createStore } from 'redux'
import rootReducers from '../reducers'

const configureStore = function(initialState){

	const store = createStore(rootReducers, intialState);

	return store;

}

export default configureStore