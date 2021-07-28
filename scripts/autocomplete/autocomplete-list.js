const createAutocompleteItemElement = (value, itemClass) => {
    const el = document.createElement("li");
    el.classList.add(itemClass);
    el.setAttribute(AUTOCOMPLETE_DATA_ATTRIBUTES.ITEM_VALUE, value);
    el.setAttribute(AUTOCOMPLETE_DATA_ATTRIBUTES.ROLE, AUTOCOMPLETE_ROLES.LIST_ITEM);
    el.innerText = value;

    return el;
};

const renderAutocompleteList = (list, autocomplete) => {
    clearList(list);
    showList(list);
    const autocompleteItemClass = list.dataset[AUTOCOMPLETE_DATASET.ITEM_CLASS];
    autocomplete.forEach((value) => {
        const listItem = createAutocompleteItemElement(value, autocompleteItemClass);
        list.appendChild(listItem);
    });
};

const closeList = (list) => {
    list.style.display = "none";
}

const showList = (list) => {
    list.style.display = "block";
}

const clearList = (list) => {
    list.innerHTML = "";
};

const selectActiveItemClass = (list) => list.dataset[AUTOCOMPLETE_DATASET.ITEM_ACTIVE_CLASS];

const setActiveListItemByIndex = (list, index) => {
    list.children[index].classList.add(selectActiveItemClass(list));
}

const unsetActiveListItemByIndex = (list, index) => {
    list.children[index].classList.remove(selectActiveItemClass(list));
}

const setNextActiveElement = (list, index) => {
    unsetActiveListItemByIndex(list, index);
    let newIndex = index + 1;
    const length = list.children.length;
    newIndex = newIndex < length ? newIndex : 0;
    setActiveListItemByIndex(list, newIndex);
    return newIndex;
}

function createAutocompleteList(list, itemsProp, {
    onClear,
    onItemSelect,
    onBlur,
} = {}) {
    let isActive = true,
        activeIndex = 0,
        items = itemsProp;

    list.addEventListener("click", (e) => {
        if(e.target.dataset[AUTOCOMPLETE_DATASET.ROLE] === AUTOCOMPLETE_ROLES.LIST_ITEM) {
            const value = e.target.dataset[AUTOCOMPLETE_DATASET.ITEM_VALUE];
            onItemSelect?.(value);
            closeList(list);
        }
    });

    list.addEventListener("blur", (e) => {
        onBlur?.();
    });
    
    return {
        clear: () => {
            clearList(list);
            isActive = false;
        },
        close: () => {
            closeList(list);
            isActive = false;
        },
        show: () => {
            showList(list);
            isActive = true;
        },
        nextItem: () => {
            activeIndex = setNextActiveElement(list, activeIndex);
        },
        selectItem: () => {            
            return items[activeIndex];
        },
        setItems: (items) => {
            activeIndex = 0;
            items = items;
            renderAutocompleteList(list, items);
            items.length && setActiveListItemByIndex(list, 0, selectActiveItemClass(list));
        },
        isActive,
        list
    }
}