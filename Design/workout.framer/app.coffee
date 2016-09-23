#Utils.globalLayers sketch
# Project Info
# This info is presented in a widget when you share.
# http://framerjs.com/docs/#info.info

Framer.Info =
	title: ""
	author: "KyuhoLee"
	twitter: ""
	description: ""


# Import file "worktou"
sketch = Framer.Importer.load("imported/worktou@1x")
Utils.globalLayers sketch

{Firebase} = require 'firebase'
{TextLayer} = require 'TextLayer'

#print Screen
{Circle} = require "circleModule"

circleMaxWidth = 160
strokeWidth = 26
circlePadding = 6

loadingCircle = new Circle
	circleWidth: circleMaxWidth
	topColor: "#ff150f"
	bottomColor: "#ff23bd"
	strokeWidth: strokeWidth
	hasCounter: true
	counterColor: "#ff1d6a"
	x: 750
	y: 200
	
#loadingCircle.centerX()

#loadingCircle.changeTo(100)

image.image = "images/gif_workout.gif"

firebase = new Firebase
    projectID: "health-battle"
    secret: "3Mh5KtB51hsqzNnbEgoloHvNqsnvnIO9XiFB9lA9"
    server: "health-battle.firebaseio.com"

count = new TextLayer
    text: "그림을 따라서 운동해보세요. 10번!"
    color: "#2E97DE"
    textAlign: "center"
    fontSize: 54
    fontFamily: "RobotoCondensed-Regular"
    y: 560
    width: Screen.width
    
count.centerX()

firebase.onChange "/counters/rWjjVsvGDPTCTAg6U8U6jFXXnBQ2/jumping", (value) ->
	#print value
	#count.text = value
	if value == 0
		count.text = "그림을 따라서 운동해보세요. 10번!"
			
	loadingCircle.changeTo(value * 10)