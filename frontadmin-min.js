/**
 * List JS
 *
 * @copyright: Copyright (C) 2005-2016  Media A-Team, Inc. - All rights reserved.
 * @license  : GNU/GPL http                         :                              //www.gnu.org/copyleft/gpl.html
 */
define(["jquery","fab/list-plugin"],(function(t,n){return new Class({Extends:n,initialize:function(t){self=this,this.options=t;const{baseUri:n}=t;this.setUpButtonsPainel(n),Fabrik.addEvent("fabrik.list.submit.ajax.complete",(function(){self.setUpButtonsPainel(n)}))},setUpButtonsPainel:function(n){const i=t("th.heading.fabrik_ordercell.fabrik_actions")[0],o=("inline"==this.options.actionMethod?t(i).find(".btn-group")[0]:t(i).find(".dropdown-menu")[0],document.querySelector(".fabrikForm"));var e=document.createElement("div");e.innerHTML=this.htmlModal(),o.appendChild(e),this.setButtons(this.options.elements,n),this.setActionPanel(this.options.elements),t(document).ready((function(){t(document).on("mouseenter",".heading.fabrik_ordercell",(function(){t(this).find(":button.elementAdminButton").show()})).on("mouseleave",".heading.fabrik_ordercell",(function(){t(this).find(":button.elementAdminButton").hide()}))})),t("a[rel=modal]").click((function(n){n.preventDefault();var i=t(this).attr("href"),o=t(document).height(),e=t(window).width();t("#mascara").css({width:e,height:o}),t("#mascara").fadeIn(200),t("#mascara").fadeTo("slow",.2);var a=t(window).width()/2-t(i).width()/2,s=t(window).height()/2-t(i).height()/2;t(i).css({left:a,top:s}),t(i).show()})),t("#mascara").click((function(){t(this).fadeOut("slow"),t(".window").fadeOut("slow")})),t(".fechar").click((function(n){n.preventDefault(),t("#mascara").fadeOut(200,"linear"),t(".window").fadeOut(200,"linear"),window.location.reload()}))},createButton:function(n,i,o){var e=t('<a rel="modal" data-cooltipz-dir="right" href="#janela" class="tooltiptext2">'+this.options.images.edit+"</a>");return e.on("click",(()=>{document.querySelector("#iframe-url").src=n})),e},setButtons:function(n,i){for(var o in n)if(n.hasOwnProperty(o)){var e=t("th."+o);if(0==e.find(".tooltiptext2").length){e.addClass("tooltip2");var a=this.createButton(n[o],o+"_admin_button",i);e.append(a),e.css({"min-width":"120px;"})}}},setActionPanel:function(t){if("inline"==this.options.actionMethod)this.setActionPanelInline(t);else{if("dropdown"!=this.options.actionMethod)throw new Error(Joomla.JText._("PLG_FRONT_ADMIN_ACTION_METHOD_ERROR"));this.setActionPanelDropdown(t)}},setActionPanelInline:function(n){var i=this,o=t('<a class="btn fabrik_view fabrik__rowlink btn-default"><span>'+this.options.images.admin+'</span><span class="hidden">Admin</span></a>'),e=t("th.heading.fabrik_ordercell.fabrik_actions")[0],a=t(e).find(".btn-group")[0],s=t('<li><button type="button">Editar Lista</button></li>');if(!a){var d=t('<div class="btn-group"></div>');t(e).find("span").append(d),a=t(e).find(".btn-group")[0]}var r=t(a);s.on("click",(()=>{window.open(i.options.listUrl,"_blank",menubar=!1)})),s.find("button").css({"min-height":"30px","font-size":"12px",width:"100%","border-radius":"12px",color:"#fff","background-color":"#003EA1"});var l=t("<div></div>");l.css({"font-size":"12px",position:"absolute","z-index":100,"background-color":"#FFF",display:"none",right:"50%",padding:"10px",border:"2px solid #eee","border-radius":"4px","text-align":"left",width:"150px"}),o.on("click",(function(){"none"==t(l).css("display")?t(l).css({display:"block"}):t(l).css({display:"none"})})),r.append(o),t.each(n,(function(n,o){var e=t('<li style="font-size: 12px"></li>').css({"font-size":"12px"}).appendTo(l);t("<a/>").text("- "+i.options.elementsNames[n]).css({cursor:"pointer","padding-left":"10px"}).appendTo(e).on("click",(()=>{window.open(o,"_blank",menubar=!1)}))})),l.append(s),r.append(l)},setActionPanelDropdown:function(n){var i=this,o=t('<li class="nav-link"><a title="Admin"><span>'+this.options.images.admin+"</span> Admin</a></li>"),e=t("th.heading.fabrik_ordercell.fabrik_actions")[0],a=t(e).find(".dropdown-menu")[0];if(!a){var s=t('<div class="dropdown fabrik_action"><button class="btn btn-default btn-mini dropdown-toggle dropdown-toggle-no-caret" type="button" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false"><i class="fa fa-angle-down" aria-hidden="true"></i></button><ul class="dropdown-menu dropdown-menu-end" style=""></ul></div>');t(e).find("span").append(s),a=t(e).find(".dropdown-menu")[0]}var d=t(a),r=t('<li class="subMenuAdmin" style="display: none; padding: 0px 10px;"><button type="button">Editar Lista</button></li>');r.on("click",(()=>{window.open(i.options.listUrl,"_blank",menubar=!1)})),r.find("button").css({"min-height":"30px","font-size":"12px",width:"100%","border-radius":"12px",color:"#fff","background-color":"#003EA1"}),o.on("click",(function(){t.each(t(this).parent().find(".subMenuAdmin"),(function(){"none"==t(this).css("display")?t(this).css({display:"block"}):t(this).css({display:"none"})}))})),t.each(n,(function(n,e){var a=t('<li style="font-size: 12px; display: none;" class="subMenuAdmin"></li>').css({"font-size":"12px"}).appendTo(o);t("<a/>").text("- "+i.options.elementsNames[n]).css({cursor:"pointer","padding-left":"10px"}).appendTo(a).on("click",(()=>{window.open(e,"_blank",menubar=!1)}))})),o.append(r),d.append(o)},htmlModal:function(){return'\n\t\t\t<style>\n\t\t\t\t.window{\t\n\t\t\t\t\tdisplay: none;\n\t\t\t\t\twidth: 90%;\n\t\t\t\t\theight: 90vh;\n\t\t\t\t\tposition: absolute;\n\t\t\t\t\tbackground: #FFF ;\n\t\t\t\t\tleft: 0;\n\t\t\t\t\ttop:0;\n\t\t\t\t\tz-index: 9900;\n\t\t\t\t\tborder-radius: 10px;\t\t\t\n\t\t\t\t}\n\t\t\t\t\n\t\t\t\t#mascara{\t\t\t\t\n\t\t\t\t\tdisplay: none;\n\t\t\t\t\tposition: absolute;\n\t\t\t\t\topacity: 0.2;\n\t\t\t\t\tbackground: #000 ;\n\t\t\t\t\tleft: 0;\n\t\t\t\t\ttop:0;\n\t\t\t\t\tz-index: 9000;\t\t\t\n\t\t\t\t}\n\t\t\t\t\n\t\t\t\t.fechar{\t\t\t\t\n\t\t\t\t\tdisplay: block;\n\t\t\t\t\ttext-align: right;\n\t\t\t\t}\n\n\t\t\t\t.tooltip2 {\n\t\t\t\t\tposition: relative;\n\t\t\t\t\tborder-bottom: 1px dotted black;\n\t\t\t\t\tcursor: pointer;\n\t\t\t\t}\n\n\t\t\t\t.tooltip2 .tooltiptext2 {\n\t\t\t\t\tvisibility: hidden;\n\t\t\t\t\tbackground-color: #ccc;\n\t\t\t\t\tcolor: #fff;\n\t\t\t\t\ttext-align: center;\n\t\t\t\t\tpadding: 5px;\n\t\t\t\t\tborder-radius: 6px;\n\t\t\t\t}\n\n\t\t\t\t.tooltip2:hover .tooltiptext2 {\n\t\t\t\t\tvisibility: visible;\n\t\t\t\t}\n\t\t\t</style>\n\t\t\t\x3c!-- <a href="#janela" rel="Modal">Abrir Janela Modal</a> --\x3e\n\t\t\t<div class="window" id="janela">\n\t\t\t\t<a href="#" class="fechar" style="margin-right:10px; ">X Fechar</a>\n\t\t\t\t<iframe id="iframe-url" height="100%" width="100%" src="#"></iframe>\n\t\t\t</div>\n\t\t\t<div id="mascara"></div>\n\t\t\t'}})}));