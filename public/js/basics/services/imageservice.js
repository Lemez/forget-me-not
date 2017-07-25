PFApp.factory('imageService', function() {
  var list = [];

  return {
    addItem: addItem,
    getList: getList
  };

  function addItem(item) {
    list.push(item);
  }

  function getList() {
    return list;
  }

  function resetList() {
    list=[];
  }
});