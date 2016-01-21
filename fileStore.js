let { Cu,Cc,Ci } = require('chrome');
Cu.import("resource://gre/modules/NetUtil.jsm");

var FileUtils = Cu.import("resource://gre/modules/FileUtils.jsm").FileUtils;
var FileIO = require("sdk/io/file");

var Location = "/home/girish/"

function create_file(filename){
  var file = new FileUtils.File("/home/girish/"+filename);
  return file;
}
function read_file(filename){
  var content = FileIO.read(FileUtils.join(Location,filename))
  return content;
}


function async_save(file,data,callbackDone){
    var ostream = FileUtils.openSafeFileOutputStream(file);
    var converter = Cc["@mozilla.org/intl/scriptableunicodeconverter"].createInstance(Ci.nsIScriptableUnicodeConverter);
    converter.charset = "UTF-8";
    var istream = converter.convertToInputStream(data);

      // optional: callbackSaved(status).
    NetUtil.asyncCopy(istream, ostream, callbackSaved);
    function callbackSaved (status) {
        if(callbackDone){
            if(status===0)callbackDone( file.path, file.leafName, status);  //sucess.
            else callbackDone( null, null, status); //failure.
        };
    }
}



module.exports = {

  create_file : create_file,
  async_save : async_save,
  read_file : read_file
}
