(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["pages-tripRecord-index"],{"0027":function(t,e,i){"use strict";i.r(e);var n=i("1b5b"),o=i("fe4d");for(var a in o)"default"!==a&&function(t){i.d(e,t,(function(){return o[t]}))}(a);i("c39c");var l,r=i("f0c5"),s=Object(r["a"])(o["default"],n["b"],n["c"],!1,null,"6596be31",null,!1,n["a"],l);e["default"]=s.exports},"1b5b":function(t,e,i){"use strict";i.d(e,"b",(function(){return o})),i.d(e,"c",(function(){return a})),i.d(e,"a",(function(){return n}));var n={uSticky:i("0976").default,uniSearchBar:i("8e30").default,uniEmpty:i("6eb8").default,uBackTop:i("0858").default,uGap:i("5f09").default},o=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("v-uni-view",{staticClass:"login_container"},[n("u-sticky",{attrs:{"offset-top":t.offsetTop,enable:t.enable}},[n("uni-search-bar",{staticClass:"uniSearchBar",attrs:{placeholder:"姓名/联系方式/小区",bgColor:"#F6F8FA",radius:100,cancelButton:"none"},on:{confirm:function(e){arguments[0]=e=t.$handleEvent(e),t.onSearch.apply(void 0,arguments)},clear:function(e){arguments[0]=e=t.$handleEvent(e),t.onClear.apply(void 0,arguments)}}})],1),t.isNoData?n("v-uni-view",{staticClass:"empty_container"},[n("uni-empty",{attrs:{emptyText:t.emptyText}})],1):t._e(),t.isNoData?t._e():n("v-uni-view",{staticClass:"list_container"},t._l(4,(function(e,o){return n("v-uni-view",{key:o,staticClass:"list_item",on:{click:function(e){arguments[0]=e=t.$handleEvent(e),t.onClickItem.apply(void 0,arguments)}}},[n("v-uni-view",{staticClass:"item_top"},[n("v-uni-image",{staticClass:"user_img",attrs:{src:i("c8fb").replace(/^\./,"")}}),n("v-uni-view",{staticClass:"top_right_box"},[n("v-uni-view",{staticClass:"type-container"},[n("v-uni-text",{staticClass:"type-text",staticStyle:{width:"84rpx"}},[t._v("姓名:")]),n("v-uni-text",{staticClass:"content-text",staticStyle:{width:"calc(100% - 84rpx)"}},[t._v("张娜")])],1),n("v-uni-view",{staticClass:"type-container"},[n("v-uni-text",{staticClass:"type-text",staticStyle:{width:"140rpx"}},[t._v("联系方式:")]),n("v-uni-text",{staticClass:"content-text",staticStyle:{width:"calc(100% - 140rpx)"}},[t._v("13812345678")])],1),n("v-uni-view",{staticClass:"type-container"},[n("v-uni-text",{staticClass:"type-text",staticStyle:{width:"112rpx"}},[t._v("来源地:")]),n("v-uni-text",{staticClass:"content-text",staticStyle:{width:"calc(100% - 112rpx)"}},[t._v("河北省石家庄市山河区")])],1),n("v-uni-view",{staticClass:"type-container"},[n("v-uni-text",{staticClass:"type-text",staticStyle:{width:"140rpx"}},[t._v("当前住址:")]),n("v-uni-text",{staticClass:"content-text",staticStyle:{width:"calc(100% - 140rpx)"}},[t._v("长春都市花园10栋4003")])],1),n("v-uni-view",{staticClass:"type-container"},[n("v-uni-text",{staticClass:"type-text",staticStyle:{width:"196rpx"}},[t._v("核酸检测报告:")]),n("v-uni-text",{staticClass:"content-text",staticStyle:{width:"calc(100% - 196rpx)"}},[t._v("暂无")])],1)],1)],1),n("v-uni-view",{staticClass:"item_bottom"},[n("v-uni-view",{staticClass:"bottom_t",staticStyle:{"margin-bottom":"25rpx"}},[n("v-uni-text",{staticClass:"bottom_text"},[t._v("通行时间: 2021-1-15 00:35:58")]),n("v-uni-text",{staticClass:"bottom_text",staticStyle:{color:"red"}},[t._v("隔离中 高风险")])],1),n("v-uni-view",{staticClass:"bottom_t"},[n("v-uni-text",{staticClass:"bottom_text"},[t._v("通行位置: 西一门")]),n("v-uni-text",{staticClass:"bottom_text",staticStyle:{color:"red"}},[t._v("剩余隔离天数: 8天 未出隔离期")])],1)],1)],1)})),1),n("u-back-top",{attrs:{scrollTop:t.scrollTop,mode:"circle",bottom:"160",right:"50",top:"200",icon:"arrow-up","custom-style":t.customStyle,"icon-style":t.iconStyle,tips:"顶部"}}),n("u-gap",{attrs:{height:"100"}})],1)},a=[]},"21d6":function(t,e,i){var n=i("24fb");e=n(!1),e.push([t.i,'@charset "UTF-8";\n/**\n * 下方引入的为uView UI的集成样式文件，为scss预处理器，其中包含了一些"u-"开头的自定义变量\n * uView自定义的css类名和scss变量，均以"u-"开头，不会造成冲突，请放心使用 \n */\n/**\n  register&forget界面css样式\n  **/.login-container[data-v-6596be31]{display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-orient:vertical;-webkit-box-direction:normal;-webkit-flex-direction:column;flex-direction:column;background-color:#f6f8fa;height:100%}.common-view[data-v-6596be31]{display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-orient:horizontal;-webkit-box-direction:normal;-webkit-flex-direction:row;flex-direction:row;-webkit-box-align:center;-webkit-align-items:center;align-items:center;width:%?690?%;height:%?88?%;background:#fff;border-radius:%?44?%;position:relative}.phone-view[data-v-6596be31]{margin:%?71?% %?30?% 0}.login-input[data-v-6596be31]{margin-left:%?49?%;width:%?430?%;height:%?40?%;font-size:%?32?%;font-family:PingFangSC-Regular,PingFang SC;font-weight:400;color:#2f2d2c;line-height:%?48?%}.seePsw-view[data-v-6596be31]{display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-orient:horizontal;-webkit-box-direction:normal;-webkit-flex-direction:row;flex-direction:row;-webkit-box-align:center;-webkit-align-items:center;align-items:center;-webkit-box-pack:center;-webkit-justify-content:center;justify-content:center;width:%?50?%;height:%?50?%;position:absolute;right:%?49?%}.seePsw-img[data-v-6596be31]{width:%?36?%;height:%?36?%}.placeholder[data-v-6596be31]{font-size:%?30?%;color:#979797;text-align:left}.vscode-view[data-v-6596be31]{margin:%?32?% %?30?% 0}.line[data-v-6596be31]{margin-left:%?9?%;width:%?1?%;height:%?29?%;background-color:#979797}.vscode-text[data-v-6596be31]{height:%?40?%;line-height:%?40?%;margin-left:%?20?%;font-size:%?28?%;color:#218eff}.warn-container[data-v-6596be31]{display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-orient:horizontal;-webkit-box-direction:normal;-webkit-flex-direction:row;flex-direction:row;-webkit-box-align:center;-webkit-align-items:center;align-items:center;margin-top:%?34?%;margin-left:%?30?%}.warn-img[data-v-6596be31]{width:%?32?%;height:%?32?%;margin-right:%?10?%}.warn-text[data-v-6596be31]{height:%?37?%;font-size:%?26?%;font-weight:400;color:#333;line-height:%?37?%}.submit-btn[data-v-6596be31]{margin-top:%?100?%}.login_container[data-v-6596be31]{display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-orient:vertical;-webkit-box-direction:normal;-webkit-flex-direction:column;flex-direction:column;width:100%;min-height:100%;position:relative}.list_container[data-v-6596be31]{display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-orient:vertical;-webkit-box-direction:normal;-webkit-flex-direction:column;flex-direction:column;padding:%?30?%;width:100%}.list_item[data-v-6596be31]{display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-orient:vertical;-webkit-box-direction:normal;-webkit-flex-direction:column;flex-direction:column;padding:0 %?20?%;background:#fff;border-radius:%?16?%;position:relative;margin-bottom:%?30?%}.list_item[data-v-6596be31]:last-child{margin-bottom:0}.item_top[data-v-6596be31]{display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-orient:horizontal;-webkit-box-direction:normal;-webkit-flex-direction:row;flex-direction:row;-webkit-box-align:start;-webkit-align-items:flex-start;align-items:flex-start;width:100%;padding-top:%?30?%;border-bottom:%?1?% solid #f0f0f0}.user_img[data-v-6596be31]{width:%?260?%;height:%?200?%;margin-right:%?20?%}.top_right_box[data-v-6596be31]{display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-orient:vertical;-webkit-box-direction:normal;-webkit-flex-direction:column;flex-direction:column}.status_box[data-v-6596be31]{display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-orient:horizontal;-webkit-box-direction:normal;-webkit-flex-direction:row;flex-direction:row;-webkit-box-align:center;-webkit-align-items:center;align-items:center;position:absolute;top:%?30?%;right:%?20?%}.status_box > uni-text[data-v-6596be31]{height:%?26?%;font-size:%?26?%;font-family:PingFang SC;font-weight:500;color:#ea0505;line-height:%?26?%}.type-container[data-v-6596be31]{display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-orient:horizontal;-webkit-box-direction:normal;-webkit-flex-direction:row;flex-direction:row;-webkit-box-align:baseline;-webkit-align-items:baseline;align-items:baseline;margin-bottom:%?20?%;width:100%}.type-text[data-v-6596be31]{font-size:%?28?%;font-family:PingFangSC-Regular,PingFang SC;font-weight:400;color:#666;line-height:%?28?%}.content-text[data-v-6596be31]{font-size:%?28?%;font-family:PingFangSC-Regular,PingFang SC;font-weight:400;color:#333;line-height:%?32?%}.item_bottom[data-v-6596be31]{display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-orient:vertical;-webkit-box-direction:normal;-webkit-flex-direction:column;flex-direction:column;-webkit-box-pack:center;-webkit-justify-content:center;justify-content:center;height:%?120?%;line-height:%?120?%}.bottom_t[data-v-6596be31]{display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-orient:horizontal;-webkit-box-direction:normal;-webkit-flex-direction:row;flex-direction:row;-webkit-box-align:center;-webkit-align-items:center;align-items:center;-webkit-box-pack:justify;-webkit-justify-content:space-between;justify-content:space-between}.bottom_text[data-v-6596be31]{height:%?28?%;font-size:%?28?%;font-family:PingFang SC;font-weight:500;color:#333;line-height:%?28?%}',""]),t.exports=e},"32a4":function(t,e,i){"use strict";var n=i("4ea4");Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var o=n(i("8e30")),a=n(i("6eb8")),l={components:{uniSearchBar:o.default,uniEmpty:a.default},data:function(){return{emptyText:"暂无出行记录...",status:"more",keyword:"",listsItem:[],loading:!0,page:1,pages:0,isNoData:!1,isShowLoadMore:!1,offsetTop:-90,enable:!0,scrollTop:0,iconStyle:{color:"#2979ff",fontSize:"34rpx"},customStyle:{backgroundColor:"#a0cfff",color:"#2979ff"}}},methods:{onClickItem:function(){uni.navigateTo({url:"/pages/tripRecord/detail"})},onPageScroll:function(t){this.scrollTop=t.scrollTop}},onPullDownRefresh:function(){uni.showNavigationBarLoading(),setTimeout((function(){uni.hideNavigationBarLoading(),uni.stopPullDownRefresh()}),2e3)}};e.default=l},c39c:function(t,e,i){"use strict";var n=i("f9b6"),o=i.n(n);o.a},c8fb:function(t,e,i){t.exports=i.p+"static/img/banner_2.da54fb24.png"},f9b6:function(t,e,i){var n=i("21d6");"string"===typeof n&&(n=[[t.i,n,""]]),n.locals&&(t.exports=n.locals);var o=i("4f06").default;o("0dcd4142",n,!0,{sourceMap:!1,shadowMode:!1})},fe4d:function(t,e,i){"use strict";i.r(e);var n=i("32a4"),o=i.n(n);for(var a in n)"default"!==a&&function(t){i.d(e,t,(function(){return n[t]}))}(a);e["default"]=o.a}}]);