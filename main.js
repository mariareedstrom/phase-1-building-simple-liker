// Defining text characters for the empty and full hearts for you to use later.
const EMPTY_HEART = "♡";
const FULL_HEART = "♥";

// Your JavaScript code goes here!

//------------------------------------------------------------------------------
// Don't change the code below: this function mocks the server response
//------------------------------------------------------------------------------

function mimicServerCall(url = "http://mimicServer.example.com", config = {}) {
  return new Promise(function (resolve, reject) {
    setTimeout(function () {
      let isRandomFailure = Math.random() < 0.2;
      if (isRandomFailure) {
        reject("Random server error. Try again.");
      } else {
        resolve("Pretend remote server notified of action!");
      }
    }, 300);
  });
}
//do not manipulate and .style properties
//only manipulate DOM when server request responds

const heartNodes = document.querySelectorAll(".like-glyph");

const onHeartClick = function (event) {
  // invoke mimicServerCall when user clicks on heart (click event)
  mimicServerCall()
    // if failure: .catch(() =>{})
    .catch((message) => {
      // remove .hidden from error modal
      const errorModal = document.getElementById("modal");
      errorModal.classList.remove("hidden");

      // display message from modal: add message to innerHTML to modal p

      errorModal.querySelector("#modal-message").innerHTML = message;
      // setTimeout to hide modal after 3 seconds (add .hidden class)
      const addHiddenClass = () => errorModal.classList.add("hidden");
      setTimeout(addHiddenClass, 3000);
    })
    .then((resp) => {
      console.log(resp);
      // if success: change heart to full heart
      // add .activated-heart class to make heart red
      if (event.target.innerHTML === EMPTY_HEART) {
        event.target.innerHTML = FULL_HEART;
        event.target.classList.add("activated-heart");
      } else {
        //when user clicks on full heart (event):
        // change heart to empty heart, remove .activated-heart class
        event.target.innerHTML = EMPTY_HEART;
        event.target.classList.remove("activated-heart");
      }
    });
};

heartNodes.forEach((heartNode) =>
  heartNode.addEventListener("click", onHeartClick)
);
