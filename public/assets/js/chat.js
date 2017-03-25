
$(document).ready(function(){
    var socket = io.connect();
  
    var messageForm = $('#send-message');
    var messageBox = $('#message');
    var chat = $('#chat');

    function displayMsg(data){
      console.log(data);
      chat.append('<span class = "msg"><b>' + data.from + ': </b>' + data.msg + "</span><br/>");
    };
     
    $('#chatNow').on('click', function(){
      $('#contentWrap').show();
      socket.emit('connectchat', {from: req.user.username, to: });
    });

      socket.on('load old messages', function (data){
        console.log('old messages data', data);
          for(var i = 0; i < data.length; i++){
        displayMsg(data[i]);
        }
      })
 

    messageForm.submit(function(e){
      e.preventDefault(); //prevent page reload
      socket.emit('send message', {from: req.user.username, to: req.user.sendTo, msg:messageBox.val()}, function (data){
        chat.append('<span class ="error"><b>' + data + '</span><br/>')
      }); //send message to server
      messageBox.val(''); //clear message box value

    });

    //receive message back from server and append to html
    socket.on('new message', function (data){
      displayMsg(data);
    });

  });