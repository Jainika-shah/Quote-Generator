// variable declarations
let quotesList = [];
const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const twitterBtn = document.getElementById('twitter-btn');
const newBtn = document.getElementById('new-quote');
const loader = document.getElementById('loader');

function showLoadingSpinner(){
    loader.hidden = false;
    quoteContainer.hidden = true;
}

function removeLoadingSpinner(){
    loader.hidden = true;
    quoteContainer.hidden = false;
}

// Getting a random quote
function newQuote(){
    showLoadingSpinner();

    //Getting a random index number.
    randomNo = Math.floor(Math.random() * quotesList.length);
    
    quote = quotesList[randomNo]['text'];
    author = quotesList[randomNo]['author'];

    // changing the size of text based on its length to make it look better.
    if (quote.length > 100){
        quoteText.classList.add('long-quote');
    }else{
        quoteText.classList.remove('long-quote');
    }

    // displaying the quote.
    quoteText.textContent = quote;
    removeLoadingSpinner();

    // If author is null, then assigning anonymous value to it, else the author name
    if (!author){
        authorText.textContent = 'anonymous';    
    }
    else{
        authorText.textContent = author;
    }
}

// Tweet button functionality
function tweetQuote(){
    const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`;
    window.open(twitterUrl, '_blank');
}

// Get quotes from API
async function getQuotes() {
    showLoadingSpinner();
    const apiUrl = 'https://type.fit/api/quotes';
    try{
        const apiResponse = await fetch(apiUrl);
        quotesList = await apiResponse.json();
        newQuote();
    }
    catch(error){
        // If API doesnt work, then using the local qoutes.
        console.log('Using the local quotes');
        quotesList = localQuotes;
        newQuote();
    }
}

// adding event listeners to buttons.
twitterBtn.addEventListener('click',tweetQuote);
newBtn.addEventListener('click',newQuote);

getQuotes();

// Functionality:
// 1. project : A site that takes quotes from an api, allows to see more new quotes and has a tweet sharing functionality. 
// 2. This generates random quote on every refresh or on pressing new quote btn.
// 3. On clicking the twitter btn, a new tab will be opened that will pre-populate the quote
// into your twitter tweet box. 
// 4. Also, if at any point, the api didnt worked, then it will catch the error and will show
// quotes from the local file quotes.js  
// 5. I have used : 
    // - twitter api
    // - quotes api
    // - font awesome
   
