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
			const { baseUri } = options;

			const heading = jQuery('th.heading.fabrik_ordercell.fabrik_actions')[0];
			const btnGroup = jQuery(heading).find('.btn-group')[0];

			if(btnGroup) {
				// adicionando o html do modal na página
				const form = document.querySelector('.fabrikForm');
				form.innerHTML += this.htmlModal();

				this.setButtons(options.elements, baseUri);
				this.setActionPanel(options.elements);
				jQuery(document).ready(function () {
					jQuery(document).on('mouseenter', '.heading.fabrik_ordercell', function () {
						jQuery(this).find(":button.elementAdminButton").show();
					}).on('mouseleave', '.heading.fabrik_ordercell', function () {
						jQuery(this).find(":button.elementAdminButton").hide();
					});
				});
			} else {
				console.log("Login to see front end admin options");
			}
			
			// JQuery responsável por montar o modal na tela
			jQuery("a[rel=modal]").click(function(ev){
				ev.preventDefault();
				var id = jQuery(this).attr("href");
				var alturaTela  = jQuery(document).height();
				var larguraTela = jQuery(window).width();
		
				jQuery('#mascara').css({'width':larguraTela, 'height':alturaTela});
				jQuery('#mascara').fadeIn(200);
				jQuery('#mascara').fadeTo("slow", 0.2);
		
				var left = (jQuery(window).width() / 2 ) - (jQuery(id).width() / 2 );
				var top  = (jQuery(window).height() / 2 ) - (jQuery(id).height() / 2 );
		
				jQuery(id).css({'left':left, 'top':top});
				jQuery(id).show();
			});
		
			jQuery('#mascara').click(function(){		
				jQuery(this).fadeOut("slow");
				jQuery('.window').fadeOut("slow");
			});
		
			jQuery('.fechar').click(function(ev){		
				ev.preventDefault();		
				jQuery('#mascara').fadeOut(200, "linear");
				jQuery('.window').fadeOut(200, "linear");
				window.location.reload();
			});
		},

		// Create a button of an element edit link
		// @link link of the button
		createButton: function(link, id, baseUri) {
			// var button = document.createElement("i");
			// button.className = "icon-edit";
			// button.style = "cursor: pointer; ";
			// button.addEventListener ("click", function() {
			// 	const url = `${baseUri}administrator/index.php?option=com_fabrik&view=element&layout=edit`;
			// 	document.querySelector('#iframe-url').src = url;
			// });
			
			// var link = document.createElement("a");
			// link.rel = "modal";
			// link.href = "#janela";
			// link.appendChild(button);
			
			// return link;

			var button = jQuery('<a rel="modal" href="#janela"><button id="'+id+'" class="elementAdminButton" style="background-color: transparent;" type="button"><svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-pencil-square" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456l-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/><path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"/></svg></button></a>');
			button.on('click', () => {
				// window.open(link,'_blank', menubar=false);

				// const url = `${baseUri}administrator/index.php?option=com_fabrik&view=element&layout=edit`;
				console.log(link)
				document.querySelector('#iframe-url').src = link;
			});
			return button;
		},

		// Set buttons to edit the elements
		// @links array of the links
		setButtons: function(links, baseUri)  {
			for (var key in links) {
				if(links.hasOwnProperty(key)) {
					var element = jQuery('th.'+key);
					var button  = this.createButton(links[key], key+"_admin_button", baseUri);
					// button.hide();
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
				console.log(jQuery(div).css('display') == 'none');
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


			console.log(list);
			div.append(list);
			JBtnGroup.append(div);
			console.log(JBtnGroup);
		},

		htmlModal: function() {
			return `
			<style>
				.window{	
					display: none;
					width: 90%;
					height: 90vh;
					position: absolute;
					background: #FFF ;
					left: 0;
					top:0;
					z-index: 9900;
					border-radius: 10px;			
				}
				
				#mascara{				
					display: none;
					position: absolute;
					opacity: 0.2;
					background: #000 ;
					left: 0;
					top:0;
					z-index: 9000;			
				}
				
				.fechar{				
					display: block;
					text-align: right;
				}
			</style>
			<!-- <a href="#janela" rel="Modal">Abrir Janela Modal</a> -->
			<div class="window" id="janela">
				<a href="#" class="fechar" style="margin-right:10px; ">X Fechar</a>
				<iframe id="iframe-url" height="100%" width="100%" src="#" title="W3Schools Free Online Web Tutorials"></iframe>
			</div>
			<div id="mascara"></div>
			`
		}
		
		
	});

	return FbListFrontAdmin;
});