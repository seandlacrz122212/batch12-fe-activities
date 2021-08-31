const quoteContainer = document.querySelector(".js-quote");

const day_msg = new Array(6);
const random_num = Math.floor(Math.random()*6);

// list of quotes
function showQuotes(){ 
  day_msg[0] = 'The Best Way To Get Started Is To Quit Talking And Begin Doing<b>';
  day_msg[1] = 'Don&#39t Let Yesterday Take Up Too Much Of Today<b>';
  day_msg[2] = 'It&#39s Not Whether You Get Knocked Down, It&#39s Whether You Get Up<b>';
  day_msg[3] = 'Whether You Think You Can Or Think You Can&#39t, You&#39re Right<b>';
  day_msg[4] = 'We Generate Fears While We Sit. We Overcome Them By Action<b>';
  day_msg[5] = 'We May Encounter Many Defeats But We Must Not Be Defeated<b>';
}
// load quotes
function loadQuotes(){
  showQuotes();

  const quote_msg = document.createElement("p");
  quote_msg.className = "quote_msg";
  quote_msg.innerHTML = `${day_msg[random_num]}`;
  quoteContainer.appendChild(quote_msg);
}

function init(){
  loadQuotes();
}

init();