/**
 Widget Name
 ========================

 @file      : Lync.js
 @version   : 1.0
 @author    : Bailey Everitt
 @date      : 04-09-2014
 @copyright : Mendix Technology BV
 @license   : Apache License, Version 2.0, January 2004

 Documentation
 =============
 This widget allows a user to click on a link, which in turn will
 launch a new Lync conversation

 */
console.log("Lync.js");

dojo.declare("Lync.widget.Lync", mxui.widget._WidgetBase, {

    inputargs: {
        email: "",
        displaytext: ""
    },

    postCreate: function () {
        console.log("Lync.js - postCreate");
        this.actLoaded();
    },

    update: function(obj, callback){
        console.log("Lync.js - update");

        dojo.empty(this.domNode);

        var emailAddress = obj.get(this.email);
        var displayText = obj.get(this.displaytext);

        var a = mxui.dom.a( { 'href': 'sip:' + emailAddress, 'title' : displayText });
        a.innerHTML = displayText;
        this.domNode.appendChild(a);

        callback && callback();
    },

});
console.log("Lync.js - init done");