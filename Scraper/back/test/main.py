
from webmd.webmd import main_webmd
from nhsinform.nhsinform import main_nhsinform
from nhs.nhs import main_nhs
from mayoclinic.mayoclinic import main_mayoclinic

# Create a file named 'errors' to save the errors
errors_file = open("errors.txt", "w")



try:
    print("main_webmd")
    main_webmd()
except Exception as e:
    error_message = f"Error in main_webmd: {e}\n"
    print(error_message)
    errors_file.write(error_message)

try:
    print("main_nhsinform")
    main_nhsinform()
except Exception as e:
    error_message = f"Error in main_nhsinform: {e}\n"
    print(error_message)
    errors_file.write(error_message)

try:
    print('main_nhs')
    main_nhs()
except Exception as e:
    error_message = f"Error in main_nhs: {e}\n"
    print(error_message)
    errors_file.write(error_message)

try:
    print("main_mayoclinic")
    main_mayoclinic()
except Exception as e:
    error_message = f"Error in main_mayoclinic: {e}\n"
    print(error_message)
    errors_file.write(error_message)

# Close the errors file
errors_file.close()
