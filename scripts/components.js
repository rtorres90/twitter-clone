class ParentPage extends React.Component {
	constructor(){
		super();
		const currentUser = {"id": Math.floor((Math.random() * 10000) + 1), "userName": prompt("Enter an user name")};
		this.state = {
			currentUser: currentUser,
			tweets: [
				{"id": 1, "tweetText": "hi there", "userId": 0},
				{"id": 2, "tweetText": "hola mundo", "userId": 0}
			],
			users: [
				{"id": 0, "userName": "Optimus Prime"},
				currentUser
			]
		};
	}

	_addTweet(tweetText){
		const newTweet = {
			'id': this.state.tweets.length + 1,
			'tweetText': tweetText,
			'userId': this.props.currentUser.id
		};

		this.setState({
			tweets: this.state.tweets.concat([newTweet])
		});
	}

	render() {
		return (
			<div className="div-bordered">
				<div className="row div-bordered">
					<div className="div-bordered col-md-2">
						<ProfileBox currentUser={this.state.currentUser}/>
					<br/>
					</div>-
					<div className="col-md-10">
						<NewTweetForm addTweet={this._addTweet.bind(this)}/>
					</div>
				</div>
				<div className="row div-bordered">
					<div className="col-md-offset-2 col-md-10">
						<TweetsBox tweets={this.state.tweets} users={this.state.users}/>
					</div>
				</div>
			</div>
		);
	}
}

class ProfileBox extends React.Component{
	render(){
		return(
			<div>
				<b>{this.props.currentUser.userName}#{this.props.currentUser.id}</b>
			</div>
			);
	};
}

class NewTweetForm extends React.Component{
	render(){
		return(
			<div>
				<form onSubmit={this._handleSubmit.bind(this)}>
					<div className="form-group">
						<label>Comments</label>
						<textarea className="form-control" placeholder="Add a Comment" ref={(textarea) => this._comment = textarea}></textarea>
					</div>
					<button type="submit" className="btn btn-default">Submit</button>
				</form>
			</div>
			);
	}

	_handleSubmit(event){
		event.preventDefault();

		this.props.addTweet(this._comment.value);
	}
}

class TweetsBox extends React.Component{
	_getTweetsData(){
		return (this.props.tweets);
	}

	_getTweetsComponents(){
		return(
			this._getTweetsData().map((tweet) => <Tweet key={tweet.id} tweetText={tweet.tweetText}/>)
			);
	}

	render(){
		return(
			<div>
				{this._getTweetsComponents()}
			</div>
			);
	}
}

class Tweet extends React.Component{
	render(){
		return(
			<div className="tweet">
				<p>{this.props.userName</p>
				<p>{this.props.tweetText}</p>
			</div>
			);
	}
}


ReactDOM.render(
	<ParentPage/>, document.getElementById('twitter-clone-app')
);
