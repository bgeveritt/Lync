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
