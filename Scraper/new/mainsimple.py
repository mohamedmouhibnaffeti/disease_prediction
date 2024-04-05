# main.py

import settings
import os
import importlib.util

print(settings.python_files)
def main():
    files_directory = "files"
    for python_file in settings.python_files:
        try:
            module_name = os.path.splitext(python_file)[0]  # Get the module name without the .py extension
            file_path = os.path.join(files_directory, python_file)
            spec = importlib.util.spec_from_file_location(module_name, file_path)
            module = importlib.util.module_from_spec(spec)
            spec.loader.exec_module(module)
            file_class_name = module_name.capitalize()  # Capitalize the module name to match class name convention
            file_class = getattr(module, file_class_name)
            instance = file_class()
            method_name = f"main_{module_name}"
            getattr(instance, method_name)()
        except Exception as e:
            print(f"Error running {method_name}() in {python_file}: {e}")

if __name__ == "__main__":
    main()
