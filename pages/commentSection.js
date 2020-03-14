import { useState } from 'react';

const CommentSection = ({ articleId }) => {
	const [comments, setComments] = useState([]);
	const [showComments, setShowComments] = useState(false);
	// use this state to show a loader while the comments are fetching
	const [showLoader, setShowLoader] = useState(false);

	const hideComments = () => {
		setShowComments(false);
		setComments([]);
	}

	const fetchComments = async () => {
		setShowComments(true);
		setShowLoader(true);
		try {
			const commentsResponse = await fetch(`https://www.reddit.com/comments/${articleId}.json`);
			const commentsObj = await commentsResponse.json();
			
			setComments(commentsObj[1].data.children);
			setShowLoader(false);
		} catch(err) {
			console.log('Could not reach reddit server: ', err);
		}
	}

	return (
		<div className="comments">
			{showComments ? 
				<div>
					<button className="btn btn-info btn-sm" onClick={() => hideComments()}>Hide comments</button>

					{!showLoader &&
						<div>
							{comments.length > 0 ? 
								comments.map((comment, index) => {
									return <div key={index} className="comment">- {comment.data.body}</div>
								})
								: <div>No comments!</div>
							}
						</div>
					}

					{showLoader && <img src="/loader.gif" className="loader" />}

				</div>
				: <button className="btn btn-info btn-sm" onClick={() => fetchComments()}>Show comments</button>
			}
			
			<style jsx>
				{`
					.comments {
						min-height: 10vh;
						background-color: #FAEBD7;
						border-radius: 5px;
						padding: 15px;
					}

					.comment {
						line-height: 16px;
						margin: 20px 0px;
					}

					.loader {
						height: 48px;
						width: 96px;
					}
				`}
			</style>
		</div>
	);
}

export default CommentSection;