/*
 * Kontra.js v5.0.4 (Custom Build on 2018-12-16) | MIT
 * Build: https://straker.github.io/kontra/download?files=quadtree
 */
kontra={init(n){var t=this.canvas=document.getElementById(n)||n||document.querySelector("canvas");this.context=t.getContext("2d"),this._init()},_noop:new Function,_tick:new Function,_init:new Function};
kontra.quadtree=function(t){return{maxDepth:(t=t||{}).maxDepth||3,maxObjects:t.maxObjects||25,_b:!1,_d:t.depth||0,bounds:t.bounds||{x:0,y:0,width:kontra.canvas.width,height:kontra.canvas.height},objects:[],subnodes:[],clear(){this.subnodes.map(function(t){t.clear()}),this._b=!1,this.objects.length=0},get(t){let s,h,i=[];for(;this.subnodes.length&&this._b;){for(s=this._g(t),h=0;h<s.length;h++)i.push.apply(i,this.subnodes[s[h]].get(t));return i}return this.objects},add(){let t,s,h,i;for(s=0;s<arguments.length;s++)if(h=arguments[s],Array.isArray(h))this.add.apply(this,h);else if(this._b)this._a(h);else if(this.objects.push(h),this.objects.length>this.maxObjects&&this._d<this.maxDepth){for(this._s(),t=0;i=this.objects[t];t++)this._a(i);this.objects.length=0}},_a(t,s,h){for(s=this._g(t),h=0;h<s.length;h++)this.subnodes[s[h]].add(t)},_g(t){let s=[],h=this.bounds.x+this.bounds.width/2,i=this.bounds.y+this.bounds.height/2,e=t.y<i&&t.y+t.height>=this.bounds.y,n=t.y+t.height>=i&&t.y<this.bounds.y+this.bounds.height;return t.x<h&&t.x+t.width>=this.bounds.x&&(e&&s.push(0),n&&s.push(2)),t.x+t.width>=h&&t.x<this.bounds.x+this.bounds.width&&(e&&s.push(1),n&&s.push(3)),s},_s(t,s,h){if(this._b=!0,!this.subnodes.length)for(t=this.bounds.width/2|0,s=this.bounds.height/2|0,h=0;h<4;h++)this.subnodes[h]=kontra.quadtree({bounds:{x:this.bounds.x+(h%2==1?t:0),y:this.bounds.y+(h>=2?s:0),width:t,height:s},depth:this._d+1,maxDepth:this.maxDepth,maxObjects:this.maxObjects})}}};