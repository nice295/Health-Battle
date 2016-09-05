# Import file "health-battle" (sizes and positions are scaled 1:4)
sketch = Framer.Importer.load("imported/health-battle@4x")
# Import file "simpool" (sizes and positions are scaled 1:4)
Utils.globalLayers sketch

ViewController = require 'ViewController'
Views = new ViewController
	initialView: sign_in
		
facebook_signin.onClick -> 
	Views.fadeIn(main_workout)

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

