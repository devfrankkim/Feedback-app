import PropTypes from "prop-types";

function FeedbackStats({ feedback }) {
  // calculate average ratings
  let average =
    feedback.reduce((prev, next) => {
      return prev + next.rating;
    }, 0) / feedback.length;

  // Regular expression > only 1 decimal if any
  average = average.toFixed(1).replace(/[.,]0$/, "");

  return (
    <div className="feedback-stats">
      <h4>{feedback.length} Reviews</h4>
      <h4>Average Rating: {isNaN(average) ? 0 : average}</h4>
    </div>
  );
}

FeedbackStats.propTypes = {
  feedback: PropTypes.array.isRequired,
};

export default FeedbackStats;
