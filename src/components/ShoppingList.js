import React, { useState } from "react";
import ItemForm from "./ItemForm";
import Filter from "./Filter";
import Item from "./Item";

function ShoppingList({setItems, items, searchQuery, setSearchQuery}) {
  
  const [selectedCategory, setSelectedCategory] = useState("All");

  function filterSearch (e) {
    setSearchQuery(e.target.value) 
  }

  function handleCategoryChange(event) {
    setSelectedCategory(event.target.value);
  }

  const itemsToDisplay = items.filter((item) => {
    if (selectedCategory === "All") return true;

    return item.category === selectedCategory;
  });

  function onItemFormSubmit (e) {
    e.preventDefault()

    const newItem = {
      name: e.target.name.value,
      category: e.target.category.value
    }

    console.log(newItem)

    setItems(prevValue => {
      const newerItem = [...prevValue]
      newerItem.push(newItem)
      return newerItem
       })

       console.log(setItems)
   }

  const displayfromSearch = itemsToDisplay.filter( item => {
    if (item.name.toLowerCase().includes(searchQuery.toLowerCase())) {
     return item 
    } else {
      return null
    }
  })

  return (
    <div className="ShoppingList">
      <ItemForm onItemFormSubmit={onItemFormSubmit}  setSearchQuery={setSearchQuery} searchQuery={searchQuery}/>
      <Filter onSearchChange={filterSearch} onCategoryChange={handleCategoryChange} setSearchQuery={setSearchQuery} searchQuery={searchQuery}/>
      <ul className="Items">
        {displayfromSearch.map((item) => (
          <Item key={item.id} name={item.name} category={item.category} />
        ))}
      </ul>
    </div>
  );
}

export default ShoppingList;