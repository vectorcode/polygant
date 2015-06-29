 (function($){


	var slider_1 = $( "#slider-summ-credit" ),
		inpSlider_1 = $("#summ-credit"),
		result_1 = $(".ui-slider-handle"),
		range_1 = [50000,1000000,250000],
		slider_2 = $( "#slider-time-credit" ),
		inpSlider_2 = $("#time-credit"),
		result_2 = $(".ui-slider-handle"),
		range_2 = [1,60,45],

		bnrImg = $('.bnr-img'),				// баннер
		clc = $('.clc'),					// блок с калькулятором
		btnClose = $('.clc-head-close'),	// кнопка закрыть
		btns = $('.item-button'),			// кнопри продолжить
		form = $('#clc-form'),				// форма
		blksStp = $('.stp'),				// блоки с пошаговыми экранами
		vNubrStp = $('.clc-cont-title-stp-n'),	// визуальное отображение номера шага
		blkMass = $('.clc-cont-mess'),		// блок с сообщением
		err = [];							// массив с неверно заполненными объектами


	var addSlider = function(blk,minMax,inp,views) {//функция иницилизации слайдера
	    blk.slider({
			range: "min",
			min: minMax[0],
			max: minMax[1],
			value: minMax[2],
			slide: function(event, ui) {
				inp.val(ui.value);
	   			blk.children('span').children('span').text(ui.value);
			}
		});
	    blk.children('span').html('<span class="slider-flag">'+minMax[2]+'</span>');
	    inp.val(blk.slider("value"));

	  };




	var validete = function(node){//функция валидации данных
		var typeVal = $(node).data('valtype'),
			val = $(node).val();

			switch (typeVal) {
            case 'text': //проверка на текст
                  
                if(val != '') {
                    return true;
                }
                 return false;

            break;

            case 'numb': //проверка на число
                if (val != '' && !isNaN(val) ) {
                    return true;
                }
                return false;
                    
            break;

            case 'age': //проверка на возраст
                if (val != '' && !isNaN(val) ) {

                	if ($(node).data('min') <= val && val <= $(node).data('max')) {
                    	return true;
                	};
                	return false;
                }
                return false;
                    
            break;
            
             case 'url': // проверка на ссылку
             var url = val;
                var objRE = /(^https?:\/\/)?[a-z0-9~_\-\.]+\.[a-z]{2,9}(\/|:|\?[!-~]*)?$/i;
                return objRE.test(url);
                                 
            break;              
            
            case 'email'://проверка на Email
                if(val != '') {
                var pattern = /^([a-z0-9_\.-])+@[a-z0-9-]+\.([a-z]{2,4}\.)?[a-z]{2,4}$/i;
                if(pattern.test(val)){
                   //прошло валидацию
                   return true; 
                } else {
                    return false;
                  //не верно
                }
            } else {
                //пусто
                return false;

            }

            break;

        };
        return true;
	} //end validete


	var showErr = function(arr){//функция отображения ошибок
		var arrLt = arr.length;
		if (!arrLt == 0) {
			var mass = '';
			for (var i = 0; i < arrLt; i++) {
				$(arr[i]).addClass('error');
				mass += '<p>'+$(arr[i]).data('errtxt')+'</p>';
			};
			blkMass.html(mass).show('fast');
		}else{
			blkMass.html('').hide('fast');
		}
	}


	

	$(document).ready(function() {

	  	addSlider(slider_1,range_1,inpSlider_1,result_1);
	  	addSlider(slider_2,range_2,inpSlider_2,result_2);


		bnrImg.on('click', function(event) {// клик по баннеру
			event.preventDefault();
			clc.show('fast');
		});


		btnClose.on('click', function(event) {//клик по кнопке закрыть
			event.preventDefault();
			clc.hide('fast');
			blksStp.hide();
			$('.stp[data-stp="1"]').show();
			vNubrStp.text(1);
			blkMass.html('').hide();
		});


		form.on('click', '.item-button', function(event) {//клик по кнопке Продолжить
			event.preventDefault();
			err = [];
			var step = $(this).parents('.stp').data('stp') + 1,
				valEl = $("[data-stp="+(step-1)+"] .validete");
			

			for (var i = 0, len = valEl.length; i < len; i++) {
				if (!validete(valEl[i])) {
					err.push(valEl[i]);
				}else{
					$(valEl[i]).removeClass('error');
				};
			};


			showErr(err);//отображаем ошибки
			
			if (err.length === 0) {
				if (this.type !== 'submit') {
					blksStp.hide();
					vNubrStp.text(step);
					$('.stp[data-stp="'+step+'"]').show();
				}else{
					var text = form.serialize().replace(/&/gi, "<br>");
					blkMass.html('<p>Сабмит формы</p><p>'+text+'</p>').show('fast');
					//form.submit();
				}
			};
		});//end click .item-button
				

			

	});//end ready

})(jQuery);