// Sending messages, a simple POST

// var votes = new Array(4);
// document.getElementById("0").onclick = function(){
//   console.log("aiyaya");
// };
//var photo = document.getElementById(0);
//photo.onclick = function(){
//console.log("aiyaya");
//}
//function glick ()

function PublishForm(form, url) {

  function sendMessage(message) {
    fetch(url, {
      method: 'POST',
      body: message
    });
  }

  form.onsubmit = function() {
    let message = form.message.value;
    if (message) {
      form.message.value = '';
      sendMessage(message);
    }
    return false;
  };
}

// Receiving messages with long polling
function SubscribePane(elem, url) {

  //update to show voting
  function showMessage(votes) {
    // console.log("ai");
    console.log(votes);
    //let messageElem = document.createElement('div');
    //messageElem.append(message);
    //elem.append(messageElem);
  }

  async function subscribe() {
    let response = await fetch(url);

    if (response.status == 502) {
      // Connection timeout
      // happens when the connection was pending for too long
      // let's reconnect
      await subscribe();
    } else if (response.status != 200) {
      // Show Error
      showMessage(response.statusText);
      // Reconnect in one second
      await new Promise(resolve => setTimeout(resolve, 1000));
      await subscribe();
    } else {
      // Got message
      let votes = await response.text();
      showMessage(votes);
      await subscribe();
    }
  }

  subscribe();

}