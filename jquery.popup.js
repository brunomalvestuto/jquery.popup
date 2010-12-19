/*
 * jquery.popup
 * version 0.0.1
 * author: Bruno Malvestuto
 * email: bruno.malvestuto@gmail.com
 * Dual licensed under MIT(below)

Copyright (c) 2010 Bruno Malvestuto

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
*/


(function( $ ){
  $.fn.popup = function(options) {
    /*
     * All options:
     * url
     * with Integer in  pixels
     * height Integer in pixels
     * status The status bar at bottom of the window
     * toolbar The standard browser toolbar, with buttons such as Back and Forward.
     * location
     * menubar
     * directories
     * resizable
     * scrollbars
     * position {:left, :top} | 'center' | 'left'
    */

    var settings = jQuery.extend({
      width: 200,
      height: 300,
      position: 'center',
      name: 'popup',
    }, options);

    if(settings.position != null) {
      var position = settings.position;
      delete settings.position;

      switch(typeof position) {
        case 'string':
          switch(position){
            case 'center':
              settings['top'] = (screen.height / 2) - settings.height;
              settings['left'] = (screen.width /2 ) - settings.width;
              break;
            case 'top right':
              settings['top'] = 0;
              settings['left'] = screen.width - settings.width;
              break;
            case 'top left':
              settings['top'] = 0;
              settings['left'] = 0;
              break;
            case 'bottom right':
              settings['top'] = screen.height - settings.width;
              settings['left'] = screen.width - settings.width;
              break;
            case 'bottom left':
              settings['top'] = screen.height - settings.width;
              settings['left'] = 0;
              break;
          }
        break;
        case 'object':
          $.extend(settings, position)
          break;
      }
    }
    var name = settings.name;
    delete settings.name;

    var url = $(this).attr('href') || delete settings.url;

    var opts = [];
    for(prop in settings)
      opts.push(prop + '=' + settings[prop]);

    opts = opts.join(',');

    return this.each(function(){
      $(this).bind('click', function(e) {
        window.open(url, name, opts);
        e.preventDefault();
      })
    });

  };
})( jQuery );
