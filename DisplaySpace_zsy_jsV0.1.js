(function(){


    function DisplaySpace() {
        if (!(this instanceof DisplaySpace)) {
            return new DisplaySpace();
        }
    }

    DisplaySpace.prototype = {
        Init : function(option){  //初始化插件
            var Default = {
                id:'',
                rules:[],
                numLength:1000
            };
            var _option = option;
            this.Id = _option.id || Default.id;
            this.numLength = _option.numLength || Default.numLength;
            this.rules = _option.rules || Default.rules;

            this.rules = preProcessRules(this.rules,this.numLength);

            this.rulesProcessed = processRules(this.rules);


        },
        Bind : function(){          //绑定插件至目标
            var that = this;
            var input = document.getElementById(this.Id);
            input.oninput = function(){
                that.Count();
            }
        },
        Count : function(){
            var str = document.getElementById(this.Id).value;
            str = filterStr(str);
            var rules = this.rulesProcessed;
            var result = '';
            for(var i=0;i<str.length;i++){
                if(i>=this.rulesProcessed[this.rulesProcessed.length-1]){
                    break;
                }
                if(rules.indexOf(i)!=-1){
                    result += ' ';
                }
                result += str[i];
            }
            document.getElementById(this.Id).value = result;

        }

    }

    function preProcessRules(rules,numLength){      //预处理规则
        if(rules instanceof Array){
            return rules;
        }
        if(!isNaN(rules)){
            var result=[];
            var intBit = Math.floor(numLength / rules);

            var leftBit = numLength%rules;
            for(var i=0;i<intBit;i++){
                result.push(rules);
            }
            if(leftBit!=0){
                result.push(leftBit);
            }
            return result;
        }
    }

    function processRules(rules){       //处理空格规则数组
        for(var i=0,len=rules.length-1;i<len;i++){
            rules[i+1]+=rules[i];
        }
        return rules;
    }

    function filterStr(str){        //处理字符串
        var result='';
        for(var i=0;i<str.length;i++){
            if(!isNaN(str[i]) && str[i]!=' '){
                result+=str[i];
            }
        }
        return result;
    }

    window.DisplaySpace = function (option) {
        var displaySpace = new DisplaySpace();
        displaySpace.Init(option);
        displaySpace.Bind();


    }
})(window);
