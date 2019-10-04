var simpleslider = require('simple-slider');

var slider = document.querySelector('.slider');
if(slider) {
  simpleslider.getSlider({
    container: slider,
    duration: 1.5,
    delay: 5,
    prop: 'opacity',
    unit: '',
    init: 0,
    show: 1,
    end: 0,
  });
};


(function() {

  // Get all the <h3> headings
  const headings = document.querySelectorAll('.section--faqs h3')

  Array.prototype.forEach.call(headings, heading => {
    // Give each <h3> a toggle button child
    // with the SVG plus/minus icon
    heading.innerHTML = `
      <button aria-expanded="false">
        ${heading.textContent}
        <svg width="46" height="46" viewBox="0 0 46 46">
          <path fill="#83D6C1" stroke="#0D1D48" stroke-width="4" stroke-miterlimit="10" d="M32.1 23.1v16.2l-14-8.1L4 23.1l14.1-8.2 14-8.1z"/>
        </svg>

      </button>
    `

    // Function to create a node list
    // of the content between this <h3> and the next
    const getContent = (elem) => {
      let elems = []
      while (elem.nextElementSibling && elem.nextElementSibling.tagName !== 'H3') {
        elems.push(elem.nextElementSibling)
        elem = elem.nextElementSibling
      }

      // Delete the old versions of the content nodes
      elems.forEach((node) => {
        node.parentNode.removeChild(node)
      })

      return elems
    }

    // Assign the contents to be expanded/collapsed (array)
    let contents = getContent(heading)

    // Create a wrapper element for `contents` and hide it
    let wrapper = document.createElement('div')
    wrapper.hidden = true

    // Add each element of `contents` to `wrapper`
    contents.forEach(node => {
      wrapper.appendChild(node)
    })


    // Add the wrapped content back into the DOM
    // after the heading
    heading.parentNode.insertBefore(wrapper, heading.nextElementSibling)

    // Assign the button
    let btn = heading.querySelector('button')

    btn.onclick = () => {



      // Cast the state as a boolean
      let expanded = btn.getAttribute('aria-expanded') === 'true' || false

      // Close all others if this one isn't open
      if( !expanded ) {
        wrapper.parentNode.querySelectorAll('div').forEach(node => {
          node.hidden = true;
        })
        wrapper.parentNode.querySelectorAll('button').forEach(btn => {
          btn.setAttribute('aria-expanded', false)
        })

      }

      // Switch the state
      btn.setAttribute('aria-expanded', !expanded)
      // Switch the content's visibility
      wrapper.hidden = expanded
    }
  })
})()



/*
** Trailer on film pages
*/
var trailerContainer = document.querySelector('.single-listing--trailer');
var trailerIframe = document.querySelector('.single-listing--trailer--iframe');
var trailerButton = document.querySelector('.trailer-button');
var closeTrailerButton = document.querySelector('.close-trailer-button');

if(trailerButton) {
  var trailerID = trailerButton.dataset.iframe;
}
if(trailerID) {

    var tag = document.createElement('script');
    tag.src = "//www.youtube.com/iframe_api";
    var firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
    window.onYouTubeIframeAPIReady = function() {

      youtubePlayer = new YT.Player(trailerIframe, {
        height: '390',
        width: '640',
        videoId: trailerID,
        events: {
          'onReady': onPlayerReady,
        }
      });
    }

  if(window.innerHeight > window.innerWidth) {
    trailerIframe.style.width = '100%';
  }
  else {
    trailerIframe.style.width = '75%';
  }
  trailerIframe.style.height = (trailerIframe.clientWidth) * (9/16) + 'px';

}

// 4. The API will call this function when the video player is ready.
window.onPlayerReady = function(event) {
  connectTrailerButton();
  trailerButton.classList.add('loaded');
};

function connectTrailerButton() {
  var playing = false;

  trailerButton.addEventListener('click',()=>{
      trailerContainer.classList.add('lights-out');
      youtubePlayer.playVideo();
      document.body.classList.add('locked');
      trailerButton.blur();
      playing = true;
  });

  closeTrailerButton.addEventListener('click',() =>{
    if(playing) {
      closeVideo();
    }
  });
}

function closeVideo() {
  trailerContainer.classList.remove('lights-out');
  document.body.classList.remove('locked');
  youtubePlayer.stopVideo();
  trailerButton.blur();
  playing = false;
}

// Trigger trailer close when escape is pressed
document.addEventListener('keyup', function (event) {
    if (event.defaultPrevented) {
        return;
    }
    var key = event.key || event.keyCode;
    if (key === 'Escape' || key === 'Esc' || key === 27) {
        closeVideo();
    }
});
