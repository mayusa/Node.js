$(document).ready(function () {

	// before testing, change to your server ip first (10.0.0.5)
	var socket = io.connect('/');
	$('#mainboard').hide();
	$('.chat_box').hide();

	$('#user_name').keypress(function (event) {
		//13 means 'enter' key
		if (event.which == 13 && $('#user_name').val() === '') {
			alert('please enter you name first~!');
		} else if(event.which == 13 && $('#user_name').val() !== ''){

			username = $('#user_name').val();
			socket.username = username;
			socket.emit('user login', {message: 'Welcome, ' + username, username: username});
			$('#mainboard').show();
			$('.chat_box').show();
			$('.user_name').hide();
			label_username(username);

			socket.on('exit', function (data) {
				log_chat_msg(data.message,data.username);
			});

			socket.on('allUsers', function (data) {
				var users = data.users;
				var text = '';
				for (var i = 0; i < users.length; i++) {
					text += users[i].name + ' <br>';
				};
				$('#userlist').html(text);
			})

			socket.on('chat message', function (data) {
				log_chat_msg(data.message,data.username);
				//always locate to bottom of the page
				$(document).scrollTop($('body').height());
			});

			$('#chat_box').keypress(function (event) {
				if (event.which === 13 && $('#chat_box').val()!=='') {
					socket.emit('chat message', {message: $('#chat_box').val(), username: socket.username});
					$('#chat_box').val('');
				}
			});


		};

	});

	var log_chat_msg = function	(msg,user){
		var li = $('<li />');
		var spanname = $('<span />').text(user+' : ');
		if(user === username){
			spanname.addClass("font-orange");
		} else if(user !== 'system'){
			spanname.addClass("font-blue");
		}
		var spanmsg = $('<span />').text(msg);
		li.append(spanname);
		li.append(spanmsg);
		$('#chat_log').append(li);
	};

	var label_username = function(username){
		var divname = $('<div />').text('user name: '+ username);
		$('#chat_log').append(divname);
	}	

});	