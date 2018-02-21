$(function() {

 

	function newGame (levelX, levelY) {		
		var lvl = levelX * levelY;
		var strDom = '';
		var domArray = [];
		
		for ( var i = 1 ; i <= lvl; i++ ) {	
			domArray.push(i);
		}
		shuffleArray(domArray);
		
		var cnt = 1;
		$.each( domArray , function( index, value ) {
			if(cnt == levelX) {
				strDom += '<div class="game-item" data-number=' + value + '>' + value + '</div><div class="clear"></div>';
				cnt = 1;
			}else{
				strDom += '<div class="game-item" data-number=' + value + '>' + value + '</div>';
				cnt++;
			}
			
		});

		$(".game-container-block").html(strDom);	
		var CurrentNumber = 1;
		
		$('.game-item').on('click', function(){
			console.log(CurrentNumber);
			var NumberItem = $(this).data('number');
			
			if(CurrentNumber == NumberItem){
				if( CurrentNumber == lvl ){
					timerStop();
					$('.game-item').off();
				}
				$(this).addClass('success');
				CurrentNumber++;
			}else{
				$(this).addClass('error');
				timerStop();
				$('.game-item').off();
			}
			
				
		})
	} 
	
	
	
	
	
	function shuffleArray(array) {
		for (var i = array.length - 1; i > 0; i--) {
			var j = Math.floor(Math.random() * (i + 1));
			var temp = array[i];
			array[i] = array[j];
			array[j] = temp;
		}
		return array;
	}
	
	var timerVal;
	function timer(classTimer){
		clearInterval(timerVal);
		var time_min = '';
		var time_sec = '';
		var time_ms = '';	
		
		$(classTimer).html( '<span class="timer-min">0min</span><span class="timer-sec">0sec</span><span class="timer-ms">0ms</span>' );	
		
		timerVal = setInterval(function(){		
		
			time_min =  parseInt( $(classTimer).find('.timer-min').html() );
			time_sec =  parseInt( $(classTimer).find('.timer-sec').html() );
			time_ms =   parseInt( $(classTimer).find('.timer-ms').html() );
			
			
			if( time_sec == 60 ){
				time_sec = 0;
				time_min = time_min + 1;
				
			}	
			if( time_ms == 100 ){
				time_ms = 0;
				time_sec = time_sec + 1;	
							
			}	
		
			time_ms = time_ms + 1;	
			$(classTimer).find('.timer-min').html(time_min + "min" );
			$(classTimer).find('.timer-sec').html(time_sec + "sec" );			
			$(classTimer).find('.timer-ms').html(time_ms + "ms");
					
		}, 10)
		

	}
	

	function timerStop(){
		console.log(timerVal);
		clearInterval(timerVal);
	}
	function timerClean(classTimer){
		$(classTimer).html('');	
	}
		
	$('.stop-game').on('click', function(){		
		timerStop();
	})
	
	$('.new-game').on('click', function(){

		timerClean('.timer');
		timer('.timer',1000);
		newGame(6,5);
	})
	
	
});