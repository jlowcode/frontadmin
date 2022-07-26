/**
 * List JS
 *
 * @copyright: Copyright (C) 2005-2016  Media A-Team, Inc. - All rights reserved.
 * @license  : GNU/GPL http                         :                              //www.gnu.org/copyleft/gpl.html
 */
define(['jquery', 'fab/list-plugin'], function (jQuery, FbListPlugin) {
	var FbListFrontAdmin = new Class({
		
		initialize: function (options) { 
            // Init options
			this.options = options;

			const heading = jQuery('th.heading.fabrik_ordercell.fabrik_actions')[0];
			const btnGroup = jQuery(heading).find('.btn-group')[0];

			if(btnGroup) {
				this.setButtons(options.elements);
				this.setActionPanel(options.elements);
				jQuery(document).ready(function () {
					jQuery(document).on('mouseenter', '.heading.fabrik_ordercell', function () {
						jQuery(this).find(":button.elementAdminButton").show();
					}).on('mouseleave', '.heading.fabrik_ordercell', function () {
						jQuery(this).find(":button.elementAdminButton").hide();
					});
				});
			} else {
				//console.log("Login to see front end admin options");
			} 
		},

		// Create a button of an element edit link
		// @link link of the button
		createButton: function(link, id) {
			var button = jQuery('<button id="'+id+'" class="elementAdminButton" style="background-color: transparent;" type="button"><svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-pencil-square" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456l-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/><path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"/></svg></button>');
			button.on('click', () => {
				window.open(link,'_blank', menubar=false);
			});
			return button;
		},

		// Set buttons to edit the elements
		// @links array of the links
		setButtons: function(links) {
			for (var key in links) {
				if(links.hasOwnProperty(key)) {
					var element = jQuery('th.'+key);
					var button  = this.createButton(links[key], key+"_admin_button");
					button.hide();
					element.append(button);
					element.css({
						"min-width": "120px"
					});
					
				}
			}
		},

		setActionPanel: function (links) {
			var self = this;

			const button = jQuery('<a class="btn fabrik_view fabrik__rowlink btn-default"><i data-isicon="true" class="icon-play"></i> <span class="hidden">Admin</span></a>');
			const heading = jQuery('th.heading.fabrik_ordercell.fabrik_actions')[0];
			const btnGroup = jQuery(heading).find('.btn-group')[0];
			var JBtnGroup = jQuery(btnGroup);
			var editListButton = jQuery('<button type="button">Editar Lista</button>');
			var addElementButton = jQuery('<button type="button">Adicionar Elemento</button>');
			
			addElementButton.on('click', () => {
				window.open(self.options.listUrlAdd, '_blank', menubar=false);
			});
			
			addElementButton.css({
				'border': 'medium none',
				'display': 'block',
				'min-height': '30px',
				'padding': '0 12px',
				'background-color': '#207CCD',
				'font-size': '12px',
				'width': '100%',
				'text-align': 'center',
				'margin-top': '10px',
				'color': '#FFF',
			});

			editListButton.on('click', () => {
				window.open(self.options.listUrl,'_blank', menubar=false);
			});
			
			editListButton.css({
				'border': 'medium none',
				'display': 'inline-block',
				'min-height': '30px',
				'padding': '0 12px',
				'background-color': '#207CCD',
				'font-size': '12px',
				'width': '100%',
				'text-align': 'center',
				'margin-top': '10px',
				'color': '#FFF',
			});

			var div = jQuery("<div></div>");
			div.css({
				'font-size': '12px !important',
				'position': 'absolute',
				'z-index': 100,
				'background-color' : "#FFF",
				'display': 'none',
				'right' : '20px',
				'padding' : '10px',
				'border': '0.5px solid',
				'border-radius': '4px',
			});
			
			button.on('click', function () {
				if(jQuery(div).css('display') == 'none') {
					jQuery(div).css({'display': 'block' });
				} else {
					jQuery(div).css({'display': 'none' });
				}
				
			});


			JBtnGroup.append(button);

			var list = jQuery('<ul></ul>');

			jQuery.each(links, function( index, value ) {
				var li = jQuery('<li style="font-size: 12px !important"></li>')
					.css({'font-size': '12px !important'})
					.appendTo(list);
				var aaa = jQuery('<a/>')
					.text(self.options.elementsNames[index])
					.css({
						'cursor': 'pointer',
						'text-decoration': 'underline',
						'color' : '#000 !important',
					})
					.appendTo(li);
				aaa.on('click', () => {
					window.open(value,'_blank', menubar=false);
				});
			});


			list.append(editListButton);
			list.append(addElementButton);

			div.append(list);
			JBtnGroup.append(div);
		},
		

	});

	return FbListFrontAdmin;
});