import csv

def write_csv_data(file_name, data):
    """
    Insert data into a CSV file.

    Args:
    - file_name (str): The name of the CSV file to insert data into.
    - data (list of lists): The data to insert into the CSV file.

    Returns:
    - None
    """
    with open(file_name, mode='a', newline='') as csv_file:
        writer = csv.writer(csv_file)
        writer.writerows(data)

# Example usage:
data = [
    ["John", 30, "New York"],
    ["Alice", 25, "London"],
    ["Bob", 35, "Paris"]
]

write_csv_data("data.csv", data)
