function createMaskInput(input, maskFn, deMaskFn) {
    const clone = input.cloneNode(false);
    input.style.display = 'none';
    clone.type = 'text';
    clone.name = input.name + "-mask";
    input.after(clone);

    clone.addEventListener('input', (e) => {
        e.target.value = maskFn(deMaskFn(e.target.value));
        input.value = deMaskFn(e.target.value);
        input.dispatchEvent(new Event("input"));
    })

    return clone;
}