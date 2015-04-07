dojo.provide("widgets.widgets");
dojo.registerModulePath("Lync", "../../widgets/Lync");
/*
    Lync
    ========================

    @file      : Lync.js
    @version   : 2.0
    @author    : Bailey Everitt
    @date      : Tue, 07 Apr 2015 13:27:58 GMT
    @copyright : 
    @license   : 

    Documentation
    ========================
    Launch a Lync conversation from within a Mendix app
*/


require({}, [
    'dojo/_base/declare', 'mxui/widget/_WidgetBase', 'dijit/_TemplatedMixin',
    'mxui/dom', 'dojo/dom', 'dojo/query', 'dojo/dom-prop', 'dojo/dom-geometry', 'dojo/dom-class', 'dojo/dom-style', 'dojo/dom-construct', 'dojo/_base/array', 'dojo/_base/lang', 'dojo/text',
    'dojo/text!Lync/widget/template/Lync.html'
], function (declare, _WidgetBase, _TemplatedMixin, dom, dojoDom, domQuery, domProp, domGeom, domClass, domStyle, domConstruct, dojoArray, lang, text, widgetTemplate) {
    'use strict';

    return declare('Lync.widget.Lync', [ _WidgetBase, _TemplatedMixin ], {
        templateString: widgetTemplate,

        email: "",
        displaytext: "",

        _handle: null,
        _contextObj: null,
        _objProperty: null,

        constructor: function () { },

        postCreate: function () {
            console.log(this.id + '.postCreate');
        },

        // mxui.widget._WidgetBase.update is called when context is changed or initialized. Implement to re-render and / or fetch data.
        update: function (obj, callback) {
            console.log(this.id + '.update');
            
            var emailAddress = obj.get(this.email);
            var displayText = obj.get(this.displaytext);
            
            this.lyncLink.href = 'sip:' + emailAddress;
            this.lyncLink.innerHTML = displayText;
            
            callback();
        },

        uninitialize: function () { }
    });
});
;
dojo.registerModulePath("SprintrFeedbackWidget", "../../widgets/SprintrFeedbackWidget");
dojo.provide("SprintrFeedbackWidget.SprintrFeedback");
dojo.require("dojo.io.script");

mendix.widget.declare('SprintrFeedbackWidget.SprintrFeedback', {
    inputargs: {

		sprintrapp : '',
		entity : '',
		usernameattr : '',
		emailattr : '',
		allowFile : true,
		allowSshot : false,
		sprintrserver : ''

    },

	postCreate : function(){
		if (!window.sprintrFeedback) {
			var url = this.sprintrserver + (this.sprintrserver.match(/\/$/) != null ? "" : "/");
			dojo.io.script.attach("sprintrfeedbackWrapper", url + "feedback/sprintrfeedback.js");

			this.checkScript(function () { return typeof window.sprintrFeedback != "undefined";}, dojo.hitch(this, function() {
				mx.addOnLoad(dojo.hitch(this, this.loadData));
			}), 0);
		} else {
			mx.addOnLoad(dojo.hitch(this, this.loadData));
		}
		this.actRendered();
	},
	loadData : function () {
		if (this.entity !== '' && !!mx.session.getUserId()) {
			mx.processor.get({
				guid : mx.session.getUserId(),
				callback : dojo.hitch(this, this.startFeedback),
				error: function(e) {
					alert("Error while loading feedback form: " +e);
				}
			});
		} else {
			this.startFeedback(null);
		}
	},
	startFeedback : function (userobj) {
		var data = {
			'sprintrid' : this.sprintrapp,
			'allowFile' : this.allowFile,
			'allowSshot' : this.allowSshot
		};
		var username = '';
		if (userobj != null && this.usernameattr != '' && userobj.hasAttribute(this.usernameattr))
			username = userobj.getAttribute(this.usernameattr)
		else if (mx.session.getUserId() > 0 && mx.session.isGuest && !mx.session.isGuest())
			username = mx.session.getUserName();

		var emailaddr =
			(userobj != null && this.emailattr != '' && userobj.hasAttribute(this.emailattr))
			? userobj.getAttribute(this.emailattr)
			: (username.match(/.+@.+\..+/) ? username : ''); //if it looks like an email address, it is one.

		var roles = mx.session.getUserRoles();
		var rolenames = [];
		for(var i = 0; i < roles.length; i++)
			rolenames.push(roles[i].getAttribute("Name"));

		data.userdata = {
			'username' : username,
			'emailaddress' : emailaddr,
			'userroles' : rolenames.join(" ") + " (account: " + username + ")"
		};
		window.sprintrFeedback.create(data);
	},
	checkScript : function (elem, cb, counter) {
        if (elem()) {
            cb();
        } else {
            if (counter < 30) {
                setTimeout(dojo.hitch(this, function () {
                    this.checkScript(elem, cb, counter+1);
                }), 50);
            }
        }
    },
	uninitialize : function(){
	}
});;
