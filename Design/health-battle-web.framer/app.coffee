#Utils.globalLayers sketch
# Project Info
# This info is presented in a widget when you share.
# http://framerjs.com/docs/#info.info

Framer.Info =
	title: ""
	author: "KyuhoLee"
	twitter: ""
	description: ""


{Firebase} = require 'firebase'
{TextLayer} = require 'TextLayer'

firebase = new Firebase
    projectID: "health-battle"
    secret: "3Mh5KtB51hsqzNnbEgoloHvNqsnvnIO9XiFB9lA9"
    server: "health-battle.firebaseio.com"

#Canvas.image = "http://www.mobilewebs.net/mojoomla/extend/wordpress/wp-estate/wp-content/plugins/wp-realty/images/default_images/o_2.jpg"

image = new Layer
	y: 50
	width: 100
	height: 100
	borderRadius: 50	
image.centerX()

fight = new Layer
	y: 400
	image: "images/start.jp2"
fight.centerX()

fight1 = new Layer
	y: 400
	image: "images/right1.jp2"
	visible: false
fight1.centerX()

fight2 = new Layer
	y: 400
	image: "images/left1.jp2"
	visible: false
fight2.centerX()

count = new TextLayer
    text: 0
    color: "black"
    textAlign: "center"
    fontSize: 100
    fontFamily: "Roboto"
    y: 50 + image.height
count.centerX()

firebase.onChange "/users/wMWCQNi1RcOO0kkphX2E2GVG8bC2/imageUrl", (value) ->
	image.image = value
	
firebase.onChange "/counters/wMWCQNi1RcOO0kkphX2E2GVG8bC2/jumping", (value) ->
	count.text = value
	if value > 0
		fight.visible = false
		fight1.visible = false
		fight2.visible = true

firebase.onChange "/counters/ZdjN62uSzDTPygrN9Yae9SdZv0q2/jumping", (value) ->
	count.text = value
	if value > 0
		fight.visible = false
		fight1.visible = true
		fight2.visible = false
