# React Forms

```js
import React from 'react';
import ReactDOM from 'react-dom';

class Form extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			username: ''
		};

		this.handleSubmit = (e) => {
			e.preventDefault();
			const username = e.target.username.value;

			this.setState({
				username: ''
			}); 
		};

		this.handleChange = (e) => {
			const inputField = e.target.name;
			const userInput = e.target.value;
			this.setState({
				[inputField]: userInput
			});
		};
	}

	render() {
		return (
			<div id="container">
				<div id="navbar">Form.js</div>
				<form onSubmit={this.handleSubmit}>
					<label htmlFor="username">Username:</label>
					<input type="text" name="username" onChange={this.handleChange} value={this.state.username} />
					<button type="submit">Submit</button>
				</form>
			</div>
		);
	}
}

ReactDOM.render(<Form />, document.getElementById('app'));
```