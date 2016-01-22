let { Cu,Cc,Ci } = require('chrome');
Cu.import("resource://gre/modules/NetUtil.jsm");
var FileUtils = Cu.import("resource://gre/modules/FileUtils.jsm").FileUtils;
var FileIO = require("sdk/io/file");
var Location = "/home/girish/"

var file_loc = (name) => FileIO.join(Location,name)


function read_file(filename){
try {
  var content = FileIO.read(file_loc(filename),"r");
  return content;
}
catch(e){
  return [];
}

}

function populate_repo(filename){
  var data = read_file(filename);
  console.log(data);
  if (data instanceof String){
    return JSON.parse(data);
  }
  return data;

}




function save_file(text,filename){

  var fileIO = require("sdk/io/file");
  var TextWriter = fileIO.open(file_loc(filename), "w");
  if (!TextWriter.closed) {
    TextWriter.write(text);
    TextWriter.close();
  }
}





module.exports = {
  populate_repo : populate_repo,
  save_file : save_file,
  read_file : read_file
}
