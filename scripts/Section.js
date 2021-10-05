export class Section {
    constructor({ elements, renderer }, containerSelector) {
        this._elements = elements;
        this._renderer = renderer;
        this._cardsContainer = document.querySelector(containerSelector)
    };

//  добавляем элемент в контейнер
    prependElement(element) {
        this._cardsContainer.prepend(element.generateCard());
    };

    clear() {
        this._cardsContainer.innerHTML = '';
    };

    renderItems() {
        this.clear()
        this._elements.forEach(element => {
            this._renderer(element);
        });
    };
}