const Keyboard = {
    elements: {
        main: null,   //keyboard-wrapper    свойства 
        keysContainer: null,
        keys: [] //massive of all keys
    },

    eventHandlers: {  //обработчки событий
        oninput: null,
        onclose: null
    },

    triggerEvent(handlerName){
        console.log("Событие " + handlerName + " сработало!");
        if (typeof this.eventHandlers[handlerName] == "function") {
            this.eventHandlers[handlerName](this.properties.value);
        }
    },
    
    properties: {
        value: "", //текущее значение клавиатуры
        capsLock: false
    },

    toggleCapsLock(){
        console.log("Кнопка сработала!");
        this.properties.capsLock = !this.properties.capsLock;

        for (const key of this.elements.keys) {
            if (key.childElementCount === 0) {
                key.textContent = this.properties.capsLock ? key.textContent.toUpperCase() : key.textContent.toLowerCase();
            }
        }
    },

    init(){
        this.elements.main = document.createElement("div");
        this.elements.keysContainer = document.createElement("div");

        this.elements.main.classList.add("keyboard-wrapper", "/keyboard-wrapper__hidden");
        this.elements.keysContainer.classList.add("keyboard-keys");
        this.elements.keysContainer.appendChild(this.createKeys());

        this.elements.keys = this.elements.keysContainer.querySelectorAll(".keyboard-key");

        this.elements.main.appendChild(this.elements.keysContainer);
        document.body.appendChild(this.elements.main);
        
        document.querySelectorAll(".keyboard-textarea").forEach(element => {
            element.addEventListener("focus", () => {
                this.open(element.value, currentValue => {
                    element.value = currentValue;
                });
            });
        });
    },

    createKeys(){
        const fragment = document.createDocumentFragment();
        const keyLayout = [
            "`", "1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "-", "=", "Backspace",
            "Tab", "q", "w", "e", "r", "t", "y", "u", "i", "o", "p", "[", "]", "\/", "Delete",
            "Caps Lock", "a", "s", "d", "f", "g", "h", "j", "k", "l", ";", "'", "Enter",
            "Shift", "z", "x", "c", "v", "b", "n", "m", ",", ".", "/", "Shift", "Up", 
            "Ctrl", "Win", "Alt", "space", "Alt", "Ctrl", "Left", "Down", "Right"
        ];
        
        /*const keyLayoutrus = [
            "ё", "1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "-", "=", "Backspace",
            "Tab", "й", "ц", "у", "к", "е", "н", "г", "ш", "щ", "з", "х", "ъ", "\/", "Delete",
            "Caps Lock", "ф", "ы", "в", "а", "п", "р", "о", "л", "д", "ж", "э", "Enter",
            "Shift", "я", "ч", "с", "м", "и", "т", "ь", "б", "ю", ".", "Shift", "Up", 
            "Ctrl", "Win", "Alt", "space", "Alt", "Ctrl", "Left", "Down", "Right"
        ];*/

        const createIconHTML = (icon_name) => {
            return `<i class="material-icons">${icon_name}</i>`;
        };

        keyLayout.forEach(key => {
            const keyElement = document.createElement("button");
            const insertLineBreak = [keyLayout[13], keyLayout[28], keyLayout[41], keyLayout[54]].indexOf(key) !== -1;

            keyElement.setAttribute("type", "button");
            keyElement.classList.add("keyboard-key");

            switch (key) {
                    case "Backspace":
                        keyElement.classList.add("keyboard-key__wide");
                        keyElement.innerHTML = createIconHTML("backspace");

                        keyElement.addEventListener("click", () => {
                            this.properties.value = this.properties.value.substring(0, this.properties.value.length - 1);
                            this.triggerEvent("oninput"); 
                    });
                    break;

                    case "Win":
                        keyElement.classList.add("keyboard-key__wide");
                        keyElement.innerHTML = createIconHTML("grid_view");

                        keyElement.addEventListener("click", () => {
                            this.properties.value += "";
                            this.triggerEvent("oninput"); 
                    });
                    break;

                    case "Tab":
                        keyElement.classList.add("keyboard-key");
                        keyElement.innerHTML = createIconHTML("keyboard_tab");

                        keyElement.addEventListener("click", () => {
                            this.properties.value += "   ";
                            this.triggerEvent("oninput"); 
                    }); 
                    break;

                    case "Up":
                        keyElement.classList.add("keyboard-key");
                        keyElement.innerHTML = createIconHTML("keyboard_arrow_up");

                        keyElement.addEventListener("click", () => {
                            this.properties.value += "↑";
                            this.triggerEvent("oninput"); 
                    }); 
                    break;

                    case "Down":
                        keyElement.classList.add("keyboard-key");
                        keyElement.innerHTML = createIconHTML("keyboard_arrow_down");

                        keyElement.addEventListener("click", () => {
                            this.properties.value += "↓";
                            this.triggerEvent("oninput"); 
                    }); 
                    break;

                    case "Left":
                        keyElement.classList.add("keyboard-key");
                        keyElement.innerHTML = createIconHTML("keyboard_arrow_left");

                        keyElement.addEventListener("click", () => {
                            this.properties.value += "←";
                            this.triggerEvent("oninput"); 
                    }); 
                    break;

                    case "Right":
                        keyElement.classList.add("keyboard-key");
                        keyElement.innerHTML = createIconHTML("keyboard_arrow_right");

                        keyElement.addEventListener("click", () => {
                            this.properties.value += "→";
                            this.triggerEvent("oninput"); 
                    }); 
                    break;
    
                    case "Delete":
                        keyElement.classList.add("keyboard-key");
                        keyElement.innerHTML = key.toLowerCase();
    
                        keyElement.addEventListener("click", () => {
                            this.properties.value = this.properties.value.substring(0, this.properties.value.length - 2) + this.properties.value.substring(this.properties.value.length - 1, this.properties.value.length);
                            this.triggerEvent("oninput"); 
                        });
                        break;

                    case "Caps Lock":
                        keyElement.classList.add("keyboard-key__wide", "keyboard-key__activate");
                        keyElement.innerHTML = createIconHTML("keyboard_capslock");

                        keyElement.addEventListener("click", () => {
                            this.toggleCapsLock(); 
                            keyElement.classList.toggle("keyboard-key__active", this.properties.capsLock);
                    });
                    break;



                   /* case "Shift":
                        keyElement.classList.add("keyboard-key__wide");
                        keyElement.innerHTML = key.toLowerCase();

                        keyElement.addEventListener("click", () => {
                            this.toggleCapsLock(); 
                            keyElement.classList.toggle("keyboard-key__active", this.properties.capsLock);
                    });
                    break;

                    case "Alt":
                        keyElement.classList.add("keyboard-key__wide");
                        keyElement.innerHTML = key.toLowerCase();

                        keyElement.addEventListener("click", () => {
                            this.toggleCapsLock();  
                            keyElement.classList.toggle("keyboard-key__active", this.properties.capsLock);
                    });
                    break;

                    case "Ctrl":
                        keyElement.classList.add("keyboard-key__wide");
                        keyElement.innerHTML = key.toLowerCase();

                        keyElement.addEventListener("click", () => {
                            this.toggleCapsLock(); 
                            keyElement.classList.toggle("keyboard-key__active", this.properties.capsLock);
                    });
                    break;*/




                    case "Enter":
                        keyElement.classList.add("keyboard-key__wide");
                        keyElement.innerHTML = createIconHTML("keyboard_return");

                        keyElement.addEventListener("click", () => {
                            this.properties.value += "\n";
                            this._triggerEvent("oninput");
                    });
                    break;

                    case "space":
                        keyElement.classList.add("keyboard-key__space");
                        keyElement.innerHTML = createIconHTML("space_bar");

                        keyElement.addEventListener("click" , () => {
                            this.properties.value += " ";
                            this._triggerEvent("oninput");
                    });
                    break;


                    default:
                        keyElement.textContent = key.toLowerCase(); 
    
                        keyElement.addEventListener("click" || "keyup", () => {
                            this.properties.value += this.properties.capsLock ? key.toUpperCase() : key.toLowerCase();
                            this.triggerEvent("oninput");
                        });
                    break;
            }

            document.onkeydown = function (event) {
                if(event.code == 'Ctrl'){
                    document. onkeyup = function(event){
                        if(event.code == 'Alt'){
                            keyLayout.splice(0,0, "ё");
                            keyLayout.splice(15,27, "й", "ц", "у", "к", "е", "н", "г", "ш", "щ", "з", "х", "ъ");
                            keyLayout.splice(30,41, "ф", "ы", "в", "а", "п", "р", "о", "л", "д", "ж", "э");
                            keyLayout.splice(43,53, "я", "ч", "с", "м", "и", "т", "ь", "б", "ю", ".");
                        }
                        else{
                            document.onkeyup == null;
                        }
                    }
                }
            };

            fragment.appendChild(keyElement);

            if (insertLineBreak) {
                fragment.appendChild(document.createElement("br"));};
            
        });
        return fragment;
    },

    open(initialValue, oninput, onclose){
        this.properties.value = initialValue || "";
        this.eventHandlers.oninput = oninput;
        this.eventHandlers.onclose = onclose;
        //this.elements.main.classList.remove("keyboard--hidden");
    },

    //close(){}

};

window.addEventListener("DOMContentLoaded", function () {
    Keyboard.init();
});









