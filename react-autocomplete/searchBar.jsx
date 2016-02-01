var React = require('react');
var BS = require('react-bootstrap');

var ListAutoComplete = React.createClass({
	handleClickAuto:function(idx, e){
		this.props.onClick(idx);
	},
	render: function(){
		return(
				<ul className={this.props.show} key="key">
				{this.props.list.map(function(item, idx) {
					if(this.props.keyValue === idx){
						return(	<li className="liOver" key={idx} onClick={this.handleClickAuto.bind(this, item)}>{item}</li>)
					}
					else{
						return(	<li key={idx} onClick={this.handleClickAuto.bind(this, item)}>{item}</li>)
					}
			}.bind(this))}
				</ul>
			);
	}
});


var SearchBar = React.createClass({
	getInitialState:function(){
		return{
			json:this.props.data,
			autocomplete:[],
			show:"hidden",
			keyValue:-1,
			value:''
		}
	},
	handleEnter:function(event){
		if(event.keyCode === 13){
			var label = this.state.autocomplete[this.state.keyValue]
			this.props.onUserInput(
            	label
        	);
        	this.setState({show:"hidden"});
			event.preventDefault();
		}
	},
	handleKeyPress:function(e){
		e.preventDefault();
		if(e.keyCode === 38){
			var temp = this.state.keyValue;
			if(temp>-1){
				temp --;
				this.setState({keyValue:temp});
			}
			if(temp===-1){
				this.props.onUserInput(
	            	this.props.filterText
	        	);
			}
			else{
				var label = this.state.autocomplete[temp]
					this.props.onUserInput(
		            	label
		        	);
			}
		}
		else if(e.keyCode === 40){
			var temp = this.state.keyValue;
			if(temp<this.state.autocomplete.length - 1){
				temp++;
			}
			this.setState({keyValue:temp});
			if(temp===-1){
				/*this.props.onUserInput(
	            	this.props.filterText
	        	);*/
			}
			else{
				var label = this.state.autocomplete[temp]
					this.props.onUserInput(
		            	label
		        	);
			}
		}
		else{
		}
	},
	clickEventAutoComplete:function(autoCompleteValue){
		this.props.onUserInput(
            autoCompleteValue
        );
        this.setState({show:"hidden"});
	},
	handleBodyClick:function(event){
		this.setState({show:"hidden"});
	},
	handleChange: function(e) {
		var auto=[];
		if(e.target.value!==''){
			this.state.json.forEach(function(item){
				if( item.toLowerCase().indexOf(e.target.value.toLowerCase()) > -1){
					auto.push(item);
				}
			});
		}

		if(auto.length>0){
			this.setState({show:"term-list"});
		}
		else{
			this.setState({show:"hidden"});
		}

		this.setState({autocomplete:auto,
			value:this.refs.filterTextInput.value
		});

        this.props.onUserInput(
            this.refs.filterTextInput.value
        );
    },
    handleSubmit: function(event) {
    	this.props.onUserSubmit(
    		this.refs.filterTextInput.value
    		);
    },
	render : function(){
		var centerStyle={
			textAlign:'center',
		};	
		return(<div>
			<div className="searchBar" onClick={this.handleBodyClick}>
				<div className="search">
				<br />
				<input className="field" type="text" placeholder={this.props.placeholder} value={this.props.filterText}
					onKeyUp={this.handleKeyPress}
					onKeyDown={this.handleEnter}
					ref="filterTextInput"
                    onChange={this.handleChange} />
				<ListAutoComplete list={this.state.autocomplete} show={this.state.show} onClick={this.clickEventAutoComplete} keyValue={this.state.keyValue}/>
                <br />
                <div style={centerStyle}>
                <BS.Button className="search" type="button" onClick={this.handleSubmit} value="Search"> Search</BS.Button>
				</div>
				<br />
				</div>
			</div>
			</div>
			);
	}
});

module.exports = SearchBar;