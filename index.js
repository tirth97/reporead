var buttons = require('sdk/ui/button/action');
var tabs = require("sdk/tabs");
var utils = require("utils");
var gh = require("gh");
var fileStore = require("fileStore");
var self = require("sdk/self");

tabs.on("ready",handlePage);
tabs.on("open",function() { change_icon("32.png")});

repos = fileStore.populate_repo(".repo.json");
console.log(repos);
console.log(repos.push);


var button = buttons.ActionButton({
  id: "read-link",
  label: "Read Repo",
  icon: self.data.url("32.png"),

  onClick: handleClick
});


function handleClick(evt){

  if (utils.is_repo(tabs.activeTab.url)) {
    var ans = utils.to_store_string(tabs.activeTab.url)
    if (repos.indexOf(ans) === -1){
      repos.push(ans);
    }
    change_icon("32-read.png");
    fileStore.save_file(JSON.stringify(repos),".repo.json")


  }
  else {
    utils.alert(null,"Info","This page is not a valid github repository");
  }


}

function change_icon(name){
  button.state(button,{
    icon : self.data.url(name)
  });
}


function handlePage(tab){

  var url = tab.url;
  if(utils.is_repo(tab.url)){
    var store_string = utils.to_store_string(url);
    if(repos.indexOf(store_string) != -1){
      change_icon("32-read.png");
      console.log("you have read this repo");


    }
    else {
      change_icon("32.png");

    }



  }
  else {
    change_icon("32.png");

  }
}
