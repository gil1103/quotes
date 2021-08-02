import { Fragment, useEffect } from 'react';
import { useParams, Route, Link, useRouteMatch } from 'react-router-dom';

import HighlightedQuote from '../components/quotes/HighlightedQuote';
import Comments from '../components/comments/Comments';
import useHttp from '../hooks/use-http';
import { getSingleQuote } from '../lib/api';
import LoadingSpinner from '../components/UI/LoadingSpinner';
// const QUOTES = [
// 	{
// 		id: 'q1',
// 		author: 'Gil',
// 		text: 'Learning React is fun'
// 	},
// 	{
// 		id: 'q2',
// 		author: 'Matan',
// 		text: 'Learning React is great'
// 	}
// ];

const QuoteDetails = () => {
	const match = useRouteMatch();
	const params = useParams();

	const { quoteId } = params;

	const {
		sendRequest,
		status,
		data: loadedQuote,
		error
	} = useHttp(getSingleQuote, true);

	useEffect(() => {
		sendRequest(quoteId);
	}, [sendRequest, quoteId]);

	if (status === 'pending') {
		return (
			<div className="centered">
				<LoadingSpinner />
			</div>
		);
	}

	if (error) {
		return <p className="centered">{error}</p>;
	}

	if (!loadedQuote.text) {
		return <p>no quote found!</p>;
	}

	return (
		<Fragment>
			<HighlightedQuote text={loadedQuote.text} author={loadedQuote.author} />
			<Route path={match.path} exact>
				<div className="centered">
					<Link className="btn--flat" to={`${match.url}/comments`}>
						Load Comments
					</Link>
				</div>
			</Route>
			<Route path={`${match.path}/comments`}>
				<Comments />
			</Route>
		</Fragment>
	);
};

export default QuoteDetails;

//alternative return
// return (
// 	<Fragment>
// 		<HighlightedQuote text={quote.text} author={quote.author} />
// 		{/* <Route path={`/quote/:quoteId/comments`}></Route> */}
// 		<Route path={`/quotes/${params.quoteId}`} exact>
// 			<div className="centered">
// 				<Link to={`/quotes/${params.quoteId}/comments`} className="btn--flat">
// 					Load Comments
// 				</Link>
// 			</div>
// 		</Route>
// 		<Route path={`/quotes/${params.quoteId}/comments`}>
// 			<Comments />
// 		</Route>
// 	</Fragment>
// );
