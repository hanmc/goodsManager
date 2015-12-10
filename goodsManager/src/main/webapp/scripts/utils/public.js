if (!window.IM) {
	window.IM = {};
}
if (!window.console) {
	window.console = {log:$.noop};
}

/***** 工具 扩展 *****/
IM.utils = {};
$U = IM.utils;

$U.getRootUrl = function(){
	var base = window.location.protocol+'//'+window.location.host+'';
	return base;
};
$U.getUrl = function(url,type){
	if(window.location.href){
		if(type=="html"){
			return $U.getRootUrl()+'/views/'+url;
		}else{
			return $U.getRootUrl()+'/'+url;
		}
	}	
};
$U.navigate = function  (url) {
	window.location.href = $U.getUrl(url,'html');
};
$U.toLogin = function  () {
	top.location.href = $U.getUrl('login.html','html');
};
$U.reload = function() {	
	window.top.location.reload();
};
$U.getUrlParam = function(name){
	var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
	var r = window.location.search.substr(1).match(reg);
	if (r!=null) return unescape(r[2]); return null;
};
/*
 * type:1 转为   XX年X月X日
 * type:2 转为   XX年X月X日    XX:XX:XX
 * 
 */
$U.convertDate = function(v,type){
	if(v){
		var d = new Date(v);
		var fmd = d.getFullYear()+'年'+(d.getMonth()+1)+'月'+d.getDay()+'日';
		var hms = ((d.getHours()>9)?d.getHours():'0'+d.getHours())+':'+(d.getMinutes()>9?d.getMinutes():'0'+d.getMinutes())+':'+(d.getSeconds()>9?d.getSeconds():'0'+d.getSeconds());
		return ((type==2)?fmd+'　'+hms:fmd);
	}
};
$U.Loading = function(target, loading, content) {	
	var $target = $(target);
	if (loading) {
		$target.addClass('bl_ui_loading');
		if (content) {
			$(content).addClass('bl_ui_loading_content').insertBefore($target);
		}
	} else {
		$target.removeClass('bl_ui_loading');
		$target.prev('.bl_ui_loading_content').remove();
	}
};

IM.utils.LOADING_NORMAL = '<p><span class="bl_icon bl_icon_20_loading" ></span> 载入中...</p>';
IM.utils.LOADING_LISTTABLE = '<p><span class="bl_icon bl_icon_20_loading" ></span> 正在查询...</p>';


IM.UrlParams = {};
(function () {
	var i, aParams = document.location.search.substr(1).split('&'), aParam;
	for (i=0; i<aParams.length; i++){
		aParam = aParams[i].split('=');
		if (aParam[0].length > 0) {
			IM.UrlParams[aParam[0]] = decodeURI(aParam[1]);
		}	
	}
})();

IM.RegExp = {
	email :	/^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/,
	phone : /^(\d{3,4}-?)?\d{7,9}(-\d{3,4})?$/,
	mobile : /^(((13[0-9]{1})|(15[0-9]{1})|18[0-9]{1})+\d{8})$/,
	postcode : /^[0-9]{6}$/,
	url : /^(http(s)?\:\/\/)?([\w-]+\.)+[\w-]+(\/[\w-.\/?%&=]*)?$/,
	name : /^(\w|[\u0080-\uFFFF])+$/
};


$U.fillOptions = function(select, dict, select2, dict2) {
	
	var $select = $(select);
	var sb = '<option></option>';
	//<option></option>
	
	$(dict).each(function(index, record) {
		sb += '<option value="' + record.key + '" >' + record.text + '</option>'; 
	});
	$select.html(sb);	
	if (select2 && dict2) {
		var $select2 = $(select2);
		var onChange = function() {
			var list = dict2[$select.val()];
			if (list) {
				var sb = '';
				//<option></option>
				$(list).each(function(index, record) {
					sb += '<option value="' + record.key + '" >' + record.text + '</option>'; 
				});
				$select2.html(sb);
			} else {
				$select2.empty();
			}
		};
		$select.change(onChange);
		onChange();
	}
};
/* 按钮 */
IM.Button = function() {

	var pn = function(target, dftMode, modes) {
		var _this = this;
		var $target = $(target);
		if ($target.length > 1) {
			this.$target = $target;
			var buttons = [];
			$target.each(function(index, target) {
				var aButton = new IM.Button(target, dftMode, modes);
				aButton.parentButton = _this;
				buttons.push(aButton);		//TODO
			});
			this.buttons = buttons;
			return;
		}		
		this.$target = $target.addClass('bl_ui_button');
		if ($target.is('a') && !$target.attr('href')) {
			$target.attr('href', 'javascript:void(0)');
		}
		
		this._disabled = false;
		this._loading = false;
		this._hover = false;
		
		this.dftMode = dftMode;
		this.modes = modes;
		this.text = $target.html();
		$target.html('<span class="bl_ui_button_helper" ></span><span class="bl_ui_button_helper2" ></span><span class="bl_ui_button_text" ></span><span class="bl_ui_button_loading" >&nbsp;</span>');
		
		this.changeMode();
		
		$target.click($.proxy(this._click, this));
		$target.mouseenter($.proxy(this._mouseEnter, this));
		$target.mouseleave($.proxy(this._mouseLeave, this));
	};
	
	pn.prototype = {
		
		changeMode : function(mode) {
			
			if (mode) {
				this.currentMode = this.modes[mode];
			} else {
				this.currentMode = this.dftMode;
			}
			this._refresh();
		},
		
		_refresh : function() {

			var mode = this.currentMode;
			var look = { text : this.text };
			if (mode != this.dftMode) {
				if (this.dftMode.normal) {
					$.extend(look, this.dftMode.normal);
					if (this._disabled && this.dftMode.disabled) {
						$.extend(look, this.dftMode.disabled);
					} else if (this._loading && this.dftMode.loading) {
						$.extend(look, this.dftMode.loading);
					} else if (this._hover && this.dftMode.hover) {
						$.extend(look, this.dftMode.hover);
					}
				} else {
					$.extend(look, this.dftMode);
				}
			}
			if (mode.normal) {
				$.extend(look, mode.normal);
				if (this._disabled && mode.disabled) {
					$.extend(look, mode.disabled);
				} else if (this._loading && mode.loading) {
					$.extend(look, mode.loading);
				} else if (this._hover && mode.hover) {
					$.extend(look, mode.hover);
				}
			} else {
				$.extend(look, mode);
			}
			if (this.currentLook) {
				if (this.currentLook.className) {
					this.$target.removeClass(this.currentLook.className);
				} else {
					this.$target.removeClass('bl_ui_button_'+this.currentLook.style);
				}
			}
			if (look.className) {
				this.$target.addClass(look.className);
			} else {
				this.$target.addClass('bl_ui_button_'+look.style);
			}
			this.$target.attr('title', look.title?look.title:'')
				.find('.bl_ui_button_text').html(look.text ? look.text : (this.customText ? this.customText : this.text));
			
					//.html('<span class="bl_ui_button_text" title="'+(look.title?look.title:'')+'" >'
					//		+look.text+'</span><span class="bl_ui_button_loading" >&nbsp;</span>');
			this.currentLook = look;
		},
		
		_click : function() {
			
			if (!this._loading && !(this._disabled && !this.currentLook.disabledClick) && $.isFunction(this.currentLook.callback)) {
				if (this.parentButton) {
					this.currentLook.callback(this, this.$target[0], this.parentButton.buttons, this.parentButton.$target);
				} else {
					this.currentLook.callback(this, this.$target[0]);
				}
			}
		},
		
		_mouseEnter : function() {
			
			this._hover = true;
			this.$target.addClass('bl_ui_button_h');
			setTimeout($.proxy(function() {
				this._refresh();
			}, this), 0);
		},
		
		_mouseLeave : function() {

			this._hover = false;
			this.$target.removeClass('bl_ui_button_h');
			setTimeout($.proxy(function() {
				this._refresh();
			}, this), 0);
		},
		
		setText : function(text) {
			
			this.customText = text;
			this._refresh();
		},
		
		enable : function() {

			if (this.buttons) {
				$(this.buttons).each(function(index, button) {
					button.enable();
				});
			} else {
				if (this._disabled) {
					this._disabled = false;
					this.$target.removeClass('bl_ui_button_d');
					this._refresh();
				}
			}
		},
		
		disable : function() {

			if (this.buttons) {
				$(this.buttons).each(function(index, button) {
					button.disable();
				});
			} else {
				if (!this._disabled) {
					this._disabled = true;
					this.$target.addClass('bl_ui_button_d');
					this._refresh();
				}
			}
		},
		
		isEnabled : function() {
			
			return !this._disabled; 
		},

		isLoading : function() {
			
			return this._loading; 
		},
		
		loading : function(loading) {
			
			if (loading && !this._loading) {
				this._loading = true;
				this.$target.addClass('bl_ui_button_l');
				this._refresh();
			} else if (!loading && this._loading){
				this._loading = false;
				this.$target.removeClass('bl_ui_button_l');
				this._refresh();
			} 
		}
	};
	
	return pn;
}();

IM.Tab = function(){
	var tab = function(){
		if($('.tabBox').length==0) return false;
		$('.tabTitle>h3').on('click',function(){
			$(this).addClass('active').siblings().removeClass('active');
			$('.tabContent .tabInfo').eq($(this).index()).show().siblings().hide();
		});
		$('.tabTitle>h3').eq(0).trigger('click');
	};
	return tab;
}();

/* 分页 */
IM.PageNav = function() {

	var DEFAULT_CONFIG = {
		defaultPageSize : 10 
	};
	
	var pn = function(container, config) {

		this._config = $.extend({pageNumbers:true}, DEFAULT_CONFIG, config);
		
		this.$container = $(container).addClass(pn.CLASS);

		this._initElements();
		this._initParams();
		this._refreshDisplay();
	};
	
	pn.CLASS = 'bl_pageNav';
	pn.CLASS_PREFIX = 'bl_pn_';
	pn.CLASS_PREVIOUS = pn.CLASS_PREFIX + 'previous';
	pn.CLASS_PREVIOUS_DISABLED = pn.CLASS_PREFIX + 'previous_d';
	pn.CLASS_NEXT = pn.CLASS_PREFIX + 'next';
	pn.CLASS_NEXT_DISABLED = pn.CLASS_PREFIX + 'next_d';
	pn.CLASS_PAGENUMBER = pn.CLASS_PREFIX + 'pageNumber';
	pn.CLASS_PAGENUMBERS = pn.CLASS_PREFIX + 'pageNumbers';
	
	pn.prototype = {
		
		_initElements : function() {
			
		
				
				$container = this.$container;
				
				var sb = '<span class="'+pn.CLASS_PREVIOUS+'" >上一页</span>';
				if (this._config.pageNumbers) {
					sb += '<span class="'+pn.CLASS_PAGENUMBERS+'" ></span>';
				} else {
					sb += '&nbsp;第<span class="'+pn.CLASS_PAGENUMBER+'" ></span>页&nbsp;';
				}
				sb += '<span class="'+pn.CLASS_NEXT+'" >下一页</span>';
				$container.html(sb);
				
				var els = {};
				els.$previous = $container.find('.'+pn.CLASS_PREVIOUS).click($.proxy(this.previous, this)); 
				els.$next = $container.find('.'+pn.CLASS_NEXT).click($.proxy(this.next, this)); 
				els.$pageNumbers = $container.find('.'+pn.CLASS_PAGENUMBERS).delegate('span', 'click', $.proxy(this._pageNoClick, this));
				els.$pageNumber = $container.find('.'+pn.CLASS_PAGENUMBER);
				
				this._els = els;
			
		},
		
		_initParams : function() {
			
			this._params = {
				pageNo : 0,
				pageSize : this._config.defaultPageSize,
				pageTotal : 0
			};
		//	this._targetParams = this._params;
		},

		_refreshDisplay : function() {
		
			var els = this._els;
			var p = this._params;
			
			//上一页、第一页
			if (p.pageNo <= 1) {
				els.$previous.addClass(pn.CLASS_PREVIOUS_DISABLED);
				//els.$first.addClass(pn.CLASS_FIRST_DISABLED);
			} else {
				els.$previous.removeClass(pn.CLASS_PREVIOUS_DISABLED);
				//els.$first.removeClass(pn.CLASS_FIRST_DISABLED);
			}

			//下一页、最后一页
			if (p.pageNo >= p.pageTotal) {
				els.$next.addClass(pn.CLASS_NEXT_DISABLED);
				//els.$last.addClass(pn.CLASS_LAST_DISABLED);
			} else {
				els.$next.removeClass(pn.CLASS_NEXT_DISABLED);
				//els.$last.removeClass(pn.CLASS_LAST_DISABLED);
			}
			
			//页码列表
			if (els.$pageNumbers.length > 0) {
				var sb = '';
				if (p.pageTotal > 0) {
					var begin = p.pageNo - 2;
					if (begin < 1) begin = 1;
					var end = begin + 4;
					if (end > p.pageTotal) {
						end = p.pageTotal;
						if (p.pageTotal > 4) {
							begin = p.pageTotal - 4;
						} else {
							begin = 1; 
						}
					}
					for (var i=begin; i<=end; i++) {
						if (i == p.pageNo) {
							sb += '<em>' + i + '</em>';
						} else {
							sb += '<span>' + i + '</span>';
						}
					}
				}
				els.$pageNumbers.html(sb);
			}
			
			if (els.$pageNumber.length > 0) {
				els.$pageNumber.text(p.pageNo+'/'+p.pageTotal);
			}
		},
		
		_pageNoClick : function(event) {

			var i = parseInt($(event.target).text());
			this.to(i);
		},

		_parseInputParams : function(params) {

			var func = this._config.inputFunc;
			if ($.isFunction(func)) {
				return func(params);
			} else {
				return {pageNo:params.number+1, pageTotal:params.totalPages};
			}
		},
		
		_getOutputParams : function(targetPage) {
			
			var params = {
				pageNo : targetPage,
				pageSize : this._params.pageSize
			};
			var func = this._config.outputFunc;
			if ($.isFunction(func)) {
				return func(params);
			} else {
				return {'pageNumber':params.pageNo-1, 'pageSize':params.pageSize};
			}
		},
		
		first : function() {

			this._doCallBack(this._getOutputParams(1), 'first');
		},

		last : function() {
			var p = this._params;
			this._doCallBack(this._getOutputParams(p.pageTotal), 'last');
		},
		
		previous : function() {

			var p = this._params;
			if (p.pageNo > 1) {
				this._doCallBack(this._getOutputParams(p.pageNo - 1), 'previous');
			}
		},
		
		next : function() {

			var p = this._params;
			if (p.pageNo < p.pageTotal) {
				this._doCallBack(this._getOutputParams(p.pageNo + 1), 'next');
			}
		},
		
		to : function(page) {

			var p = this._params;
			if (page >= 1 && page <= p.pageTotal) {
				this._doCallBack(this._getOutputParams(page), 'to');
			}
		},
		
		_doCallBack : function(params, type) {

			if ($.isFunction(this._config.callback)) {
				this._config.callback(params, type);
			}
		},
		
		setParams : function(inParams) {

			var params = { pageNo : 0, pageSize : this._config.defaultPageSize, pageTotal : 0 };
			
			var p = this._parseInputParams(inParams);
			$.extend(params, p);
//			if (!params.pageTotal) {
//				params.pageTotal = this._params.pageTotal;
//			}

			this._params = params;
			this._refreshDisplay();
		}
	};
	
	return pn;
}();

/* 弹出层  */
IM.getWindowSize = function(w) {
	
	var win = w ? w : window, doc = win.document;
	var size = {};
	if(window.ActiveXObject){ 
		size.height = doc.compatMode == "CSS1Compat" ? 
				doc.documentElement.clientHeight : doc.body.clientHeight; 
		size.width = document.compatMode == "CSS1Compat" ?
				doc.documentElement.clientWidth : doc.body.clientWidth;
	} else {
		size.height = win.innerHeight;
		size.width = win.innerWidth;
	}
	return size;
};

IM.popWindow = function(config) {

	config.onTop = true;
	if (!config.className) {
		config.className = 'bl_ui_popWindow_normal';
	}
	if (!config.width) {
		config.width = 300;
	}
	if (!config.renderer) {
		if (config.alert) {
			config.renderer = function(div, win, memo) {
				config.ok = config.ok || '确定';
				var sb = '<div class="bl_ui_popWindow_alert" >';
				if (!$.isFunction(config.alert)) {
					sb += '<p class="bl_ui_popWindow_alert_msg" >' + config.alert + '</p>';
				}
				sb += '</div>';
				sb += '<p class="bl_ui_popWindow_buttons" ><button type="button" >'+config.ok+'</button></p>';
				var $div = $(div).html(sb);
				
				if ($.isFunction(config.alert)) {
					config.alert($div.children('.bl_ui_popWindow_alert')[0], win, memo);
				}
				
				var $buttons = $div.children('.bl_ui_popWindow_buttons').children('button');
				new IM.Button($buttons.eq(0), {style:'normal', callback: function() {
					win.close(true);
				}});
			};
		} else if (config.confirm) {
			config.renderer = function(div, win, memo) {
				config.ok = config.ok || '确定';
				config.cancel = config.cancel || '取消';
				var sb = '<div class="bl_ui_popWindow_confirm" >';
				if (!$.isFunction(config.confirm)) {
					sb += '<p class="bl_ui_popWindow_confirm_msg" >' + config.confirm + '</p>';
				}
				sb += '</div>';
				sb += '<p class="bl_ui_popWindow_buttons" ><button type="button" >'+config.ok+'</button><button type="button" >'+config.cancel+'</button></p>';
				var $div = $(div).html(sb);
				
				var $buttons = $div.children('.bl_ui_popWindow_buttons').children('button');
				memo.okButton = new IM.Button($buttons.eq(0), {style:'normal', callback: function() {
					win.close(true);
				}});
				memo.cancelButton = new IM.Button($buttons.eq(1), {style:'normal', callback: function() {
					win.close(false);
				}});
				
				if ($.isFunction(config.confirm)) {
					config.confirm($div.children('.bl_ui_popWindow_confirm')[0], win, memo);
				}
			};
		} else if (config.prompt) {
			config.renderer = function(div, win, memo) {
				config.ok = config.ok || '确定';
				config.cancel = config.cancel || '取消';
				var sb = '<div class="bl_ui_popWindow_prompt" >';
				if (config.promptMsg) {
					sb += '<p class="bl_ui_popWindow_prompt_msg" >' + config.promptMsg + '</p>';
				}
				if (config.prompt == 'textarea') {
					sb += '<p class="bl_ui_input_normal" ><textarea></textarea></p>';
				} else {
					sb += '<p class="bl_ui_input_normal" ><input /></p>';
				}
				if (config.promptValidate) {
					sb += '<p class="bl_ui_popWindow_promptTip" ><label></label></p>';
				}
				sb += '</div>';
				sb += '<p class="bl_ui_popWindow_buttons" ><button>确定</button><button>取消</button></p>';
				var $div = $(div).html(sb);
				var $input = $div.find('textarea, input');
				if (config.promptAttr) {
					$input.attr(config.promptAttr);
				}
				var form = new IM.DataForm({submitButton:$div.children('.bl_ui_popWindow_buttons').children('button').eq(0)});
				form.addField('input', $input);
				if (config.promptValidate) {
					form.addValidate($.extend(config.promptValidate, {key:'input'}));
					form.addTip('input', {target:$div.find('label')});
				}
				form.init();

				var $buttons = $div.children('.bl_ui_popWindow_buttons').children('button');
				new IM.Button($buttons.eq(0), {style:'normal', callback: function() {
					win.close($.trim(form.val('input')));
				}});
				new IM.Button($buttons.eq(1), {style:'normal', callback: function() {
					win.close(false);
				}});

				setTimeout(function() {	//必须延时，否则窗口位置会偏移
					$input.focus().select();
				}, 100);
			};
		}
	}
	return new IM.PopWindow(config);
};

IM.PopWindow = function() {
	
	var DEFAULT_CONFIG = {
		onTop : false,
		title : null,
		close : true,
		width : null,
		height : null,
		className : null,
		renderer : null,
		beforeClose : null,
		callback : null
	};
	
	var pw = function(config) {
		
		this._config = $.extend({}, DEFAULT_CONFIG, config);
		
		var $container = this._config.onTop ? $(window.top.document.body) : $('body');
		/*		
		var body = window.top.$('body');
		if ($.browser.msie && parseInt($.browser.version) <= 8) {
			this.$iefix = $('#bl_ui_popWindowIefix');
			if (this.$iefix.length == 0) {
				this.$iefix = $('<input id="bl_ui_popWindowIefix" style="position:fixed; width:1px; height:1px; top:-50px; left: -50px;" ></input>').appendTo(body);
			}
		}*/
		
		this.memo = {};
		
		this.$mask = $('<div class="bl_ui_mask" ></div>').appendTo($container);
		this.$win = $('<div class="bl_ui_popWindow" ></div>').appendTo($container);
		if (this._config.className) {
			this.$win.addClass(this._config.className);
		}
		
		if (this._config.close !== false) {
			this.$close = $('<a class="bl_ui_popWindow_close" ></a>').appendTo(this.$win).click($.proxy(function() {
				this.close();
			}, this));
		}
		if (this._config.title) {
			this.$title = $('<div class="bl_ui_popWindow_title">'+this._config.title+'</div>');
			this.$win.addClass('bl_ui_popWindow_hasTitle').append(this.$title);
		}
		
		this.$content = $('<div class="bl_ui_popWindow_content"></div>').appendTo(this.$win);
		
		if (this._config.url) {
			var iframe = $('<iframe id="popWindow" frameborder="no" border="0" src="'+this._config.url+'" />');
			if (this._config.frameName) {
				iframe.attr('name', this._config.frameName);
			}
			this.$content.html(iframe);
		//	iframe.data('popWindow', this);
			iframe[0].popWindow = this;
		} else if ($.isFunction(this._config.renderer)) {
			this._config.renderer(this.$content, this, this.memo);
		}

		this._resetSize();
	};
	
	pw.prototype = {
			
		_resetSize : function() {

			var height = this._config.height, width = this._config.width;
			
			var winSize = IM.getWindowSize(this._config.onTop ? window.top : window);
			if (width > 0) {
				this.$win.width(width);
			} else {
				this.$win.css('width', 'auto');
			}
			if (height > 0) {
				this.$content.height(height);
			} else if (height) {
				this.$content.css('height', 'auto');
			}
			
			var realWidth = this.$win.width(), realHeight = this.$win.height();
			var left = winSize.width / 2 - realWidth / 2;
			var top = winSize.height / 2 - realHeight / 2;
			if (top < 100) top = 100;
			
			top += (this._config.onTop ? window.top.$ : $)(($.browser&&$.browser.webkit)? 'body' :' html').scrollTop(); 
			this.$win.css('left', left).css('top', top);// + window.top.$($.browser.webkit ? 'body' :' html').scrollTop());
		},
		
		close : function(data) {

			var ret;
			if ($.isFunction(this._config.beforeClose)) {
				ret = this._config.beforeClose(data, this, this.memo, $.proxy(this._close, this));
			}
			
			if (ret !== false) {
				this._close(data);
			}
		},
		
		_close : function(data) {

			this.$mask.remove();
			this.$win.remove();
			/*
			if (this.$iefix) {
				this.$iefix.focus();
			}
			*/
			if ($.isFunction(this._config.callback)) {
				this._config.callback(data, this, this.memo);
			}
		}
	};
	
	pw.close = function(data) {
		
		var iframe = window.frameElement;
		if (iframe) {
		//	var popWin = $(iframe).data('popWindow');
			var popWin = iframe.popWindow;
			popWin.close(data);
		}
	};
	
	return pw;
}();