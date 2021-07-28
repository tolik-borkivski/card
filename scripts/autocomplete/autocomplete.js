const makeAutocompleteValueSelector = (groupName) => `[${AUTOCOMPLETE_DATA_ATTRIBUTES.GROUP}='${groupName}'][${AUTOCOMPLETE_DATA_ATTRIBUTES.ROLE}=${AUTOCOMPLETE_ROLES.VALUE}]`;
const makeAutocompleteTargetSelector = (groupName) => `[${AUTOCOMPLETE_DATA_ATTRIBUTES.GROUP}='${groupName}'][${AUTOCOMPLETE_DATA_ATTRIBUTES.ROLE}=${AUTOCOMPLETE_ROLES.TARGET}]`;
const makeAutocompleteListSelector = (groupName) => `[${AUTOCOMPLETE_DATA_ATTRIBUTES.GROUP}='${groupName}'][${AUTOCOMPLETE_DATA_ATTRIBUTES.ROLE}=${AUTOCOMPLETE_ROLES.LIST}]`;

const initAutocomplete = (group, dictionary) => {
    const list = document.querySelector(makeAutocompleteListSelector(group)),
        target = document.querySelector(makeAutocompleteTargetSelector(group)),
        value = document.querySelector(makeAutocompleteValueSelector(group)),
        autocomplete = dictionary[value.value] || [],
        autocompleteFiltered = autocomplete;
    
    return {
        list, target, value, autocomplete, autocompleteFiltered
    }
};

const autocompleteFilter = (filterStr) => (val2) => val2.toLowerCase().includes(filterStr.toLowerCase());

const filterAutocomplete = (autocomplete, filterStr) => {
    return autocomplete.filter(autocompleteFilter(filterStr));
}

const updateTarget = (target) => (value) => {
    target.value = value;
};

function createAutocomplete({group, dictionary}) {
    const data = initAutocomplete(group, dictionary);
    const autocompleteList = createAutocompleteList(data.list, data.autocompleteFiltered, { onItemSelect: updateTarget(data.target) });

    data.value.addEventListener("input", (e) => {
        data.autocomplete = dictionary[e.target.value] || [];
        data.autocompleteFiltered = data.autocomplete;
    });

    data.target.addEventListener("input", e => {
        data.autocompleteFiltered = filterAutocomplete(data.autocomplete, e.target.value);
        autocompleteList.setItems(data.autocompleteFiltered);
    });

    data.target.addEventListener("blur", (e) => {
        if(autocompleteList.list.contains(e.target)) return;
    })

    data.target.addEventListener("focus", () => {
        data.autocompleteFiltered = filterAutocomplete(data.autocomplete, data.target.value);
        autocompleteList.setItems(data.autocompleteFiltered);
    })

    data.target.addEventListener("keydown", e => {
        switch (e.keyCode) {    
            case KEY_CODES.TAB: 
                e.preventDefault();
                autocompleteList.nextItem();
                break;
            case KEY_CODES.ENTER:
                if (autocompleteList.isActive) {
                    const value = autocompleteList.selectItem();
                    data.target.value = value;
                    autocompleteList.close();
                }
                break;
        }
    })
}