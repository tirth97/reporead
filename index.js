var buttons = require('sdk/ui/button/action');
var tabs = require("sdk/tabs");
var utils = require("utils");
var gh = require("gh");
var fileStore = require("fileStore");

tabs.on("ready",handlePage);

var json_data = [
  "girishramnani_UMS"
]


var button = buttons.ActionButton({
  id: "read-link",
  label: "Read Repo",
  icon: {

    "32": "./32.png",
    "64": "./32.png"

  },
  onClick: handleClick
});

function handleClick(){

  utils.alert(null,"Hello","button pressed");
  var Json_out = JSON.stringify(json_data);

  var file = fileStore.create_file(".temp.txt");
  fileStore.async_save(file,Json_out,function (a,b,c ) { console.log(a,b,c)} );

}



function handlePage(tab){

  var output = gh(tab.url);
  utils.alert(null,"heelo",output);

}
