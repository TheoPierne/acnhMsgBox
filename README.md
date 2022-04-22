# Animal Crossing Message Box

**acnhMsgBox** is a library who create you a message box like in Animal Crossing New Horizon

![imageBefore](https://img.lemde.fr/2020/04/15/0/0/960/540/630/0/60/0/3d643f9_9-VO0DtNeyNgyg6TcH-fKFjW.jpg)

![imageAfter](https://i.imgur.com/m67XYDX.png)

## Getting Started

**⚠️ | This library should be used in a browser, it's doesn't work in Node.js environment** 


### Installing

Install with npm 

```
npm install acnhmsgbox
``` 
or with the `-s` parameters if you want install it and adds the entry to the `package.json` file dependencies

```
npm install acnhmsgbox -s
```

### Example

Open the `index.html` in the example folder and enjoy :)

### How to use

Like that

``` html
<script type="text/javascript" src="./acnhMessageBox.js"></script>
<script type="text/javascript">
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
</script>
```


## Documentation

### Constructor options

| PARAMETER          | TYPE                                                                                                    | OPTIONAL | DEFAULT   | DESCRIPTION                                                                                    |
|--------------------|---------------------------------------------------------------------------------------------------------|----------|-----------|------------------------------------------------------------------------------------------------|
| title              | [**String**](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/)         | ✅        | *`Mélo`*  | Title of the message box (**7 characters max**)                                                                    |
| idDiv              | [**String**](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/)         | ✅        | *`none`*  | If it's not set, the SVG will displayed at the end of your `body` element                      |
| textWriteInProcess | [**Boolean**](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Boolean) | ✅        | *`false`* | If it's set to `false`, the text will not be write by the library                              |
| lines              | [**Object**](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object)   | ✅        | *`null`*  | Object who contain text to display, **3 lines max**. (After much tests, I advise 37 characters length per lines) |

``` js
new ACMsgBox({
	title: "Server", // If title is not set, default title is "Mélo"
	idDiv: "svgDiv", // The id of the div where you want to display the SVG
	textWriteInProcess: true, 
	lines:{
		1: ["Et voilà ! Je peux te racheter le tout"], 
		2: ["pour {1 988 000 clochettes.} Qu'est-ce"], 
		3: ["que tu en dis ?"]
	}
})
```


### Methods

#### draw()

Draw the message box. (**⚠️ | Without calling this method, your message box doesn't display**)

``` js
ACMsgBox.draw()
```

## Authors

* **Théo Pierné** - *Initial work* - [TheoPierne](https://github.com/TheoPierne/)


## License

This project is licensed under the ISC License - see the **LICENSE** file for details
