'use strict'
var angular = require("angular");

var $ = require('jquery');

// var timer = require("./timer.js");

var foundation = require('foundation');
var cachecurrent = [];
var setintervaljs;
var idcurrenttask;
$(document).foundation();

// Production steps of ECMA-262, Edition 5, 15.4.4.14
// Reference: http://es5.github.io/#x15.4.4.14
if (!Array.prototype.indexOf) {
  Array.prototype.indexOf = function(searchElement, fromIndex) {

    var k;

    // 1. Let O be the result of calling ToObject passing
    //    the this value as the argument.
    if (this == null) {
      throw new TypeError('"this" is null or not defined');
    }

    var O = Object(this);

    // 2. Let lenValue be the result of calling the Get
    //    internal method of O with the argument "length".
    // 3. Let len be ToUint32(lenValue).
    var len = O.length >>> 0;

    // 4. If len is 0, return -1.
    if (len === 0) {
      return -1;
    }

    // 5. If argument fromIndex was passed let n be
    //    ToInteger(fromIndex); else let n be 0.
    var n = +fromIndex || 0;

    if (Math.abs(n) === Infinity) {
      n = 0;
    }

    // 6. If n >= len, return -1.
    if (n >= len) {
      return -1;
    }

    // 7. If n >= 0, then Let k be n.
    // 8. Else, n<0, Let k be len - abs(n).
    //    If k is less than 0, then let k be 0.
    k = Math.max(n >= 0 ? n : len - Math.abs(n), 0);

    // 9. Repeat, while k < len
    while (k < len) {
      // a. Let Pk be ToString(k).
      //   This is implicit for LHS operands of the in operator
      // b. Let kPresent be the result of calling the
      //    HasProperty internal method of O with argument Pk.
      //   This step can be combined with c
      // c. If kPresent is true, then
      //    i.  Let elementK be the result of calling the Get
      //        internal method of O with the argument ToString(k).
      //   ii.  Let same be the result of applying the
      //        Strict Equality Comparison Algorithm to
      //        searchElement and elementK.
      //  iii.  If same is true, return k.
      if (k in O && O[k] === searchElement) {
        return k;
      }
      k++;
    }
    return -1;
  };
}

function dnow() {
  return (Math.round((new Date()).getTime() / 1000));         
 
}

module.exports = angular.module("ToDoApp",["filters"])
.directive('onLastRepeat', function() {
        return function(scope, element, attrs) {
             
            if (scope.$last) setTimeout(function(){
                scope.$emit('onRepeatLast', element, attrs);
            }, 1);
        };
    })
.controller("ToDoController",function ($scope) {
    this.tasks = [];
    this.currentt = [];
    this.todo = [];
    this.clients = [{id:1,name:"PCR"},{id:2,"name":"Amerisol"}];

    $scope.$on('onRepeatLast', function(scope, element, attrs){
          $scope.tdc.startwatch($scope);
      });

    this.addtodo = function(){
    	var s = String(dnow());
      var namex = this.todo.name;
      var clientx = this.todo.client; 
      if(!(namex===undefined))
        if(namex.length > 0){ 
              	this.tasks.push({id:s,name: namex, date:new Date(),client:clientx,time:0, lastDate:"" });
              	this.todo.name = "";
                this.todo.client = "";
          }
    }; 

    this.startwatch = function($scope){
          
    
          if(setintervaljs) {
            clearInterval(setintervaljs);
          }  
           

                  var c =0;
                  var d = new Date();
                  var calculo;
                  var dini;
                   
                  for (var key in $scope.tdc.currentt){
                      //   console.log(key);
                      //   console.log($scope.tdc.currentt[key]);
                      // d = new Date();
                      //   if (""===$scope.tdc.currentt[key].lastDate){
                      //     dini = new Date();
                      //     $scope.tdc.currentt[key].lastDate = dini;
                      //   }else{
                      //     dini = $scope.tdc.currentt[key].lastDate;
                      //   }

                      // calculo = Math.floor((d - dini)/1000);
                    
                      $("#i"+$scope.tdc.currentt[key].id).val($scope.tdc.currentt[key].time);

                      // $("#timer"+cachecurrent[key].id).html(setTheTimer(cachecurrent[key].time+calculo));
                     $scope.tdc.currentt[key].time = $scope.tdc.currentt[key].time;
                     

                  }


            setintervaljs = setInterval(function(){
                for (var key in $scope.tdc.currentt){
                  // d = new Date();
                  // dini = $scope.tdc.currentt[key].lastDate;
                  //  calculo = Math.floor((d - dini)/1000);
                  $("#i"+$scope.tdc.currentt[key].id).val($scope.tdc.currentt[key].time);
                  $scope.tdc.currentt[key].time = $scope.tdc.currentt[key].time+1;
                  $("#timer"+ $scope.tdc.currentt[key].id).html(setTheTimer($scope.tdc.currentt[key].time));
                  // console.log(key);

                }

            },1000);
                  
                  
           
               
    };
    this.starttask = function(t){
        if(this.currentt.indexOf(t)===-1){
    	     this.currentt.push(t);
           
        }else{
            console.log("Exist");
        }
   		
      

    };
    
    this.stoptask = function(t){
       var keyc = -1;
             if(this.currentt.indexOf(t)>-1){ 
                        
                        
                      this.tasks[this.tasks.indexOf(t)].lastDate ="";
                      this.tasks[this.tasks.indexOf(t)].time = t.time; 
                      this.currentt.splice(this.currentt.indexOf(t),1);
                          
                    }else{
                        console.log("Do not Exist");
                    }
    };



  });

angular.module('filters', [])
.filter('totime', function () {
      return function (input) {
         return setTheTimer(input);
          };
    });

function setTheTimer(input){

 if (!input) return "";
          var res = parseInt(input,10); 
          var min = Math.floor(Math.floor((res - (Math.floor(res/3600)*3600))/60));
          var h = Math.floor((res)/3600);
          var seg = Math.floor((res - (min*60))-(h*3600));


          var textres = h+"h:"+min+"m:"+seg+"s";
          //console.log(textres);
          return textres;
}