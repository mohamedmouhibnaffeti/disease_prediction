import json

# Read the JSON file
with open('datawith.json', 'r') as file:
    data = file.read()


# Correct syntax errors
data = data.replace('}{', '},{')

# Save the corrected data to a new file
with open('correctednot.json', 'w') as file:
    json.dump(data, file, indent=4)


# Load the corrected JSON data
corrected_data = json.loads(data)

# Save the corrected data to a new file
with open('corrected_file.json', 'w') as file:
    json.dump(corrected_data, file, indent=4)