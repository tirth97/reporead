var chrome = require("chrome");

var Cc = chrome.Cc;
var Ci = chrome.Ci;


function is_repo(url){

  if( gh(url) === null ){
    return false;
  }
  else {
   return true;
  }

}


function get_store_string(url) {

  // as there cant be same name repo for a user
  // a unique identifier can be created using these fields
  var repo_info = gh(url);
  var user = gh.user;
  var repo_name = gh.repo;

  return user+"_"+repo_name;

}


var prompts = Cc["@mozilla.org/embedcomp/prompt-service;1"].getService(Ci.nsIPromptService);

module.exports = {
  alert : prompts.alert,
  get_store_string : get_store_string,
  is_repo : is_repo
}

