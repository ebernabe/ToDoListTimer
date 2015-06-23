'use strict'
var angular = require("angular");
module.exports = angular.module("ToDoApp",[])
.controller("AppController",["$scope",function ($scope) {
    $scope.tasks = [];
    $scope.currentt = [];


    $scope.addtodo = function(){
    	var d = dnow();
    	$scope.s = String(d);
    	$scope.tasks.push({id:$scope.s,val:{name: $scope.todotext, date:new Date()}});
    	
    	$scope.todotext = "";
    	  
    };   
    $scope.starttask = function(){
    	
   		console.log($scope.tasks[this.t.id])

    };

  }]);


function dnow() {
  return (Math.round((new Date()).getTime() / 1000));         
 
}
