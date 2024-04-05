import re

# Open the file containing the data
with open("database/input.txt", "r") as f:
    data = f.read()

# Define a regular expression pattern to extract IP addresses and ports
pattern = r"(\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}):(\d{1,5})"

# Find all matches of the pattern in the data
matches = re.findall(pattern, data)

# Open a new file to write the extracted IP addresses and ports
with open("output.txt", "w") as f:
    f.write(f"[")
    # Write each IP address and port to the file
    for ip, port in matches:
        f.write(f"\"{ip}:{port}\"\n")
    f.write(f"]")

print("Extraction and saving complete!")
