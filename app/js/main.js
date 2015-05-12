// Для старых браузеров подключаем jquery.placeholder
if (!Modernizr.input.placeholder){
  $('input, textarea').placeholder();
} 
