import React, { Component } from 'react'
import {Motion, spring} from 'react-motion';

// import deepstream from 'deepstream.io-client-js'

import  '../static/css/basic.css';

import hamster from '../static/swf/hamster.swf'

class Item extends Component {
	constructor(props) {
	  super(props);
	
	  this.state = {
	  	message: "red"
	  }
	}

	_handleClickDelete = () => {
		const { id } = this.props.item
		const { actions } = this.props
		actions.deleteTodo(id)
		
		//delete
		//console.log(id);
		//console.log(actions)
	}

	

	_onKeyUp = e => {
		e.keyCode === 13 && this._handler()
		let inputValue = this.refs.edit.value
		const { id } = this.props.item
		const { actions } = this.props
		actions.editTodo(id, inputValue)
	}

	_handler = () => {
		//console.log("888")
		let inputValue = this.refs.edit.value
		const { id } = this.props.item
		const { actions } = this.props
		actions.editTodo(id, inputValue)
		/*this.setState({
			edit: false
		})*/
		
	}

	render() {
		const { item } = this.props
		const { onMouseDown, onTouchStart, style } = this.props
		//console.log(order)
		return (
				<div>
					<div className="hamster">
						<embed  width='200' height='150' style={{ position:'absolute', bottom:50, right:50}}   src={hamster}  name="honehoneclock" >
						</embed>
					</div>
					<div
						className="list-item"
						onMouseDown={onMouseDown}
						onTouchStart={onTouchStart}
						style={style}
					>
						
						<span className="edit"> {item.id}--{this.props.order}--{item.text} </span>
						<button className="destroy" onClick={this._handleClickDelete}></button>
					</div>
				</div>
		);
	}
}



function reinsert(arr, from, to) {
  const _arr = arr.slice(0);
  const val = _arr[from];
  _arr.splice(from, 1);
  _arr.splice(to, 0, val);
  return _arr;
}

function clamp(n, min, max) {
  return Math.max(Math.min(n, max), min);
}

const springConfig = {stiffness: 300, damping: 50};


export default class Motions extends Component {
	constructor(props) {
	  super(props);
	  this.state = {
	  		ListItem: props.ListItem,
	  		order: props.order,
	      	topDeltaY: 0,
	      	mouseY: 0,
	      	isPressed: false,
	      	originalPosOfLastPressed: 0
	    }
	    
	    //this.ds = deepstream('wss://035.deepstreamhub.com?apiKey=88608cc8-5ece-419f-ad20-0b21d70c7526')
		//this.client = this.ds.login()

        //this.record = this.client.record.getRecord('todos')
	}

	componentWillMount() {
		//component will loading
	}


	componentDidMount() {
	    window.addEventListener('touchmove', this.handleTouchMove);
	    window.addEventListener('touchend', this.handleMouseUp);
	    window.addEventListener('mousemove', this.handleMouseMove);
	    window.addEventListener('mouseup', this.handleMouseUp);
	    
	}
    
    //remove dom
    componentWillUnmount(){  
        
        //clear dom operator in componentDidMount period
        window.removeEventListener('touchmove', this.handleTouchMove)
        window.removeEventListener('touchend', this.handleMouseUp)
        window.removeEventListener('mousemove', this.handleMouseMove)
        window.removeEventListener('mouseup', this.handleMouseUp)
        
    } 
	
	//component will update
	componentWillUpdate(nextProps, nextState) {
		const { actions } = this.props
		//add
		if (nextProps.ListItem.length > this.props.ListItem.length) {

			console.log('nextProps--',nextProps.order)
			console.log('nextState---',nextState.order)
			console.log('state_this---', this.state.order)

			let this_state_order = nextProps.order
			if (this_state_order.length >= 1) {
				this_state_order.unshift(Math.max(...this_state_order) + 1)
			} else {
				this_state_order.unshift(0)
			}
			
			console.log("add-order" + this_state_order)
			//console.log(nextProps.ListItem )
			/*console.log(nextProps.ListItem.map((con, i) => {
				return(con.text+ "---" +i)
			}))*/
			//console.log(nextProps.ListItem.length > this.props.ListItem.length)
			actions.changeOrder(this_state_order)
			
			//console.log(nextProps.ListItem)
			this.setState({
				ListItem: nextProps.ListItem,
				order: nextProps.order
			})
			
		}

		//delete
		if (nextProps.ListItem.length < this.props.ListItem.length) {
			//console.log(nextState)

			//console.log('nextProps.ListItem.length---',nextProps.ListItem.length)
			//console.log('this.props.ListItem.length--',this.props.ListItem.length)
			let com = Array.from(new Set([...new Set(nextState.order)]
						.filter(item =>
							!new Set(nextProps.ListItem.map(i => i.id)).has(item)
							)
						)
					)[0]

			//console.log('com---'+ com)
			let next_state_order = nextState.order
			next_state_order.splice(nextState.order.indexOf(com), 1)

			actions.changeOrder(next_state_order)
			//console.log('delete')
			console.log("delete---"+next_state_order)
			
			//setState
			this.setState({
				ListItem: nextProps.ListItem,
				order: nextProps.order
			})
			console.log(nextProps.order)
			
            //forEach  index = i
            //todos中的index 和order中的i对应
                /*let index = -1;
                nextProps.ListItem.forEach(({time}, i) => {
                    if (time === action.text) {
                        index = i;
                    }
                });
                
                //how to delete 
                const newTodos = [...this.state.todos.slice(0, index), ...this.state.todos.slice(index + 1, this.state.todos.length)];
        
                const inOrderIndex = this.state.order.indexOf(index);
                let newOrder = [...this.state.order.slice(0, inOrderIndex), ...this.state.order.slice(inOrderIndex + 1, this.state.order.length)];
                newOrder = newOrder.map(i => {
                    if (i > index) {
                        return i - 1;
                    }
                    return i;
                });*/
		}


		//console.log(nextProps.ListItem)
		//console.log(nextProps.order)

		//remove All
		if (nextProps.ListItem.length === 0){
			
			let new_order = nextState.order.splice(0, nextState.order.length);
			//actions.changeOrder(new_order)
			console.log(new_order)
			
		}
		
		
	}


	handleTouchStart = (key, pressLocation, e) => {
	    this.handleMouseDown(key, pressLocation, e.touches[0]);
	 }

	handleMouseDown = (pos, pressY, {pageY}) => {
		 this.setState({
		      topDeltaY: pageY - pressY,
		      mouseY: pressY,
		      isPressed: true,
		      originalPosOfLastPressed: pos
	    });
		
		
	}

	handleTouchMove = (e) => {
    	//e.preventDefault();
    	this.handleMouseMove(e.touches[0]);
  	}

  	handleMouseMove = (e) => {
  		
  		//判断是浏览器还是手机
  		 const a = navigator.userAgent;
    	//use navigator to judge browser or ios & android,
	    if(a.indexOf("Android") !== -1 || a.indexOf("iPhone") !== -1 || a.indexOf("iPad") !== -1 ){
				
	         //console.log('this is ios & Android & iPad')
		
		}else if(a.indexOf('browser')) {
	    	e.preventDefault();
		}
		
  		const { actions, order } = this.props
	    const {isPressed, topDeltaY, originalPosOfLastPressed} = this.state;

	    if (isPressed) {
			const mouseY = e.pageY - topDeltaY;
			const currentRow = clamp(Math.round(mouseY / 100), 0, order.length - 1);
			let newOrder = order;

			if (currentRow !== order.indexOf(originalPosOfLastPressed)){
				newOrder = reinsert(order, order.indexOf(originalPosOfLastPressed), currentRow);
			}
			
			actions.changeOrder(newOrder)

			 this.setState({
			 	mouseY: mouseY,
			 	order: newOrder
			 })
			
			//console.log("newOrder---"+ newOrder)
			
	    }
	  }

	handleMouseUp = () => {
		 this.setState({
		 	isPressed: false,
		 	topDeltaY: 0
		 })

  	}

	render() {
		const { order } = this.props
		const { ListItem, mouseY, isPressed, originalPosOfLastPressed } = this.state
		// const state_order = this.state.order;
		//console.log("props_order", order)
		//console.log("state_order", state_order)
		
		return (
			<div className='out-box'>
				
				{ListItem.map((item, i) =>
					{
						const style = originalPosOfLastPressed === item.id && isPressed ? {
			                scale: spring(1.1, springConfig),
			                shadow: spring(16, springConfig),
			                y: mouseY
			              }
			            : {
			                scale: spring(1, springConfig),
			                shadow: spring(1, springConfig),
			                y: spring(order.indexOf(item.id) * 100, springConfig)
			              }

			             return (
			             	<Motion style={style} key={i}>
				              {({scale, shadow, y}) =>
								
				              	<Item
				              		item={item}
				              		actions={this.props.actions}
				              		key={i}
				              		onMouseDown={this.handleMouseDown.bind(null, item.id, y)}
				                  	onTouchStart={this.handleTouchStart.bind(null, item.id, y)}
				                  	style={{
					                    boxShadow: `rgba(0, 0, 0, 0.2) 0px ${shadow}px ${2 * shadow}px 0px`,
					                    transform: `translate3d(0, ${y}px, 0) scale(${scale})`,
					                    WebkitTransform: `translate3d(0, ${y}px, 0) scale(${scale})`,
					                    zIndex: item.id === originalPosOfLastPressed ? 99 : item.id
				                  	}}
				                  
				              	/>
				              	
				              }
				            </Motion>
			             )
					}
				)}
			</div>
		);
	}
}