import React from 'react'
import Motions from './Motions'

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as TodoActions from '../actions'

import deepstream from 'deepstream.io-client-js'

import clock from '../static/swf/honehone_clock_wh.swf'
import '../static/css/basic.css'


class Main extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			text: 'enter data',
		}

	}

	//component will loading
	componentWillMount() {

		/*this.record.set({
			text: this.state.text
		})

		this.record.subscribe(data => {
			this.setState({
				text: data.text
			})
		})*/
		
	}

	_onKeyUp = (e) => {
		
		//alert
		
		e.keyCode === 13 && this._addData()
		//console.log(e.target.value)
		this.setState({
			text: ''
		})
		
	}
	_addData = (e) => {
		
		console.log(this.props)

		const { actions } = this.props
		let inputValue = this.refs.myInput.value
		//alert
		if(inputValue == ''){
			alert("please input")
			return false;
		}
		actions.addTodo(inputValue)
		
		//append and empty
		const inputValues = this.refs.myInput.value = ''
		this.setState({
			text: inputValues
		})
		
		//focus() 获取焦点
		const myInput = this.refs.myInput
		myInput.focus()
		//console.log('inputValue--'+inputValue)		
	}
	
	//removeData
	_removeData = () => {
		const { actions } = this.props
		const { todos } = this.props
		actions.removeTodo(todos)
		const inputValue = this.refs.myInput.value = ''
		
		//console.log(todos)
		this.setState({
			text: inputValue,
			todos: []
		})
		
		//focus 获取焦点
		const myInput = this.refs.myInput
		myInput.focus()
		
	}

	render() {
		const { todos, order, actions } = this.props
		const { text } = this.state
		/*todos.map( (con,i) => {
			console.log(con.id);
		} )*/
		//console.log(actions);
		return (
			<div className='container'>
				<div style={{width:300, height:150, border:'1px solid #ccc', background:"#fff", position:'absolute', bottom: 50, left: 50 }}>
					<div style={{position:"absolute", width:300, height:'20px', background:"#fff", }}></div>
					<div style={{position:"absolute", width:300, height:'20px', background:"#fff", bottom:0}}></div>
					
					<embed src={clock} style={{width:300,height:150}}></embed>
				</div>
				<div className="input-text">
					<input 
						type="text" 
						placeholder='enter data'
						autoFocus={true}  
						ref="myInput" 
						onKeyUp={this._onKeyUp}
					/>
					<button onClick={this._addData}>Add+{todos.length}</button>
					<button onClick={this._removeData}>Remove</button>
				</div>
		    	<Motions ListItem={todos} order={order} actions={actions} />
			</div>
		);
	}
}



const mapStateToProps = state => ({
	todos: state.todos,
	order: state.order
})

const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators(TodoActions, dispatch)
})

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Main)
