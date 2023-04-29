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
    },
    
    properties: {
        value: "", //текущее значение клавиатуры
        capsLock: false
    },

    toggleCapsLock(){
        console.log("Кнопка сработала!");
    },

    init(){
        this.elements.main = document.createElement("div");
        this.elements.keysContainer = document.createElement("div");

        this.elements.main.classList.add("keyboard-wrapper", "/keyboard-wrapper__hidden");//чтобы изначально класс не сработал
        this.elements.keysContainer.classList.add("keyboard-keys");
        this.elements.keysContainer.appendChild(this.createKeys());

        this.elements.main.appendChild(this.elements.keysContainer);
        document.body.appendChild(this.elements.main);
    },

    createKeys(){
        const fragment = document.createDocumentFragment();
        const keyLayout = [
            "`", "1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "-", "=", "Backspace",
            "Tab", "q", "w", "e", "r", "t", "y", "u", "i", "o", "p", "[", "]", "\/", "Delete",
            "Caps Lock", "a", "s", "d", "f", "g", "h", "j", "k", "l", ";", "'", "Enter",
            "Shift", "*", "z", "x", "c", "v", "b", "n", "m", ".", ",", "/", "Shift",
            "Ctrl", "Win", "Alt", "space", "Alt", "Ctrl"
        ];

        const createIconHTML = (icon_name) => {
            return `<i class="material-icons">${icon_name}</i>`;
        };

        keyLayout.forEach(key => {
            const keyElement = document.createElement("button");
            const insertLineBreak = ["Backspace", "Delete", "Enter", "Shift", "Ctrl"].indexOf(key) !== -1;

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

                    case "Caps Lock":
                    keyElement.classList.add("keyboard-key__wide", "keyboard-key__activate");
                    keyElement.innerHTML = createIconHTML("keyboard_capslock");//значек

                    keyElement.addEventListener("click", () => {
                        this.toggleCapsLock(); //переключает заглавные буквы 
                        keyElement.classList.toggle("keyboard-key__active", this.properties.capsLock);
                    });
                    break;

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

                    keyElement.addEventListener("click", () => {
                        this.properties.value += " ";
                        this._triggerEvent("oninput");
                    });
                    break;

                    default:
                        keyElement.textContent = key.toLowerCase(); //если при ошибке ввели букыу в массиве не в том регистре
    
                        keyElement.addEventListener("click", () => {
                            this.properties.value += this.properties.capsLock ? key.toUpperCase() : key.toLowerCase();
                            this.triggerEvent("oninput");
                        });
                    break;
            }

            fragment.appendChild(keyElement);

            if (insertLineBreak) {
                fragment.appendChild(document.createElement("br"));}
        });

        return fragment;
    },

    open(initialValue, oninput, onclose){

    },

    //close(){}

};

window.addEventListener("DOMContentLoaded", function () {
    Keyboard.init();
});