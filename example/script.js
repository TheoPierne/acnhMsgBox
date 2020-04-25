var msgBox = new ACMsgBox({
	title: "Mélo", 
	idDiv: "svgDiv", 
	textWriteInProcess: true, 
	lines:{
		1: ["Et voilà ! Je peux te racheter le tout"], 
		2: ["pour {1 988 000 clochettes.} Qu'est-ce"], 
		3: ["que tu en dis ?"]
	}
})

function draw() {
	msgBox.draw()
}