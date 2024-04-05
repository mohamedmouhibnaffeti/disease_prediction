data= {"file name": "file.filename[:(file.filename.rfind('.'))]" , "class name": "class_name", "function name": "class_Function"}
x=settings.python_files
x.append(data)
with open('settings.py', 'w') as f:
        f.write(f'python_files={x}')
file.save(file_path)



"""def search_by_name(items, search_name):
    found_items = []
    for item in items:
        if item["name"] == search_name:
            found_items.append(item)
    return found_items

# Example list of items
items = [
    {"name": "Item 1", "url": "http://example.com/item1", "description": "Description of Item 1"},
    {"name": "Item 2", "url": "http://example.com/item2", "description": "Description of Item 2"},
    {"name": "Item 3", "url": "http://example.com/item3", "description": "Description of Item 3"},
]

# Searching for items by name
search_result = search_by_name(items, "Item 2")

# Printing the search result
if search_result:
    print("Found item(s) with name 'Item 2':")
    for item in search_result:
        print("Name:", item["name"])
        print("URL:", item["url"])
        print("Description:", item["description"])
        print()
else:
    print("No item found with name 'Item 2'")"""
