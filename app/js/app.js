'use strict'
var angular = require("angular");
module.exports = angular.module("ToDoApp",[])
.controller("ToDoController",function () {
    this.tasks = [];
    this.currentt = [];
    this.todo = [];
    this.clients = [{id:1,name:"PCR"},{id:2,"name":"Amerisol"}]

    this.addtodo = function(){
    	var s = String(dnow());
      var namex = this.todo.name;
      var clientx = this.todo.client; 
      if(namex.length > 0){ 
            	this.tasks.push({id:s,name: namex, date:new Date(),client:clientx});
            	this.todo.name = "";
              this.todo.client = "";
        }
    };   
    this.starttask = function(t){
    	this.currentt.push(t);
   		console.log(this.tasks);

    };

  });


function dnow() {
  return (Math.round((new Date()).getTime() / 1000));         
 
}
