# Import file "Untitled 2" (sizes and positions are scaled 1:4)
sketch = Framer.Importer.load("imported/Untitled 2@4x")

# Import file "simpool" (sizes and positions are scaled 1:4)
Utils.globalLayers sketch

ViewController = require 'ViewController'
Views = new ViewController
	initialView: work
		
button.onClick -> 
	Views.fadeIn(fight)

button1.onClick -> 
	Views.fadeIn(fight00)

button2.onClick -> 
	gif.image = "images/fight.gif"
	gif.width = 360 * 4
	gif.height = 257.79 * 4
	gif.x = 0
	gif.y = 126
###
tab_workout.onClick -> 
	Views.fadeIn(main_workout)

tab_battle.onClick -> 
	Views.fadeIn(main_battle)
	
card.onClick -> 
	Views.fadeIn(workout)

back_workout.onClick -> 
	Views.back()

back_battle.onClick -> 
	Views.back()
	
item_battle.onClick ->
	Views.fadeIn(battle)

scroll = ScrollComponent.wrap(list)
scroll.scrollHorizontal = false

scroll = ScrollComponent.wrap(list_battle)
scroll.scrollHorizontal = false
###
