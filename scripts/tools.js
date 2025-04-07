function RadioButton(name, value, checked = false) {
    let radioButton = document.createElement("input");
    radioButton.setAttribute("type", "radio");
    radioButton.setAttribute("name", name);
    radioButton.setAttribute("value", value);
    radioButton.checked = checked;

    return radioButton;
}

function LabelWith(text, element) {
    let label = document.createElement("label");
    label.innerText = text;
    label.appendChild(element);

    return label;
}