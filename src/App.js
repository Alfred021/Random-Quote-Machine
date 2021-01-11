import React from 'react';
import './App.css';

class QuotesAndAuthors extends React.Component {

  render() {
    return(
      <div id="quote-box" class="card text-center">
          <div class="card-header">
            {this.props.quote.tag}
          </div>
      <div class="card-body">
        <blockquote class="blockquote mb-0">
          <p id="text"><i class="fas fa-quote-left"></i> {this.props.quote.text} <i class="fas fa-quote-right"></i> </p>
          <footer id="author" class="blockquote-footer"><cite title="Source Title">{this.props.quote.author}</cite></footer>
        </blockquote>
        <a id="tweet-quote" onClick={this.props.generateRandomQuote} href={'https://twitter.com/intent/tweet?hashtags=quotes&text=' +
          encodeURIComponent('"' + this.props.quote.text + '" ' + '\n' + '-' + this.props.quote.author)
      } class="btn btn-primary" target="_top"><i class="fab fa-twitter"></i> Tweet Quote</a>
        <button id="new-quote" type="button" class="btn btn-secondary" onClick={this.props.generateRandomQuote}>New Quote</button>
      </div>
    </div>
      )
    }
}

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      author: null,
      tag: null,
      text: null
    }
  }

getDataApi = async () => {
let fetchApi = await fetch('https://goquotes-api.herokuapp.com/api/v1/random?count=100')
let jsonApi = await fetchApi.json()
let quotesArr = jsonApi.quotes
this.setState({
  author: quotesArr[0].author,
  tag: quotesArr[0].tag,
  text: quotesArr[0].text,
  arr : quotesArr
})
}

componentDidMount() {
this.getDataApi()
}


generateRandomQuote = () => {
  let randomNumbers = Math.floor(Math.random() * this.state.arr.length);
   
  this.setState({
    author: this.state.arr[randomNumbers].author,
    tag: this.state.arr[randomNumbers].tag,
    text: this.state.arr[randomNumbers].text
  })
}


render() {
  return (
    <div class="container-fluid">
      <h1 class="text-center">Random Quote Machine</h1>
        <QuotesAndAuthors 
          generateRandomQuote={this.generateRandomQuote.bind(this)}
          quote={this.state}
        /> 
    </div>
  )
}
}

export default App;
