window.onload = function() {
    cardTabs = makeTabs({
        group: "card"
    });
    cardTabs.next();
    cardTabs.prev();
    cardTabs.go(3);
    cardTabs.setOnTabChangeCallback = (index) => console.log("new callback", index);
}