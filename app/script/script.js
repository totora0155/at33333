(function() {
  'use strict';
  var $counter, $pane, $sum, $timer, Counter, Timer, counter, counterDS, milkcocoa, timer,
    __modulo = function(a, b) { return (+a % (b = +b) + b) % b; };

  milkcocoa = new MilkCocoa('https://io-ji5t7bbws.mlkcca.com:443');

  counterDS = milkcocoa.dataStore('counter');

  $pane = $('#pane');

  $pane.css({
    height: innerHeight,
    width: innerWidth,
    color: (function() {
      return (Please.make_color({
        golden: false,
        saturation: .65,
        value: .72
      }))[0];
    })()
  });

  $timer = $('#timer').fitText(0.35);

  $timer.css('height', +($timer.css('font-size')).match(/(\d+)/)[1] * 1.5);

  $counter = $('#counter');

  $sum = $('#sum');

  counterDS.get('i5t7p2j10001do9', function(data) {
    return $sum.text(data.count);
  });

  window.addEventListener('resize', function() {
    var timeoutID;
    timeoutID = null;
    if (timeoutID != null) {
      clearTimeout(timeoutID);
    }
    return timeoutID = setTimeout(function() {
      $pane.css({
        height: innerHeight,
        width: innerWidth
      });
      return $timer.css('height', +($timer.css('font-size')).match(/(\d+)/)[1] * 1.5);
    }, 500);
  });

  Timer = (function() {
    var _$timer, _SEC_TIME, _calcRemainingMinute, _calcRemainingSec, _fillZero, _remainingSecTime, _reset, _setTimer;

    _SEC_TIME = 180;

    _$timer = null;

    _remainingSecTime = _SEC_TIME;

    _reset = function() {
      _$timer.html("03<span class=\"timer-sep\">:</span>00");
      return _remainingSecTime = _SEC_TIME;
    };

    _fillZero = function(num) {
      return ("0" + num).slice(-2);
    };

    _calcRemainingMinute = function() {
      var min;
      min = ~~(_remainingSecTime / 60);
      return _fillZero(min);
    };

    _calcRemainingSec = function() {
      var sec;
      sec = __modulo(_remainingSecTime, 60);
      return _fillZero(sec);
    };

    _setTimer = function() {
      return _$timer.html("" + (_calcRemainingMinute()) + "<span class=\"timer-sep\">:</span>" + (_calcRemainingSec()));
    };

    function Timer(counter) {
      this.counter = counter;
      _$timer = $timer;
    }

    Timer.prototype.start = function() {
      return setInterval((function(_this) {
        return function() {
          if (_remainingSecTime === 1) {
            _this.counter.lightup();
            _this.counter.addShareCounts();
            return _reset();
          } else {
            _remainingSecTime--;
            return _setTimer();
          }
        };
      })(this), 1000);
    };

    return Timer;

  })();

  Counter = (function() {
    var _$counters, _counts, _ds, _resetCounts;

    _$counters = null;

    _ds = null;

    _counts = 0;

    _resetCounts = function() {
      var i, _i, _results;
      _counts = 1;
      _results = [];
      for (i = _i = 1; _i <= 4; i = ++_i) {
        _results.push($(_$counters[i]).addClass('counts-off'));
      }
      return _results;
    };

    function Counter($el, ds) {
      _$counters = $el.children();
      _ds = ds;
    }

    Counter.prototype.lightup = function() {
      if (_counts < 5) {
        $(_$counters[_counts]).removeClass('counts-off');
        return _counts++;
      } else {
        return _resetCounts();
      }
    };

    Counter.prototype.addShareCounts = function() {
      return _ds.get('i5t7p2j10001do9', function(data) {
        data.count++;
        _ds.set('i5t7p2j10001do9', {
          count: data.count
        });
        return $sum.text(data.count);
      });
    };

    return Counter;

  })();

  counter = new Counter($counter, counterDS);

  timer = new Timer(counter);

  timer.start();

}).call(this);

//# sourceMappingURL=script.js.map