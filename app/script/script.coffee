'use strict'

milkcocoa = new MilkCocoa 'https://io-ji5t7bbws.mlkcca.com:443'
counterDS = milkcocoa.dataStore 'counter'

$pane = $('#pane')
$pane.css
  height: innerHeight
  width: innerWidth
  color: do ->
    (Please.make_color(
    	golden: false
    	saturation: .65
    	value: .72
    ))[0]
$timer = $('#timer').fitText 0.35
$timer.css 'height', +($timer.css 'font-size').match(/(\d+)/)[1] * 1.5
$counter = $('#counter')
$sum = $('#sum')
counterDS.get 'i5t7p2j10001do9', (data) ->
  $sum.text data.count

window.addEventListener 'resize', ->
  timeoutID = null
  clearTimeout timeoutID if timeoutID?

  timeoutID = setTimeout ->
    $pane.css
      height: innerHeight
      width: innerWidth

    $timer.css 'height', +($timer.css 'font-size').match(/(\d+)/)[1] * 1.5
  , 500


class Timer
  _SEC_TIME = 180
  _$timer = null
  _remainingSecTime = _SEC_TIME

  _reset = ->
    _$timer.html """03<span class="timer-sep">:</span>00"""
    _remainingSecTime = _SEC_TIME

  _fillZero = (num) -> "0#{num}"[-2..]

  _calcRemainingMinute = ->
    min = ~~(_remainingSecTime / 60)
    _fillZero min

  _calcRemainingSec = ->
    sec = _remainingSecTime %% 60
    _fillZero sec

  _setTimer = ->
    _$timer.html """#{_calcRemainingMinute()}<span class="timer-sep">:</span>#{_calcRemainingSec()}"""

  constructor: (@counter) ->
    _$timer = $timer

  start: ->
    setInterval =>
      if _remainingSecTime is 1
        @counter.lightup()
        @counter.addShareCounts()
        _reset()
      else
        _remainingSecTime--
        _setTimer()
    , 1000


class Counter
  _$counters = null
  _ds = null
  _counts = 0

  _resetCounts = ->
    _counts = 1
    for i in [1..4]
      $(_$counters[i]).addClass 'counts-off'

  constructor: ($el, ds)->
    _$counters = $el.children()
    _ds = ds

  lightup: ->
    if _counts < 5
      $(_$counters[_counts]).removeClass 'counts-off'
      _counts++
    else
      _resetCounts()

  addShareCounts: ->
    _ds.get 'i5t7p2j10001do9', (data) ->
      data.count++

      _ds.set 'i5t7p2j10001do9', count: data.count
      $sum.text data.count


counter = new Counter $counter, counterDS
timer = new Timer counter
timer.start()
