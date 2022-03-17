const getItemById = (items, itemKey, additionalItemKey = null) => {
  if (!additionalItemKey) return items.find((item) => item.id === itemKey);

  const itemToReturn = items.find((item) => {
    if (item.id === additionalItemKey && item.listId === itemKey) {
      return item;
    }
    return null;
  });
  return itemToReturn;
};
module.exports = {
  getItemById,
};
