import React, { Component } from 'react';
import propTypes from 'prop-types';

class QuestionsAndComments extends Component {
likeQuestion = (e) => {
  e.preventDefault();
  const questionId = e.target.id;
  const { upvote } = this.props;
  upvote(questionId);
}

postComment = (e) => {
  e.preventDefault();
  const questionId = parseInt(e.target.id, 10);
  const data = {
    question_id: questionId,
  };

  const { target } = e;
  const formData = new FormData(target);

  for (const entry of formData.entries()) {
    const [keys, values] = entry;
    data[keys] = values;

    target.reset();
  }

  const { comment } = this.props;
  comment(data);
}

render() {
  const { data } = this.props;
  return (
    <div id="questions">
      { data && data.map(question => (
        <div className="question-cont" key={question.questionId}>
          <h3>{question.title}</h3>
          <div className="likes-dis">
            <div className="upvote">
              <i className="far fa-thumbs-up" id={question.questionId} onClick={this.likeQuestion} role="presentation" />
              <span>{question.votes}</span>
            </div>
          </div>
          <div id="comment">
            <form className="post-comment" onSubmit={this.postComment} id={question.questionId}>
              <input type="text" className="form-input comment" name="comment" placeholder="comment" autoComplete="off" required />
              <button type="submit" className="submit-comment" id={question.questionId}>Send</button>
            </form>
          </div>
          <div className="commen-sct">
            <h3 className="comment-head">Comments</h3>
            {question.comment && question.comment.map(comment => (
              <div className="comment-cont" key={comment}>
                <p className="comment">{comment === null ? 'be the first to comment' : comment }</p>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
}

QuestionsAndComments.defaultProps = {
  data: propTypes.arrayOf(propTypes.shape),
};

QuestionsAndComments.propTypes = {
  data: propTypes.arrayOf(propTypes.shape),
  upvote: propTypes.func.isRequired,
  comment: propTypes.func.isRequired,
};

export default QuestionsAndComments;
