const quoteContainerEl = document.getElementById("quote-container");
const quoteEl = document.getElementById("quote");
const authorEl = document.getElementById("author");
const twitterEl = document.getElementById("twitter");
const newQuoteEl = document.getElementById("new-quote");
const loader = document.getElementById('loader');

// Show loader 
function loading(){
	loader.hidden = false;
	quoteContainerEl.hidden = true;
}

// Hide loading
function unload() {
	if(!loader.hidden){
		loader.hidden = true;
		quoteContainerEl.hidden = false;
	}
}
//Get Quote from API 
async function getQuote() {
	loading();
	// const proxyURL = "https://cors-anywhere.herokuapp.com/";
	const proxyURL = "http://localhost:3000/joke";
	// const apiURL =	"http://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=json";
	// const apiURL = "https://v2.jokeapi.dev/joke/Any";
	try {
		const res = await fetch(proxyURL);
		const data = await res.json();
		if(data.quoteAuthor === ''){
			authorEl.innerText = 'Unknown';
		}else {
			authorEl.innerText = data.quoteAuthor;
		}
		console.log(data);
		if(data.quoteText > 120){
			quoteEl.classList.add('long-quote');
		}else {
			quoteEl.classList.remove("long-quote");
		}
		quoteEl.innerText = data.quoteText;
		unload();
	} catch (error) {
		getQuote();
	}
}

function tweetQuote() {
	const text = quoteEl.innerText;
	const author = authorEl.innerText;
	const tweetURL = `https://twitter.com/intent/tweet?text=${text} - ${author}`;
	window.open(tweetURL, '_blank');
}

newQuoteEl.addEventListener("click", getQuote);
twitterEl.addEventListener("click",tweetQuote);

// On Load
getQuote();

