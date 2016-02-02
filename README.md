# React-autocomplete-search

A react based autocomplete module which allow you to append an search box with autocomplete feature in reactjs.

## Install

```
npm react-autocomplete-search --save
```
## Usage
 ```js
var React = require('react');
var BS = require('react-bootstrap');
var SearchBar = require('react-autocomplete-search');
require('./autoComplete.css');

var Demo = React.createClass({
	getInitialState:function(){
		return{
			searchValue:'',
			input:''
		}
	},
	handleUserInput:function(value){
      this.setState({input:value});
    },
    handleSubmit:function(group){
      console.log("Submit Called");
    },
	render:function(){
	var styleBox = {
		width : "500px",
		margin:"0 auto"
	};
	var styleButton = {
		textAlign:"center"
	};
	var empty;
	var monthNames = ['January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December', ];
		return(
				<div style={styleBox}>

				 <SearchBar 
				 	onUserSubmit={this.handleSubmit} 
				 	onUserInput={this.handleUserInput} 
				 	filterText={this.state.input}
				 	placeholder="Search AutoComplete" 
				 	data={monthNames} />
				</div>
			);
	}
});
 ```
## Functions

> handleUserInput: This function will receive each value passed to the input.


> handleSubmit: This will receive the text finally submitted by the user. Response call be 
> used to be passed as argument to a post request or any function.

## Input JSON
>Input value is accepted in the format as mentioned below.
>var monthNames = ['January', 'February', 'March',
>                    'April', 'May', 'June',
>                    'July', 'August', 'September',
>                    'October', 'November', 'December', ];

## Custom css classes
```
.field for input text.
.search for search button
```
### Version
1.0.2
