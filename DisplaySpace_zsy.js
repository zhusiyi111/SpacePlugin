
(function($){
    $.fn.DisplaySpace = function(){

        this.each(function(){

           $(this).on('input propertychange', function () {

                var str = $(this).val();
                str = filterStr(str);
                var result = '';
                for(var i=0;i<str.length;i++){
                    if(i>=11)
                    {
                        break;
                    }
                    if(3==i || 7==i){
                        result += ' ';
                     }
                    result += str[i];
                }
               $(this).val(result);
           })

            function filterStr(str){
                var result='';
                for(var i=0;i<str.length;i++){
                    if(!isNaN(str[i])){
                        if(str[i]!=' '){
                            result+=str[i];
                        }
                    }
                }
                return result;
            }
        });
    };
})(jQuery);
