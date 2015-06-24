'use strict'
var angular = require("angular");
module.exports = angular.module("ToDoApp",[])
.controller("ToDoController",function () {
    this.tasks = [];
    this.currentt = [];
    this.todo = [];

    this.addtodo = function(){
    	var s = String(dnow()); 
    	this.tasks.push({id:s,val:{name: this.todo.name, date:new Date()}});
    	this.todo.name = "";
    };   
    this.starttask = function(){
    	
   		console.log(this.tasks)

    };

  });


function dnow() {
  return (Math.round((new Date()).getTime() / 1000));         
 
}
