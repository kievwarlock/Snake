$(function() {
	var SnakeCount = 4;
	var SnakeCountFieldX = 20;
	var SnakeCountFieldY = 20;	
	var SnakeLoop;
	
	function AddSnakeField ( classField, x, y){
		var lvl = x*y;
		var cntY = 1;
		var cntX = 1;
		var str = '<div class="item-row" >';
		for ( var i = 1 ; i <= lvl; i++ ) {	
			str += '<div class="field-item item-' + cntX + '-' + cntY + '" ></div>';
			if( cntY == x){
				cntX++;
			}
			if( cntY == y){
				str += '</div><div class="item-row">';
				cntY = 0;
			}
			if( cntY == x){
				cntX++;
			}
			cntY++;
			
		}
		str += '</div>';
		$(classField).html(str);
	}

	
	function CreateSnake (SnakeWidth){
		$('.field-item').removeClass('snake-item');
		var Snakelength = SnakeWidth;
		var widthCnt = 1;
		$('.field-item').each(function(){			
			$(this).attr('data-cnt', widthCnt);
			$(this).addClass('snake-item');
			if( widthCnt == Snakelength ){
				$(this).addClass('head ');
				return false;
			}
			widthCnt++;
		})
		
	}
	
	function CreateFood (){
		$('.field-item').removeClass('snake-food');
		var FieldsElement = $('.field-item').not('.snake-item');
		var FoodDandom = Math.floor((Math.random() * FieldsElement.length) + 1);		
		FieldsElement.eq( FoodDandom ).addClass('snake-food');
	}
	
	
	function SnakeStart(speed) {
		clearInterval(SnakeLoop);
		var SnakeSpeed = speed;		

		var snakeLengthAll = $('.snake-item.head').data('cnt');
		
		var	x = 1;
		var y = SnakeCount;
		var SnakeSelector;
	
		var opr = '';
		var opr_old = '';
		
		$(document).keydown(function (e) {
				switch( e.which ) {
					case 39: //right
						if( opr != 4){
							opr = 1;
						}
						console.log('right');
						break;
					case 40: //down
						if( opr != 3){
							opr = 2;
						}
						console.log('down');
						break;
					case 38: //top
						if( opr != 2){
							opr = 3;
						}
						console.log('top');
						break;
					case 37: //left
						if( opr != 1){
							opr = 4;
						}
						console.log('left');
						break;						
		
				}

			});
			
		SnakeLoop = setInterval(function(){	
			
			
			
			
			
			
			FootItenSel = snakeLengthAll - ( SnakeCount - 1 );
			SnakeFoot = $('.snake-item[data-cnt="' + FootItenSel + '"]').removeClass('snake-item');	
			snakeLengthAll++;
			
			switch(opr) {
				case 1:
					if( opr_old != 4){
						if( y == SnakeCountFieldY ){
							y = 1;						
						}else{
							y++;
						}
					}
					
					break;
				case 2:
					if( opr_old != 3){
						if( x == SnakeCountFieldX ){
							x = 1;						
						}else{
							x++;
						}
					}
					
					break;
				case 3:
					if( opr_old != 2){
						
						if( x == 1 ){
							x = SnakeCountFieldX;						
						}else{
							x--;
						} 
					}
		
					break;
				case 4:
					if( opr_old != 1){
						if( y == 1 ){
							y = SnakeCountFieldY;						
						}else{
							y--;
						}
					}
					
					break;	
				default:					 	
					if( y == SnakeCountFieldY ){
						y = 1;						
					}else{
						y++;
					}	
					opr = 1;
					
	
			}
			console.log( opr, opr_old);
			SnakeSelector = $('.field-item.item-' + x +'-' + y + ' ');
			
			$('.field-item').removeClass('head');
			var GameOver = SnakeSelector.hasClass( "snake-item" );
			
			var Food = SnakeSelector.hasClass( "snake-food" );
			if( GameOver === true ){
				clearInterval(SnakeLoop);
				SnakeSelector.css('background', 'red');
			}else{
				if ( Food === true ){
					SnakeCount++;
					CreateFood();
					SnakeSelector.addClass('snake-item head');	
					SnakeSelector.attr('data-cnt', snakeLengthAll);
					
					
					var score = $('.score').html();
					score = parseInt(score) + 10;
					$('.score').html(score);
					
				}else{
					SnakeSelector.addClass('snake-item head');	
					SnakeSelector.attr('data-cnt', snakeLengthAll);
				}
			}

			opr_old	= opr;
		}, speed);
		

		
	}

	function NewGame ( boxClass, gameSpeed ){
		$('.score').html('0');
		AddSnakeField( boxClass, SnakeCountFieldX,SnakeCountFieldY);	
		CreateSnake(SnakeCount);
		CreateFood();
		SnakeStart(gameSpeed);		
	}
	
	NewGame('.main-block', 100);
	
	$('.new-game').on('click', function(){
		SnakeCount = 4;
		SnakeCountFieldX = 20;
		SnakeCountFieldY = 20;	
		SnakeLoop;	
		
		NewGame('.main-block', 100);
	})
		
	
	
});