import threading
import time

# Global variable to control thread 1
stop_thread_1 = False

# Function to simulate a task that takes some time to complete
def task(name, delay):
    global stop_thread_1
    print(f"Task '{name}' started")
    for i in range(delay):
        if name == "Thread 1" and stop_thread_1:
            print(f"Task '{name}' stopped")
            return
        time.sleep(20)
    print(f"Task '{name}' completed")

# Function to stop thread 1 when user input is provided
def stop_thread():
    global stop_thread_1
    input("Press enter to stop Thread 1: ")
    stop_thread_1 = True

# Creating threads
thread1 = threading.Thread(target=task, args=("Thread 1", 5))  # task with name "Thread 1" and delay 5 seconds
thread2 = threading.Thread(target=task, args=("Thread 2", 3))  # task with name "Thread 2" and delay 3 seconds
stop_thread_func = threading.Thread(target=stop_thread)

# Starting threads
thread1.start()
thread2.start()
stop_thread_func.start()

# Waiting for threads to finish
thread1.join()
thread2.join()
stop_thread_func.join()

print("All tasks completed")















































































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
