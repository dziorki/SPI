
(function($){var undefined;$.jqplot=function(target,data,options){var _data,_options;if(options==null){if(data instanceof Array){_data=data;_options=null;}
else if(data.constructor==Object){_data=null;_options=data;}}
else{_data=data;_options=options;}
var plot=new jqPlot();$('#'+target).removeClass('jqplot-error');if($.jqplot.config.catchErrors){try{plot.init(target,_data,_options);plot.draw();plot.themeEngine.init.call(plot);return plot;}
catch(e){var msg=$.jqplot.config.errorMessage||e.message;$('#'+target).append('<div class="jqplot-error-message">'+msg+'</div>');$('#'+target).addClass('jqplot-error');document.getElementById(target).style.background=$.jqplot.config.errorBackground;document.getElementById(target).style.border=$.jqplot.config.errorBorder;document.getElementById(target).style.fontFamily=$.jqplot.config.errorFontFamily;document.getElementById(target).style.fontSize=$.jqplot.config.errorFontSize;document.getElementById(target).style.fontStyle=$.jqplot.config.errorFontStyle;document.getElementById(target).style.fontWeight=$.jqplot.config.errorFontWeight;}}
else{plot.init(target,_data,_options);plot.draw();plot.themeEngine.init.call(plot);return plot;}};$.jqplot.debug=1;$.jqplot.config={debug:1,enablePlugins:false,defaultHeight:300,defaultWidth:400,UTCAdjust:false,timezoneOffset:new Date(new Date().getTimezoneOffset()*60000),errorMessage:'',errorBackground:'',errorBorder:'',errorFontFamily:'',errorFontSize:'',errorFontStyle:'',errorFontWeight:'',catchErrors:false,defaultTickFormatString:"%.1f"};$.jqplot.enablePlugins=$.jqplot.config.enablePlugins;$.jqplot.preInitHooks=[];$.jqplot.postInitHooks=[];$.jqplot.preParseOptionsHooks=[];$.jqplot.postParseOptionsHooks=[];$.jqplot.preDrawHooks=[];$.jqplot.postDrawHooks=[];$.jqplot.preDrawSeriesHooks=[];$.jqplot.postDrawSeriesHooks=[];$.jqplot.preDrawLegendHooks=[];$.jqplot.addLegendRowHooks=[];$.jqplot.preSeriesInitHooks=[];$.jqplot.postSeriesInitHooks=[];$.jqplot.preParseSeriesOptionsHooks=[];$.jqplot.postParseSeriesOptionsHooks=[];$.jqplot.eventListenerHooks=[];$.jqplot.preDrawSeriesShadowHooks=[];$.jqplot.postDrawSeriesShadowHooks=[];$.jqplot.ElemContainer=function(){this._elem;this._plotWidth;this._plotHeight;this._plotDimensions={height:null,width:null};};$.jqplot.ElemContainer.prototype.createElement=function(el,offsets,clss,cssopts,attrib){this._offsets=offsets;var klass=clss||'jqplot';var elem=document.createElement(el);this._elem=$(elem);this._elem.addClass(klass);this._elem.css(cssopts);this._elem.attr(attrib);return this._elem;};$.jqplot.ElemContainer.prototype.getWidth=function(){if(this._elem){return this._elem.outerWidth(true);}
else{return null;}};$.jqplot.ElemContainer.prototype.getHeight=function(){if(this._elem){return this._elem.outerHeight(true);}
else{return null;}};$.jqplot.ElemContainer.prototype.getPosition=function(){if(this._elem){return this._elem.position();}
else{return{top:null,left:null,bottom:null,right:null};}};$.jqplot.ElemContainer.prototype.getTop=function(){return this.getPosition().top;};$.jqplot.ElemContainer.prototype.getLeft=function(){return this.getPosition().left;};$.jqplot.ElemContainer.prototype.getBottom=function(){return this._elem.css('bottom');};$.jqplot.ElemContainer.prototype.getRight=function(){return this._elem.css('right');};function Axis(name){$.jqplot.ElemContainer.call(this);this.name=name;this._series=[];this.show=false;this.tickRenderer=$.jqplot.AxisTickRenderer;this.tickOptions={};this.labelRenderer=$.jqplot.AxisLabelRenderer;this.labelOptions={};this.label=null;this.showLabel=true;this.min=null;this.max=null;this.autoscale=false;this.pad=1.2;this.padMax=null;this.padMin=null;this.ticks=[];this.numberTicks;this.tickInterval;this.renderer=$.jqplot.LinearAxisRenderer;this.rendererOptions={};this.showTicks=true;this.showTickMarks=true;this.showMinorTicks=true;this.useSeriesColor=false;this.borderWidth=null;this.borderColor=null;this._dataBounds={min:null,max:null};this._offsets={min:null,max:null};this._ticks=[];this._label=null;this.syncTicks=null;this.tickSpacing=75;this._min=null;this._max=null;this._tickInterval=null;this._numberTicks=null;this.__ticks=null;}
Axis.prototype=new $.jqplot.ElemContainer();Axis.prototype.constructor=Axis;Axis.prototype.init=function(){this.renderer=new this.renderer();this.tickOptions.axis=this.name;if(this.label==null||this.label==''){this.showLabel=false;}
else{this.labelOptions.label=this.label;}
if(this.showLabel==false){this.labelOptions.show=false;}
if(this.pad==0){this.pad=1.0;}
if(this.padMax==0){this.padMax=1.0;}
if(this.padMin==0){this.padMin=1.0;}
if(this.padMax==null){this.padMax=(this.pad-1)/2+1;}
if(this.padMin==null){this.padMin=(this.pad-1)/2+1;}
this.pad=this.padMax+this.padMin-1;if(this.min!=null||this.max!=null){this.autoscale=false;}
if(this.syncTicks==null&&this.name.indexOf('y')>-1){this.syncTicks=true;}
else if(this.syncTicks==null){this.syncTicks=false;}
this.renderer.init.call(this,this.rendererOptions);};Axis.prototype.draw=function(ctx){return this.renderer.draw.call(this,ctx);};Axis.prototype.set=function(){this.renderer.set.call(this);};Axis.prototype.pack=function(pos,offsets){if(this.show){this.renderer.pack.call(this,pos,offsets);}
if(this._min==null){this._min=this.min;this._max=this.max;this._tickInterval=this.tickInterval;this._numberTicks=this.numberTicks;this.__ticks=this._ticks;}};Axis.prototype.reset=function(){this.renderer.reset.call(this);};Axis.prototype.resetScale=function(){this.min=null;this.max=null;this.numberTicks=null;this.tickInterval=null;};function Legend(options){$.jqplot.ElemContainer.call(this);this.show=false;this.location='ne';this.labels=[];this.showLabels=true;this.showSwatches=true;this.placement="insideGrid";this.xoffset=0;this.yoffset=0;this.border;this.background;this.textColor;this.fontFamily;this.fontSize;this.rowSpacing='0.5em';this.renderer=$.jqplot.TableLegendRenderer;this.rendererOptions={};this.preDraw=false;this.marginTop=null;this.marginRight=null;this.marginBottom=null;this.marginLeft=null;this.escapeHtml=false;this._series=[];$.extend(true,this,options);}
Legend.prototype=new $.jqplot.ElemContainer();Legend.prototype.constructor=Legend;Legend.prototype.setOptions=function(options){$.extend(true,this,options);if(this.placement=='inside')this.placement='insideGrid';if(this.xoffset>0){if(this.placement=='insideGrid'){switch(this.location){case'nw':case'w':case'sw':if(this.marginLeft==null){this.marginLeft=this.xoffset+'px';}
this.marginRight='0px';break;case'ne':case'e':case'se':default:if(this.marginRight==null){this.marginRight=this.xoffset+'px';}
this.marginLeft='0px';break;}}
else if(this.placement=='outside'){switch(this.location){case'nw':case'w':case'sw':if(this.marginRight==null){this.marginRight=this.xoffset+'px';}
this.marginLeft='0px';break;case'ne':case'e':case'se':default:if(this.marginLeft==null){this.marginLeft=this.xoffset+'px';}
this.marginRight='0px';break;}}
this.xoffset=0;}
if(this.yoffset>0){if(this.placement=='outside'){switch(this.location){case'sw':case's':case'se':if(this.marginTop==null){this.marginTop=this.yoffset+'px';}
this.marginBottom='0px';break;case'ne':case'n':case'nw':default:if(this.marginBottom==null){this.marginBottom=this.yoffset+'px';}
this.marginTop='0px';break;}}
else if(this.placement=='insideGrid'){switch(this.location){case'sw':case's':case'se':if(this.marginBottom==null){this.marginBottom=this.yoffset+'px';}
this.marginTop='0px';break;case'ne':case'n':case'nw':default:if(this.marginTop==null){this.marginTop=this.yoffset+'px';}
this.marginBottom='0px';break;}}
this.yoffset=0;}};Legend.prototype.init=function(){this.renderer=new this.renderer();this.renderer.init.call(this,this.rendererOptions);};Legend.prototype.draw=function(offsets){for(var i=0;i<$.jqplot.preDrawLegendHooks.length;i++){$.jqplot.preDrawLegendHooks[i].call(this,offsets);}
return this.renderer.draw.call(this,offsets);};Legend.prototype.pack=function(offsets){this.renderer.pack.call(this,offsets);};function Title(text){$.jqplot.ElemContainer.call(this);this.text=text;this.show=true;this.fontFamily;this.fontSize;this.textAlign;this.textColor;this.renderer=$.jqplot.DivTitleRenderer;this.rendererOptions={};}
Title.prototype=new $.jqplot.ElemContainer();Title.prototype.constructor=Title;Title.prototype.init=function(){this.renderer=new this.renderer();this.renderer.init.call(this,this.rendererOptions);};Title.prototype.draw=function(width){return this.renderer.draw.call(this,width);};Title.prototype.pack=function(){this.renderer.pack.call(this);};function Series(){$.jqplot.ElemContainer.call(this);this.show=true;this.xaxis='xaxis';this._xaxis;this.yaxis='yaxis';this._yaxis;this.gridBorderWidth=2.0;this.renderer=$.jqplot.LineRenderer;this.rendererOptions={};this.data=[];this.gridData=[];this.label='';this.showLabel=true;this.color;this.lineWidth=2.5;this.shadow=true;this.shadowAngle=45;this.shadowOffset=1.25;this.shadowDepth=3;this.shadowAlpha='0.1';this.breakOnNull=false;this.markerRenderer=$.jqplot.MarkerRenderer;this.markerOptions={};this.showLine=true;this.showMarker=true;this.index;this.fill=false;this.fillColor;this.fillAlpha;this.fillAndStroke=false;this.disableStack=false;this._stack=false;this.neighborThreshold=4;this.fillToZero=false;this.fillToValue=0;this.fillAxis='y';this.useNegativeColors=true;this._stackData=[];this._plotData=[];this._plotValues={x:[],y:[]};this._intervals={x:{},y:{}};this._prevPlotData=[];this._prevGridData=[];this._stackAxis='y';this._primaryAxis='_xaxis';this.canvas=new $.jqplot.GenericCanvas();this.shadowCanvas=new $.jqplot.GenericCanvas();this.plugins={};this._sumy=0;this._sumx=0;}
Series.prototype=new $.jqplot.ElemContainer();Series.prototype.constructor=Series;Series.prototype.init=function(index,gridbw,plot){this.index=index;this.gridBorderWidth=gridbw;var d=this.data;var temp=[],i;for(i=0;i<d.length;i++){if(!this.breakOnNull){if(d[i]==null||d[i][0]==null||d[i][1]==null){continue;}
else{temp.push(d[i]);}}
else{temp.push(d[i]);}}
this.data=temp;if(!this.fillColor){this.fillColor=this.color;}
if(this.fillAlpha){var comp=$.jqplot.normalize2rgb(this.fillColor);var comp=$.jqplot.getColorComponents(comp);this.fillColor='rgba('+comp[0]+','+comp[1]+','+comp[2]+','+this.fillAlpha+')';}
this.renderer=new this.renderer();this.renderer.init.call(this,this.rendererOptions,plot);this.markerRenderer=new this.markerRenderer();if(!this.markerOptions.color){this.markerOptions.color=this.color;}
if(this.markerOptions.show==null){this.markerOptions.show=this.showMarker;}
this.showMarker=this.markerOptions.show;this.markerRenderer.init(this.markerOptions);};Series.prototype.draw=function(sctx,opts,plot){var options=(opts==undefined)?{}:opts;sctx=(sctx==undefined)?this.canvas._ctx:sctx;for(var j=0;j<$.jqplot.preDrawSeriesHooks.length;j++){$.jqplot.preDrawSeriesHooks[j].call(this,sctx,options);}
if(this.show){this.renderer.setGridData.call(this,plot);if(!options.preventJqPlotSeriesDrawTrigger){$(sctx.canvas).trigger('jqplotSeriesDraw',[this.data,this.gridData]);}
var data=[];if(options.data){data=options.data;}
else if(!this._stack){data=this.data;}
else{data=this._plotData;}
var gridData=options.gridData||this.renderer.makeGridData.call(this,data,plot);this.renderer.draw.call(this,sctx,gridData,options,plot);}
for(var j=0;j<$.jqplot.postDrawSeriesHooks.length;j++){$.jqplot.postDrawSeriesHooks[j].call(this,sctx,options);}};Series.prototype.drawShadow=function(sctx,opts,plot){var options=(opts==undefined)?{}:opts;sctx=(sctx==undefined)?this.shadowCanvas._ctx:sctx;for(var j=0;j<$.jqplot.preDrawSeriesShadowHooks.length;j++){$.jqplot.preDrawSeriesShadowHooks[j].call(this,sctx,options);}
if(this.shadow){this.renderer.setGridData.call(this,plot);var data=[];if(options.data){data=options.data;}
else if(!this._stack){data=this.data;}
else{data=this._plotData;}
var gridData=options.gridData||this.renderer.makeGridData.call(this,data,plot);this.renderer.drawShadow.call(this,sctx,gridData,options);}
for(var j=0;j<$.jqplot.postDrawSeriesShadowHooks.length;j++){$.jqplot.postDrawSeriesShadowHooks[j].call(this,sctx,options);}};Series.prototype.toggleDisplay=function(ev){var s,speed;if(ev.data.series){s=ev.data.series;}
else{s=this;}
if(ev.data.speed){speed=ev.data.speed;}
if(speed){if(s.canvas._elem.is(':hidden')){if(s.shadowCanvas._elem){s.shadowCanvas._elem.fadeIn(speed);}
s.canvas._elem.fadeIn(speed);s.canvas._elem.nextAll('.jqplot-point-label.jqplot-series-'+s.index).fadeIn(speed);}
else{if(s.shadowCanvas._elem){s.shadowCanvas._elem.fadeOut(speed);}
s.canvas._elem.fadeOut(speed);s.canvas._elem.nextAll('.jqplot-point-label.jqplot-series-'+s.index).fadeOut(speed);}}
else{if(s.canvas._elem.is(':hidden')){if(s.shadowCanvas._elem){s.shadowCanvas._elem.show();}
s.canvas._elem.show();s.canvas._elem.nextAll('.jqplot-point-label.jqplot-series-'+s.index).show();}
else{if(s.shadowCanvas._elem){s.shadowCanvas._elem.hide();}
s.canvas._elem.hide();s.canvas._elem.nextAll('.jqplot-point-label.jqplot-series-'+s.index).hide();}}};function Grid(){$.jqplot.ElemContainer.call(this);this.drawGridlines=true;this.gridLineColor='#cccccc';this.gridLineWidth=1.0;this.background='#fffdf6';this.borderColor='#999999';this.borderWidth=2.0;this.drawBorder=true;this.shadow=true;this.shadowAngle=45;this.shadowOffset=1.5;this.shadowWidth=3;this.shadowDepth=3;this.shadowColor=null;this.shadowAlpha='0.07';this._left;this._top;this._right;this._bottom;this._width;this._height;this._axes=[];this.renderer=$.jqplot.CanvasGridRenderer;this.rendererOptions={};this._offsets={top:null,bottom:null,left:null,right:null};}
Grid.prototype=new $.jqplot.ElemContainer();Grid.prototype.constructor=Grid;Grid.prototype.init=function(){this.renderer=new this.renderer();this.renderer.init.call(this,this.rendererOptions);};Grid.prototype.createElement=function(offsets){this._offsets=offsets;return this.renderer.createElement.call(this);};Grid.prototype.draw=function(){this.renderer.draw.call(this);};$.jqplot.GenericCanvas=function(){$.jqplot.ElemContainer.call(this);this._ctx;};$.jqplot.GenericCanvas.prototype=new $.jqplot.ElemContainer();$.jqplot.GenericCanvas.prototype.constructor=$.jqplot.GenericCanvas;$.jqplot.GenericCanvas.prototype.createElement=function(offsets,clss,plotDimensions){this._offsets=offsets;var klass='jqplot';if(clss!=undefined){klass=clss;}
var elem;if(this._elem){elem=this._elem.get(0);}
else{elem=document.createElement('canvas');}
if(plotDimensions!=undefined){this._plotDimensions=plotDimensions;}
elem.width=this._plotDimensions.width-this._offsets.left-this._offsets.right;elem.height=this._plotDimensions.height-this._offsets.top-this._offsets.bottom;this._elem=$(elem);this._elem.css({position:'absolute',left:this._offsets.left,top:this._offsets.top});this._elem.addClass(klass);if($.browser.msie && $.browser.version!='9.0'){window.G_vmlCanvasManager.init_(document);elem=window.G_vmlCanvasManager.initElement(elem);}
return this._elem;};$.jqplot.GenericCanvas.prototype.setContext=function(){this._ctx=this._elem.get(0).getContext("2d");return this._ctx;};$.jqplot.HooksManager=function(){this.hooks=[];};$.jqplot.HooksManager.prototype.addOnce=function(fn){var havehook=false,i;for(i=0;i<this.hooks.length;i++){if(this.hooks[i][0]==fn){havehook=true;}}
if(!havehook){this.hooks.push(fn);}};$.jqplot.HooksManager.prototype.add=function(fn){this.hooks.push(fn);};$.jqplot.EventListenerManager=function(){this.hooks=[];};$.jqplot.EventListenerManager.prototype.addOnce=function(ev,fn){var havehook=false,h,i;for(i=0;i<this.hooks.length;i++){h=this.hooks[i];if(h[0]==ev&&h[1]==fn){havehook=true;}}
if(!havehook){this.hooks.push([ev,fn]);}};$.jqplot.EventListenerManager.prototype.add=function(ev,fn){this.hooks.push([ev,fn]);};function jqPlot(){this.data=[];this.targetId=null;this.target=null;this.defaults={axesDefaults:{},axes:{xaxis:{},yaxis:{},x2axis:{},y2axis:{},y3axis:{},y4axis:{},y5axis:{},y6axis:{},y7axis:{},y8axis:{},y9axis:{}},seriesDefaults:{},gridPadding:{top:10,right:10,bottom:23,left:10},series:[]};this.series=[];this.axes={xaxis:new Axis('xaxis'),yaxis:new Axis('yaxis'),x2axis:new Axis('x2axis'),y2axis:new Axis('y2axis'),y3axis:new Axis('y3axis'),y4axis:new Axis('y4axis'),y5axis:new Axis('y5axis'),y6axis:new Axis('y6axis'),y7axis:new Axis('y7axis'),y8axis:new Axis('y8axis'),y9axis:new Axis('y9axis')};this.grid=new Grid();this.legend=new Legend();this.baseCanvas=new $.jqplot.GenericCanvas();this.seriesStack=[];this.previousSeriesStack=[];this.eventCanvas=new $.jqplot.GenericCanvas();this._width=null;this._height=null;this._plotDimensions={height:null,width:null};this._gridPadding={top:10,right:10,bottom:10,left:10};this.syncXTicks=true;this.syncYTicks=true;this.seriesColors=["#4bb2c5","#EAA228","#c5b47f","#579575","#839557","#958c12","#953579","#4b5de4","#d8b83f","#ff5800","#0085cc","#c747a3","#cddf54","#FBD178","#26B4E3","#bd70c7"];this.negativeSeriesColors=["#498991","#C08840","#9F9274","#546D61","#646C4A","#6F6621","#6E3F5F","#4F64B0","#A89050","#C45923","#187399","#945381","#959E5C","#C7AF7B","#478396","#907294"];this.sortData=true;var seriesColorsIndex=0;this.textColor;this.fontFamily;this.fontSize;this.title=new Title();this.options={};this.stackSeries=false;this.defaultAxisStart=1;this._stackData=[];this._plotData=[];this.plugins={};this._drawCount=0;this.drawIfHidden=false;this.captureRightClick=false;this.themeEngine=new $.jqplot.ThemeEngine();this._sumy=0;this._sumx=0;this.preInitHooks=new $.jqplot.HooksManager();this.postInitHooks=new $.jqplot.HooksManager();this.preParseOptionsHooks=new $.jqplot.HooksManager();this.postParseOptionsHooks=new $.jqplot.HooksManager();this.preDrawHooks=new $.jqplot.HooksManager();this.postDrawHooks=new $.jqplot.HooksManager();this.preDrawSeriesHooks=new $.jqplot.HooksManager();this.postDrawSeriesHooks=new $.jqplot.HooksManager();this.preDrawLegendHooks=new $.jqplot.HooksManager();this.addLegendRowHooks=new $.jqplot.HooksManager();this.preSeriesInitHooks=new $.jqplot.HooksManager();this.postSeriesInitHooks=new $.jqplot.HooksManager();this.preParseSeriesOptionsHooks=new $.jqplot.HooksManager();this.postParseSeriesOptionsHooks=new $.jqplot.HooksManager();this.eventListenerHooks=new $.jqplot.EventListenerManager();this.preDrawSeriesShadowHooks=new $.jqplot.HooksManager();this.postDrawSeriesShadowHooks=new $.jqplot.HooksManager();this.colorGenerator=$.jqplot.ColorGenerator;this.init=function(target,data,options){for(var i=0;i<$.jqplot.preInitHooks.length;i++){$.jqplot.preInitHooks[i].call(this,target,data,options);}
for(var i=0;i<this.preInitHooks.hooks.length;i++){this.preInitHooks.hooks[i].call(this,target,data,options);}
this.targetId='#'+target;this.target=$('#'+target);this.target.removeClass('jqplot-error');if(!this.target.get(0)){throw"No plot target specified";}
if(this.target.css('position')=='static'){this.target.css('position','relative');}
if(!this.target.hasClass('jqplot-target')){this.target.addClass('jqplot-target');}
if(!this.target.height()){var h;if(options&&options.height){h=parseInt(options.height,10);}
else if(this.target.attr('data-height')){h=parseInt(this.target.attr('data-height'),10);}
else{h=parseInt($.jqplot.config.defaultHeight,10);}
this._height=h;this.target.css('height',h+'px');}
else{this._height=this.target.height();}
if(!this.target.width()){var w;if(options&&options.width){w=parseInt(options.width,10);}
else if(this.target.attr('data-width')){w=parseInt(this.target.attr('data-width'),10);}
else{w=parseInt($.jqplot.config.defaultWidth,10);}
this._width=w;this.target.css('width',w+'px');}
else{this._width=this.target.width();}
this._plotDimensions.height=this._height;this._plotDimensions.width=this._width;this.grid._plotDimensions=this._plotDimensions;this.title._plotDimensions=this._plotDimensions;this.baseCanvas._plotDimensions=this._plotDimensions;this.eventCanvas._plotDimensions=this._plotDimensions;this.legend._plotDimensions=this._plotDimensions;if(this._height<=0||this._width<=0||!this._height||!this._width){throw"Canvas dimension not set";}
if(data==null){throw{name:"DataError",message:"No data to plot."};}
if(data.constructor!=Array||data.length==0||data[0].constructor!=Array||data[0].length==0){throw{name:"DataError",message:"No data to plot."};}
this.data=data;this.parseOptions(options);if(this.textColor){this.target.css('color',this.textColor);}
if(this.fontFamily){this.target.css('font-family',this.fontFamily);}
if(this.fontSize){this.target.css('font-size',this.fontSize);}
this.title.init();this.legend.init();this._sumy=0;this._sumx=0;for(var i=0;i<this.series.length;i++){this.seriesStack.push(i);this.previousSeriesStack.push(i);this.series[i].shadowCanvas._plotDimensions=this._plotDimensions;this.series[i].canvas._plotDimensions=this._plotDimensions;for(var j=0;j<$.jqplot.preSeriesInitHooks.length;j++){$.jqplot.preSeriesInitHooks[j].call(this.series[i],target,data,this.options.seriesDefaults,this.options.series[i],this);}
for(var j=0;j<this.preSeriesInitHooks.hooks.length;j++){this.preSeriesInitHooks.hooks[j].call(this.series[i],target,data,this.options.seriesDefaults,this.options.series[i],this);}
this.populatePlotData(this.series[i],i);this.series[i]._plotDimensions=this._plotDimensions;this.series[i].init(i,this.grid.borderWidth,this);for(var j=0;j<$.jqplot.postSeriesInitHooks.length;j++){$.jqplot.postSeriesInitHooks[j].call(this.series[i],target,data,this.options.seriesDefaults,this.options.series[i],this);}
for(var j=0;j<this.postSeriesInitHooks.hooks.length;j++){this.postSeriesInitHooks.hooks[j].call(this.series[i],target,data,this.options.seriesDefaults,this.options.series[i],this);}
this._sumy+=this.series[i]._sumy;this._sumx+=this.series[i]._sumx;}
for(var name in this.axes){this.axes[name]._plotDimensions=this._plotDimensions;this.axes[name].init();}
if(this.sortData){sortData(this.series);}
this.grid.init();this.grid._axes=this.axes;this.legend._series=this.series;for(var i=0;i<$.jqplot.postInitHooks.length;i++){$.jqplot.postInitHooks[i].call(this,target,data,options);}
for(var i=0;i<this.postInitHooks.hooks.length;i++){this.postInitHooks.hooks[i].call(this,target,data,options);}};this.resetAxesScale=function(axes){var ax=(axes!=undefined)?axes:this.axes;if(ax===true){ax=this.axes;}
if(ax.constructor===Array){for(var i=0;i<ax.length;i++){this.axes[ax[i]].resetScale();}}
else if(ax.constructor===Object){for(var name in ax){this.axes[name].resetScale();}}};this.reInitialize=function(){if(!this.target.height()){var h;if(options&&options.height){h=parseInt(options.height,10);}
else if(this.target.attr('data-height')){h=parseInt(this.target.attr('data-height'),10);}
else{h=parseInt($.jqplot.config.defaultHeight,10);}
this._height=h;this.target.css('height',h+'px');}
else{this._height=this.target.height();}
if(!this.target.width()){var w;if(options&&options.width){w=parseInt(options.width,10);}
else if(this.target.attr('data-width')){w=parseInt(this.target.attr('data-width'),10);}
else{w=parseInt($.jqplot.config.defaultWidth,10);}
this._width=w;this.target.css('width',w+'px');}
else{this._width=this.target.width();}
if(this._height<=0||this._width<=0||!this._height||!this._width){throw"Target dimension not set";}
this._plotDimensions.height=this._height;this._plotDimensions.width=this._width;this.grid._plotDimensions=this._plotDimensions;this.title._plotDimensions=this._plotDimensions;this.baseCanvas._plotDimensions=this._plotDimensions;this.eventCanvas._plotDimensions=this._plotDimensions;this.legend._plotDimensions=this._plotDimensions;for(var n in this.axes){this.axes[n]._plotWidth=this._width;this.axes[n]._plotHeight=this._height;}
this.title._plotWidth=this._width;if(this.textColor){this.target.css('color',this.textColor);}
if(this.fontFamily){this.target.css('font-family',this.fontFamily);}
if(this.fontSize){this.target.css('font-size',this.fontSize);}
this._sumy=0;this._sumx=0;for(var i=0;i<this.series.length;i++){this.populatePlotData(this.series[i],i);this.series[i]._plotDimensions=this._plotDimensions;this.series[i].canvas._plotDimensions=this._plotDimensions;this._sumy+=this.series[i]._sumy;this._sumx+=this.series[i]._sumx;}
for(var name in this.axes){this.axes[name]._plotDimensions=this._plotDimensions;this.axes[name]._ticks=[];this.axes[name].renderer.init.call(this.axes[name],{});}
if(this.sortData){sortData(this.series);}
this.grid._axes=this.axes;this.legend._series=this.series;};function sortData(series){var d,sd,pd,ppd,ret;for(var i=0;i<series.length;i++){var check;var bat=[series[i].data,series[i]._stackData,series[i]._plotData,series[i]._prevPlotData];for(var n=0;n<4;n++){check=true;d=bat[n];if(series[i]._stackAxis=='x'){for(var j=0;j<d.length;j++){if(typeof(d[j][1])!="number"){check=false;break;}}
if(check){d.sort(function(a,b){return a[1]-b[1];});}}
else{for(var j=0;j<d.length;j++){if(typeof(d[j][0])!="number"){check=false;break;}}
if(check){d.sort(function(a,b){return a[0]-b[0];});}}}}}
this.populatePlotData=function(series,index){this._plotData=[];this._stackData=[];series._stackData=[];series._plotData=[];var plotValues={x:[],y:[]};if(this.stackSeries&&!series.disableStack){series._stack=true;var sidx=series._stackAxis=='x'?0:1;var idx=sidx?0:1;var temp=$.extend(true,[],series.data);var plotdata=$.extend(true,[],series.data);for(var j=0;j<index;j++){var cd=this.series[j].data;for(var k=0;k<cd.length;k++){temp[k][0]+=cd[k][0];temp[k][1]+=cd[k][1];plotdata[k][sidx]+=cd[k][sidx];}}
for(var i=0;i<plotdata.length;i++){plotValues.x.push(plotdata[i][0]);plotValues.y.push(plotdata[i][1]);}
this._plotData.push(plotdata);this._stackData.push(temp);series._stackData=temp;series._plotData=plotdata;series._plotValues=plotValues;}
else{for(var i=0;i<series.data.length;i++){plotValues.x.push(series.data[i][0]);plotValues.y.push(series.data[i][1]);}
this._stackData.push(series.data);this.series[index]._stackData=series.data;this._plotData.push(series.data);series._plotData=series.data;series._plotValues=plotValues;}
if(index>0){series._prevPlotData=this.series[index-1]._plotData;}
series._sumy=0;series._sumx=0;for(i=series.data.length-1;i>-1;i--){series._sumy+=series.data[i][1];series._sumx+=series.data[i][0];}};this.getNextSeriesColor=(function(t){var idx=0;var sc=t.seriesColors;return function(){if(idx<sc.length){return sc[idx++];}
else{idx=0;return sc[idx++];}};})(this);this.parseOptions=function(options){for(var i=0;i<this.preParseOptionsHooks.hooks.length;i++){this.preParseOptionsHooks.hooks[i].call(this,options);}
for(var i=0;i<$.jqplot.preParseOptionsHooks.length;i++){$.jqplot.preParseOptionsHooks[i].call(this,options);}
this.options=$.extend(true,{},this.defaults,options);this.stackSeries=this.options.stackSeries;if(this.options.seriesColors){this.seriesColors=this.options.seriesColors;}
if(this.options.negativeSeriesColors){this.negativeSeriesColors=this.options.negativeSeriesColors;}
if(this.options.captureRightClick){this.captureRightClick=this.options.captureRightClick;}
this.defaultAxisStart=(options&&options.defaultAxisStart!=null)?options.defaultAxisStart:this.defaultAxisStart;var cg=new this.colorGenerator(this.seriesColors);$.extend(true,this._gridPadding,this.options.gridPadding);this.sortData=(this.options.sortData!=null)?this.options.sortData:this.sortData;for(var n in this.axes){var axis=this.axes[n];$.extend(true,axis,this.options.axesDefaults,this.options.axes[n]);axis._plotWidth=this._width;axis._plotHeight=this._height;}
if(this.data.length==0){this.data=[];for(var i=0;i<this.options.series.length;i++){this.data.push(this.options.series.data);}}
var normalizeData=function(data,dir,start){var temp=[];var i;dir=dir||'vertical';if(!(data[0]instanceof Array)){for(i=0;i<data.length;i++){if(dir=='vertical'){temp.push([start+i,data[i]]);}
else{temp.push([data[i],start+i]);}}}
else{$.extend(true,temp,data);}
return temp;};for(var i=0;i<this.data.length;i++){var temp=new Series();for(var j=0;j<$.jqplot.preParseSeriesOptionsHooks.length;j++){$.jqplot.preParseSeriesOptionsHooks[j].call(temp,this.options.seriesDefaults,this.options.series[i]);}
for(var j=0;j<this.preParseSeriesOptionsHooks.hooks.length;j++){this.preParseSeriesOptionsHooks.hooks[j].call(temp,this.options.seriesDefaults,this.options.series[i]);}
$.extend(true,temp,{seriesColors:this.seriesColors,negativeSeriesColors:this.negativeSeriesColors},this.options.seriesDefaults,this.options.series[i]);var dir='vertical';if(temp.renderer.constructor==$.jqplot.barRenderer&&temp.rendererOptions&&temp.rendererOptions.barDirection=='horizontal'){dir='horizontal';}
temp.data=normalizeData(this.data[i],dir,this.defaultAxisStart);switch(temp.xaxis){case'xaxis':temp._xaxis=this.axes.xaxis;break;case'x2axis':temp._xaxis=this.axes.x2axis;break;default:break;}
temp._yaxis=this.axes[temp.yaxis];temp._xaxis._series.push(temp);temp._yaxis._series.push(temp);if(temp.show){temp._xaxis.show=true;temp._yaxis.show=true;}
if(!temp.color&&temp.show!=false){temp.color=cg.next();}
if(!temp.label){temp.label='Series '+(i+1).toString();}
this.series.push(temp);for(var j=0;j<$.jqplot.postParseSeriesOptionsHooks.length;j++){$.jqplot.postParseSeriesOptionsHooks[j].call(this.series[i],this.options.seriesDefaults,this.options.series[i]);}
for(var j=0;j<this.postParseSeriesOptionsHooks.hooks.length;j++){this.postParseSeriesOptionsHooks.hooks[j].call(this.series[i],this.options.seriesDefaults,this.options.series[i]);}}
$.extend(true,this.grid,this.options.grid);for(var n in this.axes){var axis=this.axes[n];if(axis.borderWidth==null){axis.borderWidth=this.grid.borderWidth;}
if(axis.borderColor==null){if(n!='xaxis'&&n!='x2axis'&&axis.useSeriesColor===true&&axis.show){axis.borderColor=axis._series[0].color;}
else{axis.borderColor=this.grid.borderColor;}}}
if(typeof this.options.title=='string'){this.title.text=this.options.title;}
else if(typeof this.options.title=='object'){$.extend(true,this.title,this.options.title);}
this.title._plotWidth=this._width;this.legend.setOptions(this.options.legend);for(var i=0;i<$.jqplot.postParseOptionsHooks.length;i++){$.jqplot.postParseOptionsHooks[i].call(this,options);}
for(var i=0;i<this.postParseOptionsHooks.hooks.length;i++){this.postParseOptionsHooks.hooks[i].call(this,options);}};this.replot=function(options){var opts=(options!=undefined)?options:{};var clear=(opts.clear!=undefined)?opts.clear:true;var resetAxes=(opts.resetAxes!=undefined)?opts.resetAxes:false;this.target.trigger('jqplotPreReplot');if(clear){this.target.empty();}
if(resetAxes){this.resetAxesScale(resetAxes);}
this.reInitialize();this.draw();this.target.trigger('jqplotPostReplot');};this.redraw=function(clear){clear=(clear!=null)?clear:true;this.target.trigger('jqplotPreRedraw');if(clear){this.target.empty();}
for(var ax in this.axes){this.axes[ax]._ticks=[];}
for(var i=0;i<this.series.length;i++){this.populatePlotData(this.series[i],i);}
this._sumy=0;this._sumx=0;for(i=0;i<this.series.length;i++){this._sumy+=this.series[i]._sumy;this._sumx+=this.series[i]._sumx;}
this.draw();this.target.trigger('jqplotPostRedraw');};this.draw=function(){if(this.drawIfHidden||this.target.is(':visible')){this.target.trigger('jqplotPreDraw');var i,j;for(i=0;i<$.jqplot.preDrawHooks.length;i++){$.jqplot.preDrawHooks[i].call(this);}
for(i=0;i<this.preDrawHooks.hooks.length;i++){this.preDrawHooks.hooks[i].call(this);}
this.target.append(this.baseCanvas.createElement({left:0,right:0,top:0,bottom:0},'jqplot-base-canvas'));this.baseCanvas.setContext();this.target.append(this.title.draw());this.title.pack({top:0,left:0});var legendElem=this.legend.draw();var gridPadding={top:0,left:0,bottom:0,right:0};if(this.legend.placement=="outsideGrid"){this.target.append(legendElem);switch(this.legend.location){case'n':gridPadding.top+=this.legend.getHeight();break;case's':gridPadding.bottom+=this.legend.getHeight();break;case'ne':case'e':case'se':gridPadding.right+=this.legend.getWidth();break;case'nw':case'w':case'sw':gridPadding.left+=this.legend.getWidth();break;default:gridPadding.right+=this.legend.getWidth();break;}
legendElem=legendElem.detach();}
var ax=this.axes;for(var name in ax){this.target.append(ax[name].draw(this.baseCanvas._ctx));ax[name].set();}
if(ax.yaxis.show){gridPadding.left+=ax.yaxis.getWidth();}
var ra=['y2axis','y3axis','y4axis','y5axis','y6axis','y7axis','y8axis','y9axis'];var rapad=[0,0,0,0,0,0,0,0];var gpr=0;var n;for(n=0;n<8;n++){if(ax[ra[n]].show){gpr+=ax[ra[n]].getWidth();rapad[n]=gpr;}}
gridPadding.right+=gpr;if(ax.x2axis.show){gridPadding.top+=ax.x2axis.getHeight();}
if(this.title.show){gridPadding.top+=this.title.getHeight();}
if(ax.xaxis.show){gridPadding.bottom+=ax.xaxis.getHeight();}
var arr=['top','bottom','left','right'];for(var n in arr){if(gridPadding[arr[n]]){this._gridPadding[arr[n]]=gridPadding[arr[n]];}}
var legendPadding=(this.legend.placement=='outsideGrid')?{top:this.title.getHeight(),left:0,right:0,bottom:0}:this._gridPadding;ax.xaxis.pack({position:'absolute',bottom:this._gridPadding.bottom-ax.xaxis.getHeight(),left:0,width:this._width},{min:this._gridPadding.left,max:this._width-this._gridPadding.right});ax.yaxis.pack({position:'absolute',top:0,left:this._gridPadding.left-ax.yaxis.getWidth(),height:this._height},{min:this._height-this._gridPadding.bottom,max:this._gridPadding.top});ax.x2axis.pack({position:'absolute',top:this._gridPadding.top-ax.x2axis.getHeight(),left:0,width:this._width},{min:this._gridPadding.left,max:this._width-this._gridPadding.right});for(i=8;i>0;i--){ax[ra[i-1]].pack({position:'absolute',top:0,right:this._gridPadding.right-rapad[i-1]},{min:this._height-this._gridPadding.bottom,max:this._gridPadding.top});}
this.target.append(this.grid.createElement(this._gridPadding));this.grid.draw();for(i=0;i<this.series.length;i++){j=this.seriesStack[i];this.target.append(this.series[j].shadowCanvas.createElement(this._gridPadding,'jqplot-series-shadowCanvas'));this.series[j].shadowCanvas.setContext();this.series[j].shadowCanvas._elem.data('seriesIndex',j);}
for(i=0;i<this.series.length;i++){j=this.seriesStack[i];this.target.append(this.series[j].canvas.createElement(this._gridPadding,'jqplot-series-canvas'));this.series[j].canvas.setContext();this.series[j].canvas._elem.data('seriesIndex',j);}
this.target.append(this.eventCanvas.createElement(this._gridPadding,'jqplot-event-canvas'));this.eventCanvas.setContext();this.eventCanvas._ctx.fillStyle='rgba(0,0,0,0)';this.eventCanvas._ctx.fillRect(0,0,this.eventCanvas._ctx.canvas.width,this.eventCanvas._ctx.canvas.height);if(this.legend.preDraw){this.eventCanvas._elem.before(legendElem);this.legend.pack(legendPadding);if(this.legend._elem){this.drawSeries({legendInfo:{location:this.legend.location,placement:this.legend.placement,width:this.legend.getWidth(),height:this.legend.getHeight(),xoffset:this.legend.xoffset,yoffset:this.legend.yoffset}});}
else{this.drawSeries();}}
else{this.drawSeries();$(this.series[this.series.length-1].canvas._elem).after(legendElem);this.legend.pack(legendPadding);}
for(var i=0;i<$.jqplot.eventListenerHooks.length;i++){}
for(var i=0;i<this.eventListenerHooks.hooks.length;i++){}
for(var i=0;i<$.jqplot.postDrawHooks.length;i++){$.jqplot.postDrawHooks[i].call(this);}
for(var i=0;i<this.postDrawHooks.hooks.length;i++){this.postDrawHooks.hooks[i].call(this);}
if(this.target.is(':visible')){this._drawCount+=1;}
this.target.trigger('jqplotPostDraw',[this]);}};this.bindCustomEvents=function(){return;this.eventCanvas._elem.bind('click',{plot:this},this.onClick);this.eventCanvas._elem.bind('dblclick',{plot:this},this.onDblClick);this.eventCanvas._elem.bind('mousedown',{plot:this},this.onMouseDown);this.eventCanvas._elem.bind('mousemove',{plot:this},this.onMouseMove);this.eventCanvas._elem.bind('mouseenter',{plot:this},this.onMouseEnter);this.eventCanvas._elem.bind('mouseleave',{plot:this},this.onMouseLeave);if(this.captureRightClick){this.eventCanvas._elem.bind('mouseup',{plot:this},this.onRightClick);this.eventCanvas._elem.get(0).oncontextmenu=function(){return false;};}
else{this.eventCanvas._elem.bind('mouseup',{plot:this},this.onMouseUp);}};function getEventPosition(ev){var plot=ev.data.plot;var go=plot.eventCanvas._elem.offset();var gridPos={x:ev.pageX-go.left,y:ev.pageY-go.top};var dataPos={xaxis:null,yaxis:null,x2axis:null,y2axis:null,y3axis:null,y4axis:null,y5axis:null,y6axis:null,y7axis:null,y8axis:null,y9axis:null};var an=['xaxis','yaxis','x2axis','y2axis','y3axis','y4axis','y5axis','y6axis','y7axis','y8axis','y9axis'];var ax=plot.axes;var n,axis;for(n=11;n>0;n--){axis=an[n-1];if(ax[axis].show){dataPos[axis]=ax[axis].series_p2u(gridPos[axis.charAt(0)]);}}
return{offsets:go,gridPos:gridPos,dataPos:dataPos};}
function checkIntersection(gridpos,plot){var series=plot.series;var i,j,k,s,r,x,y,theta,sm,sa,minang,maxang;var d0,d,p,pp,points,bw;var threshold,t;for(k=plot.seriesStack.length-1;k>=0;k--){i=plot.seriesStack[k];s=series[i];switch(s.renderer.constructor){case $.jqplot.BarRenderer:x=gridpos.x;y=gridpos.y;for(j=s.gridData.length-1;j>=0;j--){points=s._barPoints[j];if(x>points[0][0]&&x<points[2][0]&&y>points[2][1]&&y<points[0][1]){return{seriesIndex:s.index,pointIndex:j,gridData:p,data:s.data[j],points:s._barPoints[j]};}}
break;case $.jqplot.DonutRenderer:sa=s.startAngle/180*Math.PI;x=gridpos.x-s._center[0];y=gridpos.y-s._center[1];r=Math.sqrt(Math.pow(x,2)+Math.pow(y,2));if(x>0&&-y>=0){theta=2*Math.PI-Math.atan(-y/x);}
else if(x>0&&-y<0){theta=-Math.atan(-y/x);}
else if(x<0){theta=Math.PI-Math.atan(-y/x);}
else if(x==0&&-y>0){theta=3*Math.PI/2;}
else if(x==0&&-y<0){theta=Math.PI/2;}
else if(x==0&&y==0){theta=0;}
if(sa){theta-=sa;if(theta<0){theta+=2*Math.PI;}
else if(theta>2*Math.PI){theta-=2*Math.PI;}}
sm=s.sliceMargin/180*Math.PI;if(r<s._radius&&r>s._innerRadius){for(j=0;j<s.gridData.length;j++){minang=(j>0)?s.gridData[j-1][1]+sm:sm;maxang=s.gridData[j][1];if(theta>minang&&theta<maxang){return{seriesIndex:s.index,pointIndex:j,gridData:s.gridData[j],data:s.data[j]};}}}
break;case $.jqplot.PieRenderer:sa=s.startAngle/180*Math.PI;x=gridpos.x-s._center[0];y=gridpos.y-s._center[1];r=Math.sqrt(Math.pow(x,2)+Math.pow(y,2));if(x>0&&-y>=0){theta=2*Math.PI-Math.atan(-y/x);}
else if(x>0&&-y<0){theta=-Math.atan(-y/x);}
else if(x<0){theta=Math.PI-Math.atan(-y/x);}
else if(x==0&&-y>0){theta=3*Math.PI/2;}
else if(x==0&&-y<0){theta=Math.PI/2;}
else if(x==0&&y==0){theta=0;}
if(sa){theta-=sa;if(theta<0){theta+=2*Math.PI;}
else if(theta>2*Math.PI){theta-=2*Math.PI;}}
sm=s.sliceMargin/180*Math.PI;if(r<s._radius){for(j=0;j<s.gridData.length;j++){minang=(j>0)?s.gridData[j-1][1]+sm:sm;maxang=s.gridData[j][1];if(theta>minang&&theta<maxang){return{seriesIndex:s.index,pointIndex:j,gridData:s.gridData[j],data:s.data[j]};}}}
break;case $.jqplot.BubbleRenderer:x=gridpos.x;y=gridpos.y;var ret=null;if(s.show){for(var j=0;j<s.gridData.length;j++){p=s.gridData[j];d=Math.sqrt((x-p[0])*(x-p[0])+(y-p[1])*(y-p[1]));if(d<=p[2]&&(d<=d0||d0==null)){d0=d;ret={seriesIndex:i,pointIndex:j,gridData:p,data:s.data[j]};}}
if(ret!=null)return ret;}
break;case $.jqplot.FunnelRenderer:x=gridpos.x;y=gridpos.y;var v=s._vertices,vfirst=v[0],vlast=v[v.length-1],lex,rex;function findedge(l,p1,p2){var m=(p1[1]-p2[1])/(p1[0]-p2[0]);var b=p1[1]-m*p1[0];var y=l+p1[1];return[(y-b)/m,y];}
lex=findedge(y,vfirst[0],vlast[3]);rex=findedge(y,vfirst[1],vlast[2]);for(j=0;j<v.length;j++){cv=v[j];if(y>=cv[0][1]&&y<=cv[3][1]&&x>=lex[0]&&x<=rex[0]){return{seriesIndex:s.index,pointIndex:j,gridData:null,data:s.data[j]};}}
break;case $.jqplot.LineRenderer:x=gridpos.x;y=gridpos.y;r=s.renderer;if(s.show){if(s.fill){var inside=false;if(x>s._boundingBox[0][0]&&x<s._boundingBox[1][0]&&y>s._boundingBox[1][1]&&y<s._boundingBox[0][1]){var numPoints=s._areaPoints.length;var ii;var j=numPoints-1;for(var ii=0;ii<numPoints;ii++){var vertex1=[s._areaPoints[ii][0],s._areaPoints[ii][1]];var vertex2=[s._areaPoints[j][0],s._areaPoints[j][1]];if(vertex1[1]<y&&vertex2[1]>=y||vertex2[1]<y&&vertex1[1]>=y){if(vertex1[0]+(y-vertex1[1])/(vertex2[1]-vertex1[1])*(vertex2[0]-vertex1[0])<x){inside=!inside;}}
j=ii;}}
if(inside){return{seriesIndex:i,pointIndex:null,gridData:s.gridData,data:s.data,points:s._areaPoints};}
break;}
else{t=s.markerRenderer.size/2+s.neighborThreshold;threshold=(t>0)?t:0;for(var j=0;j<s.gridData.length;j++){p=s.gridData[j];if(r.constructor==$.jqplot.OHLCRenderer){if(r.candleStick){var yp=s._yaxis.series_u2p;if(x>=p[0]-r._bodyWidth/2&&x<=p[0]+r._bodyWidth/2&&y>=yp(s.data[j][2])&&y<=yp(s.data[j][3])){return{seriesIndex:i,pointIndex:j,gridData:p,data:s.data[j]};}}
else if(!r.hlc){var yp=s._yaxis.series_u2p;if(x>=p[0]-r._tickLength&&x<=p[0]+r._tickLength&&y>=yp(s.data[j][2])&&y<=yp(s.data[j][3])){return{seriesIndex:i,pointIndex:j,gridData:p,data:s.data[j]};}}
else{var yp=s._yaxis.series_u2p;if(x>=p[0]-r._tickLength&&x<=p[0]+r._tickLength&&y>=yp(s.data[j][1])&&y<=yp(s.data[j][2])){return{seriesIndex:i,pointIndex:j,gridData:p,data:s.data[j]};}}}
else if(p[0]!=null&&p[1]!=null){d=Math.sqrt((x-p[0])*(x-p[0])+(y-p[1])*(y-p[1]));if(d<=threshold&&(d<=d0||d0==null)){d0=d;return{seriesIndex:i,pointIndex:j,gridData:p,data:s.data[j]};}}}}}
break;default:x=gridpos.x;y=gridpos.y;r=s.renderer;if(s.show){t=s.markerRenderer.size/2+s.neighborThreshold;threshold=(t>0)?t:0;for(var j=0;j<s.gridData.length;j++){p=s.gridData[j];if(r.constructor==$.jqplot.OHLCRenderer){if(r.candleStick){var yp=s._yaxis.series_u2p;if(x>=p[0]-r._bodyWidth/2&&x<=p[0]+r._bodyWidth/2&&y>=yp(s.data[j][2])&&y<=yp(s.data[j][3])){return{seriesIndex:i,pointIndex:j,gridData:p,data:s.data[j]};}}
else if(!r.hlc){var yp=s._yaxis.series_u2p;if(x>=p[0]-r._tickLength&&x<=p[0]+r._tickLength&&y>=yp(s.data[j][2])&&y<=yp(s.data[j][3])){return{seriesIndex:i,pointIndex:j,gridData:p,data:s.data[j]};}}
else{var yp=s._yaxis.series_u2p;if(x>=p[0]-r._tickLength&&x<=p[0]+r._tickLength&&y>=yp(s.data[j][1])&&y<=yp(s.data[j][2])){return{seriesIndex:i,pointIndex:j,gridData:p,data:s.data[j]};}}}
else{d=Math.sqrt((x-p[0])*(x-p[0])+(y-p[1])*(y-p[1]));if(d<=threshold&&(d<=d0||d0==null)){d0=d;return{seriesIndex:i,pointIndex:j,gridData:p,data:s.data[j]};}}}}
break;}}
return null;}
this.onClick=function(ev){var positions=getEventPosition(ev);var p=ev.data.plot;var neighbor=checkIntersection(positions.gridPos,p);var evt=jQuery.Event('jqplotClick');evt.pageX=ev.pageX;evt.pageY=ev.pageY;$(this).trigger(evt,[positions.gridPos,positions.dataPos,neighbor,p]);};this.onDblClick=function(ev){var positions=getEventPosition(ev);var p=ev.data.plot;var neighbor=checkIntersection(positions.gridPos,p);var evt=jQuery.Event('jqplotDblClick');evt.pageX=ev.pageX;evt.pageY=ev.pageY;$(this).trigger(evt,[positions.gridPos,positions.dataPos,neighbor,p]);};this.onMouseDown=function(ev){var positions=getEventPosition(ev);var p=ev.data.plot;var neighbor=checkIntersection(positions.gridPos,p);var evt=jQuery.Event('jqplotMouseDown');evt.pageX=ev.pageX;evt.pageY=ev.pageY;$(this).trigger(evt,[positions.gridPos,positions.dataPos,neighbor,p]);};this.onMouseUp=function(ev){var positions=getEventPosition(ev);var evt=jQuery.Event('jqplotMouseUp');evt.pageX=ev.pageX;evt.pageY=ev.pageY;$(this).trigger(evt,[positions.gridPos,positions.dataPos,null,ev.data.plot]);};this.onRightClick=function(ev){var positions=getEventPosition(ev);var p=ev.data.plot;var neighbor=checkIntersection(positions.gridPos,p);if(p.captureRightClick){if(ev.which==3){var evt=jQuery.Event('jqplotRightClick');evt.pageX=ev.pageX;evt.pageY=ev.pageY;$(this).trigger(evt,[positions.gridPos,positions.dataPos,neighbor,p]);}
else{var evt=jQuery.Event('jqplotMouseUp');evt.pageX=ev.pageX;evt.pageY=ev.pageY;$(this).trigger(evt,[positions.gridPos,positions.dataPos,neighbor,p]);}}};this.onMouseMove=function(ev){var positions=getEventPosition(ev);var p=ev.data.plot;var neighbor=checkIntersection(positions.gridPos,p);var evt=jQuery.Event('jqplotMouseMove');evt.pageX=ev.pageX;evt.pageY=ev.pageY;$(this).trigger(evt,[positions.gridPos,positions.dataPos,neighbor,p]);};this.onMouseEnter=function(ev){var positions=getEventPosition(ev);var p=ev.data.plot;var evt=jQuery.Event('jqplotMouseEnter');evt.pageX=ev.pageX;evt.pageY=ev.pageY;$(this).trigger(evt,[positions.gridPos,positions.dataPos,null,p]);};this.onMouseLeave=function(ev){var positions=getEventPosition(ev);var p=ev.data.plot;var evt=jQuery.Event('jqplotMouseLeave');evt.pageX=ev.pageX;evt.pageY=ev.pageY;$(this).trigger(evt,[positions.gridPos,positions.dataPos,null,p]);};this.drawSeries=function(options,idx){var i,series,ctx;idx=(typeof(options)=="number"&&idx==null)?options:idx;options=(typeof(options)=="object")?options:{};if(idx!=undefined){series=this.series[idx];ctx=series.shadowCanvas._ctx;ctx.clearRect(0,0,ctx.canvas.width,ctx.canvas.height);series.drawShadow(ctx,options,this);ctx=series.canvas._ctx;ctx.clearRect(0,0,ctx.canvas.width,ctx.canvas.height);series.draw(ctx,options,this);if(series.renderer.constructor==$.jqplot.BezierCurveRenderer){if(idx<this.series.length-1){this.drawSeries(idx+1);}}}
else{for(i=0;i<this.series.length;i++){series=this.series[i];ctx=series.shadowCanvas._ctx;ctx.clearRect(0,0,ctx.canvas.width,ctx.canvas.height);series.drawShadow(ctx,options,this);ctx=series.canvas._ctx;ctx.clearRect(0,0,ctx.canvas.width,ctx.canvas.height);series.draw(ctx,options,this);}}};this.moveSeriesToFront=function(idx){idx=parseInt(idx,10);var stackIndex=$.inArray(idx,this.seriesStack);if(stackIndex==-1){return;}
if(stackIndex==this.seriesStack.length-1){this.previousSeriesStack=this.seriesStack.slice(0);return;}
var opidx=this.seriesStack[this.seriesStack.length-1];var serelem=this.series[idx].canvas._elem.detach();var shadelem=this.series[idx].shadowCanvas._elem.detach();this.series[opidx].shadowCanvas._elem.after(shadelem);this.series[opidx].canvas._elem.after(serelem);this.previousSeriesStack=this.seriesStack.slice(0);this.seriesStack.splice(stackIndex,1);this.seriesStack.push(idx);};this.moveSeriesToBack=function(idx){idx=parseInt(idx,10);var stackIndex=$.inArray(idx,this.seriesStack);if(stackIndex==0||stackIndex==-1){return;}
var opidx=this.seriesStack[0];var serelem=this.series[idx].canvas._elem.detach();var shadelem=this.series[idx].shadowCanvas._elem.detach();this.series[opidx].shadowCanvas._elem.before(shadelem);this.series[opidx].canvas._elem.before(serelem);this.previousSeriesStack=this.seriesStack.slice(0);this.seriesStack.splice(stackIndex,1);this.seriesStack.unshift(idx);};this.restorePreviousSeriesOrder=function(){var i,j,serelem,shadelem,temp;if(this.seriesStack==this.previousSeriesStack){return;}
for(i=1;i<this.previousSeriesStack.length;i++){move=this.previousSeriesStack[i];keep=this.previousSeriesStack[i-1];serelem=this.series[move].canvas._elem.detach();shadelem=this.series[move].shadowCanvas._elem.detach();this.series[keep].shadowCanvas._elem.after(shadelem);this.series[keep].canvas._elem.after(serelem);}
temp=this.seriesStack.slice(0);this.seriesStack=this.previousSeriesStack.slice(0);this.previousSeriesStack=temp;};this.restoreOriginalSeriesOrder=function(){var i,j,arr=[];for(i=0;i<this.series.length;i++){arr.push(i);}
if(this.seriesStack==arr){return;}
this.previousSeriesStack=this.seriesStack.slice(0);this.seriesStack=arr;for(i=1;i<this.seriesStack.length;i++){serelem=this.series[i].canvas._elem.detach();shadelem=this.series[i].shadowCanvas._elem.detach();this.series[i-1].shadowCanvas._elem.after(shadelem);this.series[i-1].canvas._elem.after(serelem);}};this.activateTheme=function(name){this.themeEngine.activate(this,name);};}
$.jqplot.computeHighlightColors=function(colors){var ret;if(typeof(colors)=="array"){ret=[];for(var i=0;i<colors.length;i++){var rgba=$.jqplot.getColorComponents(colors[i]);var newrgb=[rgba[0],rgba[1],rgba[2]];var sum=newrgb[0]+newrgb[1]+newrgb[2];for(var j=0;j<3;j++){newrgb[j]=(sum>570)?newrgb[j]*0.8:newrgb[j]+0.3*(255-newrgb[j]);newrgb[j]=parseInt(newrgb[j],10);}
ret.push('rgb('+newrgb[0]+','+newrgb[1]+','+newrgb[2]+')');}}
else{var rgba=$.jqplot.getColorComponents(colors);var newrgb=[rgba[0],rgba[1],rgba[2]];var sum=newrgb[0]+newrgb[1]+newrgb[2];for(var j=0;j<3;j++){newrgb[j]=(sum>570)?newrgb[j]*0.8:newrgb[j]+0.3*(255-newrgb[j]);newrgb[j]=parseInt(newrgb[j],10);}
ret='rgb('+newrgb[0]+','+newrgb[1]+','+newrgb[2]+')';}
return ret;};$.jqplot.ColorGenerator=function(colors){var idx=0;this.next=function(){if(idx<colors.length){return colors[idx++];}
else{idx=0;return colors[idx++];}};this.previous=function(){if(idx>0){return colors[idx--];}
else{idx=colors.length-1;return colors[idx];}};this.get=function(i){var idx=i-colors.length*Math.floor(i/colors.length);return colors[idx];};this.setColors=function(c){colors=c;};this.reset=function(){idx=0;};};$.jqplot.hex2rgb=function(h,a){h=h.replace('#','');if(h.length==3){h=h[0]+h[0]+h[1]+h[1]+h[2]+h[2];}
var rgb;rgb='rgba('+parseInt(h.slice(0,2),16)+', '+parseInt(h.slice(2,4),16)+', '+parseInt(h.slice(4,6),16);if(a){rgb+=', '+a;}
rgb+=')';return rgb;};$.jqplot.rgb2hex=function(s){var pat=/rgba?\( *([0-9]{1,3}\.?[0-9]*%?) *, *([0-9]{1,3}\.?[0-9]*%?) *, *([0-9]{1,3}\.?[0-9]*%?) *(?:, *[0-9.]*)?\)/;var m=s.match(pat);var h='#';for(i=1;i<4;i++){var temp;if(m[i].search(/%/)!=-1){temp=parseInt(255*m[i]/100,10).toString(16);if(temp.length==1){temp='0'+temp;}}
else{temp=parseInt(m[i],10).toString(16);if(temp.length==1){temp='0'+temp;}}
h+=temp;}
return h;};$.jqplot.normalize2rgb=function(s,a){if(s.search(/^ *rgba?\(/)!=-1){return s;}
else if(s.search(/^ *#?[0-9a-fA-F]?[0-9a-fA-F]/)!=-1){return $.jqplot.hex2rgb(s,a);}
else{throw'invalid color spec';}};$.jqplot.getColorComponents=function(s){s=$.jqplot.colorKeywordMap[s]||s;var rgb=$.jqplot.normalize2rgb(s);var pat=/rgba?\( *([0-9]{1,3}\.?[0-9]*%?) *, *([0-9]{1,3}\.?[0-9]*%?) *, *([0-9]{1,3}\.?[0-9]*%?) *,? *([0-9.]* *)?\)/;var m=rgb.match(pat);var ret=[];for(i=1;i<4;i++){if(m[i].search(/%/)!=-1){ret[i-1]=parseInt(255*m[i]/100,10);}
else{ret[i-1]=parseInt(m[i],10);}}
ret[3]=parseFloat(m[4])?parseFloat(m[4]):1.0;return ret;};$.jqplot.colorKeywordMap={aliceblue:'rgb(240, 248, 255)',antiquewhite:'rgb(250, 235, 215)',aqua:'rgb( 0, 255, 255)',aquamarine:'rgb(127, 255, 212)',azure:'rgb(240, 255, 255)',beige:'rgb(245, 245, 220)',bisque:'rgb(255, 228, 196)',black:'rgb( 0, 0, 0)',blanchedalmond:'rgb(255, 235, 205)',blue:'rgb( 0, 0, 255)',blueviolet:'rgb(138, 43, 226)',brown:'rgb(165, 42, 42)',burlywood:'rgb(222, 184, 135)',cadetblue:'rgb( 95, 158, 160)',chartreuse:'rgb(127, 255, 0)',chocolate:'rgb(210, 105, 30)',coral:'rgb(255, 127, 80)',cornflowerblue:'rgb(100, 149, 237)',cornsilk:'rgb(255, 248, 220)',crimson:'rgb(220, 20, 60)',cyan:'rgb( 0, 255, 255)',darkblue:'rgb( 0, 0, 139)',darkcyan:'rgb( 0, 139, 139)',darkgoldenrod:'rgb(184, 134, 11)',darkgray:'rgb(169, 169, 169)',darkgreen:'rgb( 0, 100, 0)',darkgrey:'rgb(169, 169, 169)',darkkhaki:'rgb(189, 183, 107)',darkmagenta:'rgb(139, 0, 139)',darkolivegreen:'rgb( 85, 107, 47)',darkorange:'rgb(255, 140, 0)',darkorchid:'rgb(153, 50, 204)',darkred:'rgb(139, 0, 0)',darksalmon:'rgb(233, 150, 122)',darkseagreen:'rgb(143, 188, 143)',darkslateblue:'rgb( 72, 61, 139)',darkslategray:'rgb( 47, 79, 79)',darkslategrey:'rgb( 47, 79, 79)',darkturquoise:'rgb( 0, 206, 209)',darkviolet:'rgb(148, 0, 211)',deeppink:'rgb(255, 20, 147)',deepskyblue:'rgb( 0, 191, 255)',dimgray:'rgb(105, 105, 105)',dimgrey:'rgb(105, 105, 105)',dodgerblue:'rgb( 30, 144, 255)',firebrick:'rgb(178, 34, 34)',floralwhite:'rgb(255, 250, 240)',forestgreen:'rgb( 34, 139, 34)',fuchsia:'rgb(255, 0, 255)',gainsboro:'rgb(220, 220, 220)',ghostwhite:'rgb(248, 248, 255)',gold:'rgb(255, 215, 0)',goldenrod:'rgb(218, 165, 32)',gray:'rgb(128, 128, 128)',grey:'rgb(128, 128, 128)',green:'rgb( 0, 128, 0)',greenyellow:'rgb(173, 255, 47)',honeydew:'rgb(240, 255, 240)',hotpink:'rgb(255, 105, 180)',indianred:'rgb(205, 92, 92)',indigo:'rgb( 75, 0, 130)',ivory:'rgb(255, 255, 240)',khaki:'rgb(240, 230, 140)',lavender:'rgb(230, 230, 250)',lavenderblush:'rgb(255, 240, 245)',lawngreen:'rgb(124, 252, 0)',lemonchiffon:'rgb(255, 250, 205)',lightblue:'rgb(173, 216, 230)',lightcoral:'rgb(240, 128, 128)',lightcyan:'rgb(224, 255, 255)',lightgoldenrodyellow:'rgb(250, 250, 210)',lightgray:'rgb(211, 211, 211)',lightgreen:'rgb(144, 238, 144)',lightgrey:'rgb(211, 211, 211)',lightpink:'rgb(255, 182, 193)',lightsalmon:'rgb(255, 160, 122)',lightseagreen:'rgb( 32, 178, 170)',lightskyblue:'rgb(135, 206, 250)',lightslategray:'rgb(119, 136, 153)',lightslategrey:'rgb(119, 136, 153)',lightsteelblue:'rgb(176, 196, 222)',lightyellow:'rgb(255, 255, 224)',lime:'rgb( 0, 255, 0)',limegreen:'rgb( 50, 205, 50)',linen:'rgb(250, 240, 230)',magenta:'rgb(255, 0, 255)',maroon:'rgb(128, 0, 0)',mediumaquamarine:'rgb(102, 205, 170)',mediumblue:'rgb( 0, 0, 205)',mediumorchid:'rgb(186, 85, 211)',mediumpurple:'rgb(147, 112, 219)',mediumseagreen:'rgb( 60, 179, 113)',mediumslateblue:'rgb(123, 104, 238)',mediumspringgreen:'rgb( 0, 250, 154)',mediumturquoise:'rgb( 72, 209, 204)',mediumvioletred:'rgb(199, 21, 133)',midnightblue:'rgb( 25, 25, 112)',mintcream:'rgb(245, 255, 250)',mistyrose:'rgb(255, 228, 225)',moccasin:'rgb(255, 228, 181)',navajowhite:'rgb(255, 222, 173)',navy:'rgb( 0, 0, 128)',oldlace:'rgb(253, 245, 230)',olive:'rgb(128, 128, 0)',olivedrab:'rgb(107, 142, 35)',orange:'rgb(255, 165, 0)',orangered:'rgb(255, 69, 0)',orchid:'rgb(218, 112, 214)',palegoldenrod:'rgb(238, 232, 170)',palegreen:'rgb(152, 251, 152)',paleturquoise:'rgb(175, 238, 238)',palevioletred:'rgb(219, 112, 147)',papayawhip:'rgb(255, 239, 213)',peachpuff:'rgb(255, 218, 185)',peru:'rgb(205, 133, 63)',pink:'rgb(255, 192, 203)',plum:'rgb(221, 160, 221)',powderblue:'rgb(176, 224, 230)',purple:'rgb(128, 0, 128)',red:'rgb(255, 0, 0)',rosybrown:'rgb(188, 143, 143)',royalblue:'rgb( 65, 105, 225)',saddlebrown:'rgb(139, 69, 19)',salmon:'rgb(250, 128, 114)',sandybrown:'rgb(244, 164, 96)',seagreen:'rgb( 46, 139, 87)',seashell:'rgb(255, 245, 238)',sienna:'rgb(160, 82, 45)',silver:'rgb(192, 192, 192)',skyblue:'rgb(135, 206, 235)',slateblue:'rgb(106, 90, 205)',slategray:'rgb(112, 128, 144)',slategrey:'rgb(112, 128, 144)',snow:'rgb(255, 250, 250)',springgreen:'rgb( 0, 255, 127)',steelblue:'rgb( 70, 130, 180)',tan:'rgb(210, 180, 140)',teal:'rgb( 0, 128, 128)',thistle:'rgb(216, 191, 216)',tomato:'rgb(255, 99, 71)',turquoise:'rgb( 64, 224, 208)',violet:'rgb(238, 130, 238)',wheat:'rgb(245, 222, 179)',white:'rgb(255, 255, 255)',whitesmoke:'rgb(245, 245, 245)',yellow:'rgb(255, 255, 0)',yellowgreen:'rgb(154, 205, 50)'};$.jqplot.log=function(){if(window.console&&$.jqplot.debug){if(arguments.length==1){console.log(arguments[0]);}
else{console.log(arguments);}}};var log=$.jqplot.log;$.jqplot.AxisLabelRenderer=function(options){$.jqplot.ElemContainer.call(this);this.axis;this.show=true;this.label='';this.fontFamily=null;this.fontSize=null;this.textColor=null;this._elem;this.escapeHTML=false;$.extend(true,this,options);};$.jqplot.AxisLabelRenderer.prototype=new $.jqplot.ElemContainer();$.jqplot.AxisLabelRenderer.prototype.constructor=$.jqplot.AxisLabelRenderer;$.jqplot.AxisLabelRenderer.prototype.init=function(options){$.extend(true,this,options);};$.jqplot.AxisLabelRenderer.prototype.draw=function(){this._elem=$('<div style="position:absolute;" class="jqplot-'+this.axis+'-label"></div>');if(Number(this.label)){this._elem.css('white-space','nowrap');}
if(!this.escapeHTML){this._elem.html(this.label);}
else{this._elem.text(this.label);}
if(this.fontFamily){this._elem.css('font-family',this.fontFamily);}
if(this.fontSize){this._elem.css('font-size',this.fontSize);}
if(this.textColor){this._elem.css('color',this.textColor);}
return this._elem;};$.jqplot.AxisLabelRenderer.prototype.pack=function(){};$.jqplot.AxisTickRenderer=function(options){$.jqplot.ElemContainer.call(this);this.mark='outside';this.axis;this.showMark=true;this.showGridline=true;this.isMinorTick=false;this.size=4;this.markSize=6;this.show=true;this.showLabel=true;this.label='';this.value=null;this._styles={};this.formatter=$.jqplot.DefaultTickFormatter;this.prefix='';this.formatString='';this.fontFamily;this.fontSize;this.textColor;this._elem;$.extend(true,this,options);};$.jqplot.AxisTickRenderer.prototype.init=function(options){$.extend(true,this,options);};$.jqplot.AxisTickRenderer.prototype=new $.jqplot.ElemContainer();$.jqplot.AxisTickRenderer.prototype.constructor=$.jqplot.AxisTickRenderer;$.jqplot.AxisTickRenderer.prototype.setTick=function(value,axisName,isMinor){this.value=value;this.axis=axisName;if(isMinor){this.isMinorTick=true;}
return this;};$.jqplot.AxisTickRenderer.prototype.draw=function(){if(!this.label){this.label=this.formatter(this.formatString,this.value);}
if(this.prefix&&!this.formatString){this.label=this.prefix+this.label;}
style='style="position:absolute;';if(Number(this.label)){style+='white-space:nowrap;';}
style+='"';this._elem=$('<div '+style+' class="jqplot-'+this.axis+'-tick">'+this.label+'</div>');for(var s in this._styles){this._elem.css(s,this._styles[s]);}
if(this.fontFamily){this._elem.css('font-family',this.fontFamily);}
if(this.fontSize){this._elem.css('font-size',this.fontSize);}
if(this.textColor){this._elem.css('color',this.textColor);}
return this._elem;};$.jqplot.DefaultTickFormatter=function(format,val){if(typeof val=='number'){if(!format){format=$.jqplot.config.defaultTickFormatString;}
return $.jqplot.sprintf(format,val);}
else{return String(val);}};$.jqplot.AxisTickRenderer.prototype.pack=function(){};$.jqplot.CanvasGridRenderer=function(){this.shadowRenderer=new $.jqplot.ShadowRenderer();};$.jqplot.CanvasGridRenderer.prototype.init=function(options){this._ctx;$.extend(true,this,options);var sopts={lineJoin:'miter',lineCap:'round',fill:false,isarc:false,angle:this.shadowAngle,offset:this.shadowOffset,alpha:this.shadowAlpha,depth:this.shadowDepth,lineWidth:this.shadowWidth,closePath:false,strokeStyle:this.shadowColor};this.renderer.shadowRenderer.init(sopts);};$.jqplot.CanvasGridRenderer.prototype.createElement=function(){var elem=document.createElement('canvas');var w=this._plotDimensions.width;var h=this._plotDimensions.height;elem.width=w;elem.height=h;this._elem=$(elem);this._elem.addClass('jqplot-grid-canvas');this._elem.css({position:'absolute',left:0,top:0});if($.browser.msie && $.browser.version!='9.0'){window.G_vmlCanvasManager.init_(document);}
if($.browser.msie && $.browser.version!='9.0'){elem=window.G_vmlCanvasManager.initElement(elem);}
this._top=this._offsets.top;this._bottom=h-this._offsets.bottom;this._left=this._offsets.left;this._right=w-this._offsets.right;this._width=this._right-this._left;this._height=this._bottom-this._top;return this._elem;};$.jqplot.CanvasGridRenderer.prototype.draw=function(){this._ctx=this._elem.get(0).getContext("2d");var ctx=this._ctx;var axes=this._axes;ctx.save();ctx.clearRect(0,0,this._plotDimensions.width,this._plotDimensions.height);ctx.fillStyle=this.backgroundColor||this.background;ctx.fillRect(this._left,this._top,this._width,this._height);if(this.drawGridlines){ctx.save();ctx.lineJoin='miter';ctx.lineCap='butt';ctx.lineWidth=this.gridLineWidth;ctx.strokeStyle=this.gridLineColor;var b,e;var ax=['xaxis','yaxis','x2axis','y2axis'];for(var i=4;i>0;i--){var name=ax[i-1];var axis=axes[name];var ticks=axis._ticks;if(axis.show){for(var j=ticks.length;j>0;j--){var t=ticks[j-1];if(t.show){var pos=Math.round(axis.u2p(t.value))+0.5;switch(name){case'xaxis':if(t.showGridline){drawLine(pos,this._top,pos,this._bottom);}
if(t.showMark&&t.mark){s=t.markSize;m=t.mark;var pos=Math.round(axis.u2p(t.value))+0.5;switch(m){case'outside':b=this._bottom;e=this._bottom+s;break;case'inside':b=this._bottom-s;e=this._bottom;break;case'cross':b=this._bottom-s;e=this._bottom+s;break;default:b=this._bottom;e=this._bottom+s;break;}
if(this.shadow){this.renderer.shadowRenderer.draw(ctx,[[pos,b],[pos,e]],{lineCap:'butt',lineWidth:this.gridLineWidth,offset:this.gridLineWidth*0.75,depth:2,fill:false,closePath:false});}
drawLine(pos,b,pos,e);}
break;case'yaxis':if(t.showGridline){drawLine(this._right,pos,this._left,pos);}
if(t.showMark&&t.mark){s=t.markSize;m=t.mark;var pos=Math.round(axis.u2p(t.value))+0.5;switch(m){case'outside':b=this._left-s;e=this._left;break;case'inside':b=this._left;e=this._left+s;break;case'cross':b=this._left-s;e=this._left+s;break;default:b=this._left-s;e=this._left;break;}
if(this.shadow){this.renderer.shadowRenderer.draw(ctx,[[b,pos],[e,pos]],{lineCap:'butt',lineWidth:this.gridLineWidth*1.5,offset:this.gridLineWidth*0.75,fill:false,closePath:false});}
drawLine(b,pos,e,pos,{strokeStyle:axis.borderColor});}
break;case'x2axis':if(t.showGridline){drawLine(pos,this._bottom,pos,this._top);}
if(t.showMark&&t.mark){s=t.markSize;m=t.mark;var pos=Math.round(axis.u2p(t.value))+0.5;switch(m){case'outside':b=this._top-s;e=this._top;break;case'inside':b=this._top;e=this._top+s;break;case'cross':b=this._top-s;e=this._top+s;break;default:b=this._top-s;e=this._top;break;}
if(this.shadow){this.renderer.shadowRenderer.draw(ctx,[[pos,b],[pos,e]],{lineCap:'butt',lineWidth:this.gridLineWidth,offset:this.gridLineWidth*0.75,depth:2,fill:false,closePath:false});}
drawLine(pos,b,pos,e);}
break;case'y2axis':if(t.showGridline){drawLine(this._left,pos,this._right,pos);}
if(t.showMark&&t.mark){s=t.markSize;m=t.mark;var pos=Math.round(axis.u2p(t.value))+0.5;switch(m){case'outside':b=this._right;e=this._right+s;break;case'inside':b=this._right-s;e=this._right;break;case'cross':b=this._right-s;e=this._right+s;break;default:b=this._right;e=this._right+s;break;}
if(this.shadow){this.renderer.shadowRenderer.draw(ctx,[[b,pos],[e,pos]],{lineCap:'butt',lineWidth:this.gridLineWidth*1.5,offset:this.gridLineWidth*0.75,fill:false,closePath:false});}
drawLine(b,pos,e,pos,{strokeStyle:axis.borderColor});}
break;default:break;}}}}}
ax=['y3axis','y4axis','y5axis','y6axis','y7axis','y8axis','y9axis'];for(var i=7;i>0;i--){var axis=axes[ax[i-1]];var ticks=axis._ticks;if(axis.show){var tn=ticks[axis.numberTicks-1];var t0=ticks[0];var left=axis.getLeft();var points=[[left,tn.getTop()+tn.getHeight()/2],[left,t0.getTop()+t0.getHeight()/2+1.0]];if(this.shadow){this.renderer.shadowRenderer.draw(ctx,points,{lineCap:'butt',fill:false,closePath:false});}
drawLine(points[0][0],points[0][1],points[1][0],points[1][1],{lineCap:'butt',strokeStyle:axis.borderColor,lineWidth:axis.borderWidth});for(var j=ticks.length;j>0;j--){var t=ticks[j-1];s=t.markSize;m=t.mark;var pos=Math.round(axis.u2p(t.value))+0.5;if(t.showMark&&t.mark){switch(m){case'outside':b=left;e=left+s;break;case'inside':b=left-s;e=left;break;case'cross':b=left-s;e=left+s;break;default:b=left;e=left+s;break;}
points=[[b,pos],[e,pos]];if(this.shadow){this.renderer.shadowRenderer.draw(ctx,points,{lineCap:'butt',lineWidth:this.gridLineWidth*1.5,offset:this.gridLineWidth*0.75,fill:false,closePath:false});}
drawLine(b,pos,e,pos,{strokeStyle:axis.borderColor});}}}}
ctx.restore();}
function drawLine(bx,by,ex,ey,opts){ctx.save();opts=opts||{};if(opts.lineWidth==null||opts.lineWidth!=0){$.extend(true,ctx,opts);ctx.beginPath();ctx.moveTo(bx,by);ctx.lineTo(ex,ey);ctx.stroke();ctx.restore();}}
if(this.shadow){var points=[[this._left,this._bottom],[this._right,this._bottom],[this._right,this._top]];this.renderer.shadowRenderer.draw(ctx,points);}
if(this.borderWidth!=0&&this.drawBorder){drawLine(this._left,this._top,this._right,this._top,{lineCap:'round',strokeStyle:axes.x2axis.borderColor,lineWidth:axes.x2axis.borderWidth});drawLine(this._right,this._top,this._right,this._bottom,{lineCap:'round',strokeStyle:axes.y2axis.borderColor,lineWidth:axes.y2axis.borderWidth});drawLine(this._right,this._bottom,this._left,this._bottom,{lineCap:'round',strokeStyle:axes.xaxis.borderColor,lineWidth:axes.xaxis.borderWidth});drawLine(this._left,this._bottom,this._left,this._top,{lineCap:'round',strokeStyle:axes.yaxis.borderColor,lineWidth:axes.yaxis.borderWidth});}
ctx.restore();};var day=24*60*60*1000;var zeroPad=function(number,digits){number=String(number);while(number.length<digits){number='0'+number;}
return number;};var multipliers={millisecond:1,second:1000,minute:60*1000,hour:60*60*1000,day:day,week:7*day,month:{add:function(d,number){multipliers.year.add(d,Math[number>0?'floor':'ceil'](number/12));var prevMonth=d.getMonth()+(number%12);if(prevMonth==12){prevMonth=0;d.setYear(d.getFullYear()+1);}else if(prevMonth==-1){prevMonth=11;d.setYear(d.getFullYear()-1);}
d.setMonth(prevMonth);},diff:function(d1,d2){var diffYears=d1.getFullYear()-d2.getFullYear();var diffMonths=d1.getMonth()-d2.getMonth()+(diffYears*12);var diffDays=d1.getDate()-d2.getDate();return diffMonths+(diffDays/30);}},year:{add:function(d,number){d.setYear(d.getFullYear()+Math[number>0?'floor':'ceil'](number));},diff:function(d1,d2){return multipliers.month.diff(d1,d2)/12;}}};for(var unit in multipliers){if(unit.substring(unit.length-1)!='s'){multipliers[unit+'s']=multipliers[unit];}}
var format=function(d,code){if(Date.prototype.strftime.formatShortcuts[code]){return d.strftime(Date.prototype.strftime.formatShortcuts[code]);}else{var getter=(Date.prototype.strftime.formatCodes[code]||'').split('.');var nbr=d['get'+getter[0]]?d['get'+getter[0]]():'';if(getter[1]){nbr=zeroPad(nbr,getter[1]);}
return nbr;}};var instanceMethods={succ:function(unit){return this.clone().add(1,unit);},add:function(number,unit){var factor=multipliers[unit]||multipliers.day;if(typeof factor=='number'){this.setTime(this.getTime()+(factor*number));}else{factor.add(this,number);}
return this;},diff:function(dateObj,unit,allowDecimal){dateObj=Date.create(dateObj);if(dateObj===null){return null;}
var factor=multipliers[unit]||multipliers.day;if(typeof factor=='number'){var unitDiff=(this.getTime()-dateObj.getTime())/factor;}else{var unitDiff=factor.diff(this,dateObj);}
return(allowDecimal?unitDiff:Math[unitDiff>0?'floor':'ceil'](unitDiff));},strftime:function(formatStr){var source=formatStr||'%Y-%m-%d',result='',match;while(source.length>0){if(match=source.match(Date.prototype.strftime.formatCodes.matcher)){result+=source.slice(0,match.index);result+=(match[1]||'')+format(this,match[2]);source=source.slice(match.index+match[0].length);}else{result+=source;source='';}}
return result;},getShortYear:function(){return this.getYear()%100;},getMonthNumber:function(){return this.getMonth()+1;},getMonthName:function(){return Date.MONTHNAMES[this.getMonth()];},getAbbrMonthName:function(){return Date.ABBR_MONTHNAMES[this.getMonth()];},getDayName:function(){return Date.DAYNAMES[this.getDay()];},getAbbrDayName:function(){return Date.ABBR_DAYNAMES[this.getDay()];},getDayOrdinal:function(){return Date.ORDINALNAMES[this.getDate()%10];},getHours12:function(){var hours=this.getHours();return hours>12?hours-12:(hours==0?12:hours);},getAmPm:function(){return this.getHours()>=12?'PM':'AM';},getUnix:function(){return Math.round(this.getTime()/1000,0);},getGmtOffset:function(){var hours=this.getTimezoneOffset()/60;var prefix=hours<0?'+':'-';hours=Math.abs(hours);return prefix+zeroPad(Math.floor(hours),2)+':'+zeroPad((hours%1)*60,2);},getTimezoneName:function(){var match=/(?:\((.+)\)$| ([A-Z]{3}) )/.exec(this.toString());return match[1]||match[2]||'GMT'+this.getGmtOffset();},toYmdInt:function(){return(this.getFullYear()*10000)+(this.getMonthNumber()*100)+this.getDate();},clone:function(){return new Date(this.getTime());}};for(var name in instanceMethods){Date.prototype[name]=instanceMethods[name];}
var staticMethods={create:function(date){if(date instanceof Date){return date;}
if(typeof date=='number'){return new Date(date);}
var parsable=String(date).replace(/^\s*(.+)\s*$/,'$1'),i=0,length=Date.create.patterns.length,pattern;var current=parsable;while(i<length){ms=Date.parse(current);if(!isNaN(ms)){return new Date(ms);}
pattern=Date.create.patterns[i];if(typeof pattern=='function'){obj=pattern(current);if(obj instanceof Date){return obj;}}else{current=parsable.replace(pattern[0],pattern[1]);}
i++;}
return NaN;},MONTHNAMES:'January February March April May June July August September October November December'.split(' '),ABBR_MONTHNAMES:'Jan Feb Mar Apr May Jun Jul Aug Sep Oct Nov Dec'.split(' '),DAYNAMES:'Sunday Monday Tuesday Wednesday Thursday Friday Saturday'.split(' '),ABBR_DAYNAMES:'Sun Mon Tue Wed Thu Fri Sat'.split(' '),ORDINALNAMES:'th st nd rd th th th th th th'.split(' '),ISO:'%Y-%m-%dT%H:%M:%S.%N%G',SQL:'%Y-%m-%d %H:%M:%S',daysInMonth:function(year,month){if(month==2){return new Date(year,1,29).getDate()==29?29:28;}
return[undefined,31,undefined,31,30,31,30,31,31,30,31,30,31][month];}};for(var name in staticMethods){Date[name]=staticMethods[name];}
Date.prototype.strftime.formatCodes={matcher:/()%(#?(%|[a-z]))/i,Y:'FullYear',y:'ShortYear.2',m:'MonthNumber.2','#m':'MonthNumber',B:'MonthName',b:'AbbrMonthName',d:'Date.2','#d':'Date',e:'Date',A:'DayName',a:'AbbrDayName',w:'Day',o:'DayOrdinal',H:'Hours.2','#H':'Hours',I:'Hours12.2','#I':'Hours12',p:'AmPm',M:'Minutes.2','#M':'Minutes',S:'Seconds.2','#S':'Seconds',s:'Unix',N:'Milliseconds.3','#N':'Milliseconds',O:'TimezoneOffset',Z:'TimezoneName',G:'GmtOffset'};Date.prototype.strftime.formatShortcuts={F:'%Y-%m-%d',T:'%H:%M:%S',X:'%H:%M:%S',x:'%m/%d/%y',D:'%m/%d/%y','#c':'%a %b %e %H:%M:%S %Y',v:'%e-%b-%Y',R:'%H:%M',r:'%I:%M:%S %p',t:'\t',n:'\n','%':'%'};Date.create.patterns=[[/-/g,'/'],[/st|nd|rd|th/g,''],[/(3[01]|[0-2]\d)\s*\.\s*(1[0-2]|0\d)\s*\.\s*([1-9]\d{3})/,'$2/$1/$3'],[/([1-9]\d{3})\s*-\s*(1[0-2]|0\d)\s*-\s*(3[01]|[0-2]\d)/,'$2/$3/$1'],function(str){var match=str.match(/^(?:(.+)\s+)?([012]?\d)(?:\s*\:\s*(\d\d))?(?:\s*\:\s*(\d\d(\.\d*)?))?\s*(am|pm)?\s*$/i);if(match){if(match[1]){var d=Date.create(match[1]);if(isNaN(d)){return;}}else{var d=new Date();d.setMilliseconds(0);}
var hour=parseFloat(match[2]);if(match[6]){hour=match[6].toLowerCase()=='am'?(hour==12?0:hour):(hour==12?12:hour+12);}
d.setHours(hour,parseInt(match[3]||0,10),parseInt(match[4]||0,10),((parseFloat(match[5]||0))||0)*1000);return d;}
else{return str;}},function(str){var match=str.match(/^(?:(.+))[T|\s+]([012]\d)(?:\:(\d\d))(?:\:(\d\d))(?:\.\d+)([\+\-]\d\d\:\d\d)$/i);if(match){if(match[1]){var d=Date.create(match[1]);if(isNaN(d)){return;}}else{var d=new Date();d.setMilliseconds(0);}
var hour=parseFloat(match[2]);d.setHours(hour,parseInt(match[3],10),parseInt(match[4],10),parseFloat(match[5])*1000);return d;}
else{return str;}},function(str){var match=str.match(/^([0-3]?\d)\s*[-\/.\s]{1}\s*([a-zA-Z]{3,9})\s*[-\/.\s]{1}\s*([0-3]?\d)$/);if(match){var d=new Date();var y=parseFloat(String(d.getFullYear()).slice(2,4));var cent=parseInt(String(d.getFullYear())/100,10)*100;var centoffset=1;var m1=parseFloat(match[1]);var m3=parseFloat(match[3]);var ny,nd,nm;if(m1>31){nd=match[3];if(m1<y+centoffset){ny=cent+m1;}
else{ny=cent-100+m1;}}
else{nd=match[1];if(m3<y+centoffset){ny=cent+m3;}
else{ny=cent-100+m3;}}
var nm=$.inArray(match[2],Date.ABBR_MONTHNAMES);if(nm==-1){nm=$.inArray(match[2],Date.MONTHNAMES);}
d.setFullYear(ny,nm,nd);d.setHours(0,0,0,0);return d;}
else{return str;}}];if($.jqplot.config.debug){$.date=Date.create;}
$.jqplot.DivTitleRenderer=function(){};$.jqplot.DivTitleRenderer.prototype.init=function(options){$.extend(true,this,options);};$.jqplot.DivTitleRenderer.prototype.draw=function(){var r=this.renderer;if(!this.text){this.show=false;this._elem=$('<div class="jqplot-title" style="height:0px;width:0px;"></div>');}
else if(this.text){var color;if(this.color){color=this.color;}
else if(this.textColor){color=this.textColor;}
var styletext='position:absolute;top:0px;left:0px;';styletext+=(this._plotWidth)?'width:'+this._plotWidth+'px;':'';styletext+=(this.fontSize)?'font-size:'+this.fontSize+';':'';styletext+=(this.textAlign)?'text-align:'+this.textAlign+';':'text-align:center;';styletext+=(color)?'color:'+color+';':'';styletext+=(this.paddingBottom)?'padding-bottom:'+this.paddingBottom+';':'';this._elem=$('<div class="jqplot-title" style="'+styletext+'">'+this.text+'</div>');if(this.fontFamily){this._elem.css('font-family',this.fontFamily);}}
return this._elem;};$.jqplot.DivTitleRenderer.prototype.pack=function(){};$.jqplot.LineRenderer=function(){this.shapeRenderer=new $.jqplot.ShapeRenderer();this.shadowRenderer=new $.jqplot.ShadowRenderer();};$.jqplot.LineRenderer.prototype.init=function(options,plot){options=options||{};var lopts={highlightMouseOver:options.highlightMouseOver,highlightMouseDown:options.highlightMouseDown,highlightColor:options.highlightColor};delete(options.highlightMouseOver);delete(options.highlightMouseDown);delete(options.highlightColor);$.extend(true,this.renderer,options);var opts={lineJoin:'round',lineCap:'round',fill:this.fill,isarc:false,strokeStyle:this.color,fillStyle:this.fillColor,lineWidth:this.lineWidth,closePath:this.fill};this.renderer.shapeRenderer.init(opts);if(this.lineWidth>2.5){var shadow_offset=this.shadowOffset*(1+(Math.atan((this.lineWidth/2.5))/0.785398163-1)*0.6);}
else{var shadow_offset=this.shadowOffset*Math.atan((this.lineWidth/2.5))/0.785398163;}
var sopts={lineJoin:'round',lineCap:'round',fill:this.fill,isarc:false,angle:this.shadowAngle,offset:shadow_offset,alpha:this.shadowAlpha,depth:this.shadowDepth,lineWidth:this.lineWidth,closePath:this.fill};this.renderer.shadowRenderer.init(sopts);this._areaPoints=[];this._boundingBox=[[],[]];if(!this.isTrendline&&this.fill){this.highlightMouseOver=true;this.highlightMouseDown=false;this.highlightColor=null;if(lopts.highlightMouseDown&&lopts.highlightMouseOver==null){lopts.highlightMouseOver=false;}
$.extend(true,this,{highlightMouseOver:lopts.highlightMouseOver,highlightMouseDown:lopts.highlightMouseDown,highlightColor:lopts.highlightColor});if(!this.highlightColor){this.highlightColor=$.jqplot.computeHighlightColors(this.fillColor);}
if(this.highlighter){this.highlighter.show=false;}
plot.postInitHooks.addOnce(postInit);plot.postDrawHooks.addOnce(postPlotDraw);plot.eventListenerHooks.addOnce('jqplotMouseMove',handleMove);plot.eventListenerHooks.addOnce('jqplotMouseDown',handleMouseDown);plot.eventListenerHooks.addOnce('jqplotMouseUp',handleMouseUp);plot.eventListenerHooks.addOnce('jqplotClick',handleClick);plot.eventListenerHooks.addOnce('jqplotRightClick',handleRightClick);}};$.jqplot.LineRenderer.prototype.setGridData=function(plot){var xp=this._xaxis.series_u2p;var yp=this._yaxis.series_u2p;var data=this._plotData;var pdata=this._prevPlotData;this.gridData=[];this._prevGridData=[];for(var i=0;i<this.data.length;i++){if(data[i][0]!=null&&data[i][1]!=null){this.gridData.push([xp.call(this._xaxis,data[i][0]),yp.call(this._yaxis,data[i][1])]);}
else if(data[i][0]==null){this.gridData.push([null,yp.call(this._yaxis,data[i][1])]);}
else if(data[i][1]==null){this.gridData.push([xp.call(this._xaxis,data[i][0]),null]);}
if(pdata[i]!=null&&pdata[i][0]!=null&&pdata[i][1]!=null){this._prevGridData.push([xp.call(this._xaxis,pdata[i][0]),yp.call(this._yaxis,pdata[i][1])]);}
else if(pdata[i]!=null&&pdata[i][0]==null){this._prevGridData.push([null,yp.call(this._yaxis,pdata[i][1])]);}
else if(pdata[i]!=null&&pdata[i][0]!=null&&pdata[i][1]==null){this._prevGridData.push([xp.call(this._xaxis,pdata[i][0]),null]);}}};$.jqplot.LineRenderer.prototype.makeGridData=function(data,plot){var xp=this._xaxis.series_u2p;var yp=this._yaxis.series_u2p;var gd=[];var pgd=[];for(var i=0;i<data.length;i++){if(data[i][0]!=null&&data[i][1]!=null){gd.push([xp.call(this._xaxis,data[i][0]),yp.call(this._yaxis,data[i][1])]);}
else if(data[i][0]==null){gd.push([null,yp.call(this._yaxis,data[i][1])]);}
else if(data[i][1]==null){gd.push([xp.call(this._xaxis,data[i][0]),null]);}}
return gd;};$.jqplot.LineRenderer.prototype.draw=function(ctx,gd,options){var i;var opts=(options!=undefined)?options:{};var shadow=(opts.shadow!=undefined)?opts.shadow:this.shadow;var showLine=(opts.showLine!=undefined)?opts.showLine:this.showLine;var fill=(opts.fill!=undefined)?opts.fill:this.fill;var fillAndStroke=(opts.fillAndStroke!=undefined)?opts.fillAndStroke:this.fillAndStroke;var xmin,ymin,xmax,ymax;ctx.save();if(gd.length){if(showLine){if(fill){if(this.fillToZero){var negativeColors=new $.jqplot.ColorGenerator(this.negativeSeriesColors);var negativeColor=negativeColors.get(this.index);if(!this.useNegativeColors){negativeColor=opts.fillStyle;}
var isnegative=false;var posfs=opts.fillStyle;if(fillAndStroke){var fasgd=gd.slice(0);}
if(this.index==0||!this._stack){var tempgd=[];this._areaPoints=[];var pyzero=this._yaxis.series_u2p(this.fillToValue);var pxzero=this._xaxis.series_u2p(this.fillToValue);if(this.fillAxis=='y'){tempgd.push([gd[0][0],pyzero]);this._areaPoints.push([gd[0][0],pyzero]);for(var i=0;i<gd.length-1;i++){tempgd.push(gd[i]);this._areaPoints.push(gd[i]);if(this._plotData[i][1]*this._plotData[i+1][1]<0){if(this._plotData[i][1]<0){isnegative=true;opts.fillStyle=negativeColor;}
else{isnegative=false;opts.fillStyle=posfs;}
var xintercept=gd[i][0]+(gd[i+1][0]-gd[i][0])*(pyzero-gd[i][1])/(gd[i+1][1]-gd[i][1]);tempgd.push([xintercept,pyzero]);this._areaPoints.push([xintercept,pyzero]);if(shadow){this.renderer.shadowRenderer.draw(ctx,tempgd,opts);}
this.renderer.shapeRenderer.draw(ctx,tempgd,opts);tempgd=[[xintercept,pyzero]];}}
if(this._plotData[gd.length-1][1]<0){isnegative=true;opts.fillStyle=negativeColor;}
else{isnegative=false;opts.fillStyle=posfs;}
tempgd.push(gd[gd.length-1]);this._areaPoints.push(gd[gd.length-1]);tempgd.push([gd[gd.length-1][0],pyzero]);this._areaPoints.push([gd[gd.length-1][0],pyzero]);}
if(shadow){this.renderer.shadowRenderer.draw(ctx,tempgd,opts);}
this.renderer.shapeRenderer.draw(ctx,tempgd,opts);}
else{var prev=this._prevGridData;for(var i=prev.length;i>0;i--){gd.push(prev[i-1]);}
if(shadow){this.renderer.shadowRenderer.draw(ctx,gd,opts);}
this._areaPoints=gd;this.renderer.shapeRenderer.draw(ctx,gd,opts);}}
else{if(fillAndStroke){var fasgd=gd.slice(0);}
if(this.index==0||!this._stack){var gridymin=ctx.canvas.height;gd.unshift([gd[0][0],gridymin]);len=gd.length;gd.push([gd[len-1][0],gridymin]);}
else{var prev=this._prevGridData;for(var i=prev.length;i>0;i--){gd.push(prev[i-1]);}}
this._areaPoints=gd;if(shadow){this.renderer.shadowRenderer.draw(ctx,gd,opts);}
this.renderer.shapeRenderer.draw(ctx,gd,opts);}
if(fillAndStroke){var fasopts=$.extend(true,{},opts,{fill:false,closePath:false});this.renderer.shapeRenderer.draw(ctx,fasgd,fasopts);if(this.markerRenderer.show){for(i=0;i<fasgd.length;i++){this.markerRenderer.draw(fasgd[i][0],fasgd[i][1],ctx,opts.markerOptions);}}}}
else{if(shadow){this.renderer.shadowRenderer.draw(ctx,gd,opts);}
this.renderer.shapeRenderer.draw(ctx,gd,opts);}}
var xmin=xmax=ymin=ymax=null;for(i=0;i<this._areaPoints.length;i++){var p=this._areaPoints[i];if(xmin>p[0]||xmin==null){xmin=p[0];}
if(ymax<p[1]||ymax==null){ymax=p[1];}
if(xmax<p[0]||xmax==null){xmax=p[0];}
if(ymin>p[1]||ymin==null){ymin=p[1];}}
this._boundingBox=[[xmin,ymax],[xmax,ymin]];if(this.markerRenderer.show&&!fill){for(i=0;i<gd.length;i++){if(gd[i][0]!=null&&gd[i][1]!=null){this.markerRenderer.draw(gd[i][0],gd[i][1],ctx,opts.markerOptions);}}}}
ctx.restore();};$.jqplot.LineRenderer.prototype.drawShadow=function(ctx,gd,options){};function postInit(target,data,options){for(i=0;i<this.series.length;i++){if(this.series[i].renderer.constructor==$.jqplot.LineRenderer){if(this.series[i].highlightMouseOver){this.series[i].highlightMouseDown=false;}}}}
function postPlotDraw(){this.plugins.lineRenderer={highlightedSeriesIndex:null};this.plugins.lineRenderer.highlightCanvas=new $.jqplot.GenericCanvas();this.eventCanvas._elem.before(this.plugins.lineRenderer.highlightCanvas.createElement(this._gridPadding,'jqplot-lineRenderer-highlight-canvas',this._plotDimensions));var hctx=this.plugins.lineRenderer.highlightCanvas.setContext();}
function highlight(plot,sidx,pidx,points){var s=plot.series[sidx];var canvas=plot.plugins.lineRenderer.highlightCanvas;canvas._ctx.clearRect(0,0,canvas._ctx.canvas.width,canvas._ctx.canvas.height);s._highlightedPoint=pidx;plot.plugins.lineRenderer.highlightedSeriesIndex=sidx;var opts={fillStyle:s.highlightColor};s.renderer.shapeRenderer.draw(canvas._ctx,points,opts);}
function unhighlight(plot){var canvas=plot.plugins.lineRenderer.highlightCanvas;canvas._ctx.clearRect(0,0,canvas._ctx.canvas.width,canvas._ctx.canvas.height);for(var i=0;i<plot.series.length;i++){plot.series[i]._highlightedPoint=null;}
plot.plugins.lineRenderer.highlightedSeriesIndex=null;plot.target.trigger('jqplotDataUnhighlight');}
function handleMove(ev,gridpos,datapos,neighbor,plot){if(neighbor){var ins=[neighbor.seriesIndex,neighbor.pointIndex,neighbor.data];var evt1=jQuery.Event('jqplotDataMouseOver');evt1.pageX=ev.pageX;evt1.pageY=ev.pageY;plot.target.trigger(evt1,ins);if(plot.series[ins[0]].highlightMouseOver&&!(ins[0]==plot.plugins.lineRenderer.highlightedSeriesIndex)){var evt=jQuery.Event('jqplotDataHighlight');evt.pageX=ev.pageX;evt.pageY=ev.pageY;plot.target.trigger(evt,ins);highlight(plot,neighbor.seriesIndex,neighbor.pointIndex,neighbor.points);}}
else if(neighbor==null){unhighlight(plot);}}
function handleMouseDown(ev,gridpos,datapos,neighbor,plot){if(neighbor){var ins=[neighbor.seriesIndex,neighbor.pointIndex,neighbor.data];if(plot.series[ins[0]].highlightMouseDown&&!(ins[0]==plot.plugins.lineRenderer.highlightedSeriesIndex)){var evt=jQuery.Event('jqplotDataHighlight');evt.pageX=ev.pageX;evt.pageY=ev.pageY;plot.target.trigger(evt,ins);highlight(plot,neighbor.seriesIndex,neighbor.pointIndex,neighbor.points);}}
else if(neighbor==null){unhighlight(plot);}}
function handleMouseUp(ev,gridpos,datapos,neighbor,plot){var idx=plot.plugins.lineRenderer.highlightedSeriesIndex;if(idx!=null&&plot.series[idx].highlightMouseDown){unhighlight(plot);}}
function handleClick(ev,gridpos,datapos,neighbor,plot){if(neighbor){var ins=[neighbor.seriesIndex,neighbor.pointIndex,neighbor.data];var evt=jQuery.Event('jqplotDataClick');evt.pageX=ev.pageX;evt.pageY=ev.pageY;plot.target.trigger(evt,ins);}}
function handleRightClick(ev,gridpos,datapos,neighbor,plot){if(neighbor){var ins=[neighbor.seriesIndex,neighbor.pointIndex,neighbor.data];var idx=plot.plugins.lineRenderer.highlightedSeriesIndex;if(idx!=null&&plot.series[idx].highlightMouseDown){unhighlight(plot);}
var evt=jQuery.Event('jqplotDataRightClick');evt.pageX=ev.pageX;evt.pageY=ev.pageY;plot.target.trigger(evt,ins);}}
$.jqplot.LinearAxisRenderer=function(){};$.jqplot.LinearAxisRenderer.prototype.init=function(options){$.extend(true,this,options);var db=this._dataBounds;for(var i=0;i<this._series.length;i++){var s=this._series[i];var d=s._plotData;for(var j=0;j<d.length;j++){if(this.name=='xaxis'||this.name=='x2axis'){if((d[j][0]!=null&&d[j][0]<db.min)||db.min==null){db.min=d[j][0];}
if((d[j][0]!=null&&d[j][0]>db.max)||db.max==null){db.max=d[j][0];}}
else{if((d[j][1]!=null&&d[j][1]<db.min)||db.min==null){db.min=d[j][1];}
if((d[j][1]!=null&&d[j][1]>db.max)||db.max==null){db.max=d[j][1];}}}}};$.jqplot.LinearAxisRenderer.prototype.draw=function(ctx){if(this.show){this.renderer.createTicks.call(this);var dim=0;var temp;if(this._elem){this._elem.empty();}
this._elem=$('<div class="jqplot-axis jqplot-'+this.name+'" style="position:absolute;"></div>');if(this.name=='xaxis'||this.name=='x2axis'){this._elem.width(this._plotDimensions.width);}
else{this._elem.height(this._plotDimensions.height);}
this.labelOptions.axis=this.name;this._label=new this.labelRenderer(this.labelOptions);if(this._label.show){var elem=this._label.draw(ctx);elem.appendTo(this._elem);}
if(this.showTicks){var t=this._ticks;for(var i=0;i<t.length;i++){var tick=t[i];if(tick.showLabel&&(!tick.isMinorTick||this.showMinorTicks)){var elem=tick.draw(ctx);elem.appendTo(this._elem);}}}}
return this._elem;};$.jqplot.LinearAxisRenderer.prototype.reset=function(){this.min=this._min;this.max=this._max;this.tickInterval=this._tickInterval;this.numberTicks=this._numberTicks;};$.jqplot.LinearAxisRenderer.prototype.set=function(){var dim=0;var temp;var w=0;var h=0;var lshow=(this._label==null)?false:this._label.show;if(this.show&&this.showTicks){var t=this._ticks;for(var i=0;i<t.length;i++){var tick=t[i];if(tick.showLabel&&(!tick.isMinorTick||this.showMinorTicks)){if(this.name=='xaxis'||this.name=='x2axis'){temp=tick._elem.outerHeight(true);}
else{temp=tick._elem.outerWidth(true);}
if(temp>dim){dim=temp;}}}
if(lshow){w=this._label._elem.outerWidth(true);h=this._label._elem.outerHeight(true);}
if(this.name=='xaxis'){dim=dim+h;this._elem.css({'height':dim+'px',left:'0px',bottom:'0px'});}
else if(this.name=='x2axis'){dim=dim+h;this._elem.css({'height':dim+'px',left:'0px',top:'0px'});}
else if(this.name=='yaxis'){dim=dim+w;this._elem.css({'width':dim+'px',left:'0px',top:'0px'});if(lshow&&this._label.constructor==$.jqplot.AxisLabelRenderer){this._label._elem.css('width',w+'px');}}
else{dim=dim+w;this._elem.css({'width':dim+'px',right:'0px',top:'0px'});if(lshow&&this._label.constructor==$.jqplot.AxisLabelRenderer){this._label._elem.css('width',w+'px');}}}};$.jqplot.LinearAxisRenderer.prototype.createTicks=function(){var ticks=this._ticks;var userTicks=this.ticks;var name=this.name;var db=this._dataBounds;var dim,interval;var min,max;var pos1,pos2;var tt,i;var userMin=this.min;var userMax=this.max;var userNT=this.numberTicks;var userTI=this.tickInterval;if(userTicks.length){for(i=0;i<userTicks.length;i++){var ut=userTicks[i];var t=new this.tickRenderer(this.tickOptions);if(ut.constructor==Array){t.value=ut[0];t.label=ut[1];if(!this.showTicks){t.showLabel=false;t.showMark=false;}
else if(!this.showTickMarks){t.showMark=false;}
t.setTick(ut[0],this.name);this._ticks.push(t);}
else{t.value=ut;if(!this.showTicks){t.showLabel=false;t.showMark=false;}
else if(!this.showTickMarks){t.showMark=false;}
t.setTick(ut,this.name);this._ticks.push(t);}}
this.numberTicks=userTicks.length;this.min=this._ticks[0].value;this.max=this._ticks[this.numberTicks-1].value;this.tickInterval=(this.max-this.min)/(this.numberTicks-1);}
else{if(name=='xaxis'||name=='x2axis'){dim=this._plotDimensions.width;}
else{dim=this._plotDimensions.height;}
if(!this.autoscale&&this.min!=null&&this.max!=null&&this.numberTicks!=null){this.tickInterval=null;}
min=((this.min!=null)?this.min:db.min);max=((this.max!=null)?this.max:db.max);if(min==max){var adj=0.05;if(min>0){adj=Math.max(Math.log(min)/Math.LN10,0.05);}
min-=adj;max+=adj;}
var range=max-min;var rmin,rmax;var temp;if(this.autoscale&&this.min==null&&this.max==null){var rrange,ti,margin;var forceMinZero=false;var forceZeroLine=false;var intervals={min:null,max:null,average:null,stddev:null};for(var i=0;i<this._series.length;i++){var s=this._series[i];var faname=(s.fillAxis=='x')?s._xaxis.name:s._yaxis.name;if(this.name==faname){var vals=s._plotValues[s.fillAxis];var vmin=vals[0];var vmax=vals[0];for(var j=1;j<vals.length;j++){if(vals[j]<vmin){vmin=vals[j];}
else if(vals[j]>vmax){vmax=vals[j];}}
var dp=(vmax-vmin)/vmax;if(s.renderer.constructor==$.jqplot.BarRenderer){if(vmin>=0&&(s.fillToZero||dp>0.1)){forceMinZero=true;}
else{forceMinZero=false;if(s.fill&&s.fillToZero&&vmin<0&&vmax>0){forceZeroLine=true;}
else{forceZeroLine=false;}}}
else if(s.fill){if(vmin>=0&&(s.fillToZero||dp>0.1)){forceMinZero=true;}
else if(vmin<0&&vmax>0&&s.fillToZero){forceMinZero=false;forceZeroLine=true;}
else{forceMinZero=false;forceZeroLine=false;}}
else if(vmin<0){forceMinZero=false;}}}
if(forceMinZero){this.numberTicks=2+Math.ceil((dim-(this.tickSpacing-1))/this.tickSpacing);this.min=0;userMin=0;ti=max/(this.numberTicks-1);temp=Math.pow(10,Math.abs(Math.floor(Math.log(ti)/Math.LN10)));if(ti/temp==parseInt(ti/temp,10)){ti+=temp;}
this.tickInterval=Math.ceil(ti/temp)*temp;this.max=this.tickInterval*(this.numberTicks-1);}
else if(forceZeroLine){this.numberTicks=2+Math.ceil((dim-(this.tickSpacing-1))/this.tickSpacing);var ntmin=Math.ceil(Math.abs(min)/range*(this.numberTicks-1));var ntmax=this.numberTicks-1-ntmin;ti=Math.max(Math.abs(min/ntmin),Math.abs(max/ntmax));temp=Math.pow(10,Math.abs(Math.floor(Math.log(ti)/Math.LN10)));this.tickInterval=Math.ceil(ti/temp)*temp;this.max=this.tickInterval*ntmax;this.min=-this.tickInterval*ntmin;}
else{if(this.numberTicks==null){if(this.tickInterval){this.numberTicks=3+Math.ceil(range/this.tickInterval);}
else{this.numberTicks=2+Math.ceil((dim-(this.tickSpacing-1))/this.tickSpacing);}}
if(this.tickInterval==null){ti=range/(this.numberTicks-1);if(ti<1){temp=Math.pow(10,Math.abs(Math.floor(Math.log(ti)/Math.LN10)));}
else{temp=1;}
this.tickInterval=Math.ceil(ti*temp*this.pad)/temp;}
else{temp=1/this.tickInterval;}
rrange=this.tickInterval*(this.numberTicks-1);margin=(rrange-range)/2;if(this.min==null){this.min=Math.floor(temp*(min-margin))/temp;}
if(this.max==null){this.max=this.min+rrange;}}}
else{rmin=(this.min!=null)?this.min:min-range*(this.padMin-1);rmax=(this.max!=null)?this.max:max+range*(this.padMax-1);this.min=rmin;this.max=rmax;range=this.max-this.min;if(this.numberTicks==null){if(this.tickInterval!=null){this.numberTicks=Math.ceil((this.max-this.min)/this.tickInterval)+1;this.max=this.min+this.tickInterval*(this.numberTicks-1);}
else if(dim>100){this.numberTicks=parseInt(3+(dim-100)/75,10);}
else{this.numberTicks=2;}}
if(this.tickInterval==null){this.tickInterval=range/(this.numberTicks-1);}}
if(this.renderer.constructor==$.jqplot.LinearAxisRenderer){range=this.max-this.min;var temptick=new this.tickRenderer(this.tickOptions);var fs=temptick.formatString||$.jqplot.config.defaultTickFormatString;var fs=fs.match($.jqplot.sprintf.regex)[0];var precision=0;if(fs){if(fs.search(/[fFeEgGpP]/)>-1){var m=fs.match(/\%\.(\d{0,})?[eEfFgGpP]/);if(m)precision=parseInt(m[1],10);else precision=6;}
else if(fs.search(/[di]/)>-1){precision=0;}
var fact=Math.pow(10,-precision);if(this.tickInterval<fact){if(userNT==null&&userTI==null){this.tickInterval=fact;if(userMax==null&&userMin==null){this.min=Math.floor(this._dataBounds.min/fact)*fact;if(this.min==this._dataBounds.min){this.min=this._dataBounds.min-this.tickInterval;}
this.max=Math.ceil(this._dataBounds.max/fact)*fact;if(this.max==this._dataBounds.max){this.max=this._dataBounds.max+this.tickInterval;}
var n=(this.max-this.min)/this.tickInterval;n=n.toFixed(11);n=Math.ceil(n);this.numberTicks=n+1;}
else if(userMax==null){var n=(this._dataBounds.max-this.min)/this.tickInterval;n=n.toFixed(11);this.numberTicks=Math.ceil(n)+2;this.max=this.min+this.tickInterval*(this.numberTicks-1);}
else if(userMin==null){var n=(this.max-this._dataBounds.min)/this.tickInterval;n=n.toFixed(11);this.numberTicks=Math.ceil(n)+2;this.min=this.max-this.tickInterval*(this.numberTicks-1);}
else{this.numberTicks=Math.ceil((userMax-userMin)/this.tickInterval)+1;this.min=Math.floor(userMin*Math.pow(10,precision))/Math.pow(10,precision);this.max=Math.ceil(userMax*Math.pow(10,precision))/Math.pow(10,precision);this.numberTicks=Math.ceil((this.max-this.min)/this.tickInterval)+1;}}}}}
for(var i=0;i<this.numberTicks;i++){tt=this.min+i*this.tickInterval;var t=new this.tickRenderer(this.tickOptions);if(!this.showTicks){t.showLabel=false;t.showMark=false;}
else if(!this.showTickMarks){t.showMark=false;}
t.setTick(tt,this.name);this._ticks.push(t);}}};$.jqplot.LinearAxisRenderer.prototype.pack=function(pos,offsets){var ticks=this._ticks;var max=this.max;var min=this.min;var offmax=offsets.max;var offmin=offsets.min;var lshow=(this._label==null)?false:this._label.show;for(var p in pos){this._elem.css(p,pos[p]);}
this._offsets=offsets;var pixellength=offmax-offmin;var unitlength=max-min;this.p2u=function(p){return(p-offmin)*unitlength/pixellength+min;};this.u2p=function(u){return(u-min)*pixellength/unitlength+offmin;};if(this.name=='xaxis'||this.name=='x2axis'){this.series_u2p=function(u){return(u-min)*pixellength/unitlength;};this.series_p2u=function(p){return p*unitlength/pixellength+min;};}
else{this.series_u2p=function(u){return(u-max)*pixellength/unitlength;};this.series_p2u=function(p){return p*unitlength/pixellength+max;};}
if(this.show){if(this.name=='xaxis'||this.name=='x2axis'){for(i=0;i<ticks.length;i++){var t=ticks[i];if(t.show&&t.showLabel){var shim;if(t.constructor==$.jqplot.CanvasAxisTickRenderer&&t.angle){var temp=(this.name=='xaxis')?1:-1;switch(t.labelPosition){case'auto':if(temp*t.angle<0){shim=-t.getWidth()+t._textRenderer.height*Math.sin(-t._textRenderer.angle)/2;}
else{shim=-t._textRenderer.height*Math.sin(t._textRenderer.angle)/2;}
break;case'end':shim=-t.getWidth()+t._textRenderer.height*Math.sin(-t._textRenderer.angle)/2;break;case'start':shim=-t._textRenderer.height*Math.sin(t._textRenderer.angle)/2;break;case'middle':shim=-t.getWidth()/2+t._textRenderer.height*Math.sin(-t._textRenderer.angle)/2;break;default:shim=-t.getWidth()/2+t._textRenderer.height*Math.sin(-t._textRenderer.angle)/2;break;}}
else{shim=-t.getWidth()/2;}
var val=this.u2p(t.value)+shim+'px';t._elem.css('left',val);t.pack();}}
if(lshow){var w=this._label._elem.outerWidth(true);this._label._elem.css('left',offmin+pixellength/2-w/2+'px');if(this.name=='xaxis'){this._label._elem.css('bottom','0px');}
else{this._label._elem.css('top','0px');}
this._label.pack();}}
else{for(i=0;i<ticks.length;i++){var t=ticks[i];if(t.show&&t.showLabel){var shim;if(t.constructor==$.jqplot.CanvasAxisTickRenderer&&t.angle){var temp=(this.name=='yaxis')?1:-1;switch(t.labelPosition){case'auto':case'end':if(temp*t.angle<0){shim=-t._textRenderer.height*Math.cos(-t._textRenderer.angle)/2;}
else{shim=-t.getHeight()+t._textRenderer.height*Math.cos(t._textRenderer.angle)/2;}
break;case'start':if(t.angle>0){shim=-t._textRenderer.height*Math.cos(-t._textRenderer.angle)/2;}
else{shim=-t.getHeight()+t._textRenderer.height*Math.cos(t._textRenderer.angle)/2;}
break;case'middle':shim=-t.getHeight()/2;break;default:shim=-t.getHeight()/2;break;}}
else{shim=-t.getHeight()/2;}
var val=this.u2p(t.value)+shim+'px';t._elem.css('top',val);t.pack();}}
if(lshow){var h=this._label._elem.outerHeight(true);this._label._elem.css('top',offmax-pixellength/2-h/2+'px');if(this.name=='yaxis'){this._label._elem.css('left','0px');}
else{this._label._elem.css('right','0px');}
this._label.pack();}}}};$.jqplot.MarkerRenderer=function(options){this.show=true;this.style='filledCircle';this.lineWidth=2;this.size=9.0;this.color='#666666';this.shadow=true;this.shadowAngle=45;this.shadowOffset=1;this.shadowDepth=3;this.shadowAlpha='0.07';this.shadowRenderer=new $.jqplot.ShadowRenderer();this.shapeRenderer=new $.jqplot.ShapeRenderer();$.extend(true,this,options);};$.jqplot.MarkerRenderer.prototype.init=function(options){$.extend(true,this,options);var sdopt={angle:this.shadowAngle,offset:this.shadowOffset,alpha:this.shadowAlpha,lineWidth:this.lineWidth,depth:this.shadowDepth,closePath:true};if(this.style.indexOf('filled')!=-1){sdopt.fill=true;}
if(this.style.indexOf('ircle')!=-1){sdopt.isarc=true;sdopt.closePath=false;}
this.shadowRenderer.init(sdopt);var shopt={fill:false,isarc:false,strokeStyle:this.color,fillStyle:this.color,lineWidth:this.lineWidth,closePath:true};if(this.style.indexOf('filled')!=-1){shopt.fill=true;}
if(this.style.indexOf('ircle')!=-1){shopt.isarc=true;shopt.closePath=false;}
this.shapeRenderer.init(shopt);};$.jqplot.MarkerRenderer.prototype.drawDiamond=function(x,y,ctx,fill,options){var stretch=1.2;var dx=this.size/2/stretch;var dy=this.size/2*stretch;var points=[[x-dx,y],[x,y+dy],[x+dx,y],[x,y-dy]];if(this.shadow){this.shadowRenderer.draw(ctx,points);}
this.shapeRenderer.draw(ctx,points,options);};$.jqplot.MarkerRenderer.prototype.drawPlus=function(x,y,ctx,fill,options){var stretch=1.0;var dx=this.size/2*stretch;var dy=this.size/2*stretch;var points1=[[x,y-dy],[x,y+dy]];var points2=[[x+dx,y],[x-dx,y]];var opts=$.extend(true,{},this.options,{closePath:false});if(this.shadow){this.shadowRenderer.draw(ctx,points1,{closePath:false});this.shadowRenderer.draw(ctx,points2,{closePath:false});}
this.shapeRenderer.draw(ctx,points1,opts);this.shapeRenderer.draw(ctx,points2,opts);};$.jqplot.MarkerRenderer.prototype.drawX=function(x,y,ctx,fill,options){var stretch=1.0;var dx=this.size/2*stretch;var dy=this.size/2*stretch;var opts=$.extend(true,{},this.options,{closePath:false});var points1=[[x-dx,y-dy],[x+dx,y+dy]];var points2=[[x-dx,y+dy],[x+dx,y-dy]];if(this.shadow){this.shadowRenderer.draw(ctx,points1,{closePath:false});this.shadowRenderer.draw(ctx,points2,{closePath:false});}
this.shapeRenderer.draw(ctx,points1,opts);this.shapeRenderer.draw(ctx,points2,opts);};$.jqplot.MarkerRenderer.prototype.drawDash=function(x,y,ctx,fill,options){var stretch=1.0;var dx=this.size/2*stretch;var dy=this.size/2*stretch;var points=[[x-dx,y],[x+dx,y]];if(this.shadow){this.shadowRenderer.draw(ctx,points);}
this.shapeRenderer.draw(ctx,points,options);};$.jqplot.MarkerRenderer.prototype.drawSquare=function(x,y,ctx,fill,options){var stretch=1.0;var dx=this.size/2/stretch;var dy=this.size/2*stretch;var points=[[x-dx,y-dy],[x-dx,y+dy],[x+dx,y+dy],[x+dx,y-dy]];if(this.shadow){this.shadowRenderer.draw(ctx,points);}
this.shapeRenderer.draw(ctx,points,options);};$.jqplot.MarkerRenderer.prototype.drawCircle=function(x,y,ctx,fill,options){var radius=this.size/2;var end=2*Math.PI;var points=[x,y,radius,0,end,true];if(this.shadow){this.shadowRenderer.draw(ctx,points);}
this.shapeRenderer.draw(ctx,points,options);};$.jqplot.MarkerRenderer.prototype.draw=function(x,y,ctx,options){options=options||{};if(options.show==null||options.show!=false){if(options.color&&!options.fillStyle){options.fillStyle=options.color;}
if(options.color&&!options.strokeStyle){options.strokeStyle=options.color;}
switch(this.style){case'diamond':this.drawDiamond(x,y,ctx,false,options);break;case'filledDiamond':this.drawDiamond(x,y,ctx,true,options);break;case'circle':this.drawCircle(x,y,ctx,false,options);break;case'filledCircle':this.drawCircle(x,y,ctx,true,options);break;case'square':this.drawSquare(x,y,ctx,false,options);break;case'filledSquare':this.drawSquare(x,y,ctx,true,options);break;case'x':this.drawX(x,y,ctx,true,options);break;case'plus':this.drawPlus(x,y,ctx,true,options);break;case'dash':this.drawDash(x,y,ctx,true,options);break;default:this.drawDiamond(x,y,ctx,false,options);break;}}};$.jqplot.ShadowRenderer=function(options){this.angle=45;this.offset=1;this.alpha=0.07;this.lineWidth=1.5;this.lineJoin='miter';this.lineCap='round';this.closePath=false;this.fill=false;this.depth=3;this.strokeStyle='rgba(0,0,0,0.1)';this.isarc=false;$.extend(true,this,options);};$.jqplot.ShadowRenderer.prototype.init=function(options){$.extend(true,this,options);};$.jqplot.ShadowRenderer.prototype.draw=function(ctx,points,options){ctx.save();var opts=(options!=null)?options:{};var fill=(opts.fill!=null)?opts.fill:this.fill;var closePath=(opts.closePath!=null)?opts.closePath:this.closePath;var offset=(opts.offset!=null)?opts.offset:this.offset;var alpha=(opts.alpha!=null)?opts.alpha:this.alpha;var depth=(opts.depth!=null)?opts.depth:this.depth;var isarc=(opts.isarc!=null)?opts.isarc:this.isarc;ctx.lineWidth=(opts.lineWidth!=null)?opts.lineWidth:this.lineWidth;ctx.lineJoin=(opts.lineJoin!=null)?opts.lineJoin:this.lineJoin;ctx.lineCap=(opts.lineCap!=null)?opts.lineCap:this.lineCap;ctx.strokeStyle=opts.strokeStyle||this.strokeStyle||'rgba(0,0,0,'+alpha+')';ctx.fillStyle=opts.fillStyle||this.fillStyle||'rgba(0,0,0,'+alpha+')';for(var j=0;j<depth;j++){ctx.translate(Math.cos(this.angle*Math.PI/180)*offset,Math.sin(this.angle*Math.PI/180)*offset);ctx.beginPath();if(isarc){ctx.arc(points[0],points[1],points[2],points[3],points[4],true);}
else{ctx.moveTo(points[0][0],points[0][1]);for(var i=1;i<points.length;i++){if(points[i][0]!=null&&points[i][1]!=null){ctx.lineTo(points[i][0],points[i][1]);}
else{i++;if(i<points.length){ctx.moveTo(points[i][0],points[i][1]);}}}}
if(closePath){ctx.closePath();}
if(fill){ctx.fill();}
else{ctx.stroke();}}
ctx.restore();};$.jqplot.ShapeRenderer=function(options){this.lineWidth=1.5;this.lineJoin='miter';this.lineCap='round';this.closePath=false;this.fill=false;this.isarc=false;this.fillRect=false;this.strokeRect=false;this.clearRect=false;this.strokeStyle='#999999';this.fillStyle='#999999';$.extend(true,this,options);};$.jqplot.ShapeRenderer.prototype.init=function(options){$.extend(true,this,options);};$.jqplot.ShapeRenderer.prototype.draw=function(ctx,points,options){ctx.save();var opts=(options!=null)?options:{};var fill=(opts.fill!=null)?opts.fill:this.fill;var closePath=(opts.closePath!=null)?opts.closePath:this.closePath;var fillRect=(opts.fillRect!=null)?opts.fillRect:this.fillRect;var strokeRect=(opts.strokeRect!=null)?opts.strokeRect:this.strokeRect;var clearRect=(opts.clearRect!=null)?opts.clearRect:this.clearRect;var isarc=(opts.isarc!=null)?opts.isarc:this.isarc;ctx.lineWidth=opts.lineWidth||this.lineWidth;ctx.lineJoin=opts.lineJoing||this.lineJoin;ctx.lineCap=opts.lineCap||this.lineCap;ctx.strokeStyle=(opts.strokeStyle||opts.color)||this.strokeStyle;ctx.fillStyle=opts.fillStyle||this.fillStyle;ctx.beginPath();if(isarc){ctx.arc(points[0],points[1],points[2],points[3],points[4],true);if(closePath){ctx.closePath();}
if(fill){ctx.fill();}
else{ctx.stroke();}
ctx.restore();return;}
else if(clearRect){ctx.clearRect(points[0],points[1],points[2],points[3]);ctx.restore();return;}
else if(fillRect||strokeRect){if(fillRect){ctx.fillRect(points[0],points[1],points[2],points[3]);}
if(strokeRect){ctx.strokeRect(points[0],points[1],points[2],points[3]);ctx.restore();return;}}
else{ctx.moveTo(points[0][0],points[0][1]);for(var i=1;i<points.length;i++){if(points[i][0]!=null&&points[i][1]!=null){ctx.lineTo(points[i][0],points[i][1]);}
else{i++;if(i<points.length){ctx.moveTo(points[i][0],points[i][1]);}}}
if(closePath){ctx.closePath();}
if(fill){ctx.fill();}
else{ctx.stroke();}}
ctx.restore();};$.jqplot.TableLegendRenderer=function(){};$.jqplot.TableLegendRenderer.prototype.init=function(options){$.extend(true,this,options);};$.jqplot.TableLegendRenderer.prototype.addrow=function(label,color,pad,reverse){var rs=(pad)?this.rowSpacing:'0';if(reverse){var tr=$('<tr class="jqplot-table-legend"></tr>').prependTo(this._elem);}
else{var tr=$('<tr class="jqplot-table-legend"></tr>').appendTo(this._elem);}
if(this.showSwatches){$('<td class="jqplot-table-legend" style="text-align:center;padding-top:'+rs+';">'+'<div><div class="jqplot-table-legend-swatch" style="background-color:'+color+';border-color:'+color+';"></div>'+'</div></td>').appendTo(tr);}
if(this.showLabels){var elem=$('<td class="jqplot-table-legend" style="padding-top:'+rs+';"></td>');elem.appendTo(tr);if(this.escapeHtml){elem.text(label);}
else{elem.html(label);}}};$.jqplot.TableLegendRenderer.prototype.draw=function(){var legend=this;if(this.show){var series=this._series;var ss='position:absolute;';ss+=(this.background)?'background:'+this.background+';':'';ss+=(this.border)?'border:'+this.border+';':'';ss+=(this.fontSize)?'font-size:'+this.fontSize+';':'';ss+=(this.fontFamily)?'font-family:'+this.fontFamily+';':'';ss+=(this.textColor)?'color:'+this.textColor+';':'';ss+=(this.marginTop!=null)?'margin-top:'+this.marginTop+';':'';ss+=(this.marginBottom!=null)?'margin-bottom:'+this.marginBottom+';':'';ss+=(this.marginLeft!=null)?'margin-left:'+this.marginLeft+';':'';ss+=(this.marginRight!=null)?'margin-right:'+this.marginRight+';':'';this._elem=$('<table class="jqplot-table-legend" style="'+ss+'"></table>');var pad=false,reverse=false;for(var i=0;i<series.length;i++){s=series[i];if(s._stack||s.renderer.constructor==$.jqplot.BezierCurveRenderer){reverse=true;}
if(s.show&&s.showLabel){var lt=this.labels[i]||s.label.toString();if(lt){var color=s.color;if(reverse&&i<series.length-1){pad=true;}
else if(reverse&&i==series.length-1){pad=false;}
this.renderer.addrow.call(this,lt,color,pad,reverse);pad=true;}
for(var j=0;j<$.jqplot.addLegendRowHooks.length;j++){var item=$.jqplot.addLegendRowHooks[j].call(this,s);if(item){this.renderer.addrow.call(this,item.label,item.color,pad);pad=true;}}}}}
return this._elem;};$.jqplot.TableLegendRenderer.prototype.pack=function(offsets){if(this.show){if(this.placement=='insideGrid'){switch(this.location){case'nw':var a=offsets.left;var b=offsets.top;this._elem.css('left',a);this._elem.css('top',b);break;case'n':var a=(offsets.left+(this._plotDimensions.width-offsets.right))/2-this.getWidth()/2;var b=offsets.top;this._elem.css('left',a);this._elem.css('top',b);break;case'ne':var a=offsets.right;var b=offsets.top;this._elem.css({right:a,top:b});break;case'e':var a=offsets.right;var b=(offsets.top+(this._plotDimensions.height-offsets.bottom))/2-this.getHeight()/2;this._elem.css({right:a,top:b});break;case'se':var a=offsets.right;var b=offsets.bottom;this._elem.css({right:a,bottom:b});break;case's':var a=(offsets.left+(this._plotDimensions.width-offsets.right))/2-this.getWidth()/2;var b=offsets.bottom;this._elem.css({left:a,bottom:b});break;case'sw':var a=offsets.left;var b=offsets.bottom;this._elem.css({left:a,bottom:b});break;case'w':var a=offsets.left;var b=(offsets.top+(this._plotDimensions.height-offsets.bottom))/2-this.getHeight()/2;this._elem.css({left:a,top:b});break;default:var a=offsets.right;var b=offsets.bottom;this._elem.css({right:a,bottom:b});break;}}
else if(this.placement=='outside'){switch(this.location){case'nw':var a=this._plotDimensions.width-offsets.left;var b=offsets.top;this._elem.css('right',a);this._elem.css('top',b);break;case'n':var a=(offsets.left+(this._plotDimensions.width-offsets.right))/2-this.getWidth()/2;var b=this._plotDimensions.height-offsets.top;this._elem.css('left',a);this._elem.css('bottom',b);break;case'ne':var a=this._plotDimensions.width-offsets.right;var b=offsets.top;this._elem.css({left:a,top:b});break;case'e':var a=this._plotDimensions.width-offsets.right;var b=(offsets.top+(this._plotDimensions.height-offsets.bottom))/2-this.getHeight()/2;this._elem.css({left:a,top:b});break;case'se':var a=this._plotDimensions.width-offsets.right;var b=offsets.bottom;this._elem.css({left:a,bottom:b});break;case's':var a=(offsets.left+(this._plotDimensions.width-offsets.right))/2-this.getWidth()/2;var b=this._plotDimensions.height-offsets.bottom;this._elem.css({left:a,top:b});break;case'sw':var a=this._plotDimensions.width-offsets.left;var b=offsets.bottom;this._elem.css({right:a,bottom:b});break;case'w':var a=this._plotDimensions.width-offsets.left;var b=(offsets.top+(this._plotDimensions.height-offsets.bottom))/2-this.getHeight()/2;this._elem.css({right:a,top:b});break;default:var a=offsets.right;var b=offsets.bottom;this._elem.css({right:a,bottom:b});break;}}
else{switch(this.location){case'nw':this._elem.css({left:0,top:offsets.top});break;case'n':var a=(offsets.left+(this._plotDimensions.width-offsets.right))/2-this.getWidth()/2;this._elem.css({left:a,top:offsets.top});break;case'ne':this._elem.css({right:0,top:offsets.top});break;case'e':var b=(offsets.top+(this._plotDimensions.height-offsets.bottom))/2-this.getHeight()/2;this._elem.css({right:offsets.right,top:b});break;case'se':this._elem.css({right:offsets.right,bottom:offsets.bottom});break;case's':var a=(offsets.left+(this._plotDimensions.width-offsets.right))/2-this.getWidth()/2;this._elem.css({left:a,bottom:offsets.bottom});break;case'sw':this._elem.css({left:offsets.left,bottom:offsets.bottom});break;case'w':var b=(offsets.top+(this._plotDimensions.height-offsets.bottom))/2-this.getHeight()/2;this._elem.css({left:offsets.left,top:b});break;default:this._elem.css({right:offsets.right,bottom:offsets.bottom});break;}}}};$.jqplot.ThemeEngine=function(){this.themes={};this.activeTheme=null;};$.jqplot.ThemeEngine.prototype.init=function(){var th=new $.jqplot.Theme({_name:'Default'});var n,i;for(n in th.target){if(n=="textColor"){th.target[n]=this.target.css('color');}
else{th.target[n]=this.target.css(n);}}
if(this.title.show&&this.title._elem){for(n in th.title){if(n=="textColor"){th.title[n]=this.title._elem.css('color');}
else{th.title[n]=this.title._elem.css(n);}}}
for(n in th.grid){th.grid[n]=this.grid[n];}
if(th.grid.backgroundColor==null&&this.grid.background!=null){th.grid.backgroundColor=this.grid.background;}
if(this.legend.show&&this.legend._elem){for(n in th.legend){if(n=='textColor'){th.legend[n]=this.legend._elem.css('color');}
else{th.legend[n]=this.legend._elem.css(n);}}}
var s;for(i=0;i<this.series.length;i++){s=this.series[i];if(s.renderer.constructor==$.jqplot.LineRenderer){th.series.push(new LineSeriesProperties());}
else if(s.renderer.constructor==$.jqplot.BarRenderer){th.series.push(new BarSeriesProperties());}
else if(s.renderer.constructor==$.jqplot.PieRenderer){th.series.push(new PieSeriesProperties());}
else if(s.renderer.constructor==$.jqplot.DonutRenderer){th.series.push(new DonutSeriesProperties());}
else if(s.renderer.constructor==$.jqplot.FunnelRenderer){th.series.push(new FunnelSeriesProperties());}
else if(s.renderer.constructor==$.jqplot.MeterGaugeRenderer){th.series.push(new MeterSeriesProperties());}
else{th.series.push({});}
for(n in th.series[i]){th.series[i][n]=s[n];}}
var a,ax;for(n in this.axes){ax=this.axes[n];a=th.axes[n]=new AxisProperties();a.borderColor=ax.borderColor;a.borderWidth=ax.borderWidth;if(ax._ticks&&ax._ticks[0]){for(nn in a.ticks){if(ax._ticks[0].hasOwnProperty(nn)){a.ticks[nn]=ax._ticks[0][nn];}
else if(ax._ticks[0]._elem){a.ticks[nn]=ax._ticks[0]._elem.css(nn);}}}
if(ax._label&&ax._label.show){for(nn in a.label){if(ax._label[nn]){a.label[nn]=ax._label[nn];}
else if(ax._label._elem){if(nn=='textColor'){a.label[nn]=ax._label._elem.css('color');}
else{a.label[nn]=ax._label._elem.css(nn);}}}}}
this.themeEngine._add(th);this.themeEngine.activeTheme=this.themeEngine.themes[th._name];};$.jqplot.ThemeEngine.prototype.get=function(name){if(!name){return this.activeTheme;}
else{return this.themes[name];}};function numericalOrder(a,b){return a-b;}
$.jqplot.ThemeEngine.prototype.getThemeNames=function(){var tn=[];for(var n in this.themes){tn.push(n);}
return tn.sort(numericalOrder);};$.jqplot.ThemeEngine.prototype.getThemes=function(){var tn=[];var themes=[];for(var n in this.themes){tn.push(n);}
tn.sort(numericalOrder);for(var i=0;i<tn.length;i++){themes.push(this.themes[tn[i]]);}
return themes;};$.jqplot.ThemeEngine.prototype.activate=function(plot,name){var redrawPlot=false;if(!name&&this.activeTheme&&this.activeTheme._name){name=this.activeTheme._name;}
if(!this.themes.hasOwnProperty(name)){throw new Error("No theme of that name");}
else{var th=this.themes[name];this.activeTheme=th;var val,checkBorderColor=false,checkBorderWidth=false;var arr=['xaxis','x2axis','yaxis','y2axis'];for(i=0;i<arr.length;i++){var ax=arr[i];if(th.axesStyles.borderColor!=null){plot.axes[ax].borderColor=th.axesStyles.borderColor;}
if(th.axesStyles.borderWidth!=null){plot.axes[ax].borderWidth=th.axesStyles.borderWidth;}}
for(axname in plot.axes){var axis=plot.axes[axname];if(axis.show){var thaxis=th.axes[axname]||{};var thaxstyle=th.axesStyles;var thax=$.jqplot.extend(true,{},thaxis,thaxstyle);val=(th.axesStyles.borderColor!=null)?th.axesStyles.borderColor:thax.borderColor;if(thax.borderColor!=null){axis.borderColor=thax.borderColor;redrawPlot=true;}
val=(th.axesStyles.borderWidth!=null)?th.axesStyles.borderWidth:thax.borderWidth;if(thax.borderWidth!=null){axis.borderWidth=thax.borderWidth;redrawPlot=true;}
if(axis._ticks&&axis._ticks[0]){for(nn in thax.ticks){val=thax.ticks[nn];if(val!=null){axis.tickOptions[nn]=val;axis._ticks=[];redrawPlot=true;}}}
if(axis._label&&axis._label.show){for(nn in thax.label){val=thax.label[nn];if(val!=null){axis.labelOptions[nn]=val;redrawPlot=true;}}}}}
for(var n in th.grid){if(th.grid[n]!=null){plot.grid[n]=th.grid[n];}}
if(!redrawPlot){plot.grid.draw();}
if(plot.legend.show){for(n in th.legend){if(th.legend[n]!=null){plot.legend[n]=th.legend[n];}}}
if(plot.title.show){for(n in th.title){if(th.title[n]!=null){plot.title[n]=th.title[n];}}}
var i;for(i=0;i<th.series.length;i++){var opts={};var redrawSeries=false;for(n in th.series[i]){val=(th.seriesStyles[n]!=null)?th.seriesStyles[n]:th.series[i][n];if(val!=null){opts[n]=val;if(n=='color'){plot.series[i].renderer.shapeRenderer.fillStyle=val;plot.series[i].renderer.shapeRenderer.strokeStyle=val;plot.series[i][n]=val;}
else if(n=='lineWidth'){plot.series[i].renderer.shapeRenderer.lineWidth=val;plot.series[i][n]=val;}
else if(n=='markerOptions'){merge(plot.series[i].markerOptions,val);merge(plot.series[i].markerRenderer,val);}
else{plot.series[i][n]=val;}
redrawPlot=true;}}}
if(redrawPlot){plot.target.empty();plot.draw();}
for(n in th.target){if(th.target[n]!=null){plot.target.css(n,th.target[n]);}}}};$.jqplot.ThemeEngine.prototype._add=function(theme,name){if(name){theme._name=name;}
if(!theme._name){theme._name=Date.parse(new Date());}
if(!this.themes.hasOwnProperty(theme._name)){this.themes[theme._name]=theme;}
else{throw new Error("jqplot.ThemeEngine Error: Theme already in use");}};$.jqplot.ThemeEngine.prototype.remove=function(name){if(name=='Default'){return false;}
return delete this.themes[name];};$.jqplot.ThemeEngine.prototype.newTheme=function(name,obj){if(typeof(name)=='object'){obj=obj||name;name=null;}
if(obj&&obj._name){name=obj._name;}
else{name=name||Date.parse(new Date());}
var th=this.copy(this.themes['Default']._name,name);$.jqplot.extend(th,obj);return th;};function clone(obj){if(obj==null||typeof(obj)!='object'){return obj;}
var temp=new obj.constructor();for(var key in obj){temp[key]=clone(obj[key]);}
return temp;}
$.jqplot.clone=clone;function merge(obj1,obj2){if(obj2==null||typeof(obj2)!='object'){return;}
for(var key in obj2){if(key=='highlightColors'){obj1[key]=clone(obj2[key]);}
if(obj2[key]!=null&&typeof(obj2[key])=='object'){if(!obj1.hasOwnProperty(key)){obj1[key]={};}
merge(obj1[key],obj2[key]);}
else{obj1[key]=obj2[key];}}}
$.jqplot.merge=merge;$.jqplot.extend=function(){var target=arguments[0]||{},i=1,length=arguments.length,deep=false,options;if(typeof target==="boolean"){deep=target;target=arguments[1]||{};i=2;}
if(typeof target!=="object"&&!toString.call(target)==="[object Function]"){target={};}
for(;i<length;i++){if((options=arguments[i])!=null){for(var name in options){var src=target[name],copy=options[name];if(target===copy){continue;}
if(deep&&copy&&typeof copy==="object"&&!copy.nodeType){target[name]=$.jqplot.extend(deep,src||(copy.length!=null?[]:{}),copy);}
else if(copy!==undefined){target[name]=copy;}}}}
return target;};$.jqplot.ThemeEngine.prototype.rename=function(oldName,newName){if(oldName=='Default'||newName=='Default'){throw new Error("jqplot.ThemeEngine Error: Cannot rename from/to Default");}
if(this.themes.hasOwnProperty(newName)){throw new Error("jqplot.ThemeEngine Error: New name already in use.");}
else if(this.themes.hasOwnProperty(oldName)){var th=this.copy(oldName,newName);this.remove(oldName);return th;}
throw new Error("jqplot.ThemeEngine Error: Old name or new name invalid");};$.jqplot.ThemeEngine.prototype.copy=function(sourceName,targetName,obj){if(targetName=='Default'){throw new Error("jqplot.ThemeEngine Error: Cannot copy over Default theme");}
if(!this.themes.hasOwnProperty(sourceName)){var s="jqplot.ThemeEngine Error: Source name invalid";throw new Error(s);}
if(this.themes.hasOwnProperty(targetName)){var s="jqplot.ThemeEngine Error: Target name invalid";throw new Error(s);}
else{var th=clone(this.themes[sourceName]);th._name=targetName;$.jqplot.extend(true,th,obj);this._add(th);return th;}};$.jqplot.Theme=function(name,obj){if(typeof(name)=='object'){obj=obj||name;name=null;}
name=name||Date.parse(new Date());this._name=name;this.target={backgroundColor:null};this.legend={textColor:null,fontFamily:null,fontSize:null,border:null,background:null};this.title={textColor:null,fontFamily:null,fontSize:null,textAlign:null};this.seriesStyles={};this.series=[];this.grid={drawGridlines:null,gridLineColor:null,gridLineWidth:null,backgroundColor:null,borderColor:null,borderWidth:null,shadow:null};this.axesStyles={label:{},ticks:{}};this.axes={};if(typeof(obj)=='string'){this._name=obj;}
else if(typeof(obj)=='object'){$.jqplot.extend(true,this,obj);}};var AxisProperties=function(){this.borderColor=null;this.borderWidth=null;this.ticks=new AxisTicks();this.label=new AxisLabel();};var AxisTicks=function(){this.show=null;this.showGridline=null;this.showLabel=null;this.showMark=null;this.size=null;this.textColor=null;this.whiteSpace=null;this.fontSize=null;this.fontFamily=null;};var AxisLabel=function(){this.textColor=null;this.whiteSpace=null;this.fontSize=null;this.fontFamily=null;this.fontWeight=null;};var LineSeriesProperties=function(){this.color=null;this.lineWidth=null;this.shadow=null;this.fillColor=null;this.showMarker=null;this.markerOptions=new MarkerOptions();};var MarkerOptions=function(){this.show=null;this.style=null;this.lineWidth=null;this.size=null;this.color=null;this.shadow=null;};var BarSeriesProperties=function(){this.color=null;this.seriesColors=null;this.lineWidth=null;this.shadow=null;this.barPadding=null;this.barMargin=null;this.barWidth=null;this.highlightColors=null;};var PieSeriesProperties=function(){this.seriesColors=null;this.padding=null;this.sliceMargin=null;this.fill=null;this.shadow=null;this.startAngle=null;this.lineWidth=null;this.highlightColors=null;};var DonutSeriesProperties=function(){this.seriesColors=null;this.padding=null;this.sliceMargin=null;this.fill=null;this.shadow=null;this.startAngle=null;this.lineWidth=null;this.innerDiameter=null;this.thickness=null;this.ringMargin=null;this.highlightColors=null;};var FunnelSeriesProperties=function(){this.color=null;this.lineWidth=null;this.shadow=null;this.padding=null;this.sectionMargin=null;this.seriesColors=null;this.highlightColors=null;};var MeterSeriesProperties=function(){this.padding=null;this.backgroundColor=null;this.ringColor=null;this.tickColor=null;this.ringWidth=null;this.intervalColors=null;this.intervalInnerRadius=null;this.intervalOuterRadius=null;this.hubRadius=null;this.needleThickness=null;this.needlePad=null;};$.jqplot.sprintf=function(){function pad(str,len,chr,leftJustify){var padding=(str.length>=len)?'':Array(1+len-str.length>>>0).join(chr);return leftJustify?str+padding:padding+str;}
function justify(value,prefix,leftJustify,minWidth,zeroPad,htmlSpace){var diff=minWidth-value.length;if(diff>0){var spchar=' ';if(htmlSpace){spchar='&nbsp;';}
if(leftJustify||!zeroPad){value=pad(value,minWidth,spchar,leftJustify);}else{value=value.slice(0,prefix.length)+pad('',diff,'0',true)+value.slice(prefix.length);}}
return value;}
function formatBaseX(value,base,prefix,leftJustify,minWidth,precision,zeroPad,htmlSpace){var number=value>>>0;prefix=prefix&&number&&{'2':'0b','8':'0','16':'0x'}[base]||'';value=prefix+pad(number.toString(base),precision||0,'0',false);return justify(value,prefix,leftJustify,minWidth,zeroPad,htmlSpace);}
function formatString(value,leftJustify,minWidth,precision,zeroPad,htmlSpace){if(precision!=null){value=value.slice(0,precision);}
return justify(value,'',leftJustify,minWidth,zeroPad,htmlSpace);}
var a=arguments,i=0,format=a[i++];return format.replace($.jqplot.sprintf.regex,function(substring,valueIndex,flags,minWidth,_,precision,type){if(substring=='%%'){return'%';}
var leftJustify=false,positivePrefix='',zeroPad=false,prefixBaseX=false,htmlSpace=false;for(var j=0;flags&&j<flags.length;j++)switch(flags.charAt(j)){case' ':positivePrefix=' ';break;case'+':positivePrefix='+';break;case'-':leftJustify=true;break;case'0':zeroPad=true;break;case'#':prefixBaseX=true;break;case'&':htmlSpace=true;break;}
if(!minWidth){minWidth=0;}
else if(minWidth=='*'){minWidth=+a[i++];}
else if(minWidth.charAt(0)=='*'){minWidth=+a[minWidth.slice(1,-1)];}
else{minWidth=+minWidth;}
if(minWidth<0){minWidth=-minWidth;leftJustify=true;}
if(!isFinite(minWidth)){throw new Error('$.jqplot.sprintf: (minimum-)width must be finite');}
if(!precision){precision='fFeE'.indexOf(type)>-1?6:(type=='d')?0:void(0);}
else if(precision=='*'){precision=+a[i++];}
else if(precision.charAt(0)=='*'){precision=+a[precision.slice(1,-1)];}
else{precision=+precision;}
var value=valueIndex?a[valueIndex.slice(0,-1)]:a[i++];switch(type){case's':{if(value==null){return'';}
return formatString(String(value),leftJustify,minWidth,precision,zeroPad,htmlSpace);}
case'c':return formatString(String.fromCharCode(+value),leftJustify,minWidth,precision,zeroPad,htmlSpace);case'b':return formatBaseX(value,2,prefixBaseX,leftJustify,minWidth,precision,zeroPad,htmlSpace);case'o':return formatBaseX(value,8,prefixBaseX,leftJustify,minWidth,precision,zeroPad,htmlSpace);case'x':return formatBaseX(value,16,prefixBaseX,leftJustify,minWidth,precision,zeroPad,htmlSpace);case'X':return formatBaseX(value,16,prefixBaseX,leftJustify,minWidth,precision,zeroPad,htmlSpace).toUpperCase();case'u':return formatBaseX(value,10,prefixBaseX,leftJustify,minWidth,precision,zeroPad,htmlSpace);case'i':{var number=parseInt(+value,10);if(isNaN(number)){return'';}
var prefix=number<0?'-':positivePrefix;value=prefix+pad(String(Math.abs(number)),precision,'0',false);return justify(value,prefix,leftJustify,minWidth,zeroPad,htmlSpace);}
case'd':{var number=Math.round(+value);if(isNaN(number)){return'';}
var prefix=number<0?'-':positivePrefix;value=prefix+pad(String(Math.abs(number)),precision,'0',false);return justify(value,prefix,leftJustify,minWidth,zeroPad,htmlSpace);}
case'e':case'E':case'f':case'F':case'g':case'G':{var number=+value;if(isNaN(number)){return'';}
var prefix=number<0?'-':positivePrefix;var method=['toExponential','toFixed','toPrecision']['efg'.indexOf(type.toLowerCase())];var textTransform=['toString','toUpperCase']['eEfFgG'.indexOf(type)%2];value=prefix+Math.abs(number)[method](precision);return justify(value,prefix,leftJustify,minWidth,zeroPad,htmlSpace)[textTransform]();}
case'p':case'P':{var number=+value;if(isNaN(number)){return'';}
var prefix=number<0?'-':positivePrefix;var parts=String(Number(Math.abs(number)).toExponential()).split(/e|E/);var sd=(parts[0].indexOf('.')!=-1)?parts[0].length-1:parts[0].length;var zeros=(parts[1]<0)?-parts[1]-1:0;if(Math.abs(number)<1){if(sd+zeros<=precision){value=prefix+Math.abs(number).toPrecision(sd);}
else{if(sd<=precision-1){value=prefix+Math.abs(number).toExponential(sd-1);}
else{value=prefix+Math.abs(number).toExponential(precision-1);}}}
else{var prec=(sd<=precision)?sd:precision;value=prefix+Math.abs(number).toPrecision(prec);}
var textTransform=['toString','toUpperCase']['pP'.indexOf(type)%2];return justify(value,prefix,leftJustify,minWidth,zeroPad,htmlSpace)[textTransform]();}
case'n':return'';default:return substring;}});};$.jqplot.sprintf.regex=/%%|%(\d+\$)?([-+#0& ]*)(\*\d+\$|\*|\d+)?(\.(\*\d+\$|\*|\d+))?([nAscboxXuidfegpEGP])/g;})(jQuery);(function($){$.jqplot.DateAxisRenderer=function(){$.jqplot.LinearAxisRenderer.call(this);};$.jqplot.DateAxisRenderer.prototype=new $.jqplot.LinearAxisRenderer();$.jqplot.DateAxisRenderer.prototype.constructor=$.jqplot.DateAxisRenderer;$.jqplot.DateTickFormatter=function(format,val){if(!format){format='%Y/%m/%d';}
return Date.create(val).strftime(format);};$.jqplot.DateAxisRenderer.prototype.init=function(options){this.tickOptions.formatter=$.jqplot.DateTickFormatter;this.daTickInterval=null;this._daTickInterval=null;$.extend(true,this,options);var db=this._dataBounds;for(var i=0;i<this._series.length;i++){var s=this._series[i];var d=s.data;var pd=s._plotData;var sd=s._stackData;for(var j=0;j<d.length;j++){if(this.name=='xaxis'||this.name=='x2axis'){d[j][0]=Date.create(d[j][0]).getTime();pd[j][0]=Date.create(d[j][0]).getTime();sd[j][0]=Date.create(d[j][0]).getTime();if(d[j][0]<db.min||db.min==null){db.min=d[j][0];}
if(d[j][0]>db.max||db.max==null){db.max=d[j][0];}}
else{d[j][1]=Date.create(d[j][1]).getTime();pd[j][1]=Date.create(d[j][1]).getTime();sd[j][1]=Date.create(d[j][1]).getTime();if(d[j][1]<db.min||db.min==null){db.min=d[j][1];}
if(d[j][1]>db.max||db.max==null){db.max=d[j][1];}}}}};$.jqplot.DateAxisRenderer.prototype.reset=function(){this.min=this._min;this.max=this._max;this.tickInterval=this._tickInterval;this.numberTicks=this._numberTicks;this.daTickInterval=this._daTickInterval;};$.jqplot.DateAxisRenderer.prototype.createTicks=function(){var ticks=this._ticks;var userTicks=this.ticks;var name=this.name;var db=this._dataBounds;var dim,interval;var min,max;var pos1,pos2;var tt,i;if(userTicks.length){for(i=0;i<userTicks.length;i++){var ut=userTicks[i];var t=new this.tickRenderer(this.tickOptions);if(ut.constructor==Array){t.value=Date.create(ut[0]).getTime();t.label=ut[1];if(!this.showTicks){t.showLabel=false;t.showMark=false;}
else if(!this.showTickMarks){t.showMark=false;}
t.setTick(t.value,this.name);this._ticks.push(t);}
else{t.value=Date.create(ut).getTime();if(!this.showTicks){t.showLabel=false;t.showMark=false;}
else if(!this.showTickMarks){t.showMark=false;}
t.setTick(t.value,this.name);this._ticks.push(t);}}
this.numberTicks=userTicks.length;this.min=this._ticks[0].value;this.max=this._ticks[this.numberTicks-1].value;this.daTickInterval=[(this.max-this.min)/(this.numberTicks-1)/1000,'seconds'];}
else{if(name=='xaxis'||name=='x2axis'){dim=this._plotDimensions.width;}
else{dim=this._plotDimensions.height;}
if(this.min!=null&&this.max!=null&&this.numberTicks!=null){this.tickInterval=null;}
if(this.tickInterval!=null)
{if(Number(this.tickInterval)){this.daTickInterval=[Number(this.tickInterval),'seconds'];}
else if(typeof this.tickInterval=="string"){var parts=this.tickInterval.split(' ');if(parts.length==1){this.daTickInterval=[1,parts[0]];}
else if(parts.length==2){this.daTickInterval=[parts[0],parts[1]];}}}
min=((this.min!=null)?Date.create(this.min).getTime():db.min);max=((this.max!=null)?Date.create(this.max).getTime():db.max);if(min==max){var adj=24*60*60*500;min-=adj;max+=adj;}
var range=max-min;var rmin,rmax;rmin=(this.min!=null)?Date.create(this.min).getTime():min-range/2*(this.padMin-1);rmax=(this.max!=null)?Date.create(this.max).getTime():max+range/2*(this.padMax-1);this.min=rmin;this.max=rmax;range=this.max-this.min;if(this.numberTicks==null){if(this.daTickInterval!=null){var nc=Date.create(this.max).diff(this.min,this.daTickInterval[1],true);this.numberTicks=Math.ceil(nc/this.daTickInterval[0])+1;this.max=Date.create(this.min).add((this.numberTicks-1)*this.daTickInterval[0],this.daTickInterval[1]).getTime();}
else if(dim>200){this.numberTicks=parseInt(3+(dim-200)/100,10);}
else{this.numberTicks=2;}}
if(this.daTickInterval==null){this.daTickInterval=[range/(this.numberTicks-1)/1000,'seconds'];}
for(var i=0;i<this.numberTicks;i++){var min=Date.create(this.min);tt=min.add(i*this.daTickInterval[0],this.daTickInterval[1]).getTime();var t=new this.tickRenderer(this.tickOptions);if(!this.showTicks){t.showLabel=false;t.showMark=false;}
else if(!this.showTickMarks){t.showMark=false;}
t.setTick(tt,this.name);this._ticks.push(t);}}
if(this._daTickInterval==null){this._daTickInterval=this.daTickInterval;}};})(jQuery);(function($){$.jqplot.OHLCRenderer=function(){$.jqplot.LineRenderer.call(this);this.candleStick=false;this.tickLength='auto';this.bodyWidth='auto';this.openColor=null;this.closeColor=null;this.wickColor=null;this.fillUpBody=false;this.fillDownBody=true;this.upBodyColor=null;this.downBodyColor=null;this.hlc=false;this._tickLength;this._bodyWidth;};$.jqplot.OHLCRenderer.prototype=new $.jqplot.LineRenderer();$.jqplot.OHLCRenderer.prototype.constructor=$.jqplot.OHLCRenderer;$.jqplot.OHLCRenderer.prototype.init=function(options){this.lineWidth=0.4;$.jqplot.LineRenderer.prototype.init.call(this,options);var db=this._yaxis._dataBounds;var d=this._plotData;if(d[0].length<5){this.renderer.hlc=true;for(var j=0;j<d.length;j++){if(d[j][2]<db.min||db.min==null){db.min=d[j][2];}
if(d[j][1]>db.max||db.max==null){db.max=d[j][1];}}}
else{for(var j=0;j<d.length;j++){if(d[j][3]<db.min||db.min==null){db.min=d[j][3];}
if(d[j][2]>db.max||db.max==null){db.max=d[j][2];}}}};$.jqplot.OHLCRenderer.prototype.draw=function(ctx,gd,options){var d=this.data;var xmin=this._xaxis.min;var xmax=this._xaxis.max;var xminidx=0;var xmaxidx=d.length;var xp=this._xaxis.series_u2p;var yp=this._yaxis.series_u2p;var i,prevColor,ops,b,h,w,a,points;var o;var r=this.renderer;var opts=(options!=undefined)?options:{};var shadow=(opts.shadow!=undefined)?opts.shadow:this.shadow;var fill=(opts.fill!=undefined)?opts.fill:this.fill;var fillAndStroke=(opts.fillAndStroke!=undefined)?opts.fillAndStroke:this.fillAndStroke;r.bodyWidth=(opts.bodyWidth!=undefined)?opts.bodyWidth:r.bodyWidth;r.tickLength=(opts.tickLength!=undefined)?opts.tickLength:r.tickLength;ctx.save();if(this.show){var x,open,hi,low,close;for(var i=0;i<d.length;i++){if(d[i][0]<xmin){xminidx=i;}
else if(d[i][0]<xmax){xmaxidx=i+1;}}
if(r.candleStick){if(typeof(r.bodyWidth)=='number'){r._bodyWidth=r.bodyWidth;}
else{r._bodyWidth=Math.min(20,ctx.canvas.width/(xmaxidx-xminidx)/2);}}
else{if(typeof(r.tickLength)=='number'){r._tickLength=r.tickLength;}
else{r._tickLength=Math.min(10,ctx.canvas.width/(xmaxidx-xminidx)/4);}}
for(var i=xminidx;i<=xmaxidx;i++){x=xp(d[i][0]);if(r.hlc){open=null;hi=yp(d[i][1]);low=yp(d[i][2]);close=yp(d[i][3]);}
else{open=yp(d[i][1]);hi=yp(d[i][2]);low=yp(d[i][3]);close=yp(d[i][4]);}
o={};if(r.candleStick&&!r.hlc){w=r._bodyWidth;a=x-w/2;if(close<open){if(r.wickColor){o.color=r.wickColor;}
else if(r.downBodyColor){o.color=r.upBodyColor;}
ops=$.extend(true,{lineWidth:0.5},opts,o);r.shapeRenderer.draw(ctx,[[x,hi],[x,close]],ops);r.shapeRenderer.draw(ctx,[[x,open],[x,low]],ops);o={};b=close;h=open-close;if(r.fillUpBody){o.fillRect=true;}
else{o.strokeRect=true;w=w-this.lineWidth;a=x-w/2;}
if(r.upBodyColor){o.color=r.upBodyColor;o.fillStyle=r.upBodyColor;}
points=[a,b,w,h];}
else if(close>open){if(r.wickColor){o.color=r.wickColor;}
else if(r.downBodyColor){o.color=r.downBodyColor;}
ops=$.extend(true,{},opts,o);r.shapeRenderer.draw(ctx,[[x,hi],[x,open]],ops);r.shapeRenderer.draw(ctx,[[x,close],[x,low]],ops);o={};b=open;h=close-open;if(r.fillDownBody){o.fillRect=true;}
else{o.strokeRect=true;w=w-this.lineWidth;a=x-w/2;}
if(r.downBodyColor){o.color=r.downBodyColor;o.fillStyle=r.downBodyColor;}
points=[a,b,w,h];}
else{if(r.wickColor){o.color=r.wickColor;}
ops=$.extend(true,{},opts,o);r.shapeRenderer.draw(ctx,[[x,hi],[x,low]],ops);o={};o.fillRect=false;o.strokeRect=false;a=[x-w/2,open];b=[x+w/2,close];w=null;h=null;points=[a,b];}
ops=$.extend(true,{},opts,o);r.shapeRenderer.draw(ctx,points,ops);}
else{prevColor=opts.color;if(r.openColor){opts.color=r.openColor;}
if(!r.hlc){r.shapeRenderer.draw(ctx,[[x-r._tickLength,open],[x,open]],opts);}
opts.color=prevColor;if(r.wickColor){opts.color=r.wickColor;}
r.shapeRenderer.draw(ctx,[[x,hi],[x,low]],opts);opts.color=prevColor;if(r.closeColor){opts.color=r.closeColor;}
r.shapeRenderer.draw(ctx,[[x,close],[x+r._tickLength,close]],opts);opts.color=prevColor;}}}
ctx.restore();};$.jqplot.OHLCRenderer.prototype.drawShadow=function(ctx,gd,options){};$.jqplot.OHLCRenderer.checkOptions=function(target,data,options){if(!options.highlighter){options.highlighter={showMarker:false,tooltipAxes:'y',yvalues:4,formatString:'<table class="jqplot-highlighter"><tr><td>date:</td><td>%s</td></tr><tr><td>open:</td><td>%s</td></tr><tr><td>hi:</td><td>%s</td></tr><tr><td>low:</td><td>%s</td></tr><tr><td>close:</td><td>%s</td></tr></table>'};}};})(jQuery);(function($){$.jqplot.LogAxisRenderer=function(){$.jqplot.LinearAxisRenderer.call(this);this.axisDefaults={base:10,tickDistribution:'even'};};$.jqplot.LogAxisRenderer.prototype=new $.jqplot.LinearAxisRenderer();$.jqplot.LogAxisRenderer.prototype.constructor=$.jqplot.LogAxisRenderer;$.jqplot.LogAxisRenderer.prototype.init=function(options){$.extend(true,this.renderer,options);for(var d in this.renderer.axisDefaults){if(this[d]==null){this[d]=this.renderer.axisDefaults[d];}}
var db=this._dataBounds;for(var i=0;i<this._series.length;i++){var s=this._series[i];var d=s.data;for(var j=0;j<d.length;j++){if(this.name=='xaxis'||this.name=='x2axis'){if(d[j][0]>db.max||db.max==null){db.max=d[j][0];}
if(d[j][0]>db.max||db.max==null){db.max=d[j][0];}}
else{if(d[j][1]<db.min||db.min==null){db.min=d[j][1];}
if(d[j][1]>db.max||db.max==null){db.max=d[j][1];}}}}};$.jqplot.LogAxisRenderer.prototype.createTicks=function(){var ticks=this._ticks;var userTicks=this.ticks;var name=this.name;var db=this._dataBounds;var dim,interval;var min,max;var pos1,pos2;var tt,i;if(userTicks.length){for(i=0;i<userTicks.length;i++){var ut=userTicks[i];var t=new this.tickRenderer(this.tickOptions);if(ut.constructor==Array){t.value=ut[0];t.label=ut[1];if(!this.showTicks){t.showLabel=false;t.showMark=false;}
else if(!this.showTickMarks){t.showMark=false;}
t.setTick(ut[0],this.name);this._ticks.push(t);}
else{t.value=ut;if(!this.showTicks){t.showLabel=false;t.showMark=false;}
else if(!this.showTickMarks){t.showMark=false;}
t.setTick(ut,this.name);this._ticks.push(t);}}
this.numberTicks=userTicks.length;this.min=this._ticks[0].value;this.max=this._ticks[this.numberTicks-1].value;}
else{if(name=='xaxis'||name=='x2axis'){dim=this._plotDimensions.width;}
else{dim=this._plotDimensions.height;}
min=((this.min!=null)?this.min:db.min);max=((this.max!=null)?this.max:db.max);if(min==max){var adj=0.05;min=min*(1-adj);max=max*(1+adj);}
if(this.min!=null&&this.min<=0){throw('log axis minimum must be greater than 0');}
if(this.max!=null&&this.max<=0){throw('log axis maximum must be greater than 0');}
var range=max-min;var rmin,rmax;if(this.tickDistribution=='even'){rmin=(this.min!=null)?this.min:min-min*((this.padMin-1)/2);rmax=(this.max!=null)?this.max:max+max*((this.padMax-1)/2);this.min=rmin;this.max=rmax;range=this.max-this.min;if(this.numberTicks==null){if(dim>100){this.numberTicks=parseInt(3+(dim-100)/75,10);}
else{this.numberTicks=2;}}
var u=Math.pow(this.base,(1/(this.numberTicks-1)*Math.log(this.max/this.min)/Math.log(this.base)));for(var i=0;i<this.numberTicks;i++){tt=this.min*Math.pow(u,i);var t=new this.tickRenderer(this.tickOptions);if(!this.showTicks){t.showLabel=false;t.showMark=false;}
else if(!this.showTickMarks){t.showMark=false;}
t.setTick(tt,this.name);this._ticks.push(t);}}
else if(this.tickDistribution=='power'){rmin=Math.pow(this.base,Math.ceil(Math.log(min*(2-this.padMin))/Math.log(this.base))-1);rmax=Math.pow(this.base,Math.floor(Math.log(max*this.padMax)/Math.log(this.base))+1);this.min=rmin;this.max=rmax;range=this.max-this.min;var fittedTicks=0;var minorTicks=0;if(this.numberTicks==null){if(dim>100){this.numberTicks=Math.round(Math.log(this.max/this.min)/Math.log(this.base)+1);if(this.numberTicks<2){this.numberTicks=2;}
fittedTicks=parseInt(3+(dim-100)/75,10);}
else{this.numberTicks=2;fittedTicks=2;}
if(this.numberTicks<fittedTicks-1){minorTicks=Math.floor(fittedTicks/this.numberTicks);}}
for(var i=0;i<this.numberTicks;i++){tt=Math.pow(this.base,i-this.numberTicks+1)*this.max;var t=new this.tickRenderer(this.tickOptions);if(!this.showTicks){t.showLabel=false;t.showMark=false;}
else if(!this.showTickMarks){t.showMark=false;}
t.setTick(tt,this.name);this._ticks.push(t);if(minorTicks&&i<this.numberTicks-1){var tt1=Math.pow(this.base,i-this.numberTicks+2)*this.max;var spread=tt1-tt;var interval=tt1/(minorTicks+1);for(var j=minorTicks-1;j>=0;j--){var val=tt1-interval*(j+1);var t=new this.tickRenderer(this.tickOptions);if(!this.showTicks){t.showLabel=false;t.showMark=false;}
else if(!this.showTickMarks){t.showMark=false;}
t.setTick(val,this.name);this._ticks.push(t);}}}}}};$.jqplot.LogAxisRenderer.prototype.pack=function(pos,offsets){var lb=parseInt(this.base,10);var ticks=this._ticks;var trans=function(v){return Math.log(v)/Math.log(lb);};var invtrans=function(v){return Math.pow(Math.E,(Math.log(lb)*v));};max=trans(this.max);min=trans(this.min);var offmax=offsets.max;var offmin=offsets.min;var lshow=(this._label==null)?false:this._label.show;for(var p in pos){this._elem.css(p,pos[p]);}
this._offsets=offsets;var pixellength=offmax-offmin;var unitlength=max-min;this.p2u=function(p){return invtrans((p-offmin)*unitlength/pixellength+min);};this.u2p=function(u){return(trans(u)-min)*pixellength/unitlength+offmin;};if(this.name=='xaxis'||this.name=='x2axis'){this.series_u2p=function(u){return(trans(u)-min)*pixellength/unitlength;};this.series_p2u=function(p){return invtrans(p*unitlength/pixellength+min);};}
else{this.series_u2p=function(u){return(trans(u)-max)*pixellength/unitlength;};this.series_p2u=function(p){return invtrans(p*unitlength/pixellength+max);};}
if(this.show){if(this.name=='xaxis'||this.name=='x2axis'){for(i=0;i<ticks.length;i++){var t=ticks[i];if(t.show&&t.showLabel){var shim;if(t.constructor==$.jqplot.CanvasAxisTickRenderer&&t.angle){switch(t.labelPosition){case'auto':if(t.angle<0){shim=-t.getWidth()+t._textRenderer.height*Math.sin(-t._textRenderer.angle)/2;}
else{shim=-t._textRenderer.height*Math.sin(t._textRenderer.angle)/2;}
break;case'end':shim=-t.getWidth()+t._textRenderer.height*Math.sin(-t._textRenderer.angle)/2;break;case'start':shim=-t._textRenderer.height*Math.sin(t._textRenderer.angle)/2;break;case'middle':shim=-t.getWidth()/2+t._textRenderer.height*Math.sin(-t._textRenderer.angle)/2;break;default:shim=-t.getWidth()/2+t._textRenderer.height*Math.sin(-t._textRenderer.angle)/2;break;}}
else{shim=-t.getWidth()/2;}
var val=this.u2p(t.value)+shim+'px';t._elem.css('left',val);t.pack();}}
if(lshow){var w=this._label._elem.outerWidth(true);this._label._elem.css('left',offmin+pixellength/2-w/2+'px');if(this.name=='xaxis'){this._label._elem.css('bottom','0px');}
else{this._label._elem.css('top','0px');}
this._label.pack();}}
else{for(i=0;i<ticks.length;i++){var t=ticks[i];if(t.show&&t.showLabel){var shim;if(t.constructor==$.jqplot.CanvasAxisTickRenderer&&t.angle){switch(t.labelPosition){case'auto':case'end':if(t.angle<0){shim=-t._textRenderer.height*Math.cos(-t._textRenderer.angle)/2;}
else{shim=-t.getHeight()+t._textRenderer.height*Math.cos(t._textRenderer.angle)/2;}
break;case'start':if(t.angle>0){shim=-t._textRenderer.height*Math.cos(-t._textRenderer.angle)/2;}
else{shim=-t.getHeight()+t._textRenderer.height*Math.cos(t._textRenderer.angle)/2;}
break;case'middle':shim=-t.getHeight()/2;break;default:shim=-t.getHeight()/2;break;}}
else{shim=-t.getHeight()/2;}
var val=this.u2p(t.value)+shim+'px';t._elem.css('top',val);t.pack();}}
if(lshow){var h=this._label._elem.outerHeight(true);this._label._elem.css('top',offmax-pixellength/2-h/2+'px');if(this.name=='yaxis'){this._label._elem.css('left','0px');}
else{this._label._elem.css('right','0px');}
this._label.pack();}}}};})(jQuery);(function($){$.jqplot.BarRenderer=function(){$.jqplot.LineRenderer.call(this);};$.jqplot.BarRenderer.prototype=new $.jqplot.LineRenderer();$.jqplot.BarRenderer.prototype.constructor=$.jqplot.BarRenderer;$.jqplot.BarRenderer.prototype.init=function(options,plot){this.barPadding=8;this.barMargin=10;this.barDirection='vertical';this.barWidth=null;this.shadowOffset=2;this.shadowDepth=5;this.shadowAlpha=0.08;this.waterfall=false;this.groups=1;this.varyBarColor=false;this.highlightMouseOver=true;this.highlightMouseDown=false;this.highlightColors=[];if(options.highlightMouseDown&&options.highlightMouseOver==null){options.highlightMouseOver=false;}
$.extend(true,this,options);this.fill=true;if(this.waterfall){this.fillToZero=false;this.disableStack=true;}
if(this.barDirection=='vertical'){this._primaryAxis='_xaxis';this._stackAxis='y';this.fillAxis='y';}
else{this._primaryAxis='_yaxis';this._stackAxis='x';this.fillAxis='x';}
this._highlightedPoint=null;this._plotSeriesInfo=null;this._dataColors=[];this._barPoints=[];var opts={lineJoin:'miter',lineCap:'round',fill:true,isarc:false,strokeStyle:this.color,fillStyle:this.color,closePath:this.fill};this.renderer.shapeRenderer.init(opts);var sopts={lineJoin:'miter',lineCap:'round',fill:true,isarc:false,angle:this.shadowAngle,offset:this.shadowOffset,alpha:this.shadowAlpha,depth:this.shadowDepth,closePath:this.fill};this.renderer.shadowRenderer.init(sopts);plot.postInitHooks.addOnce(postInit);plot.postDrawHooks.addOnce(postPlotDraw);plot.eventListenerHooks.addOnce('jqplotMouseMove',handleMove);plot.eventListenerHooks.addOnce('jqplotMouseDown',handleMouseDown);plot.eventListenerHooks.addOnce('jqplotMouseUp',handleMouseUp);plot.eventListenerHooks.addOnce('jqplotClick',handleClick);plot.eventListenerHooks.addOnce('jqplotRightClick',handleRightClick);};function barPreInit(target,data,seriesDefaults,options){if(this.rendererOptions.barDirection=='horizontal'){this._stackAxis='x';this._primaryAxis='_yaxis';}
if(this.rendererOptions.waterfall==true){this._data=$.extend(true,[],this.data);var sum=0;var pos=(!this.rendererOptions.barDirection||this.rendererOptions.barDirection=='vertical')?1:0;for(var i=0;i<this.data.length;i++){sum+=this.data[i][pos];if(i>0){this.data[i][pos]+=this.data[i-1][pos];}}
this.data[this.data.length]=(pos==1)?[this.data.length+1,sum]:[sum,this.data.length+1];this._data[this._data.length]=(pos==1)?[this._data.length+1,sum]:[sum,this._data.length+1];}
if(this.rendererOptions.groups>1){this.breakOnNull=true;var l=this.data.length;var skip=parseInt(l/this.rendererOptions.groups,10);var count=0;for(var i=skip;i<l;i+=skip){this.data.splice(i+count,0,[null,null]);count++;}
for(i=0;i<this.data.length;i++){if(this._primaryAxis=='_xaxis'){this.data[i][0]=i+1;}
else{this.data[i][1]=i+1;}}}}
$.jqplot.preSeriesInitHooks.push(barPreInit);$.jqplot.BarRenderer.prototype.calcSeriesNumbers=function(){var nvals=0;var nseries=0;var paxis=this[this._primaryAxis];var s,series,pos;for(var i=0;i<paxis._series.length;i++){series=paxis._series[i];if(series===this){pos=i;}
if(series.renderer.constructor==$.jqplot.BarRenderer){nvals+=series.data.length;nseries+=1;}}
return[nvals,nseries,pos];};$.jqplot.BarRenderer.prototype.setBarWidth=function(){var i;var nvals=0;var nseries=0;var paxis=this[this._primaryAxis];var s,series,pos;var temp=this._plotSeriesInfo=this.renderer.calcSeriesNumbers.call(this);nvals=temp[0];nseries=temp[1];var nticks=paxis.numberTicks;var nbins=(nticks-1)/2;if(paxis.name=='xaxis'||paxis.name=='x2axis'){if(this._stack){this.barWidth=(paxis._offsets.max-paxis._offsets.min)/nvals*nseries-this.barMargin;}
else{this.barWidth=((paxis._offsets.max-paxis._offsets.min)/nbins-this.barPadding*(nseries-1)-this.barMargin*2)/nseries;}}
else{if(this._stack){this.barWidth=(paxis._offsets.min-paxis._offsets.max)/nvals*nseries-this.barMargin;}
else{this.barWidth=((paxis._offsets.min-paxis._offsets.max)/nbins-this.barPadding*(nseries-1)-this.barMargin*2)/nseries;}}
return[nvals,nseries];};function computeHighlightColors(colors){var ret=[];for(var i=0;i<colors.length;i++){var rgba=$.jqplot.getColorComponents(colors[i]);var newrgb=[rgba[0],rgba[1],rgba[2]];var sum=newrgb[0]+newrgb[1]+newrgb[2];for(var j=0;j<3;j++){newrgb[j]=(sum>570)?newrgb[j]*0.8:newrgb[j]+0.3*(255-newrgb[j]);newrgb[j]=parseInt(newrgb[j],10);}
ret.push('rgb('+newrgb[0]+','+newrgb[1]+','+newrgb[2]+')');}
return ret;}
$.jqplot.BarRenderer.prototype.draw=function(ctx,gridData,options){var i;var opts=(options!=undefined)?options:{};var shadow=(opts.shadow!=undefined)?opts.shadow:this.shadow;var showLine=(opts.showLine!=undefined)?opts.showLine:this.showLine;var fill=(opts.fill!=undefined)?opts.fill:this.fill;var xaxis=this.xaxis;var yaxis=this.yaxis;var xp=this._xaxis.series_u2p;var yp=this._yaxis.series_u2p;var pointx,pointy,nvals,nseries,pos;this._dataColors=[];this._barPoints=[];if(this.barWidth==null){this.renderer.setBarWidth.call(this);}
var temp=this._plotSeriesInfo=this.renderer.calcSeriesNumbers.call(this);nvals=temp[0];nseries=temp[1];pos=temp[2];if(this._stack){this._barNudge=0;}
else{this._barNudge=(-Math.abs(nseries/2-0.5)+pos)*(this.barWidth+this.barPadding);}
if(showLine){var negativeColors=new $.jqplot.ColorGenerator(this.negativeSeriesColors);var positiveColors=new $.jqplot.ColorGenerator(this.seriesColors);var negativeColor=negativeColors.get(this.index);if(!this.useNegativeColors){negativeColor=opts.fillStyle;}
var positiveColor=opts.fillStyle;if(this.barDirection=='vertical'){for(var i=0;i<gridData.length;i++){if(this.data[i][1]==null){continue;}
points=[];var base = gridData[i][0] - gridData[0][0] + this._barNudge;var ystart;if(this._stack&&this._prevGridData.length){ystart=this._prevGridData[i][1];}
else{if(this.fillToZero){ystart=this._yaxis.series_u2p(0);}
else if(this.waterfall&&i>0&&i<this.gridData.length-1){ystart=this.gridData[i-1][1];}
else{ystart=ctx.canvas.height;}}
if((this.fillToZero&&this._plotData[i][1]<0)||(this.waterfall&&this._data[i][1]<0)){if(this.varyBarColor){if(this.useNegativeColors){opts.fillStyle=negativeColors.next();}
else{opts.fillStyle=positiveColors.next();}}
else{opts.fillStyle=negativeColor;}}
else{if(this.varyBarColor){opts.fillStyle=positiveColors.next();}
else{opts.fillStyle=positiveColor;}}
points.push([base-this.barWidth/2,ystart]);points.push([base-this.barWidth/2,gridData[i][1]]);points.push([base+this.barWidth/2,gridData[i][1]]);points.push([base+this.barWidth/2,ystart]);this._barPoints.push(points);if(shadow&&!this._stack){var sopts=$.extend(true,{},opts);delete sopts.fillStyle;this.renderer.shadowRenderer.draw(ctx,points,sopts);}
var clr=opts.fillStyle||this.color;this._dataColors.push(clr);this.renderer.shapeRenderer.draw(ctx,points,opts);}}
else if(this.barDirection=='horizontal'){for(var i=0;i<gridData.length;i++){if(this.data[i][0]==null){continue;}
points=[];var base=gridData[i][1]-this._barNudge;var xstart;if(this._stack&&this._prevGridData.length){xstart=this._prevGridData[i][0];}
else{if(this.fillToZero){xstart=this._xaxis.series_u2p(0);}
else if(this.waterfall&&i>0&&i<this.gridData.length-1){xstart=this.gridData[i-1][1];}
else{xstart=0;}}
if((this.fillToZero&&this._plotData[i][1]<0)||(this.waterfall&&this._data[i][1]<0)){if(this.varyBarColor){if(this.useNegativeColors){opts.fillStyle=negativeColors.next();}
else{opts.fillStyle=positiveColors.next();}}}
else{if(this.varyBarColor){opts.fillStyle=positiveColors.next();}
else{opts.fillStyle=positiveColor;}}
points.push([xstart,base+this.barWidth/2]);points.push([xstart,base-this.barWidth/2]);points.push([gridData[i][0],base-this.barWidth/2]);points.push([gridData[i][0],base+this.barWidth/2]);this._barPoints.push(points);if(shadow&&!this._stack){var sopts=$.extend(true,{},opts);delete sopts.fillStyle;this.renderer.shadowRenderer.draw(ctx,points,sopts);}
var clr=opts.fillStyle||this.color;this._dataColors.push(clr);this.renderer.shapeRenderer.draw(ctx,points,opts);}}}
if(this.highlightColors.length==0){this.highlightColors=computeHighlightColors(this._dataColors);}
else if(typeof(this.highlightColors)=='string'){var temp=this.highlightColors;this.highlightColors=[];for(var i=0;i<this._dataColors.length;i++){this.highlightColors.push(temp);}}};$.jqplot.BarRenderer.prototype.drawShadow=function(ctx,gridData,options){var i;var opts=(options!=undefined)?options:{};var shadow=(opts.shadow!=undefined)?opts.shadow:this.shadow;var showLine=(opts.showLine!=undefined)?opts.showLine:this.showLine;var fill=(opts.fill!=undefined)?opts.fill:this.fill;var xaxis=this.xaxis;var yaxis=this.yaxis;var xp=this._xaxis.series_u2p;var yp=this._yaxis.series_u2p;var pointx,pointy,nvals,nseries,pos;if(this._stack&&this.shadow){if(this.barWidth==null){this.renderer.setBarWidth.call(this);}
var temp=this._plotSeriesInfo=this.renderer.calcSeriesNumbers.call(this);nvals=temp[0];nseries=temp[1];pos=temp[2];if(this._stack){this._barNudge=0;}
else{this._barNudge=(-Math.abs(nseries/2-0.5)+pos)*(this.barWidth+this.barPadding);}
if(showLine){if(this.barDirection=='vertical'){for(var i=0;i<gridData.length;i++){if(this.data[i][1]==null){continue;}
points=[];var base=gridData[i][0]+this._barNudge;var ystart;if(this._stack&&this._prevGridData.length){ystart=this._prevGridData[i][1];}
else{if(this.fillToZero){ystart=this._yaxis.series_u2p(0);}
else{ystart=ctx.canvas.height;}}
points.push([base-this.barWidth/2,ystart]);points.push([base-this.barWidth/2,gridData[i][1]]);points.push([base+this.barWidth/2,gridData[i][1]]);points.push([base+this.barWidth/2,ystart]);this.renderer.shadowRenderer.draw(ctx,points,opts);}}
else if(this.barDirection=='horizontal'){for(var i=0;i<gridData.length;i++){if(this.data[i][0]==null){continue;}
points=[];var base=gridData[i][1]-this._barNudge;var xstart;if(this._stack&&this._prevGridData.length){xstart=this._prevGridData[i][0];}
else{xstart=0;}
points.push([xstart,base+this.barWidth/2]);points.push([gridData[i][0],base+this.barWidth/2]);points.push([gridData[i][0],base-this.barWidth/2]);points.push([xstart,base-this.barWidth/2]);this.renderer.shadowRenderer.draw(ctx,points,opts);}}}}};function postInit(target,data,options){for(i=0;i<this.series.length;i++){if(this.series[i].renderer.constructor==$.jqplot.BarRenderer){if(this.series[i].highlightMouseOver){this.series[i].highlightMouseDown=false;}}}}
function postPlotDraw(){this.plugins.barRenderer={highlightedSeriesIndex:null};this.plugins.barRenderer.highlightCanvas=new $.jqplot.GenericCanvas();this.eventCanvas._elem.before(this.plugins.barRenderer.highlightCanvas.createElement(this._gridPadding,'jqplot-barRenderer-highlight-canvas',this._plotDimensions));var hctx=this.plugins.barRenderer.highlightCanvas.setContext();}
function highlight(plot,sidx,pidx,points){if(typeof plot.plugins.barRenderer!='undefined'){var s=plot.series[sidx];var canvas=plot.plugins.barRenderer.highlightCanvas;canvas._ctx.clearRect(0,0,canvas._ctx.canvas.width,canvas._ctx.canvas.height);s._highlightedPoint=pidx;plot.plugins.barRenderer.highlightedSeriesIndex=sidx;var opts={fillStyle:s.highlightColors[pidx]};s.renderer.shapeRenderer.draw(canvas._ctx,points,opts);}}
function unhighlight(plot){if(typeof plot.plugins.barRenderer!='undefined'){var canvas=plot.plugins.barRenderer.highlightCanvas;canvas._ctx.clearRect(0,0,canvas._ctx.canvas.width,canvas._ctx.canvas.height);for(var i=0;i<plot.series.length;i++){plot.series[i]._highlightedPoint=null;}
plot.plugins.barRenderer.highlightedSeriesIndex=null;plot.target.trigger('jqplotDataUnhighlight');}}
function handleMove(ev,gridpos,datapos,neighbor,plot){if(neighbor){var ins=[neighbor.seriesIndex,neighbor.pointIndex,neighbor.data];var evt1=jQuery.Event('jqplotDataMouseOver');evt1.pageX=ev.pageX;evt1.pageY=ev.pageY;plot.target.trigger(evt1,ins);if(plot.series[ins[0]].highlightMouseOver&&!(ins[0]==plot.plugins.barRenderer.highlightedSeriesIndex&&ins[1]==plot.series[ins[0]]._highlightedPoint)){var evt=jQuery.Event('jqplotDataHighlight');evt.pageX=ev.pageX;evt.pageY=ev.pageY;plot.target.trigger(evt,ins);highlight(plot,neighbor.seriesIndex,neighbor.pointIndex,neighbor.points);}}
else if(neighbor==null){unhighlight(plot);}}
function handleMouseDown(ev,gridpos,datapos,neighbor,plot){if(neighbor){var ins=[neighbor.seriesIndex,neighbor.pointIndex,neighbor.data];if(plot.series[ins[0]].highlightMouseDown&&!(ins[0]==plot.plugins.barRenderer.highlightedSeriesIndex&&ins[1]==plot.series[ins[0]]._highlightedPoint)){var evt=jQuery.Event('jqplotDataHighlight');evt.pageX=ev.pageX;evt.pageY=ev.pageY;plot.target.trigger(evt,ins);highlight(plot,neighbor.seriesIndex,neighbor.pointIndex,neighbor.points);}}
else if(neighbor==null){unhighlight(plot);}}
function handleMouseUp(ev,gridpos,datapos,neighbor,plot){var idx=plot.plugins.barRenderer.highlightedSeriesIndex;if(idx!=null&&plot.series[idx].highlightMouseDown){unhighlight(plot);}}
function handleClick(ev,gridpos,datapos,neighbor,plot){if(neighbor){var ins=[neighbor.seriesIndex,neighbor.pointIndex,neighbor.data];var evt=jQuery.Event('jqplotDataClick');evt.pageX=ev.pageX;evt.pageY=ev.pageY;plot.target.trigger(evt,ins);}}
function handleRightClick(ev,gridpos,datapos,neighbor,plot){if(neighbor){var ins=[neighbor.seriesIndex,neighbor.pointIndex,neighbor.data];var idx=plot.plugins.barRenderer.highlightedSeriesIndex;if(idx!=null&&plot.series[idx].highlightMouseDown){unhighlight(plot);}
var evt=jQuery.Event('jqplotDataRightClick');evt.pageX=ev.pageX;evt.pageY=ev.pageY;plot.target.trigger(evt,ins);}}})(jQuery);