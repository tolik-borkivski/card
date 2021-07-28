"use strict";

const TAB_DATASET = {
    GROUP: "tabGroup",
    ROLE: "tabRole",
    CONTENT_ID: "tabContentId",
}

const TAB_DATA_ATTRIBUTE = {
    ROLE: "data-tab-role",
    GROUP: 'data-tab-group',
    CONTENT_ID: 'data-tab-content-id',
}

const TAB_CLASSES = {
    TAB_ACTIVE_CLASS: "tab__item--active",
    CONTENT_ACTIVE_CLASS: "tab-content--active",
}

const makeTabsSelector = (groupName) => `[${TAB_DATA_ATTRIBUTE.GROUP}='${groupName}'][${TAB_DATA_ATTRIBUTE.ROLE}='tab']`;
const makeTabsContentSelector = (groupName) => `[${TAB_DATA_ATTRIBUTE.GROUP}='${groupName}'][${TAB_DATA_ATTRIBUTE.ROLE}='content']`;

function getContentId(element) {
    return element.dataset[TAB_DATASET.CONTENT_ID];
}

function activateTab(tab) {
    tab.classList.add(TAB_CLASSES.TAB_ACTIVE_CLASS);
}

function deactivateTab(tab) {
    tab.classList.remove(TAB_CLASSES.TAB_ACTIVE_CLASS);
}

function deactivateAllTab(tabs) {
    tabs.forEach(t => deactivateTab(t));
}

function activateContent(content) {
    content.classList.add(TAB_CLASSES.CONTENT_ACTIVE_CLASS);
}

function deactivateContent(content) {
    content.classList.remove(TAB_CLASSES.CONTENT_ACTIVE_CLASS);
}

function deactivateAllContent(content) {
    content.forEach(c => deactivateContent(c));
}

function switchTabs(current, next) {
    deactivateTab(current);
    activateTab(next);
    return next;
}

function switchContent(current, next) {
    deactivateContent(current);
    activateContent(next);
    return next;
}

function findByContentIdIn(contentId, collection) {
    return Array.from(collection).find(c => getContentId(c) === contentId);
}

function findElementIndexIn(element, elements) {
    return Array.from(elements).findIndex(e => e === element);
}

function getElementIndexIn(element, collection) {
    return Array.from(collection).findIndex(e => e === element);
}

function getPrevElementIndex(current, elements) {
    const currentIndex = findElementIndexIn(current, elements);
    return currentIndex < 0 ? 0 : currentIndex - 1;
}

function getNextElementIndex(current, elements) {
    const currentIndex = findElementIndexIn(current, elements);
    return currentIndex < elements.length - 1 ? currentIndex + 1 : currentIndex;
}

function makeTabs({ group: tabGroupName }) {
    let onTabChange = function(index) {};
    const tabs = document.querySelectorAll(makeTabsSelector(tabGroupName));
    const content = document.querySelectorAll(makeTabsContentSelector(tabGroupName));

    deactivateAllTab(tabs);
    let activeTab = tabs[0];
    activateTab(activeTab);
    let activeContent = content[0];
    activateContent(activeContent);

    function clickHandler({ target }) {
        if (target === activeTab) return;
        const contentId = getContentId(target);
        const nextTab = findByContentIdIn(contentId, tabs);
        activeTab = switchTabs(activeTab, nextTab);
        const nextContent = findByContentIdIn(contentId, content);
        activeContent = switchContent(activeContent, nextContent);
        const nextTabIndex = getElementIndexIn(activeTab, tabs);
        onTabChange(nextTabIndex);
    }

    tabs.forEach(t => t.addEventListener("click", clickHandler));

    return {
        next() {
            const nextTabIndex = getNextElementIndex(activeTab, tabs);
            const nextTab = tabs[nextTabIndex];
            const contentId = getContentId(nextTab);
            const nextContent = findByContentIdIn(contentId, content);
            activeTab = switchTabs(activeTab, nextTab);
            activeContent = switchContent(activeContent, nextContent);
            onTabChange(nextTabIndex);
        },
        prev() {
            const prevTabIndex = getPrevElementIndex(activeTab, tabs);
            const prevTab = tabs[prevTabIndex];
            const contentId = getContentId(prevTab);
            const prevContent = findByContentIdIn(contentId, content);
            activeTab = switchTabs(activeTab, prevTab);
            activeContent = switchContent(activeContent, prevContent)
            onTabChange(prevTabIndex);
        },
        go(index) {
            if (index >= tabs.length || index < 0) return;
            const nextTab = tabs[index];
            const contentId = getContentId(nextTab);
            const nextContent = findByContentIdIn(contentId, content);
            activeTab = switchTabs(activeTab, nextTab);
            activeContent = switchContent(activeContent, nextContent);
            onTabChange(index);
        },
        setOnTabChangeCallback(callback) {
            onTabChange = callback;
        }
    }
}