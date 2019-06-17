var currentUserId = 0;
var currentClickedId = 0;
    function whoami(){
        $.ajax({
            url:'/current',
            type:'GET',
            contentType: 'application/json',
            dataType:'json',
            success: function(response){
                //alert(JSON.stringify(response));
                $('#cu_username').html(response['username'])
                var name = response['name']+" "+response['fullname'];
                currentUserId = response['id']
                $('#cu_name').html(name);
                allusers();
            },
            error: function(response){
                alert(JSON.stringify(response));
            }
        });
    }

    function allusers(){
        $.ajax({
            url:'/users',
            type:'GET',
            contentType: 'application/json',
            dataType:'json',
            success: function(response){
                //alert(JSON.stringify(response));
                var i = 0;
                $.each(response, function(){
                    //if ( currentUserId == response[i].id ) {
                    //    return true;
                    //}
                    f = '<li class="contact" onclick=loadConversation('+currentUserId+','+response[i].id+') >' +
                        '<div class="wrap">' ;
                    if ( response[i].id == 5) {     //Wolfram Alpha user
                        f = f + '<img src="../static/images/wolframAlpha.jpg" alt="" />';
                    } else {
                        f = f + '<img src="https://github.com/identicons/jasonlong.png" alt="" />';
                    }
                    f = f + '<span class="contact-status online"></span>' ;
                    f = f + '<div class="meta"><p class="name">' ;
                    f = f + response[i].username;
                    f = f + '</p></div>' ;
                    f = f + '</div></li>';
                    i = i+1;
                    $('#allusers').append(f);
                });
            },
            error: function(response){
                alert(JSON.stringify(response));
            }
        });
    }

    function loadConversation(user_from_id, user_to_id){

        currentClickedId = user_to_id;
        $.ajax({
            url:'/conversation/'+user_from_id+"/"+user_to_id,
            type:'GET',
            contentType: 'application/json',
            dataType:'json',
            success: function(response){
                //alert(JSON.stringify(response));
                var j=0;
                $("li[id=mess]").remove();
                $.each(response, function() {

                   if ( response[j].user_from_id == user_from_id) {
                        message = '<li id="mess" class="sent" ><p>';
                   } else{
                        message = '<li id="mess" class="replies" ><p>';
                   }
                   message = message + response[j].content;
                   message = message + '</p></li>';
                   j = j+1;

                   $('#messagesul').append(message);

                });
            },
            error: function(response){
                alert(JSON.stringify(response));
            }
        });
    }

    function loadMessages(user_from_id, user_to_id){
        //alert(user_from_id);
        //alert(user_to_id);

        // Sent messages
        currentClickedId = user_to_id;
        $.ajax({
            url:'/messages/'+user_from_id+"/"+user_to_id,
            type:'GET',
            contentType: 'application/json',
            dataType:'json',
            success: function(response){
                //alert(JSON.stringify(response));
                var j=0;
                //$( '#mess' ).remove();
                $("li[id=mess]").remove();
                $.each(response, function() {

                   message = '<li id="mess" class="sent" ><p>';
                   message = message + response[j].content;
                   message = message + '</p></li>';
                   j = j+1;

                   $('#messagesul').append(message);

                });
            },
            error: function(response){
                alert(JSON.stringify(response));
            }
        });
     }

    function sendMessage(){
        var message = $('#postmessage').val();
        $('#postmessage').val('');

        var data = JSON.stringify({
                "user_from_id": currentUserId,
                "user_to_id": currentClickedId,
                "content": message
            });

        $.ajax({
            url:'/gabriel/messages',
            type:'POST',
            contentType: 'application/json',
            data : data,
            dataType:'json',
            success: function(response){
                //alert(JSON.stringify(response));
                //load the conversation
                loadConversation(currentUserId, currentClickedId)
            },
            error: function(response){
                alert(JSON.stringify(response));
            }
        });


    }
