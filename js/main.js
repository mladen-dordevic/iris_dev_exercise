/*jslint browser: true, devel: true, regexp: true, sloppy: true */
var Utils = (function (window) {
    'use strict';
    /**
     * Returns a type of the parameter passed
     * @method isType
     * @param {} arg
     * @return {String}
     */
    function isType(arg) {
        var obj = {};
        return obj.toString.call(arg).slice(8, -1);
    }

    /**
     * Iterator for Array with delays to prevent deadlock
     * @method forEach
     * @param {Array} array
     * @param {Number} delay
     * @param {Function} callback
     * @param {Function} onFinish
     * @param {Number} chunk
     */
    function forEach(array, delay, callback, onFinish, chunk) {
        if (isType(callback) !== 'Function') {
            throw new window.Error('Third argument expected to be a function.');
        }
        if (isType(array) !== 'Array') {
            throw new window.Error('First argument expected to be a array.');
        }
        var index = 0,
            length = array.length,
            chunkInit = chunk > 0 ? chunk : 1,
            iterate = function () {
                while (chunkInit > 0 && index < length) {
                    callback(array[index], index, length);
                    index += 1;
                    chunkInit -= 1;
                }
                if (index < length) {
                    chunkInit = chunk || 1;
                    window.setTimeout(iterate, delay || 0);
                } else if (onFinish && isType(onFinish) === 'Function') {
                    onFinish(array);
                }
            };
        iterate();
    }

    /**
     * Detects if mobile platform is used
     * @method mobilecheck
     * @return {Boolean} check
     */
    //modified from http://detectmobilebrowser.com/
    function mobilecheck() {
        var check = false;
        (function (a) {
            if (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0, 4))) { check = true; }
        }(window.navigator.userAgent || window.navigator.vendor || window.opera));
        return check;
    }
    return {
        isType : isType,
        forEach : forEach,
        mobilecheck : mobilecheck
    };

}(window));

//UI module
(function ($, window) {
    'use strict';
    $(window.document).ready(function () {
        //asinine control to the toggle button in header
        $('#navbar-toggle-menu').on('click', function () {
            $('#content-menu').toggle("slide");
        });
        //create color table in the menu
        var iterations = 20,
            colorRange = 270,
            maxDepth = 800,
            i,
            el,
            depth,
            color;
        for (i = 0; i < iterations; i += 1) {
            el = $('<span>');
            depth = colorRange / iterations * i * maxDepth / colorRange;
            color = colorRange / iterations * i;
            if (i % 5 === 0) {
                el.text(depth.toFixed()).css({
                    'background': 'hsl(' + color + ',100%,50%)',
                    'color': 'white'
                });
            } else {
                el.text('_').css({
                    'background': 'hsl(' + color + ',100%,50%)',
                    'color': 'hsl(' + color + ',100%,50%)'
                });
            }
            $('#depth-legend').append(el);
        }

        //generate magnitude circle size analogy
        for (i = 3; i < 28; i += 3) {
            el = $('<span>').css({
                'width': i + 'px',
                'height': i + 'px',
                '-webkit-border-radius': i / 2 + 'px',
                '-moz-border-radius': i / 2 + 'px',
                'border-radius': i / 2 + 'px',
                'background': 'black',
                'display': 'inline-block',
                'margin': '0px 8px'
            });
            $('#magnitude-legend').append(el);
        }
    });
}(window.$, window));

//main module and app logic
(function ($, g, Utils, window) {
    'use strict';
    var map = null,
        headerSet = false,
        header = [],
        MAX_LOAD = 500,
        disableOnClick = false,
        cached = {},
        infowindow = null,
        circle = null;

    /**
     * Class that contains earthquake data
     * @method EarthQuake
     * @param {Array} keyArray
     * @param {Array} valueArray
     * @return {EarthQuake} new instance of EarthQuake
     */
    function EarthQuake(keyArray, valueArray) {
        var i, l;
        if (Utils.isType(keyArray) !== 'Array') {
            throw new window.Error('First argument in EarthQuake constructor expected to be an Array');
        }
        if (Utils.isType(valueArray) !== 'Array') {
            throw new window.Error('Second argument in EarthQuake constructor expected to be an Array');
        }
        if (keyArray.length !== valueArray.length) {
            throw new window.Error('Key array needs to have same length as value array');
        }
        for (i = 0, l = keyArray.length; i < l; i += 1) {
            this[keyArray[i]] = valueArray[i];
        }
        return this;
    }
    /**
     * Creates a marker and assignee it to the map
     * @method setMarker
     * @param {Map} map
     * @return {EarthQuake} this instance
     */
    EarthQuake.prototype.setMarker = function (map) {
        var self = this;
        this.latLng = new g.LatLng(+this.Latitude, +this.Longitude);
        this.marker = new g.Marker({
            position: self.latLng,
            map: map,
          //icon: self.magnitudeToIcon(),
            icon: {
                path: g.SymbolPath.CIRCLE,
                fillOpacity: 1,
                fillColor: self.depthToColor(800),
                strokeOpacity: 0.0,
                strokeColor: '#fff000',
                strokeWeight: 0.0,
                scale: self.Magnitude * 3 || 3 //pixels
            }
        });
        g.event.addListener(self.marker, 'click', function () {
            infowindow.setContent(self.toHtml());
            infowindow.open(map, self.marker);
        });
        return this;
    };
    /**
     * Exports the EarthQuake fields as HTML
     * @method toHtml
     * @return {String}
     */
    EarthQuake.prototype.toHtml = function () {
        var self = this,
            $ul = $('<ul>');
        header.forEach(function (n) {
            var $li = $('<li>').append(n, ' : ', self[n]);
            $ul.append($li);
        });
        $ul.append('</br>');
        return $ul[0];
    };
    /**
     * Converts depth to color
     * @method depthToColor
     * @param {Number} maxDepth
     * @return {String}
     */
    EarthQuake.prototype.depthToColor = function (maxDepth) {
        return 'hsl(' + 270 * window.Math.abs(this['Depth/km'] / maxDepth) + ',100%,50%)';
    };
    /**
     * Convert magnitude to number, hence icon
     * @method magnitudeToIcon
     * @return {String} url
     */
    EarthQuake.prototype.magnitudeToIcon = function () {
        if (this.Magnitude === '') {
            return 'http://maps.google.com/mapfiles/kml/pal3/icon57.png';
        }
        var n = window.Math.floor(+this.Magnitude - 1);
        n = n < 0 ? 0 : n;
        return 'http://maps.google.com/mapfiles/kml/pal3/icon' + n + '.png';
    };
    /**
     * Level of details, based upon a zoom level, displays different magnitudes
     * @method lod
     * @param {Number} zoom
     * @return {EarthQuake} this instance
     */
    EarthQuake.prototype.lod = function (zoom) {
        this.marker.setVisible(false);
        if (zoom > 0 && zoom <= 3) {
            if (+this.Magnitude >= 6) {
                this.marker.setVisible(true);
            }
        } else if (zoom > 3 && zoom <= 5) {
            if (+this.Magnitude >= 3) {
                this.marker.setVisible(true);
            }
        } else {
            this.marker.setVisible(true);
        }
        return this;
    };

    /**
     * Removes all the EaEarthQuake instances and clear the map of markers
     * @method emptyCache
     * @return
     */
    function emptyCache() {
        var id;
        for (id in cached) {
            if (cached.hasOwnProperty(id)) {
                if (cached[id].marker) {
                    cached[id].marker.setMap(null);
                }
                delete cached[id];
            }
        }
    }

    /**
     * Makes AJAX call to get earthquake based upon lat and lon
     * @method getEarthQuakes
     * @param {Number} lat
     * @param {Number} lon
     */
    function getEarthQuakes(lat, lon) {
        /**
         * Successful callback from AJAX call
         * @method callback
         * @param {String} data
         */
        function callback(data) {
            map.fitBounds(circle.getBounds());
            var arrayOfStrings = data.trim().split('\n'),
                zoom = map.getZoom();
            if (!headerSet) {
                headerSet = true;
                header = arrayOfStrings[0];
                header = header.split(' | ');
            }
            //remove title row
            arrayOfStrings.shift();
            window.console.log('response size= ', data.length, ' # =', arrayOfStrings.length);
            $('#waithing-data').hide();

            Utils.forEach(arrayOfStrings, 0, function (val, index, length) {
                var a = val.split('|'),
                    quake = new EarthQuake(header, a).setMarker(map).lod(zoom),
                    progress = 100 * index / length;
                cached[a[0]] = quake;
                $('#progress-indicator').show().css('width', (progress + '%'));
            }, function () {
                $('#progress-indicator').hide();
                disableOnClick = false;
            }, 50);
        }

        /**
         * AJAX callback on error, handles no data from server or bad URL
         * @method errorCalback
         * @param {} jqXHR
         * @param {} exception
         */
        function errorCalback(jqXHR, exception) {
            $('#progress-indicator').hide();
            disableOnClick = false;
            if (jqXHR.status === 0) {
                window.console.log('Not connect.\n Verify Network.');
            } else if (jqXHR.status === 404) {
                window.alert('No Earthquakes found');
                window.console.log('Requested page not found. [404]');
            } else if (jqXHR.status === 500) {
                window.console.log('Internal Server Error [500].');
            } else if (exception === 'parsererror') {
                window.console.log('Requested JSON parse failed.');
            } else if (exception === 'timeout') {
                window.console.log('Time out error.');
            } else if (exception === 'abort') {
                window.console.log('Ajax request aborted.');
            } else {
                window.console.log('Uncaught Error.\n' + jqXHR.responseText);
            }
        }

        /**
         * Gets the parameter of the query
         * @method getParameters
         * @return {}
         */
        function getParameters() {
            return {
                format: 'text',
                lat: lat,
                lon: lon,
                minradius: '0.0',
                maxradius: '9',
                nodata: '404',
                limit: MAX_LOAD
            };
        }

        $.ajax({
            url: 'http://service.iris.edu/fdsnws/event/1/query',
            type: 'GET',
            data: getParameters(),
            success: callback,
            error: errorCalback
        });
    }

    /**
     * Handels user dblclick on the map and circle to pass the event data to getEarthQuakes
     * @method onMapClickEvent
     * @param {} event
     */
    function onMapClickEvent(event) {
        if (!disableOnClick) {
            disableOnClick = true;
            $('#waithing-data').show();
            emptyCache();
            getEarthQuakes(event.latLng.lat(), event.latLng.lng());
            circle.setCenter(event.latLng);
            infowindow.close();
        }
    }

    /**
     * Detects type of the platof, mobile vs desktop
     * @method fetureDetector
     */
    function fetureDetector() {
        var moblie = Utils.mobilecheck();
        if (moblie) {
            window.console.log('Mobile device detected, reducing maximum number of permitted points');
            MAX_LOAD = 100;
        }
    }

    /**
     * ON zoom change event that is fired
     * @method onZoomChange
     */
    function onZoomChange() {
        var zoom = map.getZoom(),
            id;
        for (id in cached) {
            if (cached.hasOwnProperty(id)) {
                cached[id].lod(zoom);
            }
        }
    }

    /**
     * Initializes google map and controls
     * @method setMap
     * @param {String} mapDiv
     * @return {Map}
     */
    function setMap(mapDiv) {
        var mapOptions = {
            zoom: 3,
            center: new g.LatLng(0, 0),
            panControl: true,
            panControlOptions: {
                position: g.ControlPosition.RIGHT_TOP
            },
            zoomControl: true,
            zoomControlOptions: {
                style: g.ZoomControlStyle.LARGE,
                position: g.ControlPosition.RIGHT_TOP
            },
            scaleControl: true, // fixed to BOTTOM_RIGHT
            streetViewControl: false,
            mapTypeId: g.MapTypeId.SATELLITE
        };
        return new g.Map($(mapDiv)[0], mapOptions);
    }

    $(window.document).ready(function () {
        fetureDetector();
        map = setMap('#map3d');
        circle = new g.Circle({
            strokeColor: '#FF0000',
            strokeOpacity: 0.8,
            strokeWeight: 1,
            fillColor: '#FF0000',
            fillOpacity: 0.1,
            map: map,
            radius: 1000000
        });
        infowindow = new g.InfoWindow();
        g.event.addListener(map, 'click', function (event) {
            onMapClickEvent(event);
        });
        g.event.addListener(circle, 'click', function (event) {
            onMapClickEvent(event);
        });
        g.event.addListener(map, 'zoom_changed', function () {
            onZoomChange();
        });
    });
}(window.$, window.google.maps, Utils, window));