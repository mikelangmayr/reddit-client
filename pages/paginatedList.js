import { useState, useEffect } from 'react';

import CommentSection from './commentSection';

const PaginatedList = (props) => {
	// deconstruct props
	const { list: inputList, pageSize = 4 } = props;

	// define states
	const [currentPage, setCurrentPage] = useState(inputList.length > 5 ? inputList.slice(0, pageSize): inputList);
	const [currentIndex, setCurrentIndex] = useState(0);
	
	// set effect for list change
	useEffect(() => updateInputList(inputList, setCurrentPage, pageSize), [props.list]);

	return (
		<>
			{currentPage.map((article, index) => {
				return (
					<div key={index} className="article">
						{isUrl(article.data.thumbnail) && <img src={article.data.thumbnail} className="thumbnail" />}
						<strong className="px-2">{article.data.title}</strong>
						<br />
						<CommentSection articleId={article.data.id} />
					</div>
				)
			})}
			<nav>
        <ul className="pagination">
          <li className={`page-item ${currentIndex == 0 && "disabled"}`}>
            <a className="page-link" href="#" tabIndex="-1" onClick={() => showPreviousPage({inputList, setCurrentPage, setCurrentIndex, currentIndex, pageSize})}>Previous</a>
          </li>
          <li className="page-item active">
            <a className="page-link" href="#">{currentIndex} <span className="sr-only">(current)</span></a>
          </li>
          <li className={`page-item ${hasNextPage(inputList.length, currentIndex, pageSize) || "disabled"}`}>
            <a className="page-link" href="#" onClick={() => showNextPage({inputList, setCurrentPage, setCurrentIndex, currentIndex, pageSize})}>Next</a>
          </li>
        </ul>
      </nav>

			<style jsx>{`
				.article {
					background-color: #F5F5DC;
					min-height: 20vh;
					line-height: 10vh;
					border-radius: 5px;
					margin: 5px 0px;
				}
				
				.comments {
          min-height: 10vh;
          line-height: 10vh;
				}

        .thumbnail {
          height: 8vh;
          padding-right: 1rem;
				}
			`}
			</style>
		</>)
}

function showNextPage({ inputList, setCurrentPage, setCurrentIndex, currentIndex, pageSize }) {
	const newIndex = currentIndex + 1;
	const newFirstElement = newIndex * pageSize;
	
	setCurrentPage(inputList.slice(newFirstElement, Math.min(newFirstElement + pageSize, inputList.length - 1)));
	setCurrentIndex(newIndex);
}

function showPreviousPage({ inputList, setCurrentPage, setCurrentIndex, currentIndex, pageSize }) {
	const newIndex = currentIndex - 1;
	const newFirstElement = newIndex * pageSize;
	
	setCurrentPage(inputList.slice(Math.max(newFirstElement, 0), newFirstElement + pageSize));
	setCurrentIndex(newIndex);
}

function hasNextPage(listLength, currentIndex, pageSize) {
	const maxIndex = parseInt(listLength / pageSize) + (listLength % pageSize !== 0) - 1;
	
	return currentIndex < maxIndex;
}

function updateInputList(inputList, setCurrentPage, pageSize) {
	setCurrentPage(inputList.length > 5 ? inputList.slice(0, pageSize): inputList);
}

// check if string is a url
function isUrl(url) {
	return url.indexOf('://') != -1;
}

export default PaginatedList;