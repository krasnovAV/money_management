export function addNewItem<T>(items: Array<T>, item: T): Array<T> {
    const tempItems = items;
    const tempItem = item;

    if (tempItem) {
        if (typeof tempItem === "string") {
            // @ts-ignore
            let tempAr = items.map(item => item.toLowerCase());
            tempItem.toLowerCase();
            if (tempAr.includes(tempItem)) {
                alert("Такой элемент уже есть")
                return tempItems;
            }
        } else if (items.includes(item)) {
            alert("Такой элемент уже есть")
            return tempItems;
        }
        tempItems.push(tempItem);
        return tempItems;
    }
    return tempItems;
}